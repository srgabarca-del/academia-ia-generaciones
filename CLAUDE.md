# 🤖 Academia IA Generaciones — Contexto del Proyecto

> **Última actualización:** 2026-10-15 (sesión 59, CLAUDE.md condensado)
> **Instrucciones:** Este archivo es la única fuente de contexto entre chats. Al terminar una sesión, actualiza **Pendientes** y agrega **1-3 líneas** en el Historial (el detalle largo va en una nota técnica nueva, no en el historial).
> **Detalle completo:** las notas técnicas 1-109 y el historial íntegro de las sesiones 1-59 están en [docs/HISTORIAL.md](docs/HISTORIAL.md). Aquí se citan como "NT n" — búscalas ahí por número cuando necesites el cómo y el porqué completo.

---

## 📁 Datos del Proyecto
- **Repositorio:** github.com/srgabarca-del/academia-ia-generaciones (rama `main`, GitHub Pages)
- **Dominio:** iageneraciones.com (CNAME + 4 registros A en GoDaddy, HTTPS forzado, NT 90). La URL vieja srgabarca-del.github.io/academia-ia-generaciones sigue respondiendo; por eso las 5 páginas indexables llevan `<link rel="canonical">` a iageneraciones.com (NT 103)
- **Firebase:** proyecto `academia-ia-eba0b`, plan Blaze, Firestore `nam5`. Firebase CLI ya autenticado en la máquina; desplegar con `firebase deploy --only ...` (pedir permiso al usuario)
- **Producto:** curso freemium de IA para adultos mayores (60+). Módulo 1 gratis **sin registro**; Módulos 2-6 de pago (individual o Plan Completo)
- **Contacto/legal:** responsable Sergio Alejandro Abarca Medina, `hola.academiaia@gmail.com`, Morelia, Michoacán
- **Redes:** Instagram @academia.ia.gen (programado con **Metricool**), Facebook facebook.com/academia.ia.gen (**Meta Business Suite**), YouTube @academia.ia.generaciones (reels subidos como Shorts, marcados como contenido sintético). Calendario: reel lunes, carrusel miércoles, post viernes
- **Dos computadoras:** el usuario alterna entre dos PCs — correr siempre `git pull origin main` antes de empezar

---

## 👑 Emails VIP (acceso completo sin pago)
> La lista vive en la colección Firestore `vip_users` (un doc por correo en minúsculas, campo `vip:true`), **no** en el código (NT 54). Para agregar/quitar: el usuario lo hace en Firebase Console (el cliente no puede escribir ahí). Esta lista es solo referencia.
- crisjus@hotmail.com · srg.abarca@gmail.com · abarcadabra@gmail.com · mayca.ar@gmail.com · paula.abarca.rodriguez@gmail.com · gelaabarca@gmail.com · barbosamx@gmail.com · elenaatg2@gmail.com · sciotaracely@gmail.com · alsesa56@hotmail.com · swrondito@gmail.com · patylascurain@gmail.com · anita_montana5@hotmail.com

---

## 📂 Archivos principales
```
Academia_AI.html      ← Página de ventas: hero, cómo funciona, M1 gratis (con adelanto de video), herramientas, FAQ, registro opcional, precios
index.html            ← Redirige a Academia_AI.html conservando parámetros UTM
login.html            ← Login Firebase (correo/contraseña + Google popup), sincroniza accesos de Firestore; redirige a dashboard.html
dashboard.html        ← Panel del alumno: progreso, "tu siguiente paso", 6 tarjetas, Certificado Final de Graduación (NT 34, 73)
modulo1.html          ← Gratis, sin candado. Recorrido de 3 pasos + contador de embudo (NT 104-108)
modulo2-6.html        ← Premium. Guía y examen se cargan de Firestore vía Cloud Function (NT 58-60). Recorrido de 3 pasos (NT 109)
verificar.html        ← Verificación pública de certificados (?id=UUID)
legal.html            ← 8 documentos legales reales v1.0 (05/08/2026) con menú lateral; anclas #seccion y #seccion:capitulo (NT 85, 95)
terminos.html / privacidad.html ← Solo redirigen a legal.html#terminos / #privacidad
nosotros.html         ← Página del fundador ("Volver" = history.back())
tips.html             ← "Tips para ti": tips de Instagram en tarjetas propias, Shorts de YouTube y carruseles WebP (NT 106)
tips-img/             ← Imágenes WebP de los carruseles
ig/ fb/ tiktok/ wa/ invitacion/ yt/ lectura/ tips/ ← Enlaces cortos (index.html noindex que redirige con UTM)
functions/index.js    ← Cloud Functions (ver Arquitectura)
firestore.rules       ← Reglas de Firestore
sitemap.xml, robots.txt, CNAME, logo.png, favicon.png, og-image.png
docs/HISTORIAL.md     ← Notas técnicas e historial completos (archivo)
```
Fuera del repo (no subir): `Caracteristicas_Legales_Academia_IA.docx`, `Logo curso IA.png`, logos en `D:\Documentos\Claude\Logos Academia`, videos en `D:\Documentos\Claude\Videos Academia`.

