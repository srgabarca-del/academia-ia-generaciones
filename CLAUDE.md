# 🤖 Academia IA Generaciones — Contexto del Proyecto

> **Última actualización:** 2026-07-01 (sesión 6)
> **Instrucciones:** Al abrir un nuevo chat, sube este archivo y di: *"Este es el contexto de mi proyecto, continúa desde aquí"*. Al terminar la sesión, actualiza las secciones de Estado y Pendientes.

---

## 📁 Datos del Proyecto
- **Repositorio GitHub:** github.com/srgabarca-del/academia-ia-generaciones
- **GitHub Pages URL:** srgabarca-del.github.io/academia-ia-generaciones
- **Firebase proyecto:** academia-ia-eba0b
- **Tipo:** Curso freemium de IA (Módulo 1 gratis, Módulos 2-6 de pago)

---

## 👑 Emails VIP (acceso completo sin pago)
- crisjus@hotmail.com
- tiosergio98@hotmail.com
- srg.abarca@gmail.com

---

## 📂 Estructura de archivos principales
```
modulo1.html                    ← Módulo gratuito
modulo2.html                    ← Premium
modulo3.html                    ← Premium
modulo4.html                    ← Premium
modulo5.html                    ← Premium
modulo6.html                    ← Premium (FINAL)
academia_ia_pagina_ventas.html  ← Página de ventas / registro / confirmación de compra
login.html                      ← Página de inicio de sesión (Firebase Auth real: email+contraseña, VIP, recuperar contraseña)
CLAUDE.md                       ← Este archivo de contexto
```

---

## 🔐 Sistema de Acceso (sessionStorage)
| Clave | Descripción |
|-------|-------------|
| `acceso_plan` | Usuario tiene plan mensual completo |
| `acceso_modulo2` | Acceso individual al módulo 2 |
| `acceso_modulo3` | Acceso individual al módulo 3 |
| `acceso_modulo4` | Acceso individual al módulo 4 |
| `acceso_modulo5` | Acceso individual al módulo 5 |
| `acceso_modulo6` | Acceso individual al módulo 6 |
| `alumno_nombre` | Nombre del alumno logueado |
| `alumno_email` | Correo del alumno registrado en el Módulo 1 gratuito |
| `email_verificado` | Estado de verificación de correo del registro gratuito: `pendiente` o `si` |
| `pago_email` | Correo usado en la compra de un módulo individual o el plan mensual |
| `pago_archivo` | Archivo del módulo comprado (ej. `modulo3.html`), usado para redirigir tras el pago |
| `modulo2_completado` | Módulo 2 aprobado |
| `modulo3_completado` | Módulo 3 aprobado |
| `modulo4_completado` | Módulo 4 aprobado |
| `modulo5_completado` | Módulo 5 aprobado |
| `modulo6_completado` | Módulo 6 aprobado |

### Lógica VIP
Al hacer login, detectar email VIP y guardar:
```javascript
sessionStorage.setItem('acceso_plan', '1');
sessionStorage.setItem('acceso_modulo2', '1');
sessionStorage.setItem('acceso_modulo3', '1');
sessionStorage.setItem('acceso_modulo4', '1');
sessionStorage.setItem('acceso_modulo5', '1');
sessionStorage.setItem('acceso_modulo6', '1');
```

---

## 🎨 Colores por módulo
| Módulo | Color principal | Color secundario |
|--------|----------------|-----------------|
| 2 | #00897B | #6C3FC4 |
| 3 | #C2185B | #E91E63 |
| 4 | #1565C0 | #1976D2 |
| 5 | #6A1B9A | #7B1FA2 |
| 6 | #2E7D32 | #388E3C |

---

## ✅ Respuestas correctas de evaluaciones
| Módulo | Preguntas | Mínimo para aprobar | Respuestas |
|--------|-----------|---------------------|------------|
| 2 | 5 | 4 | q1:C, q2:A, q3:D, q4:C, q5:A |
| 3 | 7 | 5 | q1:A, q2:C, q3:B, q4:D, q5:C, q6:B, q7:D |
| 4 | 7 | 5 | q1:B, q2:C, q3:A, q4:D, q5:B, q6:C, q7:A |
| 5 | 7 | 5 | q1:C, q2:A, q3:D, q4:B, q5:C, q6:A, q7:D |
| 6 | 7 | 5 | q1:B, q2:D, q3:D, q4:A, q5:B, q6:D, q7:D |

