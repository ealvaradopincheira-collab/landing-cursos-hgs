// Validaciones de contenido que Astro no hace fallar por sí solo.
//
// Siempre: toda referencia a docentes y prerrequisitos apunta a un archivo existente.
//   (Astro 7.3 solo registra un ERROR en consola y termina el build con código 0.)
// Con --produccion: además bloquea datos PENDIENTE y contenido sin validar por el docente
//   (constitución §1.5).
import { readdir, readFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const produccion = process.argv.includes('--produccion');
const DIR_CURSOS = 'src/content/cursos';
const DIR_DOCENTES = 'src/content/docentes';

const listar = async (dir) => (await readdir(dir)).filter((a) => a.endsWith('.md'));
const ids = async (dir) => new Set((await listar(dir)).map((a) => basename(a, '.md')));

/** Lee una lista YAML del frontmatter en forma `clave: [a, b]` o en bloque `- a`. */
function listaYaml(frontmatter, clave) {
  const lineas = frontmatter.split(/\r?\n/);
  const i = lineas.findIndex((l) => l.startsWith(`${clave}:`));
  if (i === -1) return [];
  const resto = lineas[i].slice(clave.length + 1).trim();
  if (resto.startsWith('[')) {
    return resto.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
  }
  const valores = [];
  for (const l of lineas.slice(i + 1)) {
    const m = l.match(/^\s+-\s+["']?([^"'\s]+)["']?\s*$/);
    if (!m) break;
    valores.push(m[1]);
  }
  return valores;
}

const errores = [];
const pendientes = [];
const idsCursos = await ids(DIR_CURSOS);
const idsDocentes = await ids(DIR_DOCENTES);

for (const [dir, esCurso] of [[DIR_CURSOS, true], [DIR_DOCENTES, false]]) {
  for (const archivo of await listar(dir)) {
    const ruta = join(dir, archivo);
    const texto = await readFile(ruta, 'utf8');
    const frontmatter = texto.split(/^---\s*$/m)[1] ?? '';

    if (esCurso) {
      for (const id of listaYaml(frontmatter, 'docentes')) {
        if (!idsDocentes.has(id)) errores.push(`${ruta}: docente «${id}» no existe en ${DIR_DOCENTES}/`);
      }
      for (const id of listaYaml(frontmatter, 'prerrequisitos')) {
        if (!idsCursos.has(id)) errores.push(`${ruta}: prerrequisito «${id}» no existe en ${DIR_CURSOS}/`);
      }
    }

    texto.split(/\r?\n/).forEach((linea, i) => {
      if (linea.includes('PENDIENTE')) pendientes.push(`${ruta}:${i + 1}  ${linea.trim()}`);
      if (/^contenidoValidado:\s*false/.test(linea)) {
        pendientes.push(`${ruta}:${i + 1}  contenido (resumen, descripción o temario) sin validar por el docente`);
      }
    });
  }
}

const CONFIG_SITIO = 'src/config/sitio.ts';
(await readFile(CONFIG_SITIO, 'utf8')).split(/\r?\n/).forEach((linea, i) => {
  if (linea.includes("'PENDIENTE'")) pendientes.push(`${CONFIG_SITIO}:${i + 1}  ${linea.trim()}`);
  if (/legalesValidados:\s*false/.test(linea)) {
    pendientes.push(`${CONFIG_SITIO}:${i + 1}  términos y privacidad sin revisar (borradores)`);
  }
});

let falla = false;
if (errores.length) {
  console.error(`\n✖ ${errores.length} referencia(s) rota(s):\n`);
  for (const e of errores) console.error(`  ${e}`);
  falla = true;
}
if (produccion && pendientes.length) {
  console.error(`\n✖ ${pendientes.length} dato(s) pendiente(s); el sitio no puede publicarse:\n`);
  for (const p of pendientes) console.error(`  ${p}`);
  console.error('\nPara revisar un borrador use: npm run build:borrador\n');
  falla = true;
}
if (falla) process.exit(1);
console.log(produccion ? '✓ Contenido listo para publicar.' : `✓ Referencias válidas (${pendientes.length} dato(s) pendiente(s), permitido en borrador).`);