---

## 🏗️ Arquitectura actual

### Firestore (colecciones y reglas)
| Colección | Quién escribe | Quién lee | Uso |
|-----------|---------------|-----------|-----|
| `accesos/{email}` | Solo Cloud Functions (Admin SDK) | El propio correo autenticado | Acceso comprado (`acceso_plan`, `acceso_moduloN`) |
| `vip_users/{email}` | Solo Consola | El propio correo autenticado | Lista VIP |
| `examenes_respuestas/{moduloN}` | Nadie (cliente) | Nadie (cliente) | Clave de respuestas M2-6 (`respuestas`, `minimo`, `total`) |
| `contenido_modulos/{moduloN}` | Nadie (cliente) | Nadie (cliente) | `guiaHtml` y `examenHtml` de M2-6 |
| `certificados/{uuid}` | Cliente `create` (validado) | `get` público por ID, `list` prohibido | Certificados verificables; `modulo:7` = Certificado Final |
| `opiniones` | Cliente `create` | Nadie (cliente) | Opiniones M1 y M6 |
| `consentimientos/{email}` | Dueño del correo, una vez | Nadie | Evidencia de aceptación de Términos/Privacidad |
| `mail` | Cliente `create` (1 destinatario, tamaños limitados) | Nadie | Dispara la extensión Trigger Email |
| `embudo_modulo1/{AAAA-MM-DD\|prueba}` | Cliente, solo +1 a un campo conocido | Nadie | Contador anónimo del embudo de M1 (NT 108) |

### Cloud Functions (`functions/index.js`, 2ª gen)
- `crearSesionPago({tipo, email, moneda})` — crea Stripe Checkout. Precios **solo en el servidor** (`PRODUCTOS[tipo].precios.{usd,mxn,eur}`); el cliente manda la moneda (validada contra lista fija), nunca el monto
- `verificarSesionPago(session_id)` — revalida contra la API de Stripe (`payment_status==='paid'`) antes de otorgar acceso; idempotente. **Nunca confiar en `?pago=exito` del query string**
- `webhookStripe` — `checkout.session.completed`, verifica firma y otorga acceso
- `calificarExamen({modulo, respuestas})` — exige sesión, califica en servidor, devuelve resultado + clave solo tras enviar
- `obtenerContenidoModulo({modulo})` — exige sesión y acceso real (`vip_users` o `accesos`), devuelve `guiaHtml` + `examenHtml`
- `obtenerCertificadosDelAlumno()` — certificados del correo autenticado (el cliente no puede listar); respaldo de "módulo completado" entre dispositivos/dominios (NT 89, 91)
- Secretos con `defineSecret`: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (llaves **Live**). Para guardarlos usar `firebase functions:secrets:set NOMBRE --data-file archivo.txt` y borrar el archivo después (el pegado en el prompt enmascarado falla en Windows, NT 86). Los secretos los teclea el usuario, nunca Claude
- `URL_SITIO = https://iageneraciones.com` (success/cancel de Stripe)
- **Patrón para sembrar/leer datos de Firestore:** función temporal de un solo uso protegida por token en la URL → desplegar → ejecutar con `curl` → verificar (idealmente releyendo en la misma respuesta) → `firebase functions:delete NOMBRE --force` y quitarla del código. No queda rastro (NT 56, 65)
- Si una función responde `functions/internal` con "Empty Authorization header" (IAM), borrarla y desplegarla limpia (NT 69)

### Pagos (Stripe, modo Live)
- Cuenta de Stripe México activa (depósitos semanales, Radar Standard, descriptor `ACADEMIA IA`), webhook "Webhook pagos - Producción"
- **Stripe México no puede cobrar tarjetas mexicanas en USD** → el alumno elige moneda y se cobra en esa moneda (NT 87). Precios fijos, redondos, revisados a mano (no automáticos):

| Producto | USD | MXN | EUR |
|----------|-----|-----|-----|
| Módulo 2 | $7 | $120 | €6 |
| Módulos 3-6 (c/u) | $9 | $160 | €8 |
| Plan Completo (pago único, incluye módulos futuros) | $29.99 | $550 | €26 |

