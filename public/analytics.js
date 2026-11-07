/* Google Analytics 4 com consentimento.
 *
 * Regras:
 * - Sem ID de medicao valido (formato G-XXXXXXXXXX), nao faz nada: nem banner, nem rede.
 * - O Google so e carregado depois que o visitante clica em Aceitar.
 * - A escolha fica no localStorage. Recusar tambem e lembrado.
 * - O site e uma pagina so, com rota por pushState. O GA nao ve a troca de
 *   rota sozinho, entao o page_view e enviado a mao a cada navegacao.
 *
 * ID de medicao do GA4: propriedade "Gustavo Albino Website".
 */
(function () {
  var ID = 'G-D272F0EQWB';
  if (!/^G-[A-Z0-9]{6,}$/.test(ID)) return;

  var CHAVE = 'ga-consentimento';
  var ingles = function () { return /^\/en(\/|$)/.test(location.pathname); };

  function ler() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function gravar(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }

  var carregado = false;
  function carregar() {
    if (carregado) return;
    carregado = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', ID, { send_page_view: false, anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
    pageview();
    ouvirRotas();
    ouvirCliques();
  }

  function pageview() {
    gtag('event', 'page_view', {
      page_location: location.href,
      page_path: location.pathname,
      page_title: document.title
    });
  }

  function ouvirRotas() {
    var ultimo = location.pathname;
    function checar() {
      if (location.pathname === ultimo) return;
      ultimo = location.pathname;
      // o titulo e atualizado pelo site logo depois da troca de rota
      setTimeout(pageview, 150);
    }
    var push = history.pushState;
    history.pushState = function () {
      var r = push.apply(this, arguments);
      checar();
      return r;
    };
    window.addEventListener('popstate', checar);
  }

  function classificar(a) {
    var h = a.getAttribute('href') || '';
    if (/wa\.me|api\.whatsapp\.com/i.test(h)) return ['contato_whatsapp'];
    if (/^mailto:/i.test(h)) return ['contato_email'];
    if (/linkedin\.com/i.test(h)) return ['clique_linkedin'];
    if (/instagram\.com/i.test(h)) return ['clique_instagram'];
    if (/behance\.net/i.test(h)) return ['clique_behance'];
    if (/\.pdf(\?|$)/i.test(h) || a.hasAttribute('download')) {
      return ['download_cv', { arquivo: h.split('/').pop() }];
    }
    return null;
  }

  function ouvirCliques() {
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var c = classificar(a);
      if (!c) return;
      var dados = c[1] || {};
      dados.pagina = location.pathname;
      gtag('event', c[0], dados);
    }, true);
  }

  var TEXTO = {
    pt: {
      msg: 'Uso o Google Analytics para saber quais páginas e cases são mais vistos. Só liga se você aceitar.',
      sim: 'Aceitar', nao: 'Recusar'
    },
    en: {
      msg: 'I use Google Analytics to see which pages and cases get the most views. It only runs if you accept.',
      sim: 'Accept', nao: 'Decline'
    }
  };

  function banner() {
    var t = ingles() ? TEXTO.en : TEXTO.pt;
    var el = document.createElement('div');
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookies');
    el.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;' +
      'max-width:520px;margin:0 auto;padding:16px 18px;background:#111;color:#fff;' +
      'font:14px/1.45 system-ui,-apple-system,sans-serif;border-radius:10px;' +
      'box-shadow:0 8px 30px rgba(0,0,0,.35);display:flex;flex-wrap:wrap;gap:12px;align-items:center';
    var p = document.createElement('span');
    p.style.cssText = 'flex:1 1 240px';
    p.textContent = t.msg;
    function botao(rotulo, primario, fn) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = rotulo;
      b.style.cssText = 'min-height:44px;padding:0 18px;border-radius:8px;cursor:pointer;font:inherit;' +
        'font-weight:600;border:1px solid #fff;' +
        (primario ? 'background:#fff;color:#111' : 'background:transparent;color:#fff');
      b.addEventListener('click', function () { el.remove(); fn(); });
      return b;
    }
    el.appendChild(p);
    el.appendChild(botao(t.nao, false, function () { gravar('negado'); }));
    el.appendChild(botao(t.sim, true, function () { gravar('aceito'); carregar(); }));
    document.body.appendChild(el);
  }

  var escolha = ler();
  if (escolha === 'aceito') {
    carregar();
  } else if (escolha !== 'negado') {
    if (document.body) banner();
    else document.addEventListener('DOMContentLoaded', banner);
  }
})();