---

## 🎬 Videos por módulo
| Módulo | Audiencia | URL |
|--------|-----------|-----|
| 2 | Niños | https://www.youtube.com/watch?v=UKncFg0PyEk |
| 2 | Adultos | https://www.youtube.com/watch?v=6TvZm1D0W6I |
| 3 | Niños | https://www.youtube.com/watch?v=6kYZNrztJWM |
| 3 | Adultos | https://www.youtube.com/watch?v=kesSRLD-UHI |
| 4 | Niños | https://www.youtube.com/watch?v=Eof398WSUwo |
| 4 | Adultos | https://www.youtube.com/watch?v=vpNqY5M1kqs |
| 5 | Niños | https://www.youtube.com/watch?v=K0YntGeHD00 |
| 5 | Adultos | https://www.youtube.com/watch?v=Gsv7VkWQNwA |
| 6 | Niños | https://www.youtube.com/watch?v=SD9K8Pfogzc |
| 6 | Adultos | https://www.youtube.com/watch?v=nkkhU_ZuC98 |

---

## 📋 Estado actual de cada archivo
| Archivo | Estado | Notas |
|---------|--------|-------|
| `modulo1.html` | ✅ Listo | Reemplazado el placeholder `Material_Alumno_Modulo1.docx` por el PDF real `guia_modulo1_imprimible.pdf`. ✅ `cerrarSesion()` corregido: ahora redirige a `academia_ia_pagina_ventas.html`. ✅ Agregada regla `@media print`. ✅ **(sesión 6) Corregido bug de VIP:** el botón "Continuar al Módulo 2" ya no manda siempre a pagos — ahora revisa `acceso_plan`/`acceso_modulo2` primero y va directo a `modulo2.html` si ya tiene acceso |
| `modulo2.html` | ✅ Listo | Popup eliminado, respuestas mezcladas, restaura estado "completado" al revisitar. ✅ Agregado botón "Salir". ✅ Corregido bug de seguridad: al aprobar el examen ya NO se otorga `acceso_modulo3` automáticamente. ✅ Agregada regla `@media print`. ✅ **(sesión 6) Corregido bug real reportado por el usuario:** el botón "Comprar Módulo 3" (`mostrarAccesoMod3()`) era un `<a href>` plano que nunca guardaba `ir_a` en sessionStorage, por lo que el formulario de pago nunca se abría automáticamente en la página de ventas. Ahora es un botón que llama a `comprarModulo3()`, que guarda `ir_a='modulo3'` antes de navegar — mismo patrón de modulo3/4/5.html |
| `modulo3.html` | ✅ Listo | PDF real embebido, botón "Volver a M2" con acceso defensivo, restaura estado "completado". Botón de descarga de PDF reubicado entre tarjetas y evaluación. Botón "Salir" ya estaba. ✅ **Corregido el mismo bug de seguridad:** al aprobar el examen ya NO se otorga `acceso_modulo4` automáticamente (antes decía "FIX 3: Desbloquear Módulo 4 al aprobar", pero en realidad regalaba el módulo). ✅ Agregada regla `@media print` para el certificado |
| `modulo4.html` | ✅ Listo | JS reparado (sesión 3), botón de descarga, acceso defensivo al volver a M3, restauración de estado completado. ✅ Agregado botón "Salir". ✅ Agregada regla `@media print` para el certificado. Revisado: NO tenía el bug de auto-otorgar acceso al módulo siguiente (ya estaba bien) |
| `modulo5.html` | ✅ Listo | JS reparado (sesión 3), botón de descarga, acceso defensivo al volver a M4, restauración de estado completado. ✅ Agregado botón "Salir". ✅ Agregada regla `@media print` para el certificado. Revisado: NO tenía el bug de auto-otorgar acceso al módulo siguiente (ya estaba bien) |
| `modulo6.html` | ✅ Listo | JS reparado (sesión 3). Es el módulo final: restaura el Certificado Final (`certbox-final`) al revisitar. ✅ Agregado botón "Salir". ✅ Agregada regla `@media print` para el certificado. ✅ **Corregidas 3 respuestas incorrectas en la evaluación**: pregunta 3 (era A, es D), pregunta 4 (era C, es A), pregunta 7 (era A, es D) |
| `academia_ia_pagina_ventas.html` | ⚠️ Pendiente | Pagos no integrados (flujo de compra simulado con `setTimeout`). Contraseña temporal inútil eliminada del flujo de compra de módulo individual. Botón de confirmación de compra entra directo al módulo comprado. Registro gratuito del Módulo 1 exige verificación real de correo antes de otorgar acceso |
| `login.html` | ✅ Listo (recién revisado) | Ya existía en el sitio (el usuario lo subió por primera vez a esta conversación). Es una página de login **real y funcional**: usa `signInWithEmailAndPassword` de Firebase, detecta emails VIP y les da acceso completo, tiene recuperación de contraseña (`sendPasswordResetEmail`), y redirige al módulo correcto usando `pago_archivo` guardado en `sessionStorage`. ✅ Se le agregó un enlace "← Volver al inicio" (a `academia_ia_pagina_ventas.html`) para quien entra por error y no quiere iniciar sesión |

