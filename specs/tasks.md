# Lista de Tareas Atómicas de Implementación (Tasks Checklist)
## Proyecto: Landing de Cursos HGS
*Lista de Control de Ejecución para Agente | Basada en: `specs/tech_spec.md` v0.2.0 | Generada 2026-10-22*

---

## 📋 Reglas de Ejecución para el Agente Autónomo
1. **Ejecución Secuencial**: Se trabaja en una sola tarea a la vez; no se saltan tareas sin completar la previa.
2. **Actualización de Estado en Tiempo Real**:
   - `[ ]` → `[-]` al comenzar la tarea.
   - `[-]` → `[x]` únicamente tras verificar que el código compila, funciona y no tiene errores de consola.
3. **Commit / Checkpoint Atómico**: Cada tarea completada es una unidad atómica y reversible.
4. **Entorno**: `node` no está en el PATH de las herramientas de este equipo. Usar rutas absolutas: `"C:\Program Files\nodejs\npm.cmd"` y `"C:\Program Files\nodejs\node.exe"`.
5. **Datos ⏳**: Mientras falten datos de `catalogo.md`, el campo se completa con el marcador `PENDIENTE` y el build de producción debe fallar si encuentra alguno (Tarea 1.4). Nunca se inventa un dato para «rellenar».

---

## Bloque 1: Cimientos
- [x] **Tarea 1.1: Proyecto Astro estático**
  - **Acción**: Inicializar Astro (plantilla mínima, TypeScript estricto), `output: 'static'`, `netlify.toml` con comando de build.
  - **Archivos**: `package.json`, `astro.config.mjs`, `tsconfig.json`, `netlify.toml`.
  - **Verificación**: `npm run build` genera `dist/index.html` sin errores.

- [x] **Tarea 1.2: Tokens y estilos base**
  - **Acción**: Volcar los tokens de `design_spec.md` (claro + oscuro), cargar Plus Jakarta Sans, Inter y JetBrains Mono con `font-display: swap` y precarga de la fuente del H1.
  - **Archivos**: `src/styles/tokens.css`, `src/styles/base.css`.
  - **Verificación**: Las variables resuelven en DevTools en ambos esquemas; ningún valor de espaciado fuera de la escala de 4 px.

- [x] **Tarea 1.3: Marca**
  - **Acción**: Copiar los SVG de `brand/` a `public/brand/` y `favicon.svg` a `public/`.
  - **Archivos**: `public/brand/*.svg`, `public/favicon.svg`.
  - **Verificación**: El favicon se ve en la pestaña; el logo carga en claro y oscuro.

- [x] **Tarea 1.4: Esquemas de contenido**
  - **Acción**: Esquemas Zod de `cursos` y `docentes` según `tech_spec.md` §2, con validaciones: `precioCLP` entero > 0, `mpLink` https de dominio Mercado Pago, referencias a docentes existentes, y rechazo del marcador `PENDIENTE` cuando `NODE_ENV=production`.
  - **Archivos**: `src/content.config.ts` (ubicación de Astro 7), `scripts/validar-contenido.mjs`.
  - **Verificación**: ADV-04, ADV-09 y ADV-11 hacen fallar el build con mensaje claro.
  - **Resultado (2026-10-22)**: ✅ precio negativo, texto y decimal; link http y de dominio ajeno; prerrequisito y docente inexistentes (inline y en bloque) → exit 1. Hallazgo: Astro 7.3 solo *registra* las referencias rotas y termina con exit 0; por eso `validar-contenido.mjs` las verifica en todo build.

- [x] **Tarea 1.5: Contenido de la cohorte**
  - **Acción**: Crear los 2 cursos y 3 docentes desde `catalogo.md`; los datos ⏳ quedan como `PENDIENTE`.
  - **Archivos**: `src/content/cursos/pruebas-de-bombeo.md`, `src/content/cursos/remociones-en-masa.md`, `src/content/docentes/{elias-alvarado,gonzalo-suarez,gonzalo-maragano}.md`.
  - **Verificación**: `npm run build:borrador` valida la colección; `npm run build` falla listando cada `PENDIENTE`.
  - **Resultado (2026-10-22)**: ✅ borrador compila; producción bloqueada por 20 datos pendientes. Se añadió `contenidoValidado: false` (resumen, descripción y temario son borradores) que también bloquea producción.

