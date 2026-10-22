// Campo de partículas del hero: flujo regional uniforme + pozo de bombeo (sumidero).
// v = U·x̂ − Q/(2π r²) · (x − xw, y − yw). Las partículas dentro de la zona de captura
// (ancho Q/U aguas arriba) terminan en el pozo; las demás siguen de largo.

interface Particula { x: number; y: number; edad: number }

const PASO = 1;            // px por cuadro a velocidad regional
const LARGO_TRAZO = 7;     // largo del trazo en px a velocidad regional

export function iniciarParticulas(lienzo: HTMLCanvasElement) {
  const ctx = lienzo.getContext('2d');
  if (!ctx) return;
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ancho = 0, alto = 0, dpr = 1;
  let pozo = { x: 0, y: 0 };
  let U = PASO, Q = 0;
  let particulas: Particula[] = [];
  let colores = { base: '#0B78A8', acento: '#A14A07' };
  let animando = false;
  let visible = true;
  let raf = 0;

  const leerColores = () => {
    const css = getComputedStyle(document.documentElement);
    colores = {
      base: css.getPropertyValue('--dato-1').trim() || colores.base,
      acento: css.getPropertyValue('--dato-2').trim() || colores.acento,
    };
  };

  const velocidad = (x: number, y: number) => {
    const dx = x - pozo.x, dy = y - pozo.y;
    const r2 = Math.max(dx * dx + dy * dy, 36);
    const k = Q / (2 * Math.PI * r2);
    return { vx: U - k * dx, vy: -k * dy };
  };

  const nueva = (dispersa = false): Particula => ({
    x: dispersa ? Math.random() * ancho : -Math.random() * 40,
    y: Math.random() * alto,
    edad: 0,
  });

  const dimensionar = () => {
    const rect = lienzo.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    ancho = rect.width;
    alto = rect.height;
    lienzo.width = Math.round(ancho * dpr);
    lienzo.height = Math.round(alto * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const movil = ancho < 768;
    pozo = movil ? { x: ancho * 0.78, y: alto * 0.86 } : { x: ancho * 0.74, y: alto * 0.52 };
    // Zona de captura de ~45 % del alto: ancho aguas arriba = Q / U
    Q = U * alto * 0.45;
    const n = Math.round(Math.min(600, Math.max(140, (ancho * alto) / 4200)));
    particulas = Array.from({ length: n }, () => nueva(true));
  };

  const avanzar = () => {
    for (const p of particulas) {
      const { vx, vy } = velocidad(p.x, p.y);
      p.x += vx;
      p.y += vy;
      p.edad++;
      const dx = p.x - pozo.x, dy = p.y - pozo.y;
      if (dx * dx + dy * dy < 64 || p.x > ancho + 20 || p.y < -20 || p.y > alto + 20) Object.assign(p, nueva());
    }
  };

  const dibujar = () => {
    ctx.clearRect(0, 0, ancho, alto);
    ctx.lineCap = 'round';
    ctx.lineWidth = 1.6;
    for (const p of particulas) {
      const { vx, vy } = velocidad(p.x, p.y);
      const v = Math.hypot(vx, vy);
      const largo = Math.min(LARGO_TRAZO * (v / U), 18);
      const cerca = Math.hypot(p.x - pozo.x, p.y - pozo.y) < alto * 0.18;
      const aparicion = Math.min(1, p.edad / 30);
      ctx.globalAlpha = (cerca ? 0.85 : 0.45) * aparicion;
      ctx.strokeStyle = cerca ? colores.acento : colores.base;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - (vx / v) * largo, p.y - (vy / v) * largo);
      ctx.stroke();
    }
    // Pozo: entubación vertical corta, como en el logo
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = colores.acento;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pozo.x, pozo.y - 28);
    ctx.lineTo(pozo.x, pozo.y + 4);
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  const cuadro = () => {
    avanzar();
    dibujar();
    raf = requestAnimationFrame(cuadro);
  };

  const arrancar = () => {
    if (reducido) {
      // Movimiento reducido: un solo cuadro estático con el campo ya desarrollado
      for (let i = 0; i < 400; i++) avanzar();
      dibujar();
      return;
    }
    if (animando || !visible || document.hidden) return;
    animando = true;
    raf = requestAnimationFrame(cuadro);
  };

  const detener = () => {
    animando = false;
    cancelAnimationFrame(raf);
  };

  leerColores();
  dimensionar();
  for (let i = 0; i < 240; i++) avanzar(); // arranca con el campo desarrollado
  arrancar();

  new ResizeObserver(() => { dimensionar(); for (let i = 0; i < 240; i++) avanzar(); if (reducido) dibujar(); }).observe(lienzo);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) arrancar(); else detener(); }).observe(lienzo);
  document.addEventListener('visibilitychange', () => (document.hidden ? detener() : arrancar()));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { leerColores(); if (reducido) dibujar(); });
}
