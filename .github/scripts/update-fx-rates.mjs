// Actualiza los tipos de cambio hardcoded (FX_RATES) en Academia_AI.html
// usando la API gratuita y sin API key de Frankfurter (datos de referencia
// del Banco Central Europeo, https://www.frankfurter.app). Este script solo
// corre dentro de GitHub Actions (ver .github/workflows/update-fx-rates.yml)
// — el navegador del alumno nunca llama a ninguna API, así que el precio de
// referencia en el sitio nunca falla, tarda ni parpadea por esto.
//
// Si la API falla o responde algo inesperado, el script NO toca el archivo
// y termina con código de salida distinto de cero para que el workflow lo
// marque como fallido — los valores existentes se quedan como están (nunca
// se borran ni se dejan en blanco) y el sitio sigue funcionando igual.

import { readFileSync, writeFileSync } from 'fs';

const FILE = 'Academia_AI.html';
const API_URL = 'https://api.frankfurter.app/latest?from=USD&to=MXN,EUR';

async function main() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error(`La API de tipo de cambio respondió ${res.status}`);
  }
  const data = await res.json();
  const mxn = data && data.rates && data.rates.MXN;
  const eur = data && data.rates && data.rates.EUR;
  if (!mxn || !eur) {
    throw new Error('La respuesta de la API no incluyó MXN/EUR: ' + JSON.stringify(data));
  }

  const mxnRounded = Math.round(mxn * 100) / 100;
  const eurRounded = Math.round(eur * 100) / 100;
  const hoy = new Date().toISOString().slice(0, 10);

  let html = readFileSync(FILE, 'utf8');

  const mxnLinea = /MXN: [\d.]+, \/\/ referencia \d{4}-\d{2}-\d{2} — revisar cada pocos meses/;
  const eurLinea = /EUR: [\d.]+  \/\/ referencia \d{4}-\d{2}-\d{2} — revisar cada pocos meses/;

  if (!mxnLinea.test(html) || !eurLinea.test(html)) {
    throw new Error(
      `No se encontró el bloque FX_RATES esperado en ${FILE}. ` +
      'Puede que el formato del código haya cambiado — revisar manualmente ' +
      'y ajustar las expresiones regulares de este script si hace falta.'
    );
  }

  html = html.replace(mxnLinea, `MXN: ${mxnRounded}, // referencia ${hoy} — revisar cada pocos meses`);
  html = html.replace(eurLinea, `EUR: ${eurRounded}  // referencia ${hoy} — revisar cada pocos meses`);

  writeFileSync(FILE, html);
  console.log(`Tipos de cambio actualizados: MXN=${mxnRounded}, EUR=${eurRounded} (referencia ${hoy})`);
}

main().catch((err) => {
  console.error('Error actualizando tipos de cambio:', err.message);
  process.exit(1);
});