- Modal de compra (`Academia_AI.html`): si no hay sesión, pide nombre+correo+contraseña+términos (o "Continuar con Google") y **crea la cuenta antes de ir a Stripe**; si el correo ya existe (`auth/email-already-in-use`), avisa "inicia sesión". Con sesión activa salta directo a Stripe (NT 102). No usar `fetchSignInMethodsForEmail` (no es confiable con protección de enumeración)
- Cada módulo da acceso solo a ese módulo. **No hay backfill** entre módulos (NT 35)

### Autenticación y sesión
- Firebase Auth: correo/contraseña (mín. 10 caracteres, mayúscula y número, NT 38) y Google con `signInWithPopup` + `prompt:'select_account'` (redirect fallaba por extensiones del navegador, NT 40, 77)
- `login.html` con sesión persistente: muestra aviso "Ya tienes una sesión activa como…" en vez de redirigir solo (NT 92)
- Al iniciar sesión: `esVIP()` (async, Firestore) + `sincronizarAccesoComprado()` (de `accesos` a `localStorage`) + `sincronizarCuentaAcceso(email)` (borra acceso local si cambió la cuenta, NT 17)
- Módulos 2-6: `authReadyPromise` arranca al cargar la página y se espera antes de llamar Cloud Functions (evita falso "sesión expirada", NT 62, 66). `cargarContenidoModulo()` cachea la Promise para guía y examen, y con sesión se **precarga** en segundo plano al cargar la página (oculta el arranque en frío de 3-8 s de la Cloud Function; si falla, se reintenta al abrir la guía). Alternativa descartada por costo: `minInstances: 1` (~USD 3-6/mes)
- Registro gratuito ya no envía correo de verificación ni lo exige (NT 18, 96)

### Correo automático
- Extensión oficial **Trigger Email from Firestore** (`firebase/firestore-send-email`), Gmail SMTP con `hola.academiaia@gmail.com` (contraseña de aplicación como secreto), colección `mail`. En el instalador, "nam5" = **"Multi-region (United States)"** (NT 104)
- M1 envía "¡Terminaste el Módulo 1!" **después** de que el certificado quedó guardado (encadenado con `.then`, NT 104)

### Medición
- Firebase Analytics `G-FJR421N496`, solo con consentimiento (CookieConsent v3.1.0, `localStorage`, 182 días). Eventos siempre vía `logEventoAnalytics()` que revisa el consentimiento (NT 41, 76)
- Contador propio sin cookies: `embudo_modulo1` (NT 108), pasos `entrada`, `video_terminado`, `primera_conversacion` (primer "Copiar" de la Actividad 1, desde sesión 65), `guia_terminada`, `evaluacion_abierta`, `aprobado`, `certificado`. Desde localhost escribe en el doc `prueba`
- Enlaces cortos con UTM (sesión 58): `/ig` instagram·bio, `/fb` facebook·pagina, `/tiktok` tiktok·bio, `/wa` whatsapp·grupos, `/invitacion` whatsapp·directo, `/yt` youtube·academia, `/lectura` youtube·prolalectura (canal personal del usuario), `/tips` → tips.html. Cada página de enlace corto lleva sus etiquetas Open Graph (logo y descripción): sin ellas WhatsApp solo mostraba el título. Formato largo: `https://iageneraciones.com/?utm_source=…&utm_medium=social|email&utm_campaign=…`. Ver en GA → Adquisición de tráfico
- Google Search Console verificado (DNS) y `sitemap.xml` enviado (NT 97)

---

## 🔐 Almacenamiento en el navegador
**`localStorage`** (sobrevive a "Salir"): `acceso_plan`, `acceso_moduloN`, `moduloN_completado`, `cuenta_acceso` (correo dueño del acceso local), `moduloN_cert_id` / `moduloN_cert_synced`, `autosave_moduloN_gX` (autoguardado de la guía), `moduloN_paso_video` / `moduloN_paso_guia`, M1: `modulo1_examen_aprobado`, `modulo1_alumno_nombre/email/fecha`, `modulo1_correo_enviado`, `embudo_m1_<evento>`, `cc_cookie` (consentimiento).
**`sessionStorage`** (transitorias, se repueblan al iniciar sesión; `cerrarSesion()` hace `sessionStorage.clear()`): `alumno_nombre`, `alumno_email`, `pago_email`, `ir_a` (abre el modal de compra de ese módulo en `Academia_AI.html#planes-pago`), `firebase_uid`.
- `localStorage` es solo caché/UX: la fuente de verdad del acceso es Firestore + Cloud Functions. Con sesión, el panel usa Firestore como verdad en ambas direcciones (excepto M1, que puede completarse sin cuenta, NT 91 + sesión 55)
- El nav de `Academia_AI.html` muestra "👤 Mi cuenta" solo si hay `sessionStorage.alumno_email` (NT 37)

