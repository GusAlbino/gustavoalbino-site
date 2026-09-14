/**
 * Worker do site.
 *
 * Existe por um motivo so: o site passou a ter endereco por pagina
 * (/cases/runpace, /en/projetos/relatorios) e esses caminhos nao sao arquivos.
 * Sem este script o Workers devolve 404 em qualquer recarga fora da raiz, e
 * link compartilhado abre em erro.
 *
 * A saida obvia seria ligar not_found_handling: "single-page-application" no
 * wrangler.jsonc, e ela foi recusada de proposito: aquele modo devolve o
 * index.html para TODO 404, inclusive imagem que faltou. Um asset com nome
 * errado passaria a responder 200 com HTML dentro, e o defeito so apareceria
 * na tela do visitante.
 *
 * Aqui a regra e mais estreita: cai no app apenas o caminho que nao pede
 * arquivo, ou seja, o que nao termina em extensao. /assets/x.webp que nao
 * existe continua 404 de verdade.
 */
const PEDE_ARQUIVO = /\.[a-z0-9]+$/i;

export default {
  async fetch(request, env) {
    const resposta = await env.ASSETS.fetch(request);
    if (resposta.status !== 404) return resposta;

    const url = new URL(request.url);
    if (PEDE_ARQUIVO.test(url.pathname)) return resposta;

    const app = await env.ASSETS.fetch(new URL('/index.html', url));
    // 200, e nao 404 com corpo: e uma rota valida do site, servida pelo mesmo
    // documento. Devolver 404 aqui tiraria a pagina do indice do buscador.
    return new Response(app.body, {
      status: 200,
      headers: app.headers,
    });
  },
};
