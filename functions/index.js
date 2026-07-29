const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const Stripe = require('stripe');

admin.initializeApp();
const db = admin.firestore();

// Llaves de Stripe guardadas en Secret Manager (nunca en el código).
// Se configuran una vez con:
//   firebase functions:secrets:set STRIPE_SECRET_KEY
//   firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
// Ver functions/README.md para la guía completa.
const stripeSecretKey = defineSecret('STRIPE_SECRET_KEY');
const stripeWebhookSecret = defineSecret('STRIPE_WEBHOOK_SECRET');

// Precios definidos SOLO aquí, en el servidor.
// El cliente nunca debe poder decidir cuánto paga — solo elige qué producto quiere.
const PRODUCTOS = {
  modulo2: { nombre: 'Módulo 2: Conversando con una IA', centavos: 700 },
  modulo3: { nombre: 'Módulo 3: Creando Imágenes con IA', centavos: 900 },
  modulo4: { nombre: 'Módulo 4: IA para la Vida Diaria', centavos: 900 },
  modulo5: { nombre: 'Módulo 5: IA para la Creatividad', centavos: 900 },
  modulo6: { nombre: 'Módulo 6: Seguridad y Uso Responsable', centavos: 900 },
  plan: { nombre: 'Plan Completo — Todos los módulos', centavos: 2999 },
};

const URL_SITIO = 'https://srgabarca-del.github.io/academia-ia-generaciones';

/**
 * Callable desde el frontend (firebase/functions SDK, httpsCallable).
 * Crea una Stripe Checkout Session y devuelve la URL a la que redirigir al alumno.
 * request.data: { tipo: 'modulo2'|'modulo3'|...|'plan', email: string }
 */
exports.crearSesionPago = onCall({ secrets: [stripeSecretKey] }, async (request) => {
  const stripe = Stripe(stripeSecretKey.value());
  const tipo = request.data && request.data.tipo;
  const email = request.data && request.data.email;
  const producto = PRODUCTOS[tipo];

  if (!producto) {
    throw new HttpsError('invalid-argument', 'Producto no válido.');
  }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new HttpsError('invalid-argument', 'Correo no válido.');
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: email,
    client_reference_id: `${email}|${tipo}`,
    metadata: { tipo, email },
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: producto.nombre },
          unit_amount: producto.centavos,
        },
        quantity: 1,
      },
    ],
    success_url: `${URL_SITIO}/Academia_AI.html?pago=exito&tipo=${tipo}`,
    cancel_url: `${URL_SITIO}/Academia_AI.html?pago=cancelado`,
  });

  return { url: session.url };
});

/**
 * Webhook de Stripe. Configurar esta URL en el Dashboard de Stripe
 * (Developers > Webhooks) escuchando el evento checkout.session.completed.
 * La URL exacta la imprime `firebase deploy` al terminar, algo como:
 * https://us-central1-academia-ia-eba0b.cloudfunctions.net/webhookStripe
 */
