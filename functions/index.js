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
