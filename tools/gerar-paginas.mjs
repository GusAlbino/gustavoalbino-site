// Gera o site inteiro (PT e EN) em public/, no estilo Quadrinhos escuro (D.S. v3).
// O conteúdo vem dos dados de public/index.html (tools/dados-site.mjs); o desenho vem de public/ds-v2/*.css.
// Uso: node tools/gerar-paginas.mjs   (gera também o sitemap.xml)
import fs from 'node:fs';
import { carregarDados } from './dados-site.mjs';

const D = carregarDados();
const SAIDA = new URL('../public/', import.meta.url);
const CAB = JSON.parse(fs.readFileSync(new URL('./dados/cabecalhos.json', import.meta.url), 'utf8')).rotas;
const SITE = 'https://gustavoalbino.com.br';
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const NAV = {
  pt: { cases: 'Cases', projetos: 'Projetos', servicos: 'Serviços', sobre: 'Sobre', cv: 'CV', contato: 'Contato' },
  en: { cases: 'Cases', projetos: 'Projects', servicos: 'Services', sobre: 'About', cv: 'CV', contato: 'Contact' },
};
const FOOT = {
  pt: { marca: 'Senior Designer e Lead Designer do Kaya Doc. Marca, produto e editorial, de Betim para quem trabalha remoto.', cases: 'Cases', proj: 'Projetos', site: 'Site', fale: 'Vamos conversar', resp: 'Resposta em até 2 dias úteis', topo: 'Voltar ao topo ↑', inicio: 'Início' },
  en: { marca: 'Senior Designer and Lead Designer of Kaya Doc. Brand, product and editorial, from Betim to remote teams.', cases: 'Cases', proj: 'Projects', site: 'Site', fale: "Let's talk", resp: 'Reply within 2 business days', topo: 'Back to top ↑', inicio: 'Home' },
};
// rota de cada página: caminho sem barra inicial. A home PT é "" e a EN é "en".
const ROTA = {
  home: ['', 'en'], cases: ['cases', 'en/cases'], projetos: ['projetos', 'en/projects'], servicos: ['servicos', 'en/services'],
  sobre: ['sobre', 'en/about'], cv: ['cv', 'en/cv'], contato: ['contato', 'en/contact'],
  relatorios: ['projetos/relatorios', 'en/projects/reports'], ebooks: ['projetos/ebooks', 'en/projects/ebooks'],
  culturais: ['projetos/culturais', 'en/projects/cultural'], logos: ['projetos/logos', 'en/projects/logos'], ilustracao: ['projetos/ilustracao', 'en/projects/illustration'],
};
const caminho = (lang, chave, caseId) => (chave === 'caso' ? (lang === 'en' ? 'en/cases/' : 'cases/') + caseId : ROTA[chave][lang === 'en' ? 1 : 0]);
const href = (lang, chave, caseId) => '/' + caminho(lang, chave, caseId);
const caseHref = (lang, id) => href(lang, 'caso', id);
const arquivoDe = (rota) => (rota === '' ? 'index.html' : rota + '.html');
let ctx = { chave: 'home' };

function cabecalho(lang) {
  const rota = '/' + caminho(lang, ctx.chave, ctx.caseId);
  let c = CAB[rota === '/' ? '/' : rota];
  const par = (l) => SITE + '/' + caminho(l, ctx.chave, ctx.caseId);
  if (!c) { // página nova, sem entrada no manifesto antigo (ex.: CV)
    const T = D.DICT[lang].cv;
    c = { title: `${T.title} · Gustavo Albino`, lang: lang === 'en' ? 'en' : 'pt-BR', desc: lang === 'en' ? 'Résumé of Gustavo Albino: Senior Designer and Lead Designer of Kaya Doc. 10+ years in design, product, brand and editorial.' : 'Currículo de Gustavo Albino: Senior Designer e Lead Designer do Kaya Doc. Mais de 10 anos de design, produto, marca e editorial.',
      canonical: par(lang), ogUrl: par(lang), ogImage: SITE + '/assets/og-card.png', ogLocale: lang === 'en' ? 'en_US' : 'pt_BR',
      alternates: [['pt-BR', par('pt')], ['en', par('en')], ['x-default', par('pt')]] };
    c.ogTitle = c.title; c.ogDesc = c.desc;
  }
  return `<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.desc)}">
<link rel="canonical" href="${esc(c.canonical)}">
<link rel="icon" href="/assets/logo-seal-black.webp">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Gustavo Albino">
<meta property="og:title" content="${esc(c.ogTitle)}">
<meta property="og:description" content="${esc(c.ogDesc)}">
<meta property="og:url" content="${esc(c.ogUrl)}">
<meta property="og:image" content="${esc(c.ogImage)}">
<meta property="og:locale" content="${esc(c.ogLocale)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(c.ogImage)}">
${(c.alternates || []).map(([l, u]) => `<link rel="alternate" hreflang="${esc(l)}" href="${esc(u)}">`).join('\n')}
${c.ld ? `<script type="application/ld+json">${c.ld}</script>` : ''}`;
}