exports.webhookStripe = onRequest(
  { secrets: [stripeSecretKey, stripeWebhookSecret] },
  async (req, res) => {
    const stripe = Stripe(stripeSecretKey.value());
    const firma = req.headers['stripe-signature'];
    let evento;

    try {
      evento = stripe.webhooks.constructEvent(
        req.rawBody,
        firma,
        stripeWebhookSecret.value()
      );
    } catch (err) {
      console.error('Firma de webhook inválida:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (evento.type === 'checkout.session.completed') {
      const session = evento.data.object;
      const tipo = session.metadata && session.metadata.tipo;
      const email = session.metadata && session.metadata.email;
      if (tipo && email) {
        await otorgarAcceso(email, tipo);
      } else {
        console.error('checkout.session.completed sin metadata tipo/email:', session.id);
      }
    }

    res.json({ received: true });
  }
);

async function otorgarAcceso(email, tipo) {
  const docId = email.toLowerCase();
  const campo = tipo === 'plan' ? 'acceso_plan' : `acceso_${tipo}`;
  await db.collection('accesos').doc(docId).set(
    {
      [campo]: true,
      actualizado: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * PUENTE TEMPORAL — el flujo de pago del sitio sigue siendo simulado
 * (sin Stripe real todavía). `accesos/{email}` tiene `allow write: if false`
 * en firestore.rules, así que la única forma de escribir ahí es desde una
 * Cloud Function con el Admin SDK. Esta función deja que el pago simulado
 * otorgue acceso real en Firestore (usando el mismo `otorgarAcceso()` que
 * ya usa `webhookStripe`), para poder construir y probar el gateo de
 * contenido de la guía sin esperar a activar cobros reales.
 * Cuando se conecte Stripe de verdad, esta función debe eliminarse y el
 * flujo de pago debe llamar a `crearSesionPago` en su lugar.
 * Usa el correo YA AUTENTICADO (request.auth), nunca el que el cliente
 * mande en el body, para que nadie pueda otorgarle acceso a otro correo.
 * request.data: { tipo: 'modulo2'|...|'modulo6'|'plan' }
 */
exports.otorgarAccesoSimulado = onCall(async (request) => {
  if (!request.auth || !request.auth.token.email) {
    throw new HttpsError('unauthenticated', 'Debes iniciar sesión para completar la compra.');
  }
  const tipo = request.data && request.data.tipo;
  if (!PRODUCTOS[tipo]) {
    throw new HttpsError('invalid-argument', 'Producto no válido.');
  }
  await otorgarAcceso(request.auth.token.email, tipo);
  return { ok: true };
});

const MODULOS_CON_EXAMEN = ['modulo2', 'modulo3', 'modulo4', 'modulo5', 'modulo6'];

/**
 * Callable desde el frontend. Recibe las respuestas que el alumno marcó y
 * devuelve si aprobó, cuántas acertó, y la clave de respuestas correctas
 * (para que el HTML pueda pintar cada opción de verde/rojo, igual que antes).
 * La clave de respuestas vive SOLO en Firestore (colección
 * examenes_respuestas, con "allow read, write: if false" — nadie la lee
 * desde el cliente, ni siquiera un alumno con sesión) y nunca se envía al
 * navegador hasta este momento, es decir, después de que el alumno ya
 * mandó sus propias respuestas.
 * Requiere sesión de Firebase Auth — así, un `curl` anónimo al HTML no
 * obtiene nada, y ya no basta con falsificar `localStorage` para calificar.
 * request.data: { modulo: 'modulo2'..'modulo6', respuestas: {q1:'A', ...} }
 */
exports.calificarExamen = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Debes iniciar sesión para enviar la evaluación.');
  }

  const modulo = request.data && request.data.modulo;
  const respuestas = request.data && request.data.respuestas;

  if (!MODULOS_CON_EXAMEN.includes(modulo)) {
    throw new HttpsError('invalid-argument', 'Módulo no válido.');
  }
  if (!respuestas || typeof respuestas !== 'object') {
    throw new HttpsError('invalid-argument', 'Respuestas no válidas.');
  }

  const doc = await db.collection('examenes_respuestas').doc(modulo).get();
  if (!doc.exists) {
    throw new HttpsError('not-found', 'No se encontró la evaluación de este módulo.');
  }

  const datos = doc.data();
  const correctas = datos.respuestas;
  const minimo = datos.minimo;
  const total = datos.total;

  let aciertos = 0;
  for (let i = 1; i <= total; i++) {
    if (respuestas['q' + i] === correctas['q' + i]) aciertos++;
  }

  return {
    aprobado: aciertos >= minimo,
    aciertos: aciertos,
    total: total,
    respuestas: correctas,
  };
});

/**
 * Revisa si un correo tiene acceso real a un módulo, combinando las dos
 * fuentes de verdad que ya existen en Firestore: `vip_users` (acceso total,
 * ver nota técnica 54) y `accesos` (compra individual o Plan Completo, ver
 * nota técnica 57 — hoy poblada por `otorgarAccesoSimulado`, más adelante
 * por `webhookStripe` cuando se conecte Stripe real).
 */
async function tieneAcceso(email, modulo) {
  const docId = email.toLowerCase();
  const [vipDoc, accesoDoc] = await Promise.all([
    db.collection('vip_users').doc(docId).get(),
    db.collection('accesos').doc(docId).get(),
  ]);
  if (vipDoc.exists) return true;
  if (accesoDoc.exists) {
    const datos = accesoDoc.data();
    return !!(datos.acceso_plan || datos['acceso_' + modulo]);
  }
  return false;
}

/**
 * Callable desde el frontend. Devuelve el HTML de la Guía y Actividades de
 * un módulo SOLO si el correo autenticado tiene acceso real (VIP o compra
 * confirmada en Firestore) — nunca antes. Así, un `curl` anónimo a
 * modulo3.html ya no obtiene el contenido de la guía, y ni siquiera un
 * alumno con sesión pero sin ese módulo pagado puede leerlo.
 * request.data: { modulo: 'modulo2'..'modulo6' }
 */
exports.obtenerContenidoModulo = onCall(async (request) => {
  if (!request.auth || !request.auth.token.email) {
    throw new HttpsError('unauthenticated', 'Debes iniciar sesión para ver este contenido.');
  }
  const modulo = request.data && request.data.modulo;
  if (!MODULOS_CON_EXAMEN.includes(modulo)) {
    throw new HttpsError('invalid-argument', 'Módulo no válido.');
  }

  const autorizado = await tieneAcceso(request.auth.token.email, modulo);
  if (!autorizado) {
    throw new HttpsError('permission-denied', 'No tienes acceso a este módulo.');
  }

  const doc = await db.collection('contenido_modulos').doc(modulo).get();
  if (!doc.exists) {
    throw new HttpsError('not-found', 'No se encontró el contenido de este módulo.');
  }

  return { guiaHtml: doc.data().guiaHtml };
});

