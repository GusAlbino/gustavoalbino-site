# -*- coding: utf-8 -*-
"""Gera public/cabecalhos.json: o <head> correto de cada uma das 36 rotas.

    python3 tools/gerar-cabecalhos.py
    (abra http://127.0.0.1:4402/_gerar no navegador; a pagina roda e grava)

O defeito que isto conserta
---------------------------
O corpo do site e desenhado por JavaScript, e o cabecalho tambem: title,
canonical, og:* e hreflang sao escritos por escreverCabecalho() a cada rota.
Quem le o HTML servido sem executar nada ve sempre o cabecalho da home. Nas
36 rotas, o servido dizia o mesmo titulo, a mesma og:image, e canonical
apontando para "/".

Esse canonical e o pior dos tres: ele afirma que todo case e a home.

LinkedIn, WhatsApp, Slack e boa parte dos leitores nao executam JavaScript.
Os cards de compartilhamento por case eram invisiveis para eles.

Como funciona
-------------
Este script levanta um servidor que serve o site com a regra de rotas do
worker e uma pagina que abre cada rota num iframe de mesma origem, espera
desenhar, e devolve os valores de cabecalho por POST. O resultado vira um
JSON pequeno que o worker le para reescrever o <head> na resposta.

Por que o navegador, e nao o Chrome de linha de comando
------------------------------------------------------
O --dump-dom do Chrome headless depende de "virtual time" fechar, e nesta
pagina ele nunca fecha: a parede de marcas tem animacao CSS infinita, entao o
relogio virtual roda para sempre. Testado, trava ate com orcamento de 3
segundos.

Contra desatualizacao
---------------------
O manifesto guarda o sha256 do index.html. O worker nao verifica isso em
producao (custaria uma leitura por requisicao), mas tools/conferir-cabecalhos.py
compara, e o hook de pre-push recusa o push se o index mudou sem regerar.
Cabecalho velho e pior que nenhum: passa a anunciar titulo que a pagina nao tem.
"""
import hashlib, http.server, io, json, os, re, urllib.parse

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(RAIZ, 'public')
PORTA = 4402
PEDE_ARQUIVO = re.compile(r'\.[a-z0-9]+$', re.I)

fonte = io.open(os.path.join(PUB, 'index.html'), encoding='utf-8').read()

b = fonte[fonte.index('const ROTAS = ['):fonte.index('\n];', fonte.index('const ROTAS = ['))]
rotas = [(m.group(2), m.group(3) or m.group(2))
         for m in re.finditer(r"\{ page: '([^']+)',\s*caminho: '([^']*)'(?:,\s*en: '([^']*)')?", b)]
bc = fonte[fonte.index('const CASES = ['):fonte.index('\n];', fonte.index('const CASES = ['))]
cases = [c for c, _ in re.findall(r"id: '([a-z-]+)', cat: '[^']*', detail: (true)", bc)]

CAMINHOS = []
for pt, en in rotas:
    CAMINHOS.append('/' + pt if pt else '/')
    CAMINHOS.append(('/en/' + en).rstrip('/'))
for c in cases:
    CAMINHOS += ['/cases/' + c, '/en/cases/' + c]


DRIVER = """<!doctype html><meta charset="utf-8"><title>prerender</title>
<style>body{font:12px ui-monospace,monospace;margin:12px}iframe{width:1280px;height:900px;border:1px solid #ccc}</style>
<pre id="log"></pre><iframe id="f"></iframe>
<script>
const CAMINHOS = %s;
const log = t => document.getElementById('log').textContent += t + '\\n';
const f = document.getElementById('f');
const abrir = (u) => new Promise(r => { f.onload = () => setTimeout(r, 1500); f.src = u; });
(async () => {
  for (const caminho of CAMINHOS) {
    await abrir(caminho);
    const d = f.contentDocument;
    const meta = (s, a) => { const e = d.head.querySelector(s); return e ? e.getAttribute(a) : ''; };
    const cab = {
      title: d.title,
      lang: d.documentElement.lang,
      desc: meta('meta[name=description]', 'content'),
      canonical: meta('link[rel=canonical]', 'href'),
      ogTitle: meta('meta[property="og:title"]', 'content'),
      ogDesc: meta('meta[property="og:description"]', 'content'),
      ogUrl: meta('meta[property="og:url"]', 'content'),
      ogImage: meta('meta[property="og:image"]', 'content'),
      ogLocale: meta('meta[property="og:locale"]', 'content'),
      alternates: [...d.head.querySelectorAll('link[rel=alternate][data-rota]')].map(l => [l.getAttribute('hreflang'), l.getAttribute('href')]),
      ld: (d.head.querySelector('script[type="application/ld+json"][data-rota]') || {}).textContent || '',
    };
    if (!cab.title) { log('FALHOU ' + caminho); continue; }
    await fetch('/_salvar?c=' + encodeURIComponent(caminho), {
      method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(cab),
    });
    log(caminho + '  ' + cab.title.slice(0, 44));
  }
  document.title = 'PRONTO';
  log('PRONTO ' + CAMINHOS.length);
})();
</script>""" % json.dumps(CAMINHOS)

salvos = {}


class H(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k): super().__init__(*a, directory=PUB, **k)

    def log_message(self, *a): pass

    def do_GET(self):
        cam = urllib.parse.urlparse(self.path).path
        if cam == '/_gerar':
            corpo = DRIVER.encode('utf-8')
            self.send_response(200); self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(corpo))); self.end_headers(); self.wfile.write(corpo)
            return
        # mesma regra do worker: caminho sem extensao cai no app
        if not os.path.exists(os.path.join(PUB, cam.lstrip('/'))) and not PEDE_ARQUIVO.search(cam):
            self.path = '/index.html'
        return super().do_GET()

    def do_POST(self):
        q = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        caminho = q.get('c', ['/'])[0]
        salvos[caminho] = json.loads(self.rfile.read(int(self.headers.get('Content-Length', 0))).decode('utf-8'))
        if len(salvos) == len(CAMINHOS):
            manifesto = {
                'fonte': hashlib.sha256(io.open(os.path.join(PUB, 'index.html'), 'rb').read()).hexdigest(),
                'rotas': salvos,
            }
            destino = os.path.join(PUB, 'cabecalhos.json')
            io.open(destino, 'w', encoding='utf-8').write(json.dumps(manifesto, ensure_ascii=False, indent=1))
            print('  %d rotas, %d KB. Pode fechar.' % (len(salvos), os.path.getsize(destino) // 1024), flush=True)
        self.send_response(200); self.send_header('Content-Length', '2'); self.end_headers(); self.wfile.write(b'ok')


print('  %d rotas para gerar. Abra http://127.0.0.1:%d/_gerar' % (len(CAMINHOS), PORTA), flush=True)
# ThreadingHTTPServer, e nao HTTPServer: a pagina que dirige o trabalho fica
# aberta enquanto o iframe pede o index, o CSS e as imagens. Com uma conexao
# so, o servidor trava esperando a si mesmo.
http.server.ThreadingHTTPServer(('127.0.0.1', PORTA), H).serve_forever()
