// Relaciones físicas de las figuras de los cursos. Se calculan en el build: las curvas
// publicadas son las ecuaciones, no ilustraciones.

const EULER = 0.5772156649015329;

/**
 * Función de pozo de Theis W(u) = E1(u) (integral exponencial).
 * Serie convergente para u ≤ 1; fracción continua de Lentz para u > 1.
 */
export function wTheis(u: number): number {
  if (!(u > 0)) throw new RangeError('u debe ser positivo');
  if (u <= 1) {
    let suma = 0;
    let termino = 1;
    for (let n = 1; n < 60; n++) {
      termino *= -u / n;
      const t = -termino / n;
      suma += t;
      if (Math.abs(t) < 1e-16 * Math.abs(suma)) break;
    }
    return -EULER - Math.log(u) + suma;
  }
  // E1(u) = e^{-u} · 1/(u + 1/(1 + 1/(u + 2/(1 + 2/(u + …)))))  — evaluada con Lentz modificado
  const TINY = 1e-300;
  let b = u + 1;
  let c = 1 / TINY;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i < 200; i++) {
    const a = -i * i;
    b += 2;
    d = 1 / (a * d + b);
    c = b + a / c;
    const delta = c * d;
    h *= delta;
    if (Math.abs(delta - 1) < 1e-15) break;
  }
  return h * Math.exp(-u);
}

/** Aproximación de Cooper-Jacob: W(u) ≈ −γ − ln u (válida para u < 0,01). */
export function wCooperJacob(u: number): number {
  return -EULER - Math.log(u);
}

/**
 * Factor de seguridad de un talud infinito con flujo paralelo a la ladera.
 * m = fracción saturada del espesor (0–1), β y φ' en grados, c' en kPa, γ y γw en kN/m³, z en m.
 */
export function fsTaludInfinito(p: {
  m: number; beta: number; phi: number; c: number; gamma: number; gammaW: number; z: number;
}): number {
  const rad = Math.PI / 180;
  const b = p.beta * rad;
  const cohesion = p.c / (p.gamma * p.z * Math.sin(b) * Math.cos(b));
  const friccion = (1 - (p.m * p.gammaW) / p.gamma) * (Math.tan(p.phi * rad) / Math.tan(b));
  return cohesion + friccion;
}

/** Puntos espaciados logarítmicamente entre a y b (incluidos). */
export function espacioLog(a: number, b: number, n: number): number[] {
  const la = Math.log10(a);
  const lb = Math.log10(b);
  return Array.from({ length: n }, (_, i) => 10 ** (la + ((lb - la) * i) / (n - 1)));
}
