# 🤖 Academia IA Generaciones — Contexto del Proyecto

> **Última actualización:** 2026-06-30 (sesión 3)
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

### ⚠️ Patrón de "rebote a pago" detectado (sesión 3)
Cada módulo premium valida su propio acceso al cargar (`acceso_plan` o `acceso_moduloN`) y, si falta, redirige a `academia_ia_pagina_ventas.html#planes-pago`. Esto significa que un botón "Volver al Módulo X" o "Ir al Módulo X" puede rebotar al alumno a la página de pago si ese módulo específico nunca guardó su flag de acceso — típicamente por el bug pendiente del botón VIP en `modulo1.html`. **Patrón de mitigación aplicado en `modulo3.html`:** antes de navegar hacia atrás a `modulo2.html`, si el alumno tiene `acceso_plan` o `acceso_modulo3`, se le otorga también `acceso_modulo2` en ese momento. Conviene replicar este patrón en `modulo4.html`, `modulo5.html` y `modulo6.html` para sus respectivos botones "Volver".

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
| `modulo1.html` | ⚠️ Pendiente | Botón al Módulo 2 no guarda `acceso_modulo2` para VIPs |
| `modulo2.html` | ✅ Listo | Popup eliminado, botón Ir a M3 corregido, respuestas mezcladas, desbloquea M3 al aprobar |
| `modulo3.html` | ✅ Listo | PDF embebido verificado (genera PDF válido), evaluación funcional, certificado funcional, desbloquea M4 al aprobar, botón "Volver al Módulo 2" ya no rebota a pago (otorga `acceso_modulo2` defensivamente). Probado con pruebas automatizadas (jsdom) simulando clics reales. |
| `modulo4.html` | ✅ Listo | PDF embebido, 7 preguntas, desbloquea M5. *(Pendiente: verificar si necesita el mismo parche defensivo de "Volver" que M3)* |
| `modulo5.html` | ✅ Listo | PDF embebido, 7 preguntas, desbloquea M6. *(Pendiente: verificar mismo parche)* |
| `modulo6.html` | ✅ Listo | PDF embebido, 7 preguntas, Certificado Final. *(Pendiente: verificar mismo parche)* |
| `academia_ia_pagina_ventas.html` | ⚠️ Pendiente | Pagos no integrados |

---

## 🔧 Pendientes activos
> Marca con ✅ cuando se resuelvan y muévelos al Historial.

- [ ] **modulo1.html** — Botón al Módulo 2 no guarda `acceso_modulo2` para usuarios VIP antes de redirigir
- [ ] **Pagos** — Integración de Stripe o PayPal pendiente
- [ ] **Soporte al cliente** — Pendiente de implementar
- [ ] **Replicar parche de "Volver al Módulo X"** — Aplicar en modulo4.html, modulo5.html y modulo6.html el mismo patrón defensivo usado en modulo3.html (otorgar el flag de acceso del módulo anterior si el alumno ya tiene `acceso_plan` o acceso al módulo actual), para evitar rebotes a la página de pago
- [ ] **Confirmar despliegue** — Verificar que el `modulo3.html` corregido en esta sesión esté efectivamente subido/commiteado al repo de GitHub y publicado en GitHub Pages (se detectó posible desfase entre archivo local y el publicado)
- [ ] **Diagnóstico general** — Revisar qué dejó de funcionar tras migraciones anteriores

---

## 📝 Notas técnicas importantes
- Todo el acceso es por **sessionStorage** (no localStorage, no Firebase Auth en módulos)
- Los PDFs están **embebidos en base64** dentro de cada HTML (no son archivos externos)
- GitHub Pages sirve los archivos estáticos directamente
- Firebase se usa solo para autenticación en la página de ventas/login
- **Firebase init debe estar en el `<head>`**, no al final del body
- Cada módulo premium valida su propio acceso en un IIFE al cargar; si el flag correspondiente no está en `sessionStorage`, redirige a `academia_ia_pagina_ventas.html#planes-pago`. Tener esto en cuenta al diagnosticar "rebotes a pago" inesperados en botones de navegación interna.

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
- 🔍 Diagnóstico de modulo3.html: el archivo subido ya contenía 5 correcciones previas (comentarios `// FIX 1-5`). Se verificó con pruebas automatizadas (jsdom) que PDF descargable, botón de evaluación, certificado y desbloqueo de Módulo 4 **ya funcionaban correctamente**.
- ✅ modulo3.html — Identificada causa real de "Volver al Módulo 2 muestra el formulario de pago": el candado de acceso propio de `modulo2.html` exige `acceso_modulo2`, que puede faltar por el bug VIP pendiente de `modulo1.html`.
- ✅ modulo3.html — Aplicado parche defensivo: al hacer clic en "Volver al Módulo 2", si el alumno tiene `acceso_plan` o `acceso_modulo3`, se le otorga `acceso_modulo2` antes de navegar.
- ⚠️ Pendiente nuevo: replicar este mismo parche defensivo en modulo4.html, modulo5.html y modulo6.html
- ⚠️ Pendiente nuevo: confirmar que el modulo3.html corregido esté realmente publicado en GitHub Pages (posible desfase entre repo y archivo de trabajo)
- 📁 Archivos modificados: modulo3.html

<!--
PLANTILLA para nueva entrada de historial:
### YYYY-MM-DD
- ✅ [qué se resolvió]
- ⚠️ [qué quedó pendiente o surgió nuevo]
- 📁 [archivos modificados]
-->