function casca(lang, ativo, titulo, corpo, extra = '') {
  const t = DICTL(lang), n = NAV[lang], f = FOOT[lang];
  const outro = lang === 'pt' ? 'en' : 'pt';
  const link = (k) => `<li><a href="${href(lang, k)}"${k === ativo ? ' aria-current="page"' : ''}>${n[k]}</a></li>`;
  return `<!doctype html>
<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${cabecalho(lang)}
<link rel="stylesheet" href="/ds-v2/tokens.css">
<link rel="stylesheet" href="/ds-v2/componentes.css">
<link rel="stylesheet" href="/ds-v2/paginas.css">
<script src="/analytics.js" defer></script>
</head>
<body>
<div class="fundo" aria-hidden="true"></div>
<div class="pagina">
  <header class="topo">
    <a class="card logo" href="${href(lang, 'home')}" aria-label="Gustavo Albino"><img class="sel" src="/assets/logo-seal-black.webp" alt="" width="52" height="52"><span class="mono">Gustavo Albino</span></a>
    <nav class="card navbar" aria-label="${lang === 'pt' ? 'Principal' : 'Main'}">
      <ul class="mono">${['cases', 'projetos', 'servicos', 'sobre', 'cv'].map(link).join('')}</ul>
      <div class="dir">
        <span class="idioma" role="group" aria-label="Idioma"><a href="${href('pt', ctx.chave, ctx.caseId)}" ${lang === 'pt' ? 'aria-current="true"' : ''}>PT</a><a href="${href('en', ctx.chave, ctx.caseId)}" ${lang === 'en' ? 'aria-current="true"' : ''}>EN</a></span>
        <a class="btn" href="${href(lang, 'contato')}">${n.contato}</a>
      </div>
    </nav>
  </header>
${corpo}
</div>
<footer class="card rodape" aria-label="${lang === 'pt' ? 'Rodapé' : 'Footer'}">
  <div class="col f-marca"><img class="sel" src="/assets/logo-seal-black.webp" alt="" width="40" height="40"><p>${esc(f.marca)}</p><span class="mono">Betim · Minas Gerais</span></div>
  <nav class="col f-cases" aria-label="Cases"><h2 class="mono">${f.cases}</h2><ul>${D.CASES.map((c) => `<li><a href="${caseHref(lang, c.id)}">${esc(c.title[lang])}</a></li>`).join('')}</ul></nav>
  <nav class="col f-proj" aria-label="${f.proj}"><h2 class="mono">${f.proj}</h2><ul>${['logos', 'relatorios', 'ebooks', 'culturais', 'ilustracao'].map((k) => `<li><a href="${href(lang, k)}">${esc(projNome(lang, k))}</a></li>`).join('')}</ul></nav>
  <nav class="col f-site" aria-label="${f.site}"><h2 class="mono">${f.site}</h2><ul><li><a href="${href(lang, 'home')}">${f.inicio}</a></li>${['cases', 'projetos', 'servicos', 'sobre', 'cv', 'contato'].map((k) => `<li><a href="${href(lang, k)}">${n[k]}</a></li>`).join('')}</ul></nav>
  <div class="col f-fale card--hl"><div><p class="grande">${f.fale}</p></div><div>
    <a class="mail" href="mailto:${D.LINKS.email}">${D.LINKS.email}</a>
    <ul style="margin-top:6px"><li><a href="${D.LINKS.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li><li><a href="${D.LINKS.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="${D.LINKS.instagram}" target="_blank" rel="noopener">Instagram</a></li></ul>
    <p class="mono" style="margin:8px 0 0;opacity:.85;font-size:10px">${f.resp}</p></div></div>
  <div class="f-base mono"><span>© 2026 Gustavo Albino</span><span>gustavoalbino.com.br</span><a href="#topo">${f.topo}</a></div>
</footer>
${extra}
${SCRIPT_FILTROS}
</body>
</html>
`;
}
const DICTL = (lang) => D.DICT[lang];
function projNome(lang, k) {
  const m = { logos: { pt: 'Logos', en: 'Logos' }, relatorios: { pt: 'Relatórios', en: 'Reports' }, ebooks: { pt: 'E-books', en: 'E-books' }, culturais: { pt: 'Culturais', en: 'Cultural' }, ilustracao: { pt: 'Ilustração', en: 'Illustration' } };
  return m[k][lang];
}
const cab = (kicker, titulo, intro, acoes = '', filtros = '') => `  <section class="card cab" id="topo"><div class="cab-linha"><div class="cab-tit"><span class="mono tag-ouro">${esc(kicker)}</span><h1 class="disp">${esc(titulo)}</h1></div>${filtros}</div>${intro ? `<p class="intro">${esc(intro)}</p>` : ''}${acoes ? `<div class="acoes">${acoes}</div>` : ''}</section>`;
// filtros: botões ao lado do título. `alvo` é o seletor da lista; cada item da lista leva data-cat.
const chips = (lang, itens, alvo) => `<div class="filtros" role="group" aria-label="${lang === 'pt' ? 'Filtrar' : 'Filter'}" data-alvo="${alvo}">${itens.map((f, i) => `<button type="button" data-f="${esc(f.key)}" aria-pressed="${i === 0}">${esc(f.rot)}</button>`).join('')}</div>`;
const SCRIPT_FILTROS = `<script>(function(){[].forEach.call(document.querySelectorAll('.filtros'),function(g){var bs=[].slice.call(g.querySelectorAll('button')),it=[].slice.call(document.querySelectorAll(g.dataset.alvo+' [data-cat]'));bs.forEach(function(b){b.addEventListener('click',function(){bs.forEach(function(x){x.setAttribute('aria-pressed',x===b)});it.forEach(function(e){e.style.display=(b.dataset.f==='all'||e.dataset.cat===b.dataset.f)?'':'none'})})})})})();</script>`;

const paginas = {};

// ---------- CASES ----------
paginas.cases = (lang) => {
  const p = DICTL(lang).casesPage;
  const f = chips(lang, D.CASE_FILTERS.map((x) => ({ key: x.key, rot: x[lang] })), '#lista');
  const cards = D.CASES.map((c) => `<a class="card card--img item" data-cat="${c.cat}" href="${caseHref(lang, c.id)}"><img src="/${c.bgImage}" alt="" loading="lazy"><span class="mono ano">${esc(c.year)}</span><span class="rot"><b>${esc(c.title[lang])}</b><span class="mono">${esc(c.typeLabel[lang])}</span><p>${esc(c.blurb[lang])}</p></span></a>`).join('\n    ');
  return casca(lang, 'cases', p.title, `${cab((lang === 'pt' ? 'Acervo · ' : 'Collection · ') + D.CASES.length + ' cases', p.title, p.intro, '', f)}
  <div class="g3" id="lista">
    ${cards}
  </div>`);
};

