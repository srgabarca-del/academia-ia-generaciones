# Guía de despliegue — Pagos reales con Stripe

Este código está **preparado pero NO desplegado**. Mientras no completes estos
pasos, el sitio sigue funcionando como hasta ahora (pago simulado). Nada de
esto afecta al sitio en vivo hasta que tú actives cada pieza.

## Antes de empezar

- [ ] 1. Activar el **plan Blaze** de Firebase (pago por uso, con capa gratuita
  mensual generosa — para este proyecto probablemente no pagarás nada la
  mayoría de los meses). Se activa en:
  Firebase Console → tu proyecto `academia-ia-eba0b` → ⚙️ Configuración del
  proyecto → Uso y facturación → Modificar plan → Blaze.
- [ ] 2. Crear una cuenta de Stripe en https://dashboard.stripe.com/register
  (gratis). Puedes trabajar primero en **modo de prueba** (test mode) sin
  poner tus datos bancarios reales — Stripe te deja probar todo el flujo con
  tarjetas de prueba antes de activar cobros reales.
- [ ] 3. Instalar Node.js 20 y Firebase CLI si no los tienes:
  ```
  npm install -g firebase-tools
  ```
- [ ] 4. Iniciar sesión:
  ```
  firebase login
  ```

## Configurar las llaves de Stripe

En tu Dashboard de Stripe (modo de prueba primero):
- **Developers → API keys** → copia la "Secret key" (empieza con `sk_test_...`)
- Guárdala en Firebase (nunca la pegues en ningún archivo del proyecto):
  ```
  firebase functions:secrets:set STRIPE_SECRET_KEY
  ```
  (te pedirá pegar el valor y presionar Enter)

El **webhook secret** lo obtienes después de crear el webhook (siguiente
sección) — Stripe te lo genera junto con el endpoint.

## Instalar dependencias y desplegar

```
cd functions
npm install
firebase deploy --only functions,firestore:rules
```

Al terminar, la terminal imprime la URL pública de `webhookStripe`, algo como:
```
https://us-central1-academia-ia-eba0b.cloudfunctions.net/webhookStripe
```

## Crear el webhook en Stripe

1. Ve a **Developers → Webhooks → Add endpoint** en tu Dashboard de Stripe.
2. Pega la URL de `webhookStripe` que imprimió `firebase deploy`.
3. Selecciona el evento `checkout.session.completed`.
4. Guarda — Stripe te muestra un "Signing secret" (empieza con `whsec_...`).
5. Guárdalo en Firebase:
   ```
   firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
   ```
6. Vuelve a desplegar para que la función tome el nuevo secreto:
   ```
   firebase deploy --only functions
   ```

## Probar antes de ir a producción

Con las llaves en modo de prueba (`sk_test_...` / `whsec_...` de test),
usa una tarjeta de prueba de Stripe (ej. `4242 4242 4242 4242`, cualquier
fecha futura, cualquier CVV) para confirmar que:
- Se crea la sesión de pago correctamente
- Al completar el pago de prueba, aparece un documento nuevo en
  Firestore → colección `accesos` → documento con el email usado, con
  el campo `acceso_moduloN` (o `acceso_plan`) en `true`

## Pasar a producción

Cuando todo funcione en modo de prueba:
1. En Stripe, activa tu cuenta (completa los datos fiscales/bancarios que te
   pida) y cambia del modo de prueba al modo real.
2. Repite el paso de guardar `STRIPE_SECRET_KEY` y crear el webhook, pero
   ahora con las llaves que empiezan con `sk_live_...` / `whsec_...` reales.

## Estado actual (sesión 46)

El frontend (`Academia_AI.html`) ya llama a `crearSesionPago` y redirige a
Stripe Checkout de verdad — el formulario de tarjeta simulado y el puente
`otorgarAccesoSimulado` se eliminaron. Al volver de Stripe (`success_url`),
la página llama a `verificarSesionPago` (verifica el pago contra la propia
API de Stripe usando el `session_id`, nunca confía en el query string por sí
solo) antes de otorgar cualquier acceso.

`login.html` también sincroniza `accesos/{email}` de Firestore hacia
`localStorage` en cada inicio de sesión (Google, correo/contraseña, y sesión
ya iniciada), así que una compra hecha en un dispositivo se refleja al
iniciar sesión en otro — esto cierra el pendiente de migrar el control de
acceso fuera de `sessionStorage`/`localStorage` como única fuente de verdad
en el navegador que hizo la compra.

**Sigue en modo de prueba de Stripe** — para pasar a cobros reales, sigue la
sección "Pasar a producción" de arriba (activar la cuenta de Stripe y
cambiar las llaves a `sk_live_...`/`whsec_...`). No hace falta tocar más
código para eso, solo las llaves.