---

## 🛡️ Reglas que no se deben romper
1. **Nunca otorgar acceso al módulo siguiente al aprobar un examen.** Al aprobar solo se marca `moduloN_completado`; el botón "Ir al Módulo N+1" depende de `acceso_plan`/`acceso_moduloN+1` ya existentes (NT 7)
2. **Nunca otorgar acceso al módulo anterior** desde los botones "← Volver" (NT 35)
3. **Precios y acceso solo en el servidor.** El cliente nunca manda montos; el acceso lo escribe solo el Admin SDK tras verificar el pago con Stripe
4. **Contenido de pago (guía, preguntas, respuestas de M2-6) nunca en el HTML estático**: vive en Firestore detrás de Cloud Functions. Si se agrega un módulo, seguir el mismo patrón (NT 56-60)
5. **No manejar credenciales del usuario**: llaves de Stripe, contraseñas de app, etc. las teclea el usuario en su terminal/consola
6. **Certificado de M1 solo con identidad real**: `modulo1_completado` se marca solo al mostrar el certificado con nombre/correo confirmados (NT 105). El certificado del M6 es de módulo; el Certificado Final (modulo 7) vive en `dashboard.html` y exige los 6 completados (NT 73)
7. **Analytics solo con consentimiento** (`logEventoAnalytics`)
8. Elementos clicables que no son enlaces de navegación → `<button>` (no `<div onclick>`), con `aria-expanded` si son acordeones (NT 25, 71)
9. No inventar testimonios: solo opiniones reales de `opiniones` (con permiso explícito para publicarlas)

---

## 🎨 Diseño
**Paleta unificada** (variables en `:root` de Academia_AI, login, legal y modulo1-6; NT 61):
| Variable | Color | Uso |
|----------|-------|-----|
| `--color-primario` | #4527A0 púrpura | Botones/CTAs, "Ir al Módulo N+1" |
| `--color-secundario` | #083042 navy | Nav, fondos oscuros, "← Volver" |
| `--color-acento` | #FFD740 amarillo | Borde de certificados, estrellas, enlaces sobre fondo oscuro |
| `--color-neutro-oscuro` | #212121 | Texto |
| `--color-neutro-claro` | #F5F5F5 | Fondos claros |
| `--color-error` | #C62828 | Errores, Guía Antiestafas (M6) |

**Badge de cada módulo** (único lugar con color propio): M2 #00897B/fondo #E0F2F1/texto #00695C · M3 #C2185B/#FCE4EC · M4 #1565C0/#E3F2FD · M5 #6A1B9A/#F3E5F5 · M6 #2E7D32/#E8F5E9. El HTML de guías en Firestore aún usa hex propios (limpieza pendiente de baja prioridad, NT 65).

**Accesibilidad y tipografía:** Atkinson Hyperlegible 400/700 (`line-height` 1.6 base, 1.7 en texto largo, NT 47); texto de guías en `#000000` (NT 24); skip-link "Ir al contenido" → `#main`, `:focus-visible` azul `#0D47A1` (NT 48); modales con Escape, clic en fondo, focus trap y foco de regreso (`AccesibilidadModal`, NT 42); SVG inline de Heroicons con `currentColor` en badges y "Cómo funciona" (NT 72); formularios con `autocomplete`/`inputmode` (NT 46).

**Layout:** nav responsivo con menú ☰ (logo corto "Academia IA" y enlaces dentro de `.nav-links`); en `Academia_AI.html` el quiebre a ☰ es **1470px** (8 enlaces); en módulos 600px (NT 50, 81, 106). Franja `.footer-social-bar` dentro del footer (no fija): 🍪 Cookies + píldoras Facebook/YouTube/Instagram (solo íconos en móvil). Sin botón de WhatsApp (retirado, NT 68). Botón flotante "🎁 Empieza gratis" se oculta al ver `#registro` o el footer.

**Logo/compartir:** `logo.png` 200×200 (ícono), `favicon.png` 64×64 en todas las páginas, `og-image.jpg` (1200×1098, 123 KB) para Open Graph en todas las páginas que se comparten, incluidos los enlaces cortos (NT 88). Se pasó de PNG de 346 KB a JPG porque WhatsApp no muestra imágenes de más de ~300 KB; `og-image.png` se queda como original.

---

## 📘 Contenido del curso