// ---------- PROJETOS ----------
paginas.projetos = (lang) => {
  const p = DICTL(lang).galPage;
  const rota = { reports: 'relatorios', ilustracao: 'ilustracao', ebooks: 'ebooks', culturais: 'culturais', grafico: 'logos' };
  const f = chips(lang, D.GAL_FILTERS.map((x) => ({ key: x.key, rot: x[lang] })), '#lista');
  const cards = D.GAL.map((g) => `<a class="card card--img item${g.cat === 'grafico' ? ' item--img-contida' : ''}" data-cat="${g.cat}" href="${href(lang, rota[g.cat])}"><img src="/${g.img}" alt="" loading="lazy"><span class="rot"><b>${esc(g[lang])}</b></span></a>`).join('\n    ');
  return casca(lang, 'projetos', p.title, `${cab(p.kicker, p.title, p.intro, '', f)}\n  <div class="g3" id="lista">\n    ${cards}\n  </div>`);
};

// ---------- SERVIÇOS ----------
// ícones dos serviços: traço em preto AMOLED, só um leve contraste com o fundo do quadro
const ICONES_SERVICO = [
  '<path d="M12 3l2.4 5.6L20 9l-4.2 3.8L17 19l-5-3-5 3 1.2-6.2L4 9l5.6-.4z"/>', // branding
  '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>', // produto digital
  '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>', // website
  '<path d="M4 4h16v7H4zM4 15h9M4 19h6"/><path d="M17 15l3 2-3 2z"/>', // landing page
  '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>', // estratégia
  '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', // planejamento
];
paginas.servicos = (lang) => {
  const T = DICTL(lang), p = T.servPage;
  const cards = T.services.map((s, i) => `<article class="card bloco servico"><div class="servico-topo"><h2>${esc(s.title)}</h2><svg class="ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONES_SERVICO[i] || ''}</svg></div><p>${esc(s.desc)}</p><a class="btn" href="${href(lang, 'contato')}">${esc(p.cta)}</a></article>`).join('\n    ');
  return casca(lang, 'servicos', p.title, `${cab(p.kicker, p.title, p.intro)}\n  <div class="g3" id="lista">\n    ${cards}\n  </div>`);
};

// ---------- SOBRE ----------
paginas.sobre = (lang) => {
  const T = DICTL(lang), s = T.sobre;
  const f = chips(lang, [{ key: 'all', rot: lang === 'pt' ? 'Tudo' : 'All' }, { key: 'quem', rot: lang === 'pt' ? 'Quem sou' : 'About' }, { key: 'entrega', rot: lang === 'pt' ? 'O que entrego' : 'What I deliver' }], '#lista');
  const corpo = `${cab(s.kicker, s.title, '', '', f)}
  <div id="lista" style="display:grid;gap:var(--gap)">
  <div class="g2" data-cat="quem" style="grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)">
    <figure class="card card--img sobre-foto" style="margin:0"><img src="/assets/sobre-pedra-grande.webp" alt="" loading="lazy"><figcaption class="rot mono">${esc(s.imgTag)}</figcaption></figure>
    <div class="card bloco"><div class="texto-longo">${s.paras.map((x) => `<p>${esc(x)}</p>`).join('')}</div></div>
  </div>
  <div class="g4 mantem" data-cat="entrega">${T.entrega.pillars.map((x) => `<article class="card bloco servico"><span class="num">${x.num}</span><h2>${esc(x.title)}</h2><p>${esc(x.desc)}</p></article>`).join('')}</div>
  </div>`;
  return casca(lang, 'sobre', s.kicker, corpo);
};

// ---------- CV ----------
paginas.cv = (lang) => {
  const T = DICTL(lang), c = T.cv;
  const cargoKaya = lang === 'pt' ? 'Senior Designer · Lead Designer do Kaya Doc' : 'Senior Designer · Lead Designer of Kaya Doc';
  const barras = (arr) => `<ul class="barras">${arr.map((x) => `<li><span>${esc(x.label)}<em class="mono" style="font-style:normal;color:var(--muted)">${x.level}/5</em></span><i><b style="width:${x.level * 20}%"></b></i></li>`).join('')}</ul>`;
  const corpo = `<section class="card cab cv-intro"><span class="mono tag-ouro">${esc(c.kicker)}</span><div class="cv-linha"><div class="cv-btns"><a class="btn btn--ouro" href="/assets/gustavo-albino-cv-pt.pdf" download>${esc(c.btnPT)}</a><a class="btn btn--ghost" href="/assets/gustavo-albino-cv-en.pdf" download>${esc(c.btnEN)}</a></div><p class="intro">${esc(c.intro)}</p></div></section>
  <div class="g4 mantem">${c.stats.map((s) => `<div class="card bloco stat"><b>${esc(s.num)}</b><span class="mono">${esc(s.label)}</span></div>`).join('')}</div>
  <div class="g2" style="grid-template-columns:minmax(0,1.5fr) minmax(0,1fr)">
    <section class="card bloco"><h2 class="mono">${esc(c.expTitle)}</h2>${c.timeline.map((e) => `<div class="linha"><span class="mono">${esc(e.period)}</span><div><h3>${esc(e.company)}</h3><span class="mono" style="color:var(--ouro)">${esc(e.company === 'Kaya Mind' ? cargoKaya : e.role)} · ${esc(e.place)}</span><p style="margin-top:8px;color:var(--fg2)">${esc(e.desc)}</p></div></div>`).join('')}</section>
    <div style="display:grid;gap:var(--gap);align-content:start">
      <section class="card bloco"><h2 class="mono">${esc(c.skillsTitle)}</h2>${barras(c.skills)}</section>
      <section class="card bloco"><h2 class="mono">${esc(c.langTitle)}</h2>${barras(c.languages)}</section>
      <section class="card bloco"><h2 class="mono">${esc(c.toolsTitle)}</h2><ul class="etiquetas">${c.tools.map((x) => `<li>${esc(x.label)}</li>`).join('')}</ul><h2 class="mono" style="margin-top:10px">${esc(c.aiTitle)}</h2><ul class="etiquetas">${c.aiTools.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
    </div>
  </div>`;
  return casca(lang, 'cv', c.title, corpo);
};

