# Constitución del Proyecto: Landing de Cursos HGS
*Versión: 1.0.0 | Fecha: 2026-10-22 | Estado: Activa*

Este documento define los principios fundacionales, estándares innegociables y límites arquitectónicos que **todo agente de IA o desarrollador humano debe cumplir estrictamente** al contribuir a este proyecto.

Referencias analizadas: [`referencias/deconstruccion_ingeoexpert_antigravity.md`](../referencias/deconstruccion_ingeoexpert_antigravity.md).

---

## 1. Principios Fundamentales de Arquitectura
1. **Contrato Primero (Spec-First)**: Ninguna línea de código debe escribirse sin estar amparada por `prd.md` y `tech_spec.md` aprobados.
2. **Cero Dependencias Innecesarias**: Antes de instalar un paquete npm se debe evaluar si la funcionalidad se implementa con JavaScript nativo en menos de 50 líneas.
3. **Separación Estricta de Responsabilidades**: Presentación (Astro/CSS), datos de cursos (colecciones de contenido) y enlaces de pago residen en capas desacopladas.
4. **El curso es un dato, no una página**: Cada curso se define una sola vez en un archivo de contenido. Fechas, horas, precios y enlaces de pago no se escriben a mano dentro de componentes.
5. **Cero contenido fabricado**: Se prohíbe publicar testimonios, valoraciones, cifras de alumnos, logos de empresas o universidades que no sean reales y autorizados. Una sección sin datos reales no se publica (no se rellena con texto de ejemplo).
6. **Sin copia de referencias**: De Ingeoexpert y Antigravity se toman patrones estructurales; se prohíbe reutilizar sus textos, imágenes, íconos o marca.

---

## 2. Stack Tecnológico Fijado y Restricciones
* **Framework**: Astro (salida estática, islas de JavaScript solo donde exista interacción).
* **Lenguaje**: TypeScript para esquemas y lógica; JavaScript ES2022+ en islas.
* **Estilos**: Vanilla CSS con Custom Properties (`tokens.css`).
* **Cobro**: **Mercado Pago** (cuenta Chile, cobro en CLP).
* **Librerías Permitidas**:
  - [x] Astro + colecciones de contenido (`astro:content`)
  - [x] GSAP con ScrollTrigger y SplitText (animaciones ligadas al scroll)
  - [ ] Lenis u otra librería de scroll suavizado — solo con justificación en `tech_spec.md`
* **Librerías Prohibidas**:
  - ❌ TailwindCSS / Bootstrap (salvo autorización explícita)
  - ❌ Moment.js / Lodash (usar `Intl` y métodos nativos)
  - ❌ jQuery o wrappers heredados
  - ❌ WordPress / WooCommerce / constructores de páginas
* **Fuera del sistema**: Franquicia SENCE / OTEC — **no aplica a este proyecto**.

---

## 3. Estándares de Rendimiento (Performance)
* **Puntaje Lighthouse**: Mínimo 90/100 en Performance, Accesibilidad, SEO y Mejores Prácticas (móvil).
* **Largest Contentful Paint (LCP)**: Inferior a 2,0 s en 4G. El elemento LCP debe ser el H1 en texto, nunca el canvas de partículas.
* **Cumulative Layout Shift (CLS)**: Inferior a 0,05.
* **Bundle Inicial**: CSS consolidado ≤ 60 KB; JavaScript de la home ≤ 100 KB comprimido, excluyendo el canvas de partículas, que se carga tras el primer render.
* **Referencia negativa**: la ficha de curso de Ingeoexpert carga 92 scripts; la ficha HGS no debe superar 10 peticiones de JavaScript.

---

## 4. Accesibilidad e Inclusión (WCAG 2.1 Nivel AA)
* Foco visible (`:focus-visible`) en todo elemento interactivo.
* Contraste mínimo 4,5:1 en texto regular.
* Etiqueta accesible en todo `<button>`, `<a>` e `<input>`; íconos decorativos con `aria-hidden="true"`.
* Navegación completa por teclado (`Tab`, `Enter`, `Escape`).
* Un único `<h1>` y un único landmark `<main>` por página; jerarquía de encabezados sin saltos.
* Carruseles: los clones de bucle infinito deben llevar `aria-hidden="true"` e `inert`.
* **`prefers-reduced-motion: reduce`** desactiva las partículas, el scroll suavizado y las animaciones ligadas al scroll, y muestra un fondo estático equivalente.

---

## 5. Directrices Estéticas Anti-AI Slop
* Prohibidos los fondos de gradiente genéricos violeta/azul sin propósito de marca.
* Prohibida la anidación excesiva de tarjetas (*cardception*).
* Espaciados, márgenes y paddings en el **Grid de 4px / 8px**.
* Microinteracciones (hover, foco, clic) ≤ 250 ms con `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Excepción declarada**: las animaciones narrativas ligadas al scroll (hero de partículas, secuencias ScrollTrigger) pueden exceder 250 ms. Deben mantener 60 FPS, no bloquear la interacción y respetar `prefers-reduced-motion`.
* Las imágenes de cursos deben ser **figuras técnicas reales** (curvas de bombeo, diagramas Piper/Stiff, mallas de modelación, índices espectrales); se prohíbe la fotografía de stock genérica.

---

## 6. Manejo de Errores y Casos Límite
* Todo formulario debe tener estados de envío, éxito, error con reintento y validación en línea sin perder los datos ingresados.
* Un curso sin cohorte abierta debe mostrar el estado «Próximamente / Avísame», nunca un botón de pago activo.
* Un curso con cupos agotados o fecha de inicio vencida debe desactivar el pago automáticamente en el build.
* Ningún dato ingresado por el usuario se renderiza con `innerHTML` sin sanitizar.
* Precios siempre formateados con `Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })` → `$266.750`.