### Recorrido de cada módulo (NT 107, 109)
① Ve el video → ② Practica con la guía → ③ Evaluación y certificado. Indicador `<ol class="pasos">`, anclas `#paso-video/#paso-guia/#paso-eval`, botón "Continuar al Paso 2" al terminar el video (+ enlace manual por si el evento no llega), botón "Ya terminé la guía → Paso 3". Progreso 15→30→40→60→75→100%. En M1 el botón "Continuar al Módulo 2" aparece solo tras emitir el certificado. Nada bloquea saltarse pasos.
- Guías = HTML rellenable con autoguardado (`activarAutoguardadoGuia()`); M2-4 (y Actividad 2 de M3) tienen caja de "prompt compilado" con botón Copiar (NT 83-84)
- M1 tras el certificado: opinión (estrellas + permiso de publicar), ejemplo antes/después de prompt, chips de interés, nota del fundador (NT 93)
- M6: Guía Antiestafas (incluye llamadas con voz clonada) y caja de opinión con temas de interés
- Videos embebidos con la YouTube IFrame API. Si "no se reproduce embebido", probar primero con un video de control y en incógnito: suele ser una extensión del navegador (NT 100)

### Respuestas correctas (7 preguntas, mínimo 5 en todos)
| Módulo | Respuestas | Dónde vive |
|--------|-----------|-----------|
| 1 | q1:A, q2:C, q3:D, q4:B, q5:A, q6:C, q7:C (renovado en sesión 65) | `modulo1.html` |
| 2 | q1:C, q2:B, q3:D, q4:A, q5:C, q6:B, q7:A (renovado en sesión 65) | Firestore `examenes_respuestas` |
| 3 | q1:C, q2:A, q3:B, q4:D, q5:B, q6:C, q7:D (renovado en sesión 65) | Firestore |
| 4 | q1:C, q2:A, q3:D, q4:B, q5:A, q6:D, q7:B (renovado en sesión 65) | Firestore |
| 5 | q1:B, q2:A, q3:C, q4:D, q5:A, q6:B, q7:C (renovado en sesión 65) | Firestore |
| 6 | q1:B, q2:D, q3:A, q4:C, q5:B, q6:D, q7:B (renovado en sesión 65) | Firestore |

### Videos
| Módulo | URL | Duración aprox. |
|--------|-----|-----|
| 1 | https://www.youtube.com/watch?v=k4DXSfIYGUo (propio, "¿Qué es la IA?", HyperFrames, voz IA; también es el adelanto de Academia_AI.html, que se pausa a los 18.5 s, al terminar "…y hasta dibujar") | ~1 min |
| 2 | https://www.youtube.com/watch?v=6TvZm1D0W6I | ~20 min |
| 3 | https://www.youtube.com/watch?v=kesSRLD-UHI | ~10 min |
| 4 | https://www.youtube.com/watch?v=vpNqY5M1kqs | ~4 min |
| 5 | https://www.youtube.com/watch?v=bmpeIKXymOc (Gemini Storybook, enlace gemini.google.com/gem/storybook) | ~8 min |
| 6 | https://www.youtube.com/watch?v=nkkhU_ZuC98 | ~6 min |

Herramientas enseñadas (grid de `Academia_AI.html`): ChatGPT, Gemini, Copilot, Meta AI, Canva, Google Docs, YouTube.

### Tips para ti (NT 106)
Shorts conectados: 3 señales de una estafa `02iAbCZ7Fcw` (etiqueta "🎙️ Voz creada con IA"), cómo abrir ChatGPT `RRMU0CLVfnU`, WhatsApp cumpleaños `mnx2pCt-rQc`, chilaquiles `Co6YnTVuWr0`, primera imagen `t1sESUgXRx8`, mensaje falso `yxBO0xeiuUs`, El nuevo pincel de Elena `gZNwctdYVWQ`. Medios por atributos `data-yt="ID"` (iframe youtube-nocookie solo al tocar ▶) y `data-imgs="tips-img/…webp,…"`. Para agregar tips nuevos, seguir el comentario HTML de instrucciones dentro de `tips.html`.

---