// ---------- CONTATO ----------
paginas.contato = (lang) => {
  const T = DICTL(lang), p = T.contatoPage;
  const opts = T.projectTypes.map((x) => `<option>${esc(x)}</option>`).join('');
  const corpo = `${cab(p.kicker, p.title, p.text)}
  <div class="g2" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr)">
    <form class="card bloco form" id="form" novalidate>
      <label><span class="mono">${esc(p.fName)}</span><input name="nome" autocomplete="name" placeholder="${esc(p.phName)}" required></label>
      <label><span class="mono">${esc(p.fEmail)}</span><input name="email" type="email" autocomplete="email" required></label>
      <label><span class="mono">${esc(p.fType)}</span><select name="tipo">${opts}</select></label>
      <label><span class="mono">${esc(p.fMsg)}</span><textarea name="msg" placeholder="${esc(p.phMsg)}"></textarea></label>
      <button class="btn btn--ouro" type="submit" style="justify-self:start">${esc(p.send)}</button>
    </form>
    <div style="display:grid;gap:var(--gap);align-content:start">
      <div class="card bloco aviso" id="aviso" role="status"><h2 class="mono tag-ouro">${esc(p.sentTitle)}</h2><p>${esc(p.sentText)}</p></div>
      <div class="card bloco"><h2 class="mono tag-ouro">${esc(p.availTitle)}</h2><p>${esc(p.availText)}</p>
        <ul class="canais"><li><a href="mailto:${D.LINKS.email}">${D.LINKS.email}</a></li><li><a href="${D.LINKS.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li><li><a href="${D.LINKS.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="${D.LINKS.instagram}" target="_blank" rel="noopener">Instagram</a></li></ul></div>
    </div>
  </div>`;
  const js = `<script>(function(){var f=document.getElementById('form');f.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(f),t=${JSON.stringify(lang === 'pt' ? 'Oi Gustavo, sou ' : "Hi Gustavo, I'm ")}+d.get('nome')+'. '+${JSON.stringify(lang === 'pt' ? 'Projeto: ' : 'Project: ')}+d.get('tipo')+'. '+d.get('msg')+' ('+d.get('email')+')';window.open('https://wa.me/5531971422346?text='+encodeURIComponent(t),'_blank','noopener');document.getElementById('aviso').classList.add('on')})})();</script>`;
  return casca(lang, 'contato', p.title, corpo, js);
};