---

## 🔧 Pendientes activos
> Marca con ✅ cuando se resuelvan y muévelos al Historial.

- [ ] **Pagos** — Integración de Stripe o PayPal pendiente (el flujo de pago sigue siendo simulado)
- [ ] **Soporte al cliente** — Pendiente de implementar
- [ ] **Diagnóstico general** — Revisar qué dejó de funcionar tras migraciones anteriores
- [ ] **Despliegue** — Confirmar que TODOS los archivos corregidos (M1, M2, M3, M4, M5, M6, página de ventas, login.html) se suban al repo de GitHub; el sitio en vivo (GitHub Pages) puede seguir mostrando versiones viejas hasta que el usuario haga el push/commit manualmente
- [ ] **Prueba pendiente del usuario (sesión 6):** repetir en incógnito el flujo completo — (a) usuario nuevo: M2 → M3 debe abrir el formulario de pago correctamente; (b) usuario VIP (`srg.abarca@gmail.com`, correo ya corregido): M1 → M2 debe entrar directo sin pedir pago

---

## 📝 Notas técnicas importantes
- Todo el acceso es por **sessionStorage** (no localStorage, no Firebase Auth en módulos)
- Los PDFs están **embebidos en base64** dentro de cada HTML (no son archivos externos)
- GitHub Pages sirve los archivos estáticos directamente
- Firebase se usa solo para autenticación en la página de ventas/login
- **Firebase init debe estar en el `<head>`**, no al final del body