## 🔧 Pendientes activos
- [ ] **Semana 8 en `tips.html`** (sección 🎨 Crear con IA): las 3 tarjetas ya están subidas, ocultas en comentarios `<!-- PUBLICAR dd/10 … FIN dd/10 -->`; sus imágenes (`cuento-1..7.webp`, `dia-muertos-1.webp`) siguen **sin subir, solo en la PC donde se hicieron** — agregarlas al commit de su fecha. Reel del 26/10 **ya publicado** en tips.html (Short gZNwctdYVWQ). Carrusel del 28/10 **ya publicado** (`tips-img/cuento-1..7.webp`). Falta: post Día de Muertos **viernes 30/10** (`tips-img/dia-muertos-1.webp`). En cada fecha, cuando el usuario avise: quitar las dos líneas del comentario de esa tarjeta, commit y push. No decir "Storybook" en lo público: el nombre/atajo se reserva para el M5 (decisión del usuario, 22/10)
- [ ] **Medir el M1 renovado:** comparar en `embudo_modulo1` `entrada` → `primera_conversacion` → `certificado` en las próximas semanas
- [ ] Decidir si se quita también "Duración: 45–60 min" del encabezado de `modulo4.html` (solo se quitó el tiempo del Paso 2)
- [ ] **Semana 9 (desde el 2/11) con la estrategia nueva a prueba 4 semanas** (análisis del 24/10: reels/Shorts rinden 30-50x en FB y YouTube; en IG todo empata): lunes reel fuerte (HyperFrames), miércoles carrusel, **viernes reel corto sencillo** (15-20 s, grabación del celular o tip) en lugar del post de imagen; si no hay reel, dato curioso con pregunta. Receta: abrir con el consejo, mostrar el resultado, poca promoción. Volver a medir a fines de noviembre
- [ ] **Reel semana 9 (lunes 2/11):** video listo en `Videos AcademiaReel sem 9Reel_Sem_9_final.mp4` (45 s, personajes Doña Carmen y Diego generados por IA por el usuario + voz Dora + música Suno; proyecto HyperFrames en `Reel sem 9proyecto`). Falta: que el usuario lo programe/publique (marcar contenido creado con IA), subirlo como Short y agregar su tarjeta en `tips.html` cuando dé el ID. Texto de la publicación en `Videos AcademiaGuion_Reel_Sem_9.md`
- [ ] **Primer depósito de Stripe:** confirmar que llegó a la cuenta bancaria (depósitos semanales). El usuario quería verlo antes de anunciar el sitio
- [ ] **Comprobar avance para la Política de Reembolsos** (sin implementar): registrar eventos clave por correo en Firestore para revisar casos a mano (pendiente abierto en sesión 32)
- [ ] **Aviso de Privacidad 5.2** menciona "progreso dentro del curso"; el sitio solo guarda señales binarias. Decidir con el usuario si se ajusta (NT 85)
- [ ] **Limpieza en Firestore (cuando el usuario quiera, desde la Consola):** certificados de prueba ("Alumno", "María de Prueba", "María Prueba González"), ~8 docs de prueba en `mail`, doc `prueba` en `embudo_modulo1`
- [ ] Baja prioridad: pasar los hex de las guías en Firestore a la paleta unificada (NT 65)
- Video de bienvenida del curso: descartado por ahora (decisión del usuario, 21/10)
- Ideas discutidas, no decididas: pasar todo a gratis con donaciones; contador de alumnos en la página de ventas (pospuesto, un número chico resta credibilidad)

---

## 🧰 Notas operativas
- **Probar en local:** `serve` (config `academia-ia-static`, puerto 5500 en `.claude/launch.json`) quita `.html` y el query string, y crea un bucle en `/tips`. Para probar `?id=`, `?pago=` o `/tips` usar `npx http-server -p 5601 -s` (sin reescritura). GitHub Pages no tiene ese problema
- **No escribir en Firestore real al probar:** simular Firestore/Functions en la página o reemplazar `asegurarCertificadoVerificable`/`enviarCorreoFinalizacionModulo1` durante la prueba
- **Limitaciones conocidas del navegador de pruebas:** capturas con timeout intermitente, `:focus`/`transform` computados no aplican, Enter simulado no activa botones, reproductores de YouTube no fiables. Verificar con `getComputedStyle`, `.click()`, lectura del DOM; Claude in Chrome sirve para servidores locales reales
- **Verificar JS:** extraer los bloques `<script>` inline y correr `node --check` (o `new Function`)
- `modulo1.html` y `modulo2.html` usan saltos de línea CRLF; el resto LF (ojo en scripts de reemplazo)
- Para reemplazos masivos con Node: excluir la línea donde se declara la variable (bug de auto-referencia en `:root`, NT 61) y enmascarar regiones que no deben tocarse
- **GitHub Pages atorado** (`Deployment failed` / Queued): esperar a githubstatus.com y forzar un commit nuevo (`git commit --allow-empty`); cancelar el run no funciona
- Esta máquina no tiene Python, pandoc ni LibreOffice. Sí: Node, `npx sharp-cli` (imágenes), FFmpeg (instalado en sesión 57), `pdftotext` de Git Bash
- Crédito de prueba de Google Cloud vence 19/10/26; después sigue en Blaze cobrando solo lo que exceda las cuotas gratis. Alerta de presupuesto: $100 MXN/mes (50/90/100%)
- `samuelcejamolina@gmail.com` y `dobleuconstrucciones@gmail.com` son cuentas del propio usuario (pruebas; sus compras del M6 del 3/8 fueron las pruebas de pago real): no contarla como alumno ni como compra real al revisar Auth/`accesos`
- YouTube: el número del usuario ya no verifica canales nuevos (ver memoria `canales-youtube-usuario`)

