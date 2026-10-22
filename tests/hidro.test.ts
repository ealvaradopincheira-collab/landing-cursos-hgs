import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wTheis, wCooperJacob, fsTaludInfinito } from '../src/lib/hidro.ts';

const cerca = (real: number, esperado: number, tolRel = 1e-4) =>
  assert.ok(Math.abs(real - esperado) <= tolRel * Math.abs(esperado), `${real} ≠ ${esperado}`);

// Valores de referencia de la integral exponencial E1(u) = W(u)
// (Abramowitz & Stegun, tabla 5.1; tablas de función de pozo de Theis).
test('W(u) coincide con la tabla de Theis', () => {
  cerca(wTheis(1e-4), 8.6332);
  cerca(wTheis(1e-3), 6.3315);
  cerca(wTheis(1e-2), 4.0379);
  cerca(wTheis(0.1), 1.8229);
  cerca(wTheis(0.5), 0.5598);
  cerca(wTheis(1), 0.21938);
  cerca(wTheis(2), 0.048901);
  cerca(wTheis(5), 0.0011483);
  cerca(wTheis(10), 4.1570e-6);
});

test('W(u) es continua en el cambio de método (u = 1)', () => {
  cerca(wTheis(0.999999), wTheis(1.000001), 1e-5);
});

test('Cooper-Jacob converge a Theis para u pequeño y diverge para u grande', () => {
  assert.ok(Math.abs(wCooperJacob(1e-3) - wTheis(1e-3)) / wTheis(1e-3) < 0.001);
  assert.ok(Math.abs(wCooperJacob(0.1) - wTheis(0.1)) / wTheis(0.1) > 0.05);
});

test('Talud infinito: FS baja al subir el nivel freático y cruza 1 cerca de m = 0,51', () => {
  const base = { beta: 30, phi: 32, c: 5, gamma: 19, gammaW: 9.81, z: 3 };
  const seco = fsTaludInfinito({ ...base, m: 0 });
  const saturado = fsTaludInfinito({ ...base, m: 1 });
  cerca(seco, 1.2849, 1e-3);
  cerca(saturado, 0.7263, 1e-3);
  assert.ok(fsTaludInfinito({ ...base, m: 0.5 }) > 1);
  assert.ok(fsTaludInfinito({ ...base, m: 0.52 }) < 1);
});
