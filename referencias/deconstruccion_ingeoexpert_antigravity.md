# Deconstrucción de referencias — Landing de cursos de hidrogeología

**Fecha:** 2026-10-22 · **Herramienta:** REA MCP (`capture_browser_scenario`, Chrome 1440×900, es-ES)
**Referencias:** [ingeoexpert.com](https://ingeoexpert.com/) (esqueleto de catálogo y ficha de curso) · [antigravity.google](https://antigravity.google/) (lenguaje visual e interacción)

Evidencia en [`capturas/`](capturas/): 9 capturas de pantalla y 3 árboles de accesibilidad completos (home Ingeoexpert, ficha «Curso de Hidrogeología aplicada», home Antigravity).

> **Regla de uso:** se toman **patrones estructurales**, no textos, imágenes, logos ni marca. Ningún contenido de estas páginas debe copiarse a la landing propia.

---

## 0. Cómo se obtuvo la evidencia

| Captura | Resultado |
|---|---|
| Ingeoexpert, navegador headless | **Bloqueado por Cloudflare** («Verificación de seguridad en curso»). |
| Ingeoexpert, navegador visible + 15 s | Home completa: 541 líneas de árbol a11y + 180 peticiones de red (ficha). |
| Ingeoexpert, ficha de curso | 811 líneas de árbol a11y + red completa. |
| Antigravity, home | 238 líneas de árbol a11y + 86 peticiones + 7 capturas con scroll por pasos. |

Niveles de evidencia (convención REA): **[O]** observado en captura/red · **[I]** inferencia del analista · **[?]** no verificado.

---

## 1. Ingeoexpert — el esqueleto de una escuela de cursos técnicos

### 1.1 Stack [O]

WordPress + tema **OceanWP** (child theme) + **WooCommerce** (cada curso es un «producto») + WooCommerce Subscriptions + Contact Form 7 + **Moodle** como campus (`?moodle_auth_userkey`, plugin `regitro-moodle`) + **WOOCS** (selector de 11 monedas, CLP incluido) + **SeQura** (pago fraccionado) + **Zendesk** (chat) + **Vimeo** (tráiler) + Accredible (`credential.net`, certificado blockchain) + GTM/GA/Meta Pixel/Google Ads. Fuentes: Poppins 400–700, Raleway 600, Open Sans, Font Awesome. Color primario medido: **`#2D5C88`**.

Costo observado: **180 peticiones y 92 scripts** en la ficha de un curso. Es el precio de resolver todo con plugins.

### 1.2 Anatomía de la home [O]

| # | Sección | Función de conversión |
|---|---|---|
| 1 | Barra superior: teléfono, email, Mi cuenta, ES/EN/PT | Contacto inmediato + retorno de alumnos |
| 2 | Header: logo + Nosotros · Cursos · Bolsa de empleo · Recursos · Blog · Contacto · **Campus Virtual** + búsqueda | El campus en el menú principal fideliza |
| 3 | Hero: H «Crece con los mejores cursos técnicos online» + párrafo con **docentes universitarios** + CTA único «Ver cursos» + 2 sellos (Emagister Cum Laude 2026, 4,8) | Promesa + autoridad + un solo camino |
| 4 | Carrusel «Universidades colaboradoras» (13 logos) | Prueba social institucional |
| 5 | «Próximos cursos»: grilla de 20 tarjetas (imagen + título) + «Ver más cursos próximos» | Urgencia por calendario |
| 6 | Banda de cifras: «Más de 30000 alumnos», premio 10 años | Prueba social cuantitativa |
| 7 | «Cursos por especialidad»: 6 categorías con «Ver todos» | Navegación por disciplina |
| 8 | Banda «Más de 20000 certificados emitidos» | Prueba social |
| 9 | Carrusel de 11 testimonios (cita + nombre + curso) | Prueba social individual |
| 10 | Logos «Confían en nosotros empresas como» + «También colaboran» | Prueba social B2B |
| 11 | Newsletter (nombre, apellidos, email, consentimiento) | Captura de lead frío |
| 12 | Footer: dirección, temáticas, 3 últimos posts, redes, acreditación, legales | SEO + confianza |

### 1.3 Anatomía de la ficha de curso — **la pieza clave** [O]

Ver [`02_ingeoexpert_ficha_curso.png`](capturas/02_ingeoexpert_ficha_curso.png).

```
┌──────────────────────────────────────────────────────────────────┐
│ ‹ curso anterior                                curso siguiente › │
│ ┌──────────────────────────┐  H1 Curso de Hidrogeología aplicada │
│ │  VIDEO TRÁILER (Vimeo)   │  ★★★★★ 4,82 (46 valoraciones)        │
│ │  con figura técnica real │  🎓 Modalidad: Online                │
│ │  (curva de bombeo +      │  ⏱ 50 horas / 6 semanas              │
│ │   isopiezas)             │  📅 03/11/2026 al 15/12/2026         │
│ └──────────────────────────┘  ┌ General ──┬ Desempleado/Estud. ┐ │
│                               │ 266750CLP │ 192060CLP          │ │
│                               │[Matricúlate]│[Matricúlate]     │ │
│                               └───────────┴────────────────────┘ │
│                               *precio convertido desde EUR       │
├─────────────────────────────────────────────┬────────────────────┤
│ TABS: Descripción · Contenido · Profesorado │ Solicitar más      │
│ · Método didáctico · Dirigido a ·           │ información        │
│ Certificado · Salidas laborales             │ (form lateral)     │
│ ─ Presentación / Objetivos / Plazas limitadas│                   │
├─────────────────────────────────────────────┴────────────────────┤
│ 46 valoraciones con nombre y fecha (2018 → 2026) + form de reseña │
│ Bonificación para tu empresa (FUNDAE, España)                    │
│ Certificado digital blockchain + enlace a ejemplo verificable    │
│ «También te recomendamos…» (4 cursos de la misma línea)          │
└──────────────────────────────────────────────────────────────────┘
```

Lo que hace bien:

- **Datos duros arriba del pliegue**: modalidad, horas, semanas y fechas exactas, sin adjetivos.
- **Precio diferenciado** (general / estudiante-desempleado) con un CTA por tramo.
- **El tráiler muestra trabajo técnico real**: una interpretación de prueba de bombeo con isopiezas, no una foto de stock.
- **El docente aparece con nombre y especialidad** en la descripción, y el software se nombra (AquiferTest, Surfer, GIS).
- **Ruta de aprendizaje**: las recomendaciones encadenan Hidrogeología aplicada → Hidrogeología de campo → MODFLOW → Transporte de contaminantes.
- **Las reseñas tienen nombre y fecha**, y abarcan 8 años de cohortes.

Lo que se debe evitar (defectos observados):

| Defecto | Evidencia | Consecuencia |
|---|---|---|
| Contenido en pestañas | Solo «Descripción» existe en el árbol accesible; las otras 6 pestañas quedan ocultas | El temario y el profesorado quedan escondidos; en móvil exige tocar 7 pestañas |
| Precio sin separador de miles | `266750CLP` | Ilegible; en Chile debe mostrarse `$266.750 CLP` |
| Jerarquía de encabezados rota | Hero en `h3`, tarjetas en `h2`, nota de precio en `h6` | SEO y lectores de pantalla degradados |
| Clones del carrusel expuestos | Los logos aparecen 2–3 veces en el árbol a11y (`9/13 … 5/13` repetidos) | Ruido para lectores de pantalla |
| Estrellas como fuente tipográfica | Se lee «SSSSS SSSSS Valorado…» | Texto basura en a11y |
| Enlace muerto en menú | «Blog» → `#no-link` | Navegación rota |
| 92 scripts en una ficha | Red de la ficha | LCP y consumo de datos móviles altos |

---

## 2. Antigravity — el lenguaje visual y de interacción

### 2.1 Stack [O]

**Astro** (islas: cada componente con su propio chunk `_astro/<Componente>.astro_..._script.js`) + **GSAP** con **ScrollTrigger**, **SplitText** y **Draggable** + `SmoothScrollLayout` (scroll suavizado) + `CustomCursor` + `video-scrubber` (video controlado por scroll) + `MainParticlesComponent` / `MorphingParticlesComponent` (campo de partículas) + `particleInteractionYield` (cede el hilo principal durante la animación) + `deviceInfo` (detección de SO para el botón de descarga). Fuentes: **Google Sans Flex** y **Google Sans Code**. 86 peticiones en total, la mitad de las de Ingeoexpert.

Tokens medidos: tinta **`#121317`** sobre blanco **`#FFFFFF`**, superficies **`#F8F9FA`** / `#F8F8FB`. Con `prefers-color-scheme: dark` la página se mantuvo clara: **no tiene modo oscuro**.

### 2.2 Anatomía de la home [O]

| # | Sección | Recurso de diseño |
|---|---|---|
| 1 | Header: logo · Productos▾ · Casos de uso▾ · Precios · Empresas · Recursos▾ · CTA píldora negra «Descargar» · idioma | Un solo CTA de alto contraste |
| 2 | Barra de anuncio: chip «NUEVO» + novedad + «Más información →» + cerrar | Novedad sin invadir el hero |
| 3 | Hero: marca + **H1 gigante con tracking negativo** + 1 CTA + **partículas de color dispersas** | Tipografía como imagen; cero fotos |
| 4 | Video de presentación a casi todo el ancho, esquinas ~32 px, botón play flotante | Bloque inmersivo |
| 5 | Arco de 22 íconos circulares (herramientas del producto) | Ritmo visual, inventario sin texto |
| 6 | Declaración en tipografía display (5 líneas, ~56 px) | Statement que reemplaza un párrafo |
| 7 | **Explorador de producto**: 4 filas (texto a la izquierda, medio a la derecha en tarjeta redondeada con UI real o render) + «Explorar producto» | Cada producto muestra su interfaz, no una ilustración |
| 8 | «Creado para desarrolladores…»: H2 a la izquierda, párrafo a la derecha + **carrusel de perfiles en video** («Desarrollador full stack» + «Ver caso») | Segmentación por perfil de usuario |
| 9 | Teaser de precios en 2 columnas: «Para desarrolladores / Disponible sin coste» · «Para organizaciones / Leer más» | B2C y B2B separados |
| 10 | Carrusel del blog: 9 tarjetas (imagen, título, fecha, etiqueta) | Señal de actividad |
| 11 | Newsletter con **checkboxes de temas** + email + consentimiento | Lead segmentado desde el origen |
| 12 | Descarga contextual: «Descarga para Windows» x64 / ARM64 (SO detectado) | El CTA final se adapta al visitante |
| 13 | Footer: lema en display, columnas Producto/Recursos, legales | Cierre limpio |

### 2.3 Gramática visual [O + I]

- **Blanco como lienzo y color solo en el contenido** (partículas, capturas de UI, glow detrás de las tarjetas).
- **Una sola familia tipográfica** a escala extrema: H1 de ~72 px, statement de ~56 px y cuerpo de ~17 px en gris.
- **Mucho aire**: secciones de 120 a 200 px de separación vertical.
- **Tarjetas de medio con radio grande** (~24–32 px) y sin borde; el contenido define el borde.
- **Botón primario en píldora negra y secundario en píldora gris claro** (`#F8F8FB`).
- **Movimiento ligado al scroll** (ScrollTrigger + video scrubber) en lugar de animaciones de entrada genéricas [I].

Defectos observados: dos landmarks `main` anidados, 22 íconos del arco **sin nombre accesible**, texto de consentimiento en inglés dentro de la versión en español y ausencia de modo oscuro.

---

## 3. Síntesis: esqueleto de Ingeoexpert + piel de Antigravity

La conversión de un curso depende de los **datos** (fechas, horas, precio, docente, temario), y ahí manda Ingeoexpert. La **percepción de calidad** depende de la tipografía, el aire y el movimiento con propósito, y ahí manda Antigravity.

### 3.1 Home propuesta

| # | Sección | Origen | Adaptación hidrogeológica |
|---|---|---|---|
| 1 | Header: logo · Cursos · Para empresas · Docentes · Recursos · Contacto · CTA píldora «Ver próxima cohorte» | AG | Sin barra superior de contacto; el contacto va al footer y al CTA |
| 2 | Barra de anuncio | AG | «Cohorte Modelación con FloPy · inicia DD/MM · quedan N cupos» |
| 3 | **Hero con partículas que siguen líneas de flujo hacia un pozo** (cono de abatimiento) y morph entre «acuífero → red de flujo → isopiezas» | AG (MorphingParticles) | Firma visual propia; ningún competidor la tiene |
| 4 | Banda de autoridad: años de consultoría, proyectos en minería, cuencas modeladas | IE | Cifras verificables, sin «+30000 alumnos» inflado |
| 5 | Arco de herramientas que se enseñan: QGIS, MODFLOW 6/FloPy, AquiferTest, Python, GemPy, Sentinel-2… | AG | Nombres en texto; logos solo con licencia |
| 6 | Statement display | AG | Una frase sobre agua subterránea aplicada a proyectos reales |
| 7 | **Explorador de cursos** (filas alternadas texto/medio) | AG + IE | Cada curso con figura real: curva de Theis/Cooper-Jacob, diagrama Piper/Stiff, malla MODFLOW, NDVI; chips con horas · semanas · fecha |
| 8 | Ruta de aprendizaje: Fundamentos → Pruebas de bombeo → Hidroquímica → Modelación numérica | IE (recomendados) | Línea visual con dependencias entre cursos |
| 9 | «Para quién»: geólogo/a junior, ingeniero/a de minas, consultor/a SEIA, profesional DGA | AG (perfiles) | Tarjetas por perfil con el curso de entrada sugerido |
| 10 | Docentes: foto, especialidad y proyectos | IE | Credenciales concretas |
| 11 | Testimonios con nombre, cargo, curso y fecha | IE | Solo reales; vacío hasta tener la 1.ª cohorte |
| 12 | 2 columnas: «Profesionales» / «Empresas (in-company)» | AG (teaser de precios) | Formación cerrada para equipos de faena |
| 13 | Newsletter con temas (Modelación · Bombeo · Hidroquímica · Teledetección) | AG | Leads segmentados por interés |
| 14 | FAQ + footer | IE + AG | — |

### 3.2 Ficha de curso propuesta

1. **Hero de 2 columnas**: tráiler o animación de un resultado del curso a la izquierda; a la derecha H1, docente, chips de modalidad, horas, semanas y fechas, **precio con formato `$266.750 CLP`** en tramos y un CTA por tramo.
2. **Subnavegación pegajosa con anclas** (Descripción · Temario · Docente · Software · Metodología · Certificado · FAQ) en lugar de pestañas. El contenido queda visible, indexable y legible en móvil.
3. **Temario en acordeón por módulo**, con horas por módulo y el entregable práctico de cada uno.
4. **Sección «Software y datos»**: qué se instala, licencias (libre o de prueba) y datasets reales usados.
5. **Formulario lateral pegajoso** «Solicitar información» en escritorio; **barra inferior fija** con precio + CTA en móvil.
6. Certificado (con verificación pública si se emite digital), reseñas, cursos siguientes en la ruta.
7. **Schema.org** `Course` + `CourseInstance` (fechas, modalidad) + `Offer` (precio CLP) + `AggregateRating` (solo con reseñas reales).

---

## 4. Decisiones abiertas (requieren definición del hidrogeólogo)

> Actualizado 2026-10-22: D-01, D-02 y D-04 resueltas. El registro vigente de decisiones está en [`../specs/prd.md`](../specs/prd.md) §0.

| ID | Decisión | Opciones |
|---|---|---|
| D-01 | Marca | ✅ **HGS** |
| D-02 | Cobro | ✅ **Mercado Pago** |
| D-03 | Campus | ¿Dónde se dictan las clases? Moodle, Google Classroom, plataforma del pagador |
| D-04 | Franquicia SENCE | ✅ **No aplica** |
| D-05 | Moneda | Solo CLP o CLP + USD para Latinoamérica |
| D-06 | Catálogo inicial | Qué cursos y con qué fechas de primera cohorte |

## 5. Stack recomendado

**Astro + GSAP (ScrollTrigger/SplitText)**, igual que Antigravity: HTML estático, JavaScript solo en las islas animadas, hosting estático gratuito (Netlify, Vercel, Cloudflare Pages). Los cursos se definen como **colecciones de contenido** (un `.md` por curso con frontmatter: fechas, horas, precios, docente), y cada ficha se genera sola. Se descarta WordPress + WooCommerce: los 92 scripts por ficha observados en Ingeoexpert son la consecuencia directa.

Ajustes contra la memoria web del workspace (`MEMORY_WEB.md`): Google Sans Flex se reemplaza por **Outfit/Plus Jakarta Sans + Inter + JetBrains Mono**, con grid de 4/8 px, contraste AA, `prefers-reduced-motion` desactivando las partículas y el scroll suavizado, y modo oscuro (que Antigravity no tiene).

## 6. No verificado [?]

- **Vista móvil** de ambos sitios (solo se capturó a 1440×900).
- Contenido de las 6 pestañas ocultas de la ficha de Ingeoexpert (Contenido, Profesorado, etc.).
- Implementación del campo de partículas (Canvas 2D o WebGL); no se descompiló el chunk.
- Menús desplegables, `/pricing` y `/product` de Antigravity; páginas de categoría y checkout de Ingeoexpert.
