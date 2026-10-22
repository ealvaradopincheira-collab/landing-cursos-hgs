# Especificación de Diseño y Tokens (Design Spec)
## Proyecto: Landing de Cursos HGS
*Documento de Artesanía Visual y Anti-Slop | Versión: 0.1.0 (propuesta) | 2026-10-22*

> **Estado:** paleta y tipografía **propuestas**. Quedan pendientes de validación contra el logo de HGS, que aún no existe en el proyecto. Si HGS ya tiene colores de marca, estos reemplazan `--brand-primary` y `--brand-accent`, y se recalculan los contrastes.

---

## 1. Intención Estética y Atmósfera Visual
* **Concepto Visual**: «Cuaderno de campo de precisión». Un lienzo claro y silencioso donde el color aparece solo cuando es dato: líneas de flujo, isopiezas, curvas de abatimiento. Los cursos son la imagen.
* **Referencias Visuales** (ver `../referencias/`):
  - **antigravity.google** → Tipografía display a gran escala con tracking negativo, aire vertical de 128 a 192 px entre secciones, tarjetas de medio con radio grande y sin borde, CTA único en píldora oscura, hero de partículas, explorador de producto en filas alternadas.
  - **ingeoexpert.com** → Anatomía de la ficha de curso: datos duros arriba del pliegue, precio por tramo con un CTA cada uno, docente con nombre, ruta de cursos recomendados, formulario lateral de información.

---

## 2. Paleta Cromática Específica del Proyecto

```css
:root {
  /* Lienzo (claro cálido, MEMORY_WEB) */
  --bg-canvas: #FAF9F6;
  --bg-surface: #F1F0EB;
  --bg-inverse: #121317;          /* bloques de video / CTA primario */

  /* Marca */
  --brand-primary: #0F5E7A;       /* azul de acuífero profundo */
  --brand-accent: #A14A07;        /* ocre sedimento: urgencia, cupos, fechas */
  --brand-primary-glow: rgba(15, 94, 122, 0.16);

  /* Texto */
  --text-primary: #121317;
  --text-secondary: #4A4F57;
  --text-muted: #61666F;
  --text-on-inverse: #FFFFFF;

  /* Bordes */
  --border-subtle: rgba(18, 19, 23, 0.08);
  --border-strong: rgba(18, 19, 23, 0.20);
  --border-focus: #0F5E7A;
}

/* Desde la Tarea 7.1 el claro es el predeterminado: el oscuro se activa solo con el
   selector de la cabecera (data-theme="dark" en <html>, guardado en localStorage). */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-canvas: #090D16;
    --bg-surface: #111827;
    --bg-inverse: #F3F4F6;
    --brand-primary: #5CC3DF;
    --brand-accent: #F0A44B;
    --text-primary: #F3F4F6;
    --text-secondary: #A7AEB9;
    --text-muted: #8A919C;
    --text-on-inverse: #090D16;
    --border-subtle: rgba(243, 244, 246, 0.08);
    --border-strong: rgba(243, 244, 246, 0.20);
    --border-focus: #5CC3DF;
  }
}
```

* **Validación de Contraste** (calculada con la fórmula WCAG 2.1, 2026-10-22):

| Par | Sobre `--bg-canvas` | Sobre `--bg-surface` | Veredicto |
|---|---|---|---|
| `--text-primary` claro | 17,63:1 | 16,27:1 | AAA ✅ |
| `--text-secondary` claro | 7,83:1 | 7,23:1 | AAA ✅ |
| `--text-muted` claro | 5,48:1 | 5,06:1 | AA ✅ |
| `--brand-primary` claro | 6,87:1 | 6,34:1 | AA ✅ |
| `--brand-accent` claro | 5,70:1 | 5,26:1 | AA ✅ |
| Blanco sobre `--brand-primary` | 7,24:1 | — | AAA ✅ |
| `--text-primary` oscuro | 17,66:1 | 16,12:1 | AAA ✅ |
| `--text-muted` oscuro | 6,12:1 | 5,58:1 | AA ✅ |
| `--brand-primary` oscuro | 9,55:1 | 8,72:1 | AAA ✅ |
| `--brand-accent` oscuro | 9,36:1 | 8,55:1 | AAA ✅ |

* **Paleta de datos (partículas y figuras)**: escala secuencial de carga hidráulica, de `--brand-primary` (carga alta) a `--brand-accent` (zona de bombeo). Las figuras técnicas de los cursos se regeneran con la paleta CVD-safe Okabe-Ito ya usada en los informes ICA.

---

## 2.1 Logo HGS (`brand/`, v1 — 2026-10-22)

| Archivo | Uso |
|---|---|
| `hgs-simbolo.svg` / `favicon.svg` | Símbolo solo: favicon, avatar de redes, ícono de app |
| `hgs-logo.svg` | Logo horizontal sobre fondo claro |
| `hgs-logo-oscuro.svg` | Logo horizontal sobre fondo oscuro |
| `preview.html` | Hoja de prueba: tamaños 16–256 px, claro y oscuro |

