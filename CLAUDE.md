# 🤖 Academia IA Generaciones — Contexto del Proyecto

> **Última actualización:** 2026-06-29
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
| 2 | 5 | 4 | q1:B, q2:B, q3:C, q4:B, q5:B |
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
| `modulo2.html` | ✅ Listo | Firebase init en head, evaluación, certificado, desbloquea M3 |
| `modulo3.html` | ✅ Listo | PDF embebido, 7 preguntas, desbloquea M4 |
| `modulo4.html` | ✅ Listo | PDF embebido, 7 preguntas, desbloquea M5 |
| `modulo5.html` | ✅ Listo | PDF embebido, 7 preguntas, desbloquea M6 |
| `modulo6.html` | ✅ Listo | PDF embebido, 7 preguntas, Certificado Final |
| `academia_ia_pagina_ventas.html` | ⚠️ Pendiente | Pagos no integrados |

---

## 🔧 Pendientes activos
> Marca con ✅ cuando se resuelvan y muévelos al Historial.

- [ ] **modulo1.html** — Botón al Módulo 2 no guarda `acceso_modulo2` para usuarios VIP antes de redirigir
- [ ] **Pagos** — Integración de Stripe o PayPal pendiente
- [ ] **Soporte al cliente** — Pendiente de implementar
- [ ] **Diagnóstico general** — Revisar qué dejó de funcionar tras migraciones anteriores

---

## 📝 Notas técnicas importantes
- Todo el acceso es por **sessionStorage** (no localStorage, no Firebase Auth en módulos)
- Los PDFs están **embebidos en base64** dentro de cada HTML (no son archivos externos)
- GitHub Pages sirve los archivos estáticos directamente
- Firebase se usa solo para autenticación en la página de ventas/login
- **Firebase init debe estar en el `<head>`**, no al final del body

---

## 🗓️ Historial de sesiones
> Añade una entrada al terminar cada sesión de trabajo con Claude.

### 2026-06-29
- Se reorganizó y consolidó el CLAUDE.md en formato maestro con historial
- Pendiente principal: corregir botón VIP en modulo1.html

<!--
PLANTILLA para nueva entrada de historial:
### YYYY-MM-DD
- ✅ [qué se resolvió]
- ⚠️ [qué quedó pendiente o surgió nuevo]
- 📁 [archivos modificados]
-->