// ---------- SUBPÁGINAS DE PROJETOS ----------
paginas.relatorios = (lang) => {
  const p = DICTL(lang).anuariosPage;
  const itens = D.ANUARIOS.map((a) => {
    const fichaHtml = (a.ficha || []).length ? `<div class="ficha-mini">${a.ficha.map((f) => `<div><span class="mono">${esc(f.k[lang])}</span><b>${esc(f.v[lang])}</b></div>`).join('')}</div>` : '';
    const statsHtml = (a.stats || []).length ? `<div class="stats-mini">${a.stats.map((s) => `<div><b>${esc(s.num)}</b><span>${esc(s.label[lang])}</span></div>`).join('')}</div>` : '';
    const imgsHtml = (a.imgs || []).length ? `<div class="thumbs">${a.imgs.map((i) => `<figure><img src="/${i.src}" alt="${esc(i.alt[lang])}" loading="lazy"></figure>`).join('')}</div>` : '';
    return `<article class="ficha" id="${esc(a.id)}"><a class="card card--img capa" href="${esc(a.link)}" target="_blank" rel="noopener"><img src="/${a.cover}" alt="" loading="lazy" style="object-position:center top"></a><div class="card bloco"><span class="mono tag-ouro tag-edicao">${esc(a.edicao[lang])}</span><h2>${esc(a.title[lang])} ${esc(a.year)}</h2><p class="tema" style="white-space:normal">${esc(a.tema[lang].replace(/\n/g, " "))}</p>${(a.desc[lang] || []).map((x) => `<p>${esc(x)}</p>`).join('')}${statsHtml}${fichaHtml}${imgsHtml}<a class="btn btn--ghost" style="align-self:flex-start;margin-top:auto" href="${esc(a.link)}" target="_blank" rel="noopener">${esc(p.verNaKaya)}</a></div></article>`;
  }).join('\n  ');
  return casca(lang, 'projetos', p.title, `${cab(p.kicker, p.title, p.intro)}\n  ${itens}`);
};
paginas.ebooks = (lang) => {
  const s = D.EBOOK_SERIES[0], L = lang === 'pt' ? 'Pt' : 'En';
  const itens = s.items.map((b) => `<a class="card card--img item item--alto" href="${esc(b.url)}" target="_blank" rel="noopener"><img src="/${b.src}" alt="" loading="lazy"><span class="mono ano">${esc(b.year)}</span><span class="rot"><b>${esc(b.title)}</b></span></a>`).join('\n    ');
  return casca(lang, 'projetos', 'E-books', `${cab('E-books · Kaya Mind', s.name, s['desc' + L], `<a class="btn btn--ouro" href="${esc(s.site)}" target="_blank" rel="noopener">${esc(s['siteLabel' + L])}</a>`)}\n  <div class="g4">\n    ${itens}\n  </div>`);
};
paginas.culturais = (lang) => {
  const p = DICTL(lang).culturaisPage;
  const itens = D.CULTURAIS.map((c) => `<article class="ficha"><a class="card card--img capa" href="${esc(c.link)}" target="_blank" rel="noopener"><img src="/${c.poster}" alt="" loading="lazy"></a><div class="card bloco"><span class="mono tag-ouro">${esc(c.edicao[lang])} · ${esc(c.ano)}</span><h2>${esc(c.title[lang])}</h2><p class="tema" style="white-space:normal">${esc(c.tema[lang].replace(/\n/g, " "))}</p><a class="btn btn--ghost" style="align-self:flex-start;margin-top:auto" href="${esc(c.link)}" target="_blank" rel="noopener">${esc(p.link)}</a></div></article>`).join('\n  ');
  return casca(lang, 'projetos', p.title, `${cab(p.kicker, p.title, p.intro)}\n  ${itens}`);
};
paginas.logos = (lang) => {
  const p = DICTL(lang).logosPage, L = lang === 'pt' ? 'Pt' : 'En';
  const marcas = D.LOGO_BRANDS.map((b) => `<article class="card card--img item item--img-contida" style="background:${b.tint}"><img src="/${b.big}" alt="${esc(b.name)}" loading="lazy" style="background:${b.tint}"><span class="rot"><b>${esc(b.name)}</b><span class="mono">${esc(b['tag' + L])}</span></span></article>`);
  const solos = D.LOGO_SOLOS.map((b) => `<article class="card card--img item item--img-contida"><img src="/${b.src}" alt="${esc(b.name)}" loading="lazy" style="background:${b.tint}"><span class="rot"><b>${esc(b.name)}</b><span class="mono">${esc(b['tag' + L])}</span></span></article>`);
  return casca(lang, 'projetos', p.title, `${cab(p.kicker, p.title, p.intro)}\n  <div class="g3">\n    ${[...marcas, ...solos].join('\n    ')}\n  </div>`);
};
// proporção de uma imagem WebP, lida do cabeçalho do arquivo; a galeria usa para fechar cada linha sem buraco
function proporcao(src) {
  if (src.endsWith('.mp4')) return 16 / 9;
  try {
    const f = fs.openSync(new URL(src, SAIDA), 'r'), b = Buffer.alloc(32); fs.readSync(f, b, 0, 32, 0); fs.closeSync(f);
    const t = b.toString('ascii', 12, 16); let w, h;
    if (t === 'VP8 ') { w = b.readUInt16LE(26) & 0x3fff; h = b.readUInt16LE(28) & 0x3fff; }
    else if (t === 'VP8L') { w = 1 + (b[21] | ((b[22] & 0x3f) << 8)); h = 1 + ((b[22] >> 6) | (b[23] << 2) | ((b[24] & 0xf) << 10)); }
    else if (t === 'VP8X') { w = 1 + b.readUIntLE(24, 3); h = 1 + b.readUIntLE(27, 3); }
    return w && h ? w / h : 1.5;
  } catch { return 1.5; }
}
let FUNDO_BRANCO = [], FUNDO_VERDE = [];
const fig = (src, extra = '', cap = '') => {
  const r = proporcao(src).toFixed(3);
  const m = src.endsWith('.mp4') ? `<video src="/${src}" controls preload="none" playsinline></video>` : `<img src="/${src}" alt="" loading="lazy"${extra}>`;
  const verde = FUNDO_VERDE.some((k) => src.includes(k));
  const branco = !verde && FUNDO_BRANCO.some((k) => src.includes(k));
  return `<figure${verde ? ' class="fig-verde"' : branco ? ' class="fig-branco"' : ''} style="--r:${r}">${m}${cap ? `<figcaption class="mono">${cap}</figcaption>` : ''}</figure>`;
};
paginas.ilustracao = (lang) => {
  const imgs = D.ILUSTRA.map((i) => fig(i.src)).join('');
  return casca(lang, 'projetos', lang === 'pt' ? 'Ilustração' : 'Illustration', `${cab(lang === 'pt' ? 'Ilustração autoral' : 'Original illustration', lang === 'pt' ? 'Ilustração' : 'Illustration', '')}\n  <div class="galeria">${imgs}</div>`);
};


