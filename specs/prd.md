# Documento de Requerimientos de Producto (PRD)
## Proyecto: Landing de Cursos HGS
*Documento de Especificación Funcional | Versión: 0.1.0 (borrador) | Autor: Hidrogeólogo responsable + Claude Code | 2026-10-22*

---

## 0. Decisiones registradas

| ID | Decisión | Estado |
|---|---|---|
| D-01 | Marca: **HGS** — descriptor «Hidrogeología y geociencias»; logo en `brand/` | ✅ Resuelta (2026-10-22) |
| D-02 | Cobro: **Mercado Pago**, modalidad **Link de pago** (opción A de `tech_spec.md`) | ✅ Resuelta (2026-10-22) |
| D-03 | Clases: **Google Meet** | ✅ Resuelta (2026-10-22) |
| D-04 | Franquicia SENCE / OTEC | ✅ Resuelta (2026-10-22): **no aplica** |
| D-05 | Moneda: **CLP** | ✅ Resuelta (2026-10-22) |
| D-06 | Catálogo inicial: 2 cursos, inicio **lunes 7 de diciembre de 2026** — ver `catalogo.md` | ✅ Resuelta (2026-10-22); horas, temario y cupos ⏳ |
| D-07 | Precio **unificado** (sin tramo estudiante). **Convenio empresas/instituciones desde 6 alumnos** (más de 5) | ✅ Resuelta (2026-10-22); condiciones del convenio ⏳ |
| D-08 | Dominio web y correo de contacto de HGS | ⏳ Abierta |
| D-09 | Hosting y formularios: Netlify + Netlify Forms (valor por defecto, modificable) | ⏳ Por confirmar |

---

## 1. Visión y Resumen Ejecutivo
* **Problema a Resolver**: La formación en hidrogeología aplicada disponible para profesionales chilenos y latinoamericanos se dicta desde catálogos generalistas (geotecnia, arquitectura, paleontología…), con ejemplos ajenos a la minería y a la normativa local, y con fichas que ocultan el temario tras pestañas.
* **Solución Propuesta**: Una landing estática de la marca HGS con un catálogo acotado de cursos de hidrogeología y geociencias aplicadas (cohorte inicial: Pruebas de Bombeo y Análisis de Remociones en Masa), dictados en vivo por Google Meet. Cada curso se presenta con fichas que exponen fechas, horas, precio, docente, temario y software sin ocultar contenido, ilustradas con figuras técnicas reales. La inscripción se paga con Mercado Pago.
* **Métrica de Éxito**:
  - Tasa de conversión ficha → pago iniciado ≥ 3 % de las sesiones de la ficha.
  - Formularios de «Solicitar información» respondidos ≤ 1 día hábil.
  - Lighthouse móvil ≥ 90 en las cuatro categorías.

---

## 2. Usuarios Objetivo y Personas
* **Usuario Principal**: Profesional de geología, ingeniería de minas, ingeniería civil o medio ambiente (2–10 años de experiencia) que necesita competencias aplicadas: pruebas de bombeo, hidroquímica, modelación numérica, teledetección.
* **Usuario Secundario**: Jefatura de área de una minera o consultora que evalúa capacitar a su equipo (formación cerrada).
* **Contexto de Uso**: Descubrimiento desde el teléfono (LinkedIn, WhatsApp, búsqueda); decisión y pago desde el escritorio en la oficina.

---

## 3. Historias de Usuario y Criterios de Aceptación

### HU-01: Evaluar un curso sin fricción
> **Como** profesional interesado en un curso,
> **Quiero** ver en la primera pantalla de la ficha las fechas, las horas, la modalidad, el precio y el docente,
> **Para que** pueda decidir si el curso me sirve sin tener que escribir para preguntar.

#### Criterios de Aceptación:
* **Escenario 1 (Camino Feliz)**:
  - **Dado que** el usuario abre la ficha de un curso con cohorte abierta en un viewport de 375 px,
  - **Cuando** la página termina de cargar,
  - **Entonces** sin hacer scroll se ven el título, el docente, la modalidad, las horas/semanas, las fechas de inicio y término, y el precio formateado `$XXX.XXX CLP`; además, una barra inferior fija muestra el precio y el botón «Inscribirme».
* **Escenario 2 (Sin cohorte)**:
  - **Dado que** el curso no tiene cohorte abierta,
  - **Cuando** el usuario abre la ficha,
  - **Entonces** no aparece ningún botón de pago y se ofrece «Avísame de la próxima cohorte».

### HU-02: Revisar el temario completo
> **Como** profesional técnico,
> **Quiero** leer el temario por módulo, con horas y el software que se usa,
> **Para que** pueda comprobar que el curso cubre lo que necesito en mi trabajo.

#### Criterios de Aceptación:
* **Escenario 1**: Todo el contenido de la ficha (descripción, temario, docente, software, metodología, certificado, FAQ) está presente en el HTML; una subnavegación fija lleva a cada sección por ancla. No existen pestañas que oculten contenido.
* **Escenario 2**: Con JavaScript desactivado, el temario se lee completo (acordeones `<details>` nativos).

### HU-03: Pagar la inscripción
> **Como** profesional decidido,
> **Quiero** pagar mi inscripción con Mercado Pago,
> **Para que** quede inscrito sin trámites adicionales.