* **Concepto**: corte de un pozo en bombeo. Entubación que baja desde la superficie, rejilla ranurada bajo el nivel dinámico y **cono de abatimiento con la forma real de Cooper-Jacob/Theis** (s ∝ ln(R/r): pendiente fuerte junto al pozo, plano lejos). Contenedor *squircle* de radio 16/64.
* **Colores del símbolo**: zona no saturada `#0F5E7A`, zona saturada `#2E9CC0`, pozo `#FFFFFF` (3,17:1 sobre la zona saturada, sobre el umbral 3:1 de objetos gráficos).
* **Wordmark**: «HGS» en Plus Jakarta Sans 800, tracking −0,02 em; descriptor «HIDROGEOLOGÍA Y GEOCIENCIAS» en Plus Jakarta Sans 600, tracking +0,14 em. **Texto contorneado** (sin dependencia de fuentes instaladas).
* **Área de resguardo**: ½ del alto del símbolo en todos los lados. **Tamaño mínimo**: logo horizontal 160 px de ancho; por debajo, solo símbolo.
* **Generador**: `brand/fuente/make_logo.py` regenera los SVG desde los parámetros del cono (`Y_NE`, `DEPTH`, `RW`, `RMAX`). Uso: `python make_logo.py PlusJakartaSans[wght].ttf ../` con la fuente variable descargada de `github.com/google/fonts/tree/main/ofl/plusjakartasans` (licencia OFL).

---

## 3. Tipografía y Jerarquía Modular

* **Display / Headings**: `'Plus Jakarta Sans'` 600–700, `letter-spacing: -0.03em` en tamaños ≥ 48 px (efecto Antigravity).
* **Cuerpo**: `'Inter'` 400.
* **Datos técnicos**: `'JetBrains Mono'` (horas, fechas, precios en tablas, nombres de software).

| Nivel | Tamaño (móvil → escritorio) | Peso | Line-Height | Uso |
|---|---|---|---|---|
| **Display** | 40 → 80 px (`clamp`) | 700 | 1.05 | H1 del hero de la home |
| **H1** | 32 → 48 px | 700 | 1.15 | Título de la ficha de curso |
| **Statement** | 28 → 56 px | 600 | 1.15 | Párrafo declarativo de la home |
| **H2** | 24 → 40 px | 600 | 1.2 | Títulos de sección |
| **H3** | 20 → 24 px | 600 | 1.3 | Curso en tarjeta, módulo del temario |
| **Body** | 16 → 18 px | 400 | 1.6 | Texto corrido |
| **Caption** | 12 → 14 px | 500 | 1.4 | Chips de horas/fecha, metadatos |

---

## 4. Matriz de Componentes y Estados Interactivos

### Botón primario (píldora)
* **Normal**: fondo `--bg-inverse`, texto `--text-on-inverse`, `border-radius: 999px`, padding 12 × 24 px.
* **Hover**: fondo `--brand-primary`, 200 ms `cubic-bezier(0.16, 1, 0.3, 1)`.
* **Foco**: `outline: 2px solid var(--border-focus); outline-offset: 2px`.
* **Activo**: `transform: scale(0.98)`, 50 ms.
* **Deshabilitado** (sin cohorte/cupos): no se renderiza; se reemplaza por «Avísame de la próxima cohorte».

### Tarjeta de medio (explorador de cursos)
* **Normal**: sin borde, `border-radius: 24px` (32 px en escritorio), fondo `--bg-surface`, figura técnica real a sangre.
* **Hover**: la figura escala `1.02` dentro de su contenedor; la tarjeta no se eleva.

### Chip de dato
* `JetBrains Mono` 13 px, fondo `--bg-surface`, radio 8 px; muestra horas, semanas o fecha. El chip de cupos usa `--brand-accent`.

### Barra de inscripción fija (móvil)
* Altura 64 px, fondo `--bg-canvas` con `--border-subtle` superior; precio a la izquierda y botón primario a la derecha. Aparece cuando el bloque de precio del hero sale del viewport.

---

## 5. Checklist Anti-AI Slop Obligatorio
- [ ] ¿Se eliminaron los gradientes violetas-azules predeterminados?
- [ ] ¿Los espaciados respetan la escala de múltiplos de 4px/8px?
- [ ] ¿Se evitó la anidación excesiva de tarjetas con bordes innecesarios?
- [ ] ¿El texto secundario cumple con contraste mínimo de 4.5:1?
- [ ] ¿Las microinteracciones duran menos de 250 ms y las animaciones de scroll respetan `prefers-reduced-motion`?
- [ ] ¿Toda imagen de curso es una figura técnica real (no stock)?
- [ ] ¿Se diseñaron los estados «sin cohorte», «cupos agotados», envío, éxito y error de formularios?
