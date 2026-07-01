# 🤖 Academia IA Generaciones — Contexto del Proyecto

> **Última actualización:** 2026-07-01 (sesión 4)
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
- srgabarca-del@gmail.com

---

## 📂 Estructura de archivos principales
```
modulo1.html                    ← Módulo gratuito
modulo2.html                    ← Premium
modulo3.html                    ← Premium
modulo4.html                    ← Premium
modulo5.html                    ← Premium
modulo6.html                    ← Premium (FINAL)
academia_ia_pagina_ventas.html  ← Página de ventas / login
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
| 6 | 7 | 5 | q1:B, q2:D, q3:A, q4:C, q5:B, q6:D, q7:A |

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
| `modulo1.html` | ⚠️ Pendiente | Botón al Módulo 2 no guarda `acceso_modulo2` para VIPs. Además (sesión 4): reemplazado el placeholder `Material_Alumno_Modulo1.docx` por el PDF real `guia_modulo1_imprimible.pdf` (verificado byte a byte). ⚠️ Su `cerrarSesion()` redirige a `login.html`, inconsistente con el resto de módulos que usan `academia_ia_pagina_ventas.html` — pendiente de corregir |
| `modulo2.html` | ✅ Listo | Popup eliminado, botón Ir a M3 corregido, respuestas mezcladas, desbloquea M3 al aprobar. Además (sesión 3): restaura estado "completado" al revisitar. ⚠️ Pendiente (sesión 4): agregar botón "Salir" |
| `modulo3.html` | ✅ Listo | PDF real embebido (guia_modulo3_imprimible.pdf, verificado byte a byte), botón "Volver a M2" otorga acceso defensivo, restaura estado "completado" al revisitar. Además (sesión 4): botón de descarga de PDF movido para quedar entre las tarjetas de secciones y el botón de evaluación; agregado botón "Salir" (`cerrarSesion()`, redirige a `academia_ia_pagina_ventas.html`) |
| `modulo4.html` | ✅ Listo (reparado sesión 3) | Tenía JS roto al final del archivo (funciones duplicadas/mezcladas, variable fuera de scope) que probablemente rompía todo el script de la página; no tenía botón de descarga de PDF. Se reconstruyó limpio, se agregó botón de descarga, acceso defensivo al volver a M3, y restauración de estado completado. ⚠️ Pendiente (sesión 4): agregar botón "Salir" |
| `modulo5.html` | ✅ Listo (reparado sesión 3) | Mismo bug que M4: JS roto al final (fragmentos duplicados de `descargarMaterial()`) y sin botón de descarga. El PDF embebido ya era el real (no placeholder). Reparado con el mismo patrón: botón PDF, acceso defensivo al volver a M4, restauración de estado completado. ⚠️ Pendiente (sesión 4): agregar botón "Salir" |
| `modulo6.html` | ✅ Listo (reparado sesión 3) | Mismo bug que M4/M5. Es el módulo final: no desbloquea otro módulo, en su lugar restaura directamente el Certificado Final (`certbox-final`) visible al revisitar si `modulo6_completado` existe. PDF embebido ya era el real. ⚠️ Pendiente (sesión 4): agregar botón "Salir" |
| `academia_ia_pagina_ventas.html` | ⚠️ Pendiente | Pagos no integrados (el flujo de compra sigue siendo simulado con `setTimeout`, no hay pasarela real de Stripe/PayPal). Además (sesión 4): quitada la contraseña temporal inútil del formulario de compra de módulo; el botón de confirmación de compra ahora entra directo al módulo comprado en vez de ir a `login.html`; el registro gratuito del Módulo 1 ahora exige verificación real de correo (no solo enviarlo) antes de otorgar `acceso_modulo1` |

---

## 🔧 Pendientes activos
> Marca con ✅ cuando se resuelvan y muévelos al Historial.

- [ ] **modulo1.html** — Botón al Módulo 2 no guarda `acceso_modulo2` para usuarios VIP antes de redirigir
- [ ] **modulo1.html** — `cerrarSesion()` redirige a `login.html`; debería redirigir a `academia_ia_pagina_ventas.html` como el resto de módulos, para mantener consistencia
- [ ] **Botón "Salir"** — Falta agregarlo en modulo2.html, modulo4.html, modulo5.html y modulo6.html (ya está en modulo1.html y modulo3.html)
- [ ] **Pagos** — Integración de Stripe o PayPal pendiente (el flujo de pago sigue siendo simulado)
- [ ] **Soporte al cliente** — Pendiente de implementar
- [ ] **Diagnóstico general** — Revisar qué dejó de funcionar tras migraciones anteriores
- [ ] **Despliegue** — Confirmar que TODOS los archivos corregidos (M1, M2, M3, M4, M5, M6, página de ventas) se suban al repo de GitHub; el sitio en vivo (GitHub Pages) puede seguir mostrando versiones viejas hasta que el usuario haga el push/commit manualmente

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
6. **Botón "Salir" (cerrarSesion):** limpia `sessionStorage.clear()` y redirige a `academia_ia_pagina_ventas.html` (la página de login/ventas real del sitio). Ojo: `modulo1.html` tiene una versión antigua que redirige a `login.html` — no replicar ese destino al agregar el botón en los módulos restantes, usar `academia_ia_pagina_ventas.html`.

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

<!--
PLANTILLA para nueva entrada de historial:
### YYYY-MM-DD
- ✅ [qué se resolvió]
- ⚠️ [qué quedó pendiente o surgió nuevo]
- 📁 [archivos modificados]
-->