- [x] **Tarea 1.6: Utilidades de formato**
  - **Acción**: `formatoCLP(80000)` → `$80.000`; `formatoFecha('2026-12-07')` → `lunes 7 de diciembre de 2026`; cálculo de estado de cohorte por fecha de build.
  - **Archivos**: `src/lib/formato.ts`, `src/lib/cohortes.ts`.
  - **Verificación**: Pruebas con `node --test` para precio, fecha y cohorte vencida (ADV-03).

---

## Bloque 2: Estructura y navegación
- [x] **Tarea 2.1: Layout base**
  - **Acción**: `<head>` (meta, Open Graph, favicon, preload), enlace «Saltar al contenido», un único `<main>`.
  - **Archivos**: `src/layouts/Base.astro`.
  - **Verificación**: Un solo landmark `main`; validador HTML sin errores.

- [x] **Tarea 2.2: Header y Footer**
  - **Acción**: Header con logo, Cursos, Convenios, Contacto y CTA píldora «Ver cursos»; menú móvil accesible (`Escape` cierra, foco atrapado). Footer con contacto, legales y redes.
  - **Archivos**: `src/components/Header.astro`, `src/components/Footer.astro`.
  - **Verificación**: Navegación completa por teclado; sin scroll horizontal a 320 px (ADV-08).

---

## Bloque 3: Ficha de curso (prioridad: es la página que vende)
- [x] **Tarea 3.1: Ruta dinámica y JSON-LD**
  - **Acción**: `getStaticPaths` desde la colección; JSON-LD `Course` + `CourseInstance` (`courseMode: online`, fechas) + `Offer` (CLP).
  - **Archivos**: `src/pages/cursos/[slug].astro`.
  - **Verificación**: TC-07 en Rich Results Test.

- [x] **Tarea 3.2: Hero de ficha**
  - **Acción**: Figura técnica + H1, docentes, chips (Google Meet · horas · semanas · inicio · horario), precio `formatoCLP`, CTA «Inscribirme». Sin cohorte abierta: «Avísame de la próxima cohorte».
  - **Archivos**: `src/components/FichaHero.astro`.
  - **Verificación**: TC-01 y TC-02 a 375 × 812.

- [x] **Tarea 3.3: Subnavegación y temario**
  - **Acción**: Subnav fija por anclas (Descripción · Temario · Docentes · Software · Convenios · FAQ) con sección activa por `IntersectionObserver`; temario en `<details>` nativos.
  - **Archivos**: `src/components/SubNav.astro`, `src/components/Temario.astro`.
  - **Verificación**: TC-03 con JavaScript desactivado.

- [x] **Tarea 3.4: Docentes y bloque de convenio**
  - **Acción**: Tarjetas de docente desde la colección; bloque «¿Grupo de 6 o más? Convenio para empresas e instituciones» con enlace a `/convenios?curso=slug`.
  - **Archivos**: `src/components/Docentes.astro`, `src/components/BloqueConvenio.astro`.
  - **Verificación**: Docente inexistente en el curso hace fallar el build.

- [x] **Tarea 3.5: Barra de inscripción móvil**
  - **Acción**: Barra fija inferior (precio + «Inscribirme») visible cuando el hero sale del viewport; reserva espacio inferior para no tapar el footer.
  - **Archivos**: `src/components/BarraInscripcion.astro`.
  - **Verificación**: A 375 px aparece al hacer scroll y no cubre contenido final.

---

> **Resultado Bloque 3 (2026-10-22)**: ✅ 2 fichas generadas; JSON-LD omite campos PENDIENTE; TC-01 (barra visible al cargar en 375×812, se oculta con el botón del hero en pantalla y reaparece al bajar), TC-02 (cohorte cerrada: 0 enlaces de pago, «Avísame», `SoldOut`), TC-03 (6/6 entregables en HTML estático), ADV-03 (inicio vencido cierra la cohorte). Corrección durante la verificación: la barra observaba la tarjeta completa y no aparecía; ahora observa el botón «Inscribirme».

