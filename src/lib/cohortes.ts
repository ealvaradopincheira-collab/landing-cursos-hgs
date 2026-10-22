// Estado efectivo de una cohorte a la fecha del build (constitución §6).
// El sitio es estático: la fecha de corte es la del último build, por lo que el
// despliegue debe reconstruirse a diario mientras haya cohortes abiertas.

export type EstadoCohorte = 'abierta' | 'agotada' | 'cerrada';

export interface CohorteBase {
  id: string;
  inicio: string; // AAAA-MM-DD
  estado: EstadoCohorte;
}

/** Fecha civil de hoy en Chile continental, AAAA-MM-DD. */
export function hoyEnChile(ahora: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago' }).format(ahora);
}

/** Una cohorte declarada abierta pasa a cerrada cuando su inicio ya pasó. */
export function estadoEfectivo(cohorte: CohorteBase, hoy: string = hoyEnChile()): EstadoCohorte {
  if (cohorte.estado === 'abierta' && cohorte.inicio < hoy) return 'cerrada';
  return cohorte.estado;
}

/** Primera cohorte (por fecha de inicio) que sigue abierta, o undefined. */
export function cohorteAbierta<C extends CohorteBase>(cohortes: C[], hoy: string = hoyEnChile()): C | undefined {
  return [...cohortes]
    .sort((a, b) => a.inicio.localeCompare(b.inicio))
    .find((c) => estadoEfectivo(c, hoy) === 'abierta');
}
