// Rutas internas con el prefijo `base` de Astro: '/' en Netlify y '/landing-cursos-hgs/'
// en la vista previa de GitHub Pages (tasks.md, Tarea 7.3). `p` empieza con '/'.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const ruta = (p: string) => `${BASE}${p}`;
