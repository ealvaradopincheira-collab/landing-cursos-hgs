# Landing de cursos HGS

Sitio estático (Astro 7.3.8) de los cursos de HGS. Especificación completa en [`specs/`](specs/); estado de cada tarea en [`specs/tasks.md`](specs/tasks.md).

## Comandos

En este equipo `node` no está en el PATH de las herramientas: anteponer `export PATH="/c/Program Files/nodejs:$PATH"` (Git Bash) o usar la ruta completa.

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build:borrador` | Build para revisión: valida referencias, permite datos `PENDIENTE` (se muestran como «Por confirmar») |
| `npm run build` | Build de **publicación**: falla mientras quede un dato `PENDIENTE`, contenido sin validar o legales en borrador |
| `npm run preview` | Sirve `dist/` |
| `npm test` | Pruebas de formato, cohortes y física de las figuras (W(u) de Theis, talud infinito) |
| `npm run check` | Tipos y diagnósticos de Astro |

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Un curso (fechas, precio, temario, Link de pago) | `src/content/cursos/<curso>.md` |
| Un docente | `src/content/docentes/<docente>.md` |
| Correo, mínimo de convenio, estado de los legales | `src/config/sitio.ts` |
| Colores y tipografía | `src/styles/tokens.css` (contrato en `specs/design_spec.md`) |
| Logo | `brand/` (generador en `brand/fuente/make_logo.py`) |

Para publicar, `npm run build` lista exactamente qué datos faltan.

## Vista previa para revisión

Cada push a `main` publica el borrador en **https://ealvaradopincheira-collab.github.io/landing-cursos-hgs/** (GitHub Actions, `.github/workflows/vista-previa.yml`). Esa versión no se indexa en buscadores, muestra un aviso de vista previa y no envía formularios. La publicación definitiva es en Netlify (`specs/tasks.md`, Tarea 6.3).

Los enlaces internos se escriben con `ruta('/…')` (`src/lib/rutas.ts`) para que funcionen con y sin el prefijo `/landing-cursos-hgs/`.