### Patrones de fix ya aplicados en M2/M3/M4 (replicar en M5/M6)
1. **Acceso defensivo al navegar "hacia atrás":** cada módulo valida su propio `acceso_moduloN` al cargar y redirige a la página de pago si falta. Si el alumno navega de un módulo al anterior sin tener ese flag guardado (típicamente por el bug de VIP en modulo1.html), lo rebota a pagos aunque sí tenga acceso. Fix: el botón "← Volver al Módulo N-1" tiene un listener que otorga `acceso_moduloN-1` si el alumno ya tiene `acceso_plan` o `acceso_moduloN`.
2. **Restauración de estado "completado" al revisitar:** por diseño original, cada módulo siempre arrancaba desde cero (video sin ver, evaluación sin hacer) aunque el alumno ya lo hubiera aprobado antes. Fix: al cargar, si existe `moduloN_completado` en sessionStorage, se restaura visualmente el 100% de progreso, se deshabilita el botón de evaluación, y se muestra directamente el desbloqueo del módulo siguiente (sin scroll automático, usando `mostrarSiguienteModulo(true)`).
3. **Cuidado con JS duplicado/roto:** modulo4.html tenía fragmentos de al menos tres versiones distintas de `descargarMaterial()` pegadas una tras otra al final del `<script>`, con llaves sueltas y una variable fuera de scope. Esto es un **error de sintaxis que rompe TODO el script de la página**, no solo la descarga. Si un módulo reporta múltiples fallas simultáneas (botones que no responden, evaluación que no aparece, etc.), sospechar de este patrón y revisar el final del archivo con `node --check` sobre el contenido del `<script>`.
4. **Verificación de PDFs:** al reemplazar el PDF placeholder por el PDF real, siempre decodificar el base64 embebido y compararlo byte a byte (`==`) contra el archivo original subido, para confirmar que no hubo corrupción en el proceso.
5. **Verificación real de correo electrónico (sesión 4):** enviar el correo con `sendEmailVerification()` no es suficiente — el bug original otorgaba `acceso_modulo1` inmediatamente después de crear la cuenta, sin esperar a que el usuario confirmara el enlace, por lo que cualquiera podía registrarse con un correo inventado y entrar igual. Fix aplicado en `academia_ia_pagina_ventas.html`: el acceso NO se otorga al registrarse; se guarda la referencia al usuario de Firebase (`usuarioActual`) y se muestra un botón "Ya verifiqué mi correo — Continuar" que hace `usuarioActual.reload()` y solo si `usuarioActual.emailVerified === true` se guarda `acceso_modulo1` y se redirige al módulo. Se agregó también un botón "Reenviar correo de verificación". Este patrón debería replicarse en cualquier otro flujo de registro que se agregue más adelante.
6. **Botón "Salir" (cerrarSesion):** limpia `sessionStorage.clear()` y redirige a `academia_ia_pagina_ventas.html` (la página de login/ventas real del sitio). Ya aplicado en los 6 módulos.
7. **⚠️ CRÍTICO — Nunca otorgar acceso al módulo siguiente al aprobar un examen:** se encontró (y corrigió) un bug de seguridad real en `modulo2.html` y `modulo3.html`: al aprobar la evaluación, el código guardaba `acceso_moduloN+1` en `sessionStorage` de forma incondicional, sin revisar si el alumno había pagado ese módulo o tenía el plan mensual. Esto permitía comprar solo un módulo individual y avanzar gratis por todos los siguientes con solo aprobar cada examen. El patrón correcto (el que ya tenían `modulo4.html` y `modulo5.html` de forma nativa) es: al aprobar, solo guardar `moduloN_completado` — la función que muestra el botón de "Ir al módulo siguiente" (`mostrarSiguienteModulo` / `mostrarAccesoMod3`) debe seguir revisando únicamente `acceso_plan` o `acceso_moduloN+1` ya existentes, sin escribir esa clave por su cuenta. Si se toca este código de nuevo (por ejemplo al agregar un Módulo 7), revisar con cuidado que no se reintroduzca este patrón.
8. **Impresión de certificados (`@media print`):** por defecto, el botón "🖨️ Imprimir / Guardar" (`window.print()`) imprimía toda la página (nav, videos, tarjetas, etc.), no solo el certificado. Se agregó esta regla CSS en los 6 módulos, justo después de la definición de `.cert-box{...}`:
   ```css
   @media print {
     body * { visibility: hidden; }
     .cert-box, .cert-box * { visibility: visible; }
     .cert-box { position: absolute; top: 0; left: 0; width: 100%; margin: 0; }
   }
   ```
   Funciona porque todos los módulos usan la misma clase `.cert-box` para el contenedor del certificado (incluido `modulo6.html`, aunque su `id` sea `certbox-final` en vez de `certbox`). Replicar este mismo bloque si se agrega un certificado nuevo en el futuro.

---

## 🗓️ Historial de sesiones
> Añade una entrada al terminar cada sesión de trabajo con Claude.

### 2026-06-29
- Se reorganizó y consolidó el CLAUDE.md en formato maestro con historial
- Pendiente principal: corregir botón VIP en modulo1.html

### 2026-06-29 (sesión 2)
- ✅ modulo2.html — Eliminado popup "Módulo 3 disponible en Plan Premium"
- ✅ modulo2.html — Botón "Ir al Módulo 3 →" aparece correctamente al aprobar (se guarda `acceso_modulo3` al aprobar)
- ✅ modulo2.html — Respuestas de evaluación mezcladas: q1:C, q2:A, q3:D, q4:C, q5:A
- 📁 Archivos modificados: modulo2.html

