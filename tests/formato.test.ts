import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatoCLP, formatoFecha, formatoFechaCorta, mostrar, TEXTO_PENDIENTE } from '../src/lib/formato.ts';
import { estadoEfectivo, cohorteAbierta, hoyEnChile } from '../src/lib/cohortes.ts';

test('formatoCLP usa punto de miles y signo peso', () => {
  assert.equal(formatoCLP(80000), '$80.000');
  assert.equal(formatoCLP(40000), '$40.000');
  assert.equal(formatoCLP(1250000), '$1.250.000');
});

test('formatoFecha sin coma tras el día de la semana', () => {
  assert.equal(formatoFecha('2026-12-07'), 'lunes 7 de diciembre de 2026');
  assert.equal(formatoFechaCorta('2026-12-07'), 'lun 7 dic');
});

test('las fechas no se desplazan por zona horaria', () => {
  // 1 de enero en UTC sigue siendo 1 de enero (no 31 de diciembre en Chile)
  assert.equal(formatoFecha('2027-01-01'), 'viernes 1 de enero de 2027');
});

test('mostrar reemplaza PENDIENTE', () => {
  assert.equal(mostrar('PENDIENTE'), TEXTO_PENDIENTE);
  assert.equal(mostrar(80000, formatoCLP), '$80.000');
});

const dic = { id: '2026-12', inicio: '2026-12-07', estado: 'abierta' as const };

test('ADV-03: cohorte vencida pasa a cerrada', () => {
  assert.equal(estadoEfectivo(dic, '2026-12-06'), 'abierta');
  assert.equal(estadoEfectivo(dic, '2026-12-07'), 'abierta'); // el día de inicio aún admite inscripción
  assert.equal(estadoEfectivo(dic, '2026-12-08'), 'cerrada');
});

test('agotada y cerrada no se reabren', () => {
  assert.equal(estadoEfectivo({ ...dic, estado: 'agotada' }, '2026-10-22'), 'agotada');
  assert.equal(estadoEfectivo({ ...dic, estado: 'cerrada' }, '2026-10-22'), 'cerrada');
});

test('cohorteAbierta elige la más próxima vigente', () => {
  const mar = { id: '2027-03', inicio: '2027-03-01', estado: 'abierta' as const };
  assert.equal(cohorteAbierta([mar, dic], '2026-10-22')?.id, '2026-12');
  assert.equal(cohorteAbierta([mar, dic], '2026-12-10')?.id, '2027-03');
  assert.equal(cohorteAbierta([dic], '2026-12-10'), undefined);
});

test('hoyEnChile usa America/Santiago', () => {
  // 02:00 UTC del 8-dic es aún 7-dic en Chile (UTC−3 en verano)
  assert.equal(hoyEnChile(new Date('2026-12-08T02:00:00Z')), '2026-12-07');
});