## Bloque 4: Inscripción, pago y formularios
- [x] **Tarea 4.1: Componente de formulario**
  - **Acción**: Envío AJAX a Netlify Forms (`application/x-www-form-urlencoded`), honeypot, estados de envío/éxito/error con reintento, conservación de datos y validación en línea.
  - **Archivos**: `src/components/Formulario.astro`, `src/lib/formularios.ts`.
  - **Verificación**: ADV-05 y ADV-06.

- [x] **Tarea 4.2: Página de inscripción con paso de pago**
  - **Acción**: Paso 1, formulario `inscripcion` con id de inscripción generado en cliente. Paso 2, tras el envío exitoso: resumen, instrucción «usa el mismo correo en Mercado Pago» y botón al `mpLink` del curso.
  - **Archivos**: `src/pages/inscripcion/[slug].astro`.
  - **Verificación**: ADV-12 (sin envío no hay botón de pago); TC-04 con el link real en modo prueba.

- [x] **Tarea 4.3: Convenios**
  - **Acción**: Página con formulario `convenio`; `participantes` mínimo 6, con mensaje en línea y enlace a inscripción individual.
  - **Archivos**: `src/pages/convenios.astro`.
  - **Verificación**: TC-05 y ADV-10.

- [x] **Tarea 4.4: Páginas legales**
  - **Acción**: Términos de inscripción (precio, medio de pago, política de retracto y devolución según Ley 19.496 — **texto a validar por HGS**) y privacidad (datos de formularios).
  - **Archivos**: `src/pages/terminos.astro`, `src/pages/privacidad.astro`.
  - **Verificación**: Enlazadas desde el formulario de inscripción (aceptación obligatoria) y el footer.

---

> **Resultado Bloque 4 (2026-10-22)**: ✅ probado contra un *fixture* local de Netlify Forms (POST → 200 o 500 a demanda). Inscripción completa en 390 px: envío vacío → errores en línea → corrección → redirección a `/pago/?id=HGS-XXXXXX` con el mismo código que llegó al servidor; XSS guardado como texto (ADV-05); 5 participantes bloqueados sin llegar al servidor (ADV-10); falla 500 → aviso con datos conservados → «Reintentar» exitoso (ADV-06); curso preseleccionado desde `?curso=`. 11 páginas, 173 enlaces internos, 0 rotos.
> Defectos encontrados y corregidos en la verificación: (1) la caja de error de envío se veía al cargar porque `display: grid` anulaba `[hidden]` → regla global `[hidden] { display: none !important }`; (2) al tocar la casilla de términos tras un envío vacío, el error del campo anterior desaparecía en `focusout`, el formulario se acortaba y el toque caía fuera → el error se limpia en `input`; (3) espacio perdido tras `</strong>` al cortar línea en Astro.
> Decisión de diseño: el paso de pago es una página propia (`/inscripcion/<curso>/pago/`), destino del formulario con y sin JavaScript; el Link de pago es público por naturaleza, por lo que ADV-12 se cumple en el flujo normal, no como control de acceso.

## Bloque 5: Home
- [x] **Tarea 5.1: Hero estático**
  - **Acción**: H1 display, bajada, CTA, chip de anuncio «Cohorte diciembre · inicia lunes 7». El H1 es el elemento LCP.
  - **Archivos**: `src/pages/index.astro`, `src/components/HeroHome.astro`.
  - **Verificación**: LCP < 2,0 s en Lighthouse móvil.

- [x] **Tarea 5.2: Explorador de cursos**
  - **Acción**: Filas alternadas texto/figura por curso con chips de área, inicio, horas y precio, y enlace a la ficha.
  - **Archivos**: `src/components/TarjetaCurso.astro`.
  - **Verificación**: Agregar un 3.er curso de prueba en desarrollo aparece sin tocar componentes (RF-02).

- [x] **Tarea 5.3: Secciones de cierre**
  - **Acción**: Docentes, «Para quién», bloque de convenios, FAQ y CTA final. Sin testimonios ni cifras hasta que existan (constitución §1.5).
  - **Archivos**: `src/pages/index.astro`.
  - **Verificación**: Revisión de contenido real (matriz §3).