#### Criterios de Aceptación:
* **Escenario 1 (Camino Feliz)**:
  - **Dado que** el curso tiene cohorte abierta y cupos,
  - **Cuando** el usuario completa sus datos de inscripción y pulsa «Pagar con Mercado Pago»,
  - **Entonces** se le redirige al pago de Mercado Pago por el monto del tramo elegido. Tras pagar, ve una página de confirmación con los pasos siguientes (correo de bienvenida, acceso al campus, fecha de inicio).
* **Escenario 2 (Pago rechazado o abandonado)**:
  - **Dado que** el pago es rechazado o el usuario vuelve sin pagar,
  - **Cuando** regresa al sitio,
  - **Entonces** ve una página que explica que el pago no se completó y le ofrece reintentar o escribir a contacto; sus datos no se pierden.

### HU-04: Solicitar convenio para un grupo
> **Como** jefatura de área de una empresa o institución,
> **Quiero** inscribir a un grupo de 6 o más personas mediante un convenio,
> **Para que** pueda capacitar a mi equipo con condiciones de grupo y una sola gestión de pago.

#### Criterios de Aceptación:
* **Escenario 1**: El formulario «Convenios» pide nombre, empresa o institución, correo, curso y número de participantes; al enviarlo se confirma la recepción en pantalla.
* **Escenario 2**: Si el número de participantes es menor que 6, el formulario lo indica en línea y ofrece la inscripción individual, sin borrar los datos.
* **Escenario 3**: Ante un error de red, el formulario muestra el error con botón de reintento y conserva los datos escritos.

### HU-05: Encontrar el curso adecuado a mi nivel
> **Como** visitante de la home,
> **Quiero** ver la ruta de aprendizaje y para qué perfil está pensado cada curso,
> **Para que** sepa por qué curso empezar.

#### Criterios de Aceptación:
* **Escenario 1**: La home muestra los cursos ordenados en una ruta (fundamentos → aplicaciones → modelación), con prerrequisitos visibles.
* **Escenario 2**: Un curso sin cohorte abierta aparece en la ruta marcado como «Próximamente».

---

## 4. Requerimientos Funcionales Clave
1. **RF-01**: Cada curso se define en un único archivo de contenido con: título, slug, resumen, área (hidrogeología / geociencias), docente(s), plataforma (Google Meet), horas, semanas, módulos (título, horas, entregable), software, prerrequisitos, imagen técnica, cohortes (inicio, término, horario, cupos, estado) y precio único en CLP con su Link de pago de Mercado Pago.
2. **RF-02**: La ficha de curso y su tarjeta en la home se generan desde ese archivo; cambiar una fecha o un precio exige editar un solo archivo.
3. **RF-03**: El pago se realiza en Mercado Pago. La integración (Link de pago o Checkout Pro con función serverless) se decide en `tech_spec.md`.
4. **RF-04**: Antes del pago se capturan los datos del inscrito (nombre, correo, país, profesión), de modo que todo pago pueda asociarse a una persona.
5. **RF-05**: Formularios de «Solicitar información» (por curso) y «Convenios» (mínimo 6 participantes) con estados de envío, éxito y error.
6. **RF-06**: Datos estructurados Schema.org `Course` + `CourseInstance` + `Offer` en cada ficha; `AggregateRating` solo cuando existan reseñas reales.
7. **RF-07**: Hero de la home con campo de partículas que fluyen hacia un pozo (cono de abatimiento), con fallback estático para `prefers-reduced-motion` y para dispositivos de baja potencia.
8. **RF-08**: Páginas legales: términos de inscripción (retracto y devoluciones), política de privacidad y contacto.

---

## 5. Límites Explícitos de Alcance (Out of Scope)
Esta versión **NO** incluirá:
* ❌ Franquicia SENCE / OTEC.
* ❌ Tramos de precio (estudiante, desempleado, pronto pago): el precio es único.
* ❌ Checkout Pro y webhooks de Mercado Pago (se evalúan cuando el volumen haga costosa la conciliación manual).
* ❌ Campus o LMS propio (las clases se dictan en la plataforma que defina D-03).
* ❌ Cuentas de usuario, login o carrito multi-curso.
* ❌ Reseñas enviadas por formulario público (las reseñas reales se cargan a mano en el contenido).
* ❌ Blog, newsletter segmentada y multi-idioma (candidatos a v1.1).
* ❌ Testimonios, cifras o logos de clientes antes de tenerlos reales y autorizados.

---

## 6. Riesgos y Dependencias
* **Dependencias Externas**: Mercado Pago (cuenta Chile de HGS); proveedor de formularios; hosting estático; plataforma de clases (D-03).
* **Riesgo de negocio**: Con Link de pago, la confirmación de inscripción es manual (revisar el panel de Mercado Pago). Un pago puede quedar sin asociar a sus datos si el usuario cierra la pestaña entre el formulario y el pago.
* **Mitigación**: Registrar los datos antes de redirigir (RF-04) con un identificador de inscripción enviado como referencia del pago.
* **Riesgo técnico**: Rendimiento del canvas de partículas en móviles de gama baja.
* **Mitigación**: Carga diferida tras el LCP, número de partículas adaptado al dispositivo y fallback estático.
* **Riesgo legal**: Ley 19.496 (consumidor) sobre retracto en compras a distancia; los términos de inscripción deben definir la política de devolución antes de abrir pagos.
