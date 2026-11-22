// Conteúdo do site (textos PT/EN, cases, acervos), congelado em tools/dados/conteudo.json.
// Antes vivia dentro do index.html do app antigo; agora este JSON é a fonte, e as páginas são geradas por tools/gerar-paginas.mjs.
import fs from 'node:fs';
export function carregarDados() {
  return JSON.parse(fs.readFileSync(new URL('./dados/conteudo.json', import.meta.url), 'utf8'));
}
