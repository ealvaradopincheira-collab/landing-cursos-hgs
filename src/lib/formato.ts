// Formatos es-CL para precios y fechas. Las fechas del contenido son días civiles
// (AAAA-MM-DD) y se interpretan en UTC para que la zona horaria del build no las desplace.

const PENDIENTE = 'PENDIENTE';
export const TEXTO_PENDIENTE = 'Por confirmar';

const clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

/** 80000 → "$80.000" */
export function formatoCLP(monto: number): string {
  return clp.format(monto);
}

export function fechaUTC(iso: string): Date {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, d));
}

/** Une las partes de Intl quitando la coma que es-CL pone tras el día de la semana. */
function unirPartes(partes: Intl.DateTimeFormatPart[]): string {
  return partes
    .map((p, i) => (p.type === 'literal' && partes[i - 1]?.type === 'weekday' ? ' ' : p.value))
    .join('')
    .replace(/\.(?=\s|$)/g, '');
}

const largo = new Intl.DateTimeFormat('es-CL', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});
const corto = new Intl.DateTimeFormat('es-CL', {
  weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC',
});

/** "2026-12-07" → "lunes 7 de diciembre de 2026" */
export function formatoFecha(iso: string): string {
  return unirPartes(largo.formatToParts(fechaUTC(iso)));
}

/** "2026-12-07" → "lun 7 dic" */
export function formatoFechaCorta(iso: string): string {
  return unirPartes(corto.formatToParts(fechaUTC(iso)));
}

/** Muestra un dato o "Por confirmar" si aún es PENDIENTE (solo visible en borradores). */
export function mostrar<T>(valor: T | typeof PENDIENTE, formato: (v: T) => string = String): string {
  return valor === PENDIENTE ? TEXTO_PENDIENTE : formato(valor as T);
}