### 2026-06-30 (sesión 3)
- ✅ modulo2.html y modulo3.html — Diagnosticado que "no aparece completado al volver" era un bug real: los módulos nunca revisaban `moduloN_completado` al cargar. Se agregó lógica de restauración de estado completado en ambos.
- ✅ modulo3.html — Confirmado (usuario probaba el sitio en vivo, no el archivo entregado) que el PDF faltante era por falta de despliegue, no por bug de código.
- ✅ modulo3.html — Reemplazado el PDF placeholder por `guia_modulo3_imprimible.pdf` real (verificado byte a byte)
- ✅ modulo4.html — Detectado y reparado JS roto al final del archivo (fragmentos duplicados de `descargarMaterial()`, llaves sueltas, variable `blob` fuera de scope) que rompía todo el script de la página
- ✅ modulo4.html — Agregado botón "Descargar Guía PDF" que no existía en el HTML original
- ✅ modulo4.html — Verificado que el PDF ya embebido coincidía byte a byte con `guia_modulo4_imprimible.pdf`
- ✅ modulo4.html — Aplicado acceso defensivo al botón "Volver al Módulo 3" y restauración de estado completado
- ⚠️ Pendiente — modulo5.html y modulo6.html sin revisar; probable mismo patrón de bugs que modulo4.html
- ⚠️ Pendiente — Confirmar que el usuario suba (git push) los archivos corregidos a GitHub, ya que el sitio en vivo seguía mostrando versiones viejas
- 📁 Archivos modificados: modulo2.html, modulo3.html, modulo4.html
- ✅ modulo5.html — Confirmado el mismo patrón de JS roto que modulo4.html (fragmentos duplicados de `descargarMaterial()`); reparado y agregado botón de descarga PDF, acceso defensivo al volver a M4, restauración de estado completado. PDF embebido ya era el real
- ✅ modulo6.html — Mismo patrón de JS roto, mismo arreglo. Al ser el módulo final, la restauración de estado completado muestra directamente el Certificado Final (`certbox-final`) en vez de desbloquear un módulo siguiente
- 📁 Archivos modificados (sesión 3 completa): modulo2.html, modulo3.html, modulo4.html, modulo5.html, modulo6.html

### 2026-07-01 (sesión 4)
- ✅ modulo1.html — Reemplazado el placeholder `Material_Alumno_Modulo1.docx` por el PDF real `guia_modulo1_imprimible.pdf` (verificado byte a byte); cambiado el `MIME` a `application/pdf` y el nombre de descarga a `Guia_Alumno_Modulo1.pdf`
- ✅ modulo3.html — Movido el botón "Descargar Guía PDF" para que quede entre las tarjetas de secciones (`.grid`) y el botón de evaluación (antes estaba arriba, junto a los botones de video)
- ✅ modulo3.html — Agregado botón "🚪 Salir" en el `<nav>` (mismo estilo que modulo1.html) con función `cerrarSesion()` que limpia `sessionStorage` y redirige a `academia_ia_pagina_ventas.html`
- ⚠️ Detectada inconsistencia: `modulo1.html` ya tenía botón "Salir", pero su `cerrarSesion()` redirige a `login.html` en vez de `academia_ia_pagina_ventas.html` como el resto del sitio — queda pendiente de corregir
- ✅ academia_ia_pagina_ventas.html — Quitada la contraseña temporal inútil del formulario de **compra de módulo** (no del registro gratuito): eliminada `genPass()`, la llamada a `createUserWithEmailAndPassword` con esa contraseña random, `sessionStorage.setItem('pago_pass', ...)` y el campo "Contraseña temporal" del modal de confirmación
- ✅ academia_ia_pagina_ventas.html — El botón del modal de confirmación de compra ("🚀 Entrar al módulo") ahora navega directo al archivo del módulo comprado (`info.archivo`, seteado dinámicamente) en vez de ir a `login.html`
- ✅ academia_ia_pagina_ventas.html — Corregido bug de seguridad en el registro gratuito del Módulo 1: antes se otorgaba `acceso_modulo1` inmediatamente al crear la cuenta aunque el correo nunca se verificara (cualquiera podía registrarse con un correo inventado y entrar). Ahora el acceso solo se otorga después de comprobar `emailVerified === true` vía un botón "✅ Ya verifiqué mi correo — Continuar"; se agregó también botón "📩 Reenviar correo de verificación"
- ✅ Confirmado con el usuario en Firebase Console (Authentication → Users) que los registros ya se están creando correctamente
- ⚠️ Pendiente — Agregar botón "Salir" en modulo2.html, modulo4.html, modulo5.html y modulo6.html (aún no se han subido en esta sesión)
- ⚠️ Pendiente — Confirmar despliegue (git push) de modulo1.html, modulo3.html y academia_ia_pagina_ventas.html actualizados; el sitio en vivo puede seguir mostrando versiones viejas
- 📁 Archivos modificados: modulo1.html, modulo3.html, academia_ia_pagina_ventas.html