---

## 🗓️ Historial de sesiones (resumen)
> Detalle completo de cada sesión en [docs/HISTORIAL.md](docs/HISTORIAL.md).

- **Jun–Jul 2026 (s1-11):** CLAUDE.md maestro; correcciones de M2-M6 (JS duplicado roto, restaurar "completado", respuestas erróneas en M5/M6), bug de seguridad de auto-otorgar el módulo siguiente (NT 7), botón Salir y `@media print`, botones de nav entre módulos, VIP en registro, cambio de computadora y trucos para GitHub Pages atorado
- **13/7 (s12):** sitio 100% adultos mayores; guías como HTML rellenable; videos embebidos; acceso a `localStorage` + `sincronizarCuentaAcceso`; Plan Completo de pago único; opiniones en Firestore; renombre a `Academia_AI.html`; backend de Stripe preparado
- **16/7 (s13-14):** letra y contraste más grandes; auditoría pedagógica (M1 a 7 preguntas, voz clonada en M6, preguntas de aplicación, autoguardado); Firebase Analytics; FAQ accesible por teclado
- **17-20/7 (s15-16):** `legal.html`; rebranding navy; diagnóstico general sin bugs; limpieza de archivos; Stripe desplegado en modo prueba
- **22-24/7 (s17-33):** logo; dashboard; fuga de backfill entre módulos corregida; selector de moneda; contraseña de 10 caracteres; Google sign-in (popup); banner de cookies; modales accesibles; certificados verificables con QR y `verificar.html`; Atkinson Hyperlegible; auditoría WCAG
- **28-29/7 (s34-45):** nav responsivo; VIP a Firestore; respuestas, guías y preguntas de examen a Firestore (gateo real de contenido); paleta de 6 variables; grid de herramientas con Meta AI; WhatsApp retirado
- **30/7–7/8 (s46-50):** Stripe real conectado y pasado a Live; limpieza de datos de prueba; consentimientos; Certificado Final en el dashboard; M2 a 7 preguntas; menú de secciones; 8 documentos legales reales; cobro en moneda local (MXN para tarjetas mexicanas), compra real confirmada; logo nuevo + favicon + Open Graph; respaldo de "completado" en Firestore; dominio iageneraciones.com
- **14-26/8 (s51-56):** dashboard con Firestore como verdad; plan de conversión M1→M2; SEO y Search Console; precios después del registro; modal de compra crea cuenta antes de Stripe; canonical; **M1 sin registro** con datos solo al certificado + correo automático; fix de certificados a nombre de "Alumno"
- **27/9–12/10 (s57-58):** Instagram en el footer; showreel de 30 s (fuera del repo); revisión de Analytics; UTM conservados en `index.html`; enlaces cortos por canal
- **14/10 (s59):** `tips.html` con Shorts y carruseles; recorrido de 3 pasos en los 6 módulos; contador `embudo_modulo1`; canal de YouTube configurado; Facebook/YouTube en el footer; `/yt` y `/lectura`
- **15/10 (s59, cont.):** CLAUDE.md condensado; detalle movido a `docs/HISTORIAL.md`
- **16-17/10 (s60):** reel semana 7 hecho con HyperFrames (fuera del repo, `Videos Academia\Reel Sem 7`); tarjetas del reel y del carrusel de estafas agregadas a `tips.html` (reel publicado el 19/10; carrusel publicado el 21/10)
- **22/10 (s62):** reel semana 8 "El nuevo pincel de Elena" (cuento de Gemini Storybook del usuario, adelanto del M5) hecho con HyperFrames en `Videos Academia\Reel Sem 8`; ilustraciones sueltas en `Carrusel Instagram\Reel Sem 8\ilustraciones`
- **20/10 (s61):** VIP nuevo: anita_montana5@hotmail.com (ya dado de alta en Firestore `vip_users` por el usuario)
- **23/10 (s64):** revisión de números para la decisión gratis+donación: 28 días ≈40 sesiones en GA, Search Console 5 clics/82 impresiones en 2+ meses ("Duplicada sin canónica" ya validada como Correcto), embudo M1 sin registros desde el 18/10, ninguna compra de alumnos reales (las 2 de `accesos` son del usuario). Decisión pospuesta: primero más contenido en redes. Metricool: IG ~15 seguidores, alcance medio ~10 por post; el único que salió de seguidores fue el reel chilaquiles (16/9, 160 alcance); FB 1-8 por post
- **24/10 (s65):** **M4 renovado** en Firestore: guía de 5 secciones (voz, foto, encargo, planear, salud/dinero con cuidado, lista "Lo logré") con campos `modulo4_n1..n15`, `modulo4_c1..c5` y `modulo4_p_identidad/intencion/instrucciones` (caja de Copiar), y examen de 7 casos prácticos con clave nueva; quitado el tiempo del Paso 2. Respaldo del M4 anterior en `D:\Documentos\Claude\Respaldo_M4_firestore_2026-10-24.json` (fuera del repo). Propuesta de M2/M3/M6 escrita, pendiente de decisiones
- **24/10 (s65, cont.):** **M1 más atractivo** (`modulo1.html`): Actividad 1 "Tu primera plática con la IA" al inicio de la guía (3 preguntas con botón Copiar + respaldo `execCommand`, casilla con festejo), guía de ~17 campos a 5 opcionales + casillas (IDs nuevos `modulo1_n1..n5`, `modulo1_c1..c6`), recuadro "Hoy vas a lograr", sin tiempos, examen de casos de la vida diaria, tarjeta a `tips.html` en lugar del especial de RTVE, y corregido el comentario roto que mostraba "y cambia el ID de YouTube". Regla de Firestore desplegada con el paso nuevo `primera_conversacion`
- **24/10 (s65, cont.):** **M5 renovado**: la guía ahora enseña Storybook paso a paso (antes no lo mencionaba aunque el video sí), con "El nuevo pincel de Elena" como ejemplo (`img-guias/m5-elena-portada.webp` y `m5-elena-pagina.webp`, públicas en el repo) y el aviso del usuario: al reabrir un cuento a veces no salen las ilustraciones hasta pedir "Vuelve a generar las ilustraciones". Actividad 2 = "La historia de mi familia"; examen nuevo. Respaldo en `D:\Documentos\Claude\Respaldo_modulo5_firestore_2026-10-24.json`. Con esto, los 5 módulos de pago quedaron revisados
- **24/10 (s65, cont.):** arreglado Analytics en módulos 2-5 (faltaba el SDK `firebase-analytics-compat`; solo se medían Academia_AI, login, dashboard, M1 y M6)
- **24/10 (s65, cont.):** **M2, M3 y M6 renovados** en Firestore según `D:\Documentos\Claude\Propuesta_M2_M3_M6.md`: M2 con sección de voz (como el video) y metáfora del pastel; M3 con recuadros "no son fotos reales"/"fotos de niños" y actividad de tarjeta (`modulo3_g14/g15`); M6 con los 4 hábitos del carrusel, Google Lens, 3 tarjetas de noticias (`modulo6_g12-14`) y casillas `g10/g11`. Se conservaron los IDs de campos existentes. Exámenes de casos prácticos con claves nuevas; sección 1 del M4 ya remite al M2. Tiempo del Paso 2 quitado en M2/M3/M6. Respaldos previos en `D:\Documentos\Claude\Respaldo_moduloN_firestore_2026-10-24b.json`
- **24/10 (s66):** **video propio del M1** "¿Qué es la IA? Explicado en un minuto" (HyperFrames, `Videos Academia\Video M1`, cierre en el azul del logo #01223B como los reels, audio a −15.8 LUFS) publicado en YouTube `k4DXSfIYGUo` y puesto en `modulo1.html` y en el adelanto de `Academia_AI.html` (corte a 18.5 s; logo de YouTube tapado también en `modulo1.html`, NT 101). Antes era `V-cZbZtjpeY` de terceros. Enlace de la descripción sin https hasta verificar el canal para enlaces externos
- **28/10 (s67):** carrusel del cuento publicado en tips; **reel semana 9** hecho: el usuario generó 4 clips de 10 s con personajes IA usando prompts con un bloque fijo de personajes/ambiente (`Videos AcademiaPrompts_Reel_Sem_9_personajes.md`), y se montaron en HyperFrames con voz, subtítulos, apoyos y tarjeta final. El generador puso "PIXAR" en la tele: tapado con la banda del gancho (revisar siempre marcas en clips generados)
- **26/10 (s67):** vista previa con logo al compartir `/wa`, `/invitacion` y demás enlaces cortos (les faltaban las etiquetas Open Graph); imagen para compartir en `og-image.jpg` ligera
- **23/10 (s63):** enlace "💡 Ver tips gratis" del hero pasado a botón con contorno amarillo (`.btn-tips`, ancho completo en móvil); publicada la tarjeta "palabra clave" (post semana 7) en `tips.html`