// ---------- CASES (página de cada case) ----------
const DADOS_CASE = { runpace: D.RUNPACE, 'kaya-doc': D.KAYA_DOC, 'yerba-fina': D.YERBA, hercules: D.HERCULES, 'jimi-oliver': D.JIMI, othelo: D.OTHELO, 'elos-saber': D.ELOS };
function imagensDoCase(id) {
  const raiz = new URL('../public/assets/cases/' + id + '/', import.meta.url);
  const lista = [];
  const ler = (dir, pre) => { for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))) {
    if (e.isDirectory()) ler(new URL(e.name + '/', dir), pre + e.name + '/');
    else if (/\.(webp|png|jpg|mp4)$/.test(e.name) && !/^(capa|card-cover|hero)/.test(e.name)) lista.push('assets/cases/' + id + '/' + pre + e.name); } };
  ler(raiz, '');
  return lista;
}
function secoes(t) {
  const out = [];
  for (const k of Object.keys(t)) {
    if (!k.endsWith('Title') || k === 'principioTitle' && false) continue;
    const p = k.slice(0, -5), v = t[k];
    const paras = [];
    if (typeof t[p] === 'string') paras.push(t[p]);
    for (const suf of ['Paras', 'Note', 'Desc']) { const x = t[p + suf]; if (Array.isArray(x)) paras.push(...x); else if (typeof x === 'string') paras.push(x); }
    out.push({ prefixo: p, kicker: t[p + 'Kicker'], title: v, paras, items: t[p + 'Items'] });
  }
  // Kaya Doc: as versões 1 e 2 contam a história do produto e ficam no fim, antes do papel
  const fim = out.filter((x) => /^v[12]/.test(x.kicker || '') && false);
  return out;
}
const PALAVRAS = [ // prefixo da seção (parte do nome) -> trechos do nome do arquivo que a ilustram
  ['projeto', ['foto-album']],
  ['logosys', ['logo-ext', 'variant', 'versao', 'versoes', 'lockup']], ['logo', ['logo', 'wm-', 'ic-', 'simbolo', 'tag-bud']], ['pale', ['palet', 'paleta', 'cor']], ['cor', ['palet', 'paleta', 'board']],
  ['tipo', ['type', 'tipo', 'font']], ['aplic', ['app', 'aplic', 'ap-']], ['mockup', ['mock']], ['news', ['news']], ['social', ['social', 'post']], ['video', ['video']],
  ['v1', ['v1-']], ['v2', ['v2-']], ['disco', ['disc', 'vinil', 'cd-']], ['aoVivo', ['live', 'show']], ['portfolio', ['portfolio']], ['produto', ['prod', 'line']],
  ['web', ['site', 'web', 'home']], ['capa', ['capa', 'cover']], ['nome', ['nome']], ['desafio', ['green', 'rooftop', 'train']], ['sistema', ['sistema']], ['campanha', ['campanha']],
];
function distribuir(secs, imgs) {
  const por = secs.map(() => []);
  const sobra = [];
  for (const src of imgs) {
    const n = src.toLowerCase();
    let alvo = -1;
    for (const [pre, ks] of PALAVRAS) {
      if (!ks.some((k) => n.includes(k))) continue;
      const idx = secs.findIndex((s) => s.prefixo.toLowerCase().includes(pre.toLowerCase()));
      if (idx >= 0) { alvo = idx; break; }
    }
    (alvo >= 0 && por[alvo].length < 6 ? por[alvo] : sobra).push(src);
  }
  return { por, sobra };
}
function midiaHtml(srcs, card, base) {
  if (!srcs.length) return '';
  if (card && srcs.length === 1) return `<div class="midia-cards">${srcs.map((src) => `<div class="card midia-card"><img src="/${src}" alt="" loading="lazy"></div>`).join('')}</div>`;
  if (srcs.length > 1) return `<div class="midia midia--j"${base ? ` style="--b:${base}px"` : ''}>${srcs.map((src) => fig(src)).join('')}</div>`;
  return `<div class="midia midia--1">${srcs.map((src) => fig(src)).join('')}</div>`;
}
paginas.casos = (lang, id) => {
  const c = D.CASES.find((x) => x.id === id), dados = DADOS_CASE[id], t = dados[lang];
  const tag = t.tag || t.tipo || c.typeLabel[lang];
  const titulo = t.title || c.title[lang];
  const rot = lang === 'pt' ? { img: 'Mais imagens', cor: 'Paleta', back: 'Voltar aos cases' } : { img: 'More images', cor: 'Palette', back: 'Back to cases' };
  const ficha = (t.ficha || []).map((f) => `<div><span class="mono">${esc(f.k)}</span><b>${esc(f.v)}</b></div>`).join('');
  FUNDO_BRANCO = dados.fundoBranco || [];
  FUNDO_VERDE = dados.fundoVerde || [];
  const secs = secoes(t);
  const todas = imagensDoCase(id).filter((x) => !(dados.excluir || []).some((e) => x.endsWith('/' + e)));
  const telasExt = todas.filter((s) => /\/v2-ext-/.test('/' + s)), telasLog = todas.filter((s) => /\/v2-log-/.test('/' + s));
  const mapa = dados.mapaImagens;
  const { por, sobra } = mapa
    ? { por: secs.map((s) => (mapa[s.prefixo] || []).map((f) => 'assets/cases/' + id + '/' + f)), sobra: [] }
    : distribuir(secs, todas.filter((s) => !telasExt.includes(s) && !telasLog.includes(s)));
  if (mapa) { telasExt.length = 0; telasLog.length = 0; }
  const galeria = (srcs) => `<div class="galeria">${srcs.map((src) => fig(src)).join('')}</div>`;
  const telas = (telasExt.length ? `<div class="rotulo" id="telas"><b>${lang === 'pt' ? 'Telas · site externo' : 'Screens · public site'}</b><hr></div>${galeria(telasExt)}` : '') + (telasLog.length ? `<div class="rotulo"><b>${lang === 'pt' ? 'Telas · área logada' : 'Screens · logged-in area'}</b><hr></div>${galeria(telasLog)}` : '');
  const coresLista = (dados.cores || []).filter((x) => x.hex);
  const alvoCor = coresLista.length ? (secs.findIndex((s) => /^(cor|pale)/i.test(s.prefixo)) >= 0 ? secs.findIndex((s) => /^(cor|pale)/i.test(s.prefixo)) : secs.findIndex((s) => /^sistema/i.test(s.prefixo))) : -1;
  const L = (v) => (v && typeof v === 'object' ? v[lang] : v);
  const coresDentro = coresLista.map((x) => `<div class="amostra"><span style="background:${x.hex}"></span><b>${esc(L(x.nome) || '')}</b><span class="mono">${esc(x.hex)}${x.share ? ' · ' + esc(L(x.share)) : ''}</span></div>`).join('');
  const textoDe = (s, i) => `<div class="card bloco secao">${s.kicker ? `<span class="mono tag-ouro">${esc(s.kicker)}</span>` : ''}<h2>${esc(s.title)}</h2>${s.paras.map((x) => `<p>${esc(x)}</p>`).join('')}${(s.items || []).map((it) => `<p><b>${esc(it.t)}.</b> ${esc(it.d)}</p>`).join('')}${i === alvoCor ? `<div class="amostras">${coresDentro}</div>` : ''}${((t.cartoes || {})[s.prefixo] || []).length ? `<div class="cartoes">${t.cartoes[s.prefixo].map((c) => `<div class="cartao"><span class="mono">${esc(c.m)}</span><b>${esc(c.t)}</b><p>${esc(c.d)}</p></div>`).join('')}</div>` : ''}</div>`;
  const trio = dados.trio || [];
  const blocos = secs.map((s, i) => {
    if (trio.includes(s.prefixo)) {
      if (s.prefixo !== trio[0]) return '';
      const idx = trio.map((pre) => secs.findIndex((x) => x.prefixo === pre));
      return `<section class="trio"><div class="trio-t">${idx.map((k) => textoDe(secs[k], k)).join('')}</div>${idx.map((k) => `<div class="card midia-card">${por[k].map((src) => `<img src="/${src}" alt="" loading="lazy">`).join('')}</div>`).join('')}</section>`;
    }
    const texto = textoDe(s, i);
    if (por[i].length > 1 && ((dados.larga || []).includes(s.prefixo) || (!s.paras.length && !(s.items || []).length))) return `<section>${texto}</section>\n  ${galeria(por[i])}${((dados.depois || {})[s.prefixo] || []).length ? `\n  <div class="galeria">${dados.depois[s.prefixo].map((f) => fig('assets/cases/' + id + '/' + f)).join('')}</div>` : ''}`;
    const m = midiaHtml(por[i], dados.midiaCard, (dados.midiaBase || {})[s.prefixo] || 0);
    const V = dados.versoes;
    const versoes = V && V.apos === s.prefixo ? `\n  <div class="versoes">${V.grupos.map((g) => `<div class="versoes-g"><div class="rotulo"><b>${esc(g[lang])}</b><hr></div>${V.cores.map((cor) => `<div class="midia midia--j" style="--b:60px">${V.formatos.map((f) => fig('assets/cases/' + id + '/versoes/logo-' + g.k + '-' + f + '-' + cor + '.webp', '', esc(V.fmt[f][lang] + ' · ' + V.cor[cor][lang]))).join('')}</div>`).join('')}</div>`).join('')}</div>` : '';
    if (versoes) return `<section>${texto}</section>${versoes}`;
    const depois = ((dados.depois || {})[s.prefixo] || []).length ? `\n  <div class="galeria">${dados.depois[s.prefixo].map((f) => fig('assets/cases/' + id + '/' + f)).join('')}</div>` : '';
    return m ? `<section class="secao-par${i % 2 ? ' inv' : ''}${dados.midiaCard && por[i].length === 1 ? ' secao-par--card' : ''}">${texto}${m}</section>${depois}` : `<section>${texto}</section>${depois}`;
  }).join('\n  ');
  const cores = (dados.cores || []).filter((x) => x.hex).map((x) => `<div class="card bloco" style="padding:0"><span style="display:block;height:84px;background:${x.hex};border-bottom:var(--bw) solid var(--tinta)"></span><div style="padding:10px 14px"><b style="color:var(--fg)">${esc(x.nome || '')}</b><br><span class="mono">${esc(x.hex)}${x.share ? ' · ' + esc(x.share) : ''}</span></div></div>`).join('');
  const textoTopo = `<div class="cab-linha"><div class="cab-tit"><span class="mono tag-ouro">${esc(tag)}${t.role ? ' · ' + esc(t.role) : ''}</span><h1 class="disp">${esc(titulo)}</h1></div></div>${t.slogan ? `<p class="mono" style="color:var(--hl-text)">${esc(t.slogan)}</p>` : ''}<p class="intro">${esc(t.lede || '')}</p><div class="acoes">${(telasExt.length || telasLog.length) ? `<a class="btn btn--ouro" href="#telas">${lang === 'pt' ? 'Ver as telas ↓' : 'See the screens ↓'}</a>` : ''}</div>`;
  const pontos = (t.heroPontos && c.heroImage) ? `<ul class="hero-pontos">${t.heroPontos.map((p) => `<li><span class="mono">${esc(p.t)}</span>${esc(p.d)}</li>`).join('')}</ul>` : '';
  const numeros = (t.bigNumbers && c.heroImage) ? `<div class="stats-mini">${t.bigNumbers.map((n) => `<div><b>${esc(n.num)}</b><span>${esc(n.label)}</span></div>`).join('')}</div>` : '';
  const topo = c.heroImage
    ? `<section class="card caso-hero${c.heroWide ? ' caso-hero--wide' : ''}" id="topo"><div class="cab">${textoTopo}${pontos}${numeros}</div><img src="/${c.heroImage}" alt=""${typeof c.heroWide === 'string' ? ` style="--ar:${c.heroWide};${c.heroBg ? `background:${c.heroBg};object-fit:contain` : ''}"` : ''}></section>`
    : `<div class="g2 caso-topo" id="topo"><section class="card cab">${textoTopo}</section><div class="card card--img caso-capa"><img src="/${c.bgImage}" alt=""></div></div>`;
  const voltar = `<div class="voltar"><a class="btn btn--ghost" href="${href(lang, 'cases')}">← ${rot.back}</a></div>`;
  const corpo = `${voltar}
  ${topo}
    <div class="card ficha-linha">${ficha}</div>
  ${blocos}
  ${telas}
  ${cores && alvoCor < 0 ? `<div class="rotulo"><b>${rot.cor}</b><hr></div><div class="g4 mantem">${cores}</div>` : ''}
  ${sobra.length ? `<div class="rotulo"><b>${rot.img}</b><hr></div><div class="galeria">${sobra.map((src) => fig(src)).join('')}</div>` : ''}
  <section class="card card--hl bloco" style="flex-direction:row;align-items:center;justify-content:space-between;flex-wrap:wrap"><h2 class="disp" style="color:#000;font-size:clamp(20px,2.4vw,32px)">${esc(t.cta || (lang === 'pt' ? 'Vamos conversar?' : "Let's talk?"))}</h2><a class="btn btn--ouro" href="${href(lang, 'contato')}">${esc(t.ctaBtn || (lang === 'pt' ? 'Vamos conversar' : "Let's talk"))}</a></section>`;
  return casca(lang, 'cases', titulo, corpo);
};