### 2026-07-01 (sesión 5)
- ✅ modulo2.html, modulo4.html, modulo5.html, modulo6.html — Agregado botón "🚪 Salir" en el `<nav>` con función `cerrarSesion()` (redirige a `academia_ia_pagina_ventas.html`), igual que modulo1.html y modulo3.html. Ahora los 6 módulos son consistentes
- ✅ modulo1.html — Corregido `cerrarSesion()`: ya no redirige a `login.html`, ahora redirige a `academia_ia_pagina_ventas.html` en ambas ramas (con y sin `fbAuth`)
- ✅ El usuario subió `login.html` por primera vez a la conversación — se confirmó que **sí existe y sí funciona de verdad** (Firebase Auth real, lista VIP, recuperación de contraseña). Se le agregó un enlace "← Volver al inicio" para quien entra sin querer y no desea llenar el formulario
- ✅ modulo1.html a modulo6.html — Agregada regla `@media print` (ver nota técnica 8) para que el botón "Imprimir / Guardar" del certificado imprima solo el cuadro del certificado, no toda la página
- ✅ modulo6.html — Corregidas 3 respuestas incorrectas en `RESP`: pregunta 3 (era A, correcta es D), pregunta 4 (era C, correcta es A), pregunta 7 (era A, correcta es D). Verificado contra el texto real de las opciones antes de aplicar
- ✅ **Bug de seguridad encontrado y corregido:** en `modulo2.html` y `modulo3.html`, al aprobar el examen se otorgaba automáticamente acceso al módulo siguiente (`acceso_modulo3` / `acceso_modulo4`) sin verificar pago. Esto permitía comprar solo un módulo y avanzar gratis a los siguientes con solo aprobar cada examen. Corregido en ambos archivos (ver nota técnica 7). Se revisó modulo1.html, modulo4.html y modulo5.html y no tenían este bug
- ⚠️ Pendiente — Confirmar despliegue (git push) de TODOS los archivos tocados en esta sesión: modulo1.html, modulo2.html, modulo3.html, modulo4.html, modulo5.html, modulo6.html, login.html
- 📁 Archivos modificados: modulo1.html, modulo2.html, modulo3.html, modulo4.html, modulo5.html, modulo6.html, login.html

### 2026-07-01 (sesión 6)
- ✅ **VIP:** corregido el correo VIP incorrecto `srgabarca-del@gmail.com` → `srg.abarca@gmail.com` en `login.html`, `academia_ia_pagina_ventas.html` y este CLAUDE.md
- ✅ **academia_ia_pagina_ventas.html — VIP en registro gratuito:** se agregó reconocimiento de la lista `VIP_EMAILS` también en el formulario de registro gratuito del Módulo 1 (antes solo existía en `login.html`). Si el correo es VIP, se otorga `acceso_plan` + los 6 módulos de inmediato al registrarse, sin esperar la verificación de correo (el correo de verificación se sigue enviando en segundo plano, pero ya no bloquea)
- ✅ **Bug real reportado por el usuario — Módulo 2 → 3 sin formulario de pago:** el botón "Comprar Módulo 3" en `modulo2.html` (`mostrarAccesoMod3()`) era un `<a href="...#planes-pago">` plano que nunca guardaba `ir_a` en sessionStorage. Por eso `academia_ia_pagina_ventas.html` no sabía qué módulo abrir automáticamente y el usuario solo veía la sección de precios sin que se abriera ningún formulario. Corregido: ahora es un botón que llama a `comprarModulo3()`, que guarda `ir_a='modulo3'` antes de navegar — mismo patrón que ya funcionaba en modulo3/4/5.html
- ✅ **Bug real reportado por el usuario — VIP forzado a pagar el Módulo 2:** en `modulo1.html`, el botón "Continuar al Módulo 2" mandaba siempre a la página de pagos sin revisar si el alumno ya tenía acceso (VIP o compra previa). Corregido: ahora revisa `acceso_plan`/`acceso_modulo2` antes de decidir a dónde ir
- ⚠️ Pendiente — El usuario va a probar de nuevo en incógnito ambos flujos (usuario nuevo M2→M3, y VIP M1→M2) en cuanto haga el despliegue
- ⚠️ Pendiente — Confirmar despliegue (git push) de: modulo1.html, modulo2.html, login.html, academia_ia_pagina_ventas.html (todos modificados en esta sesión)
- 📁 Archivos modificados: modulo1.html, modulo2.html, login.html, academia_ia_pagina_ventas.html, CLAUDE.md

<!--
PLANTILLA para nueva entrada de historial:
### YYYY-MM-DD
- ✅ [qué se resolvió]
- ⚠️ [qué quedó pendiente o surgió nuevo]
- 📁 [archivos modificados]
-->