- [x] **Tarea 5.4: Hero de partículas**
  - **Acción**: Isla canvas 2D: partículas que siguen líneas de flujo hacia el pozo, con densidad según el dispositivo, inicio tras `requestIdleCallback` y pausa fuera de viewport. Con `prefers-reduced-motion`, imagen estática equivalente.
  - **Archivos**: `src/components/HeroParticulas.astro`, `src/scripts/particulas.ts`.
  - **Verificación**: ADV-07; 60 FPS con CPU 4× en el panel Performance; el LCP no cambia respecto a la Tarea 5.1.

---

> **Resultado Bloque 5 (2026-10-22)**: ✅ home con hero, explorador de cursos con figuras calculadas (curva de Theis y Cooper-Jacob; FS de talud infinito), perfiles, docentes, convenio, preguntas y cierre. Figuras: W(u) contrastada con Abramowitz y Stegun en 9 puntos; paleta validada con `dataviz/validate_palette.js` en claro (#0B78A8/#A14A07) y oscuro (#2E9CC0/#C97A2C) — el azul de marca #0F5E7A no pasa el piso de croma para marcas de datos; tooltip por mouse y teclado con anuncio `aria-live`; tabla de datos. Hero de partículas: flujo regional + pozo (zona de captura), 2 KB, carga en `requestIdleCallback`, pausa fuera de pantalla, cuadro estático con movimiento reducido, máscara bajo el texto. Pendiente medir LCP y FPS (Tarea 6.2).

## Bloque 6: Verificación y salida
- [x] **Tarea 6.1: Auditoría visual**
  - **Acción**: `/web-craft audit` y matriz §3 de `verification_matrix.md`.
  - **Archivos**: Todo el proyecto.
  - **Verificación**: 0 advertencias de slop; contrastes AA en claro y oscuro.

- [x] **Tarea 6.2: Lighthouse y peso**
  - **Acción**: Lighthouse móvil en home y ficha; conteo de peticiones JS de la ficha.
  - **Archivos**: —
  - **Verificación**: ≥ 90 en las 4 categorías; ≤ 10 peticiones JS en la ficha.

- [ ] **Tarea 6.3: Despliegue** ⛔ Bloqueada: requiere cuenta Netlify de HGS, dominio y correo (D-08/D-09) y datos PENDIENTE
  - **Acción**: Publicar en Netlify; activar avisos por correo de los formularios; conectar dominio (D-08).
  - **Archivos**: `netlify.toml`.
  - **Verificación**: Inscripción de prueba de punta a punta en producción (formulario → aviso → Link de pago).

> **Resultado Bloque 6 (2026-10-22)**:
> - **6.1 Auditoría anti-slop** (script determinista sobre todo CSS): 0 gradientes genéricos, 0 `ease` genéricos, 0 duraciones > 250 ms. 5 coincidencias revisadas: 4 excepciones justificadas (honeypot fuera de pantalla, patrón `solo-lectores`, alineación óptica de casilla, ancho del logo) y 1 defecto corregido (tabla de datos de la figura sin contenedor `overflow-x`).
> - **ADV-08 / responsivo**: medición `scrollWidth` vía CDP en 9 páginas × 4 anchos (320/375/768/1280) con todos los `<details>` abiertos → 0 desbordes, tras corregir hijos de grid sin `min-width: 0` (la tabla abierta ensanchaba la página a 532 px en móvil).
> - **6.2 Lighthouse 13.5.0 móvil**: rendimiento 99–100, accesibilidad 100, buenas prácticas 100, SEO 100 (63 en `/inscripcion/`, por `noindex` deliberado). LCP 1,6–1,8 s, CLS 0 en las 6 páginas medidas, TBT 0 ms, 0–2 peticiones JS. Correcciones: CSS incrustado (`inlineStylesheets: 'always'`, 25 KB en total), precarga solo del subconjunto `latin` de las fuentes display y cuerpo (CLS de inscripción 0,181 → 0), `font-display: optional` para la monoespaciada (CLS de ficha 0,069 → 0).
> - **Partículas**: peor cuadro 14,0 ms con CPU 4× en 390 px (presupuesto 16,7 ms para 60 FPS).