function gravar(rota, html) {
  const arq = new URL(arquivoDe(rota), SAIDA);
  fs.mkdirSync(new URL('./', arq), { recursive: true });
  fs.writeFileSync(arq, html);
}
for (const lang of ['pt', 'en']) {
  for (const [nome, fn] of Object.entries(paginas)) {
    if (nome === 'casos') continue;
    ctx = { chave: nome };
    gravar(caminho(lang, nome), fn(lang));
  }
  for (const c of D.CASES) { ctx = { chave: 'caso', caseId: c.id }; gravar(caminho(lang, 'caso', c.id), paginas.casos(lang, c.id)); }
}

// ---------- HOME: modelo em tools/modelos/home.html; EN derivada do PT ----------
{
  const rodape = (lang) => { ctx = { chave: 'cases' }; return paginas.cases(lang).match(/<footer[\s\S]*?<\/footer>/)[0]; };
  const modelo = fs.readFileSync(new URL('./modelos/home.html', import.meta.url), 'utf8');
  const montar = (lang, html) => { ctx = { chave: 'home' }; return html.replace('<!--HEAD-->', cabecalho(lang)).replace('</head>', '<script src="/analytics.js" defer></script>\n</head>'); };
  const pt = montar('pt', modelo.replace(/<footer[\s\S]*?<\/footer>/, rodape('pt')));
  gravar('', pt);
  const E = D.DICT.en;
  const trocar = (m, p) => p === '/' ? '/en' : (Object.values(ROTA).find((r) => '/' + r[0] === p) ? '/' + Object.values(ROTA).find((r) => '/' + r[0] === p)[1] : p.startsWith('/cases/') ? '/en' + p : p);
  let en = modelo.replace(/<footer[\s\S]*?<\/footer>/, rodape('en'))
    .replace('lang="pt-BR"', 'lang="en"')
    .replace(/(href=|href:)"(\/[^"]*)"/g, (m, a, p) => (/^\/(ds-v2|assets)/.test(p) ? m : `${a}"${trocar(m, p)}"`))
    .replace('<a href="/en" aria-current="true">PT</a><a href="/en">EN</a>', '<a href="/">PT</a><a href="/en" aria-current="true">EN</a>')
    .replace('<a href="/">PT</a><a href="/en">EN</a>', '<a href="/">PT</a><a href="/en" aria-current="true">EN</a>')
    .replace('>Projetos</a></li><li><a href="/en/services">Serviços</a></li><li><a href="/en/about">Sobre</a>', '>Projects</a></li><li><a href="/en/services">Services</a></li><li><a href="/en/about">About</a>')
    .replace('>Contato</a>\n    </div>', '>Contact</a>\n    </div>')
    .replace('Gustavo Albino, página inicial', 'Gustavo Albino, home')
    .replace('aria-label="Principal"', 'aria-label="Main"').replace('aria-label="Idioma"', 'aria-label="Language"')
    .replace('aria-label="Últimos trabalhos"', 'aria-label="Latest work"').replace('aria-label="Apresentação"', 'aria-label="Introduction"')
    .replace('Mais de 10 anos de design. Hoje, mais de 3.000 profissionais de saúde usam o que eu desenho.', 'Over 10 years in design. Today, more than 3,000 health professionals use what I design.')
    .replace('>Ver trabalhos<', '>View work<').replace('>Vamos conversar<', ">Let's talk<")
    .replace('<b>Competências</b>', '<b>Expertise</b>').replace('Ver serviços →', 'View services →')
    .replace('Kaya Doc · Produto digital', 'Kaya Doc · Digital product').replace('Elos Saber · Website', 'Elos Saber · Website').replace('Anuário 2026 · Relatório', '2026 Yearbook · Report').replaceAll('/projetos/relatorios#2026', '/en/projects/reports#2026').replace('Abrir "+(x.rot||"o case")+" "', 'Open "+(x.rot==="o relatório"?"the report":"the case")+" "').replace('Abrir o relatório Anuário 2026', 'Open the 2026 Yearbook report')
    .replace('<b>Branding e identidade</b>', '<b>Branding & Identity</b>').replace('<b>Produto digital</b>', '<b>Digital Product</b>').replace('<b>Editorial e dataviz</b>', '<b>Editorial & Dataviz</b>').replace('<b>Direção criativa</b>', '<b>Creative Direction</b>')
    .replace('Marcas, logos, sistema visual e manual.', 'Brands, logos, visual systems and guidelines.').replace('UI, UX, apps e design systems.', 'UI, UX, apps and design systems.').replace('Anuários, relatórios e Power BI.', 'Yearbooks, reports and Power BI.').replace('Marcas, campanhas e eventos.', 'Brands, campaigns and events.');
  gravar('en', montar('en', en));
}

// ---------- sitemap.xml ----------
{
  const hoje = new Date().toISOString().slice(0, 10);
  const chaves = [...Object.keys(ROTA).map((k) => [k]), ...D.CASES.map((c) => ['caso', c.id])];
  const url = (l, [k, id]) => SITE + '/' + caminho(l, k, id);
  const itens = [];
  for (const par of chaves) for (const l of ['pt', 'en']) {
    itens.push(`  <url>
    <loc>${url(l, par)}</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${url('pt', par)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${url('en', par)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('pt', par)}"/>
    <lastmod>${hoje}</lastmod>
  </url>`);
  }
  fs.writeFileSync(new URL('sitemap.xml', SAIDA), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${itens.join('\n')}
</urlset>
`);
}
console.log('páginas geradas');
