/**
 * Worker do site.
 *
 * Faz duas coisas, e as duas existem porque o site tem rota por URL enquanto o
 * conteudo e desenhado por JavaScript.
 *
 * 1. Caminho de rota nao e arquivo
 *
 * /cases/runpace nao existe no disco, e sem isto o Workers devolve 404 em toda
 * recarga fora da raiz. A saida obvia seria ligar not_found_handling:
 * "single-page-application", e ela foi recusada de proposito: aquele modo
 * devolve o index.html para TODO 404, inclusive imagem que faltou, e um asset
 * com nome errado passaria a responder 200 com HTML dentro. Aqui a regra e mais
 * estreita: cai no app apenas o caminho que nao termina em extensao.
 *
 * 2. O <head> servido era sempre o da home
 *
 * title, canonical, og:* e hreflang sao escritos por JavaScript a cada rota.
 * Quem le sem executar nada (LinkedIn, WhatsApp, Slack, e parte dos robos de
 * busca) via o cabecalho da home nas 36 rotas: mesmo titulo, mesma imagem de
 * compartilhamento, e canonical apontando para "/", o que afirma que todo case
 * e a home.
 *
 * O manifesto cabecalhos.json traz o cabecalho correto de cada rota, gerado por
 * tools/gerar-cabecalhos.py. Aqui ele e costurado na resposta com HTMLRewriter,
 * que trabalha em fluxo e nao carrega o documento na memoria.
 *
 * Qualquer erro nesta parte cai no asset original. O cabecalho errado e ruim;
 * site fora do ar e pior.
 */
const PEDE_ARQUIVO = /\.[a-z0-9]+$/i;

let manifesto = null;

async function lerManifesto(env, url) {
  if (manifesto) return manifesto;
  const r = await env.ASSETS.fetch(new URL('/cabecalhos.json', url));
  if (!r.ok) return null;
  manifesto = await r.json();
  return manifesto;
}

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function reescrever(resposta, cab) {
  const meta = (chave) => ({
    element(el) { if (cab[chave]) el.setAttribute('content', cab[chave]); },
  });

  return new HTMLRewriter()
    .on('html', { element(el) { if (cab.lang) el.setAttribute('lang', cab.lang); } })
    .on('title', { element(el) { if (cab.title) el.setInnerContent(cab.title); } })
    .on('link[rel="canonical"]', { element(el) { if (cab.canonical) el.setAttribute('href', cab.canonical); } })
    .on('meta[name="description"]', meta('desc'))
    .on('meta[property="og:title"]', meta('ogTitle'))
    .on('meta[property="og:description"]', meta('ogDesc'))
    .on('meta[property="og:url"]', meta('ogUrl'))
    .on('meta[property="og:image"]', meta('ogImage'))
    .on('meta[property="og:locale"]', meta('ogLocale'))
    .on('meta[name="twitter:image"]', meta('ogImage'))
    .on('head', {
      element(el) {
        // hreflang e dado estruturado nao existem no HTML de origem: o app os
        // cria por JavaScript. Aqui entram ja prontos, para quem nao executa.
        for (const [lang, href] of cab.alternates || []) {
          el.append(`<link rel="alternate" hreflang="${esc(lang)}" href="${esc(href)}">`, { html: true });
        }
        if (cab.ld) el.append(`<script type="application/ld+json">${cab.ld}</script>`, { html: true });
      },
    })
    .transform(resposta);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const caminho = url.pathname;
    const resposta = await env.ASSETS.fetch(request);

    // Arquivo que existe sai como esta. Arquivo que nao existe sai 404 de
    // verdade: o app so entra em caminho sem extensao.
    const ehRota = caminho === '/' || caminho.endsWith('/index.html')
      ? true
      : (resposta.status === 404 && !PEDE_ARQUIVO.test(caminho));
    if (!ehRota) return resposta;

    // O documento sempre vem de uma busca limpa por /index.html, inclusive na
    // raiz, onde env.ASSETS.fetch(request) tambem responderia. O motivo e que
    // repassar o request original carrega o Accept-Encoding do visitante, e a
    // resposta volta comprimida: o HTMLRewriter recebe bytes que nao sao HTML
    // e devolve o documento intacto, sem reescrever nada. Foi o que aconteceu
    // na home, que saiu sem hreflang e sem JSON-LD enquanto as outras 35 rotas
    // saiam certas.
    const app = await env.ASSETS.fetch(new URL('/index.html', url));
    // 200, e nao 404 com corpo: e uma rota valida do site, servida pelo mesmo
    // documento. Devolver 404 tiraria a pagina do indice.
    const documento = new Response(app.body, { status: 200, headers: app.headers });

    try {
      const m = await lerManifesto(env, url);
      const chave = caminho === '/index.html' ? '/' : caminho.replace(/(.)\/$/, '$1');
      const cab = m && m.rotas && m.rotas[chave];
      if (cab) return reescrever(documento, cab);
    } catch (e) {
      // cabecalho errado e ruim; site fora do ar e pior
    }
    return documento;
  },
};
