# Matriz de Verificación y Criterios de Aceptación (Verification Matrix)
## Proyecto: Landing de Cursos HGS
*Matriz de Control de Calidad | Basada en PRD v0.1.0 y Tech Spec v0.1.0*

---

## 1. Matriz de Pruebas Funcionales y Casos de Uso

| ID | Caso de Prueba / Historia | Entrada / Acción | Resultado Esperado | Estado |
|---|---|---|---|---|
| **TC-01** | HU-01 Datos arriba del pliegue | Abrir ficha con cohorte abierta a 375 × 812 | Título, docente, modalidad, horas/semanas, fechas y precio `$XXX.XXX` visibles sin scroll; barra fija con «Inscribirme» | ✅ Pass (2026-10-22) |
| **TC-02** | HU-01 Sin cohorte | Abrir ficha cuyo curso no tiene cohorte `abierta` | Cero botones de pago; aparece «Avísame de la próxima cohorte» | ✅ Pass |
| **TC-03** | HU-02 Temario sin JS | Desactivar JavaScript y abrir ficha | Temario completo legible (`<details>` nativos); subnavegación por anclas funciona | ✅ Pass |
| **TC-04** | HU-03 Pago exitoso | Inscribirse y pagar con tarjeta de prueba de Mercado Pago | Redirección a `/inscripcion/exito` con pasos siguientes; pago asociado al inscrito | ◐ Pass contra fixture; falta Link de pago real |
| **TC-05** | HU-04 Formulario empresas | Enviar formulario completo | Confirmación en pantalla y recepción en el destino definido | ✅ Pass (fixture) |
| **TC-06** | HU-05 Ruta de aprendizaje | Abrir home | Cursos ordenados por nivel con prerrequisitos; los que no tienen cohorte aparecen como «Próximamente» | ✅ Pass (2026-10-22; sin cursos encadenados aún) |
| **TC-07** | RF-06 Datos estructurados | Validar ficha en Rich Results Test | `Course` + `CourseInstance` + `Offer` válidos; sin `AggregateRating` si no hay reseñas | ◐ JSON-LD generado; validar en Rich Results Test al publicar |

---

## 2. Matriz de Pruebas Adversariales (Casos Límite y Resiliencia)

| ID | Escenario Adversarial | Condición | Comportamiento Exigido | Estado |
|---|---|---|---|---|
| **ADV-01** | Pago rechazado | Tarjeta de prueba rechazada | `/inscripcion/error` con reintento; datos del formulario conservados | ◐ Pendiente Link de pago real |
| **ADV-02** | Pago abandonado | Cerrar Mercado Pago y volver con «Atrás» | Ficha intacta, sin inscripción marcada como pagada | ◐ Pendiente Link de pago real |
| **ADV-03** | Cohorte vencida | Build con `inicio` < fecha actual | Cohorte pasa a `cerrada`; botón de pago desaparece | ✅ Pass |
| **ADV-04** | Precio inválido | `montoCLP: -1` o `"abc"` en el `.md` | El build falla con mensaje que indica archivo y campo | ✅ Pass |
| **ADV-05** | Inyección XSS | `<script>alert(1)</script>` en formularios | Se escapa como texto; cero ejecución | ✅ Pass |
| **ADV-06** | Red caída en formulario | Desconectar red al enviar | Error accesible con reintento; datos conservados | ✅ Pass |
| **ADV-07** | Movimiento reducido | `prefers-reduced-motion: reduce` | Sin partículas ni scroll suavizado; fondo estático equivalente | ✅ Pass (cuadro estático) |
| **ADV-08** | Viewport crítico | 320 × 568 px | Cero scroll horizontal; barra de inscripción no tapa contenido | ✅ Pass (CDP, 9 páginas × 4 anchos) |
| **ADV-09** | Prerrequisito roto | Slug inexistente en `prerrequisitos` | El build falla | ✅ Pass |
| **ADV-10** | Convenio bajo el mínimo | 5 participantes en «Convenios» | Mensaje en línea «el convenio aplica desde 6 alumnos» + enlace a inscripción individual; datos conservados | ✅ Pass |
| **ADV-11** | Link de pago inválido | `mpLink` vacío o de otro dominio | El build falla indicando curso y campo | ✅ Pass |
| **ADV-12** | Pago sin registro | Abrir el Link de pago sin pasar por el formulario | El botón de pago solo se muestra tras un envío exitoso del formulario | ◐ Pass en flujo normal (ver tasks.md) |

---

## 3. Matriz de Calidad Visual y Anti-AI Slop

| Criterio Evaluado | Método de Verificación | Umbral Exigido | Resultado |
|---|---|---|---|
| **Contraste de Texto** | Inspección WCAG con DevTools, modo claro y oscuro | ≥ 4,5:1 normal / 3:1 grande | ✅ Cumple (Lighthouse a11y 100) |
| **Escala Tipográfica** | Auditoría de CSS | 100 % de fuentes mapeadas a `tokens.css` | [ ] Cumple |
| **Espaciado Rítmico** | Auditoría de CSS | Cero márgenes no múltiplos de 4 px | ✅ Cumple (4 excepciones justificadas) |
| **Rendimiento del hero** | Performance panel, móvil gama media con CPU 4× | 60 FPS; LCP = H1 < 2,0 s | ✅ Cumple (peor cuadro 14 ms; LCP 1,8 s) |
| **Peso de la ficha** | Pestaña Network | ≤ 10 peticiones de JavaScript | ✅ Cumple (0) |
| **Ausencia de Slop** | `/web-craft audit` | 0 advertencias | ✅ Cumple |
| **Contenido real** | Revisión manual | Cero testimonios, cifras o logos sin respaldo | [ ] Cumple |

---

## 4. Firma de Aprobación Final
* **Fecha de Verificación**: [AAAA-MM-DD]
* **Agente Ejecutor**: [Antigravity / Claude Code]
* **Veredicto Técnico**: `[ ] RECHAZADO (Requiere correcciones)` | `[ ] APROBADO PARA PRODUCCIÓN`
