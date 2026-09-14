# -*- coding: utf-8 -*-
"""Converte uma arvore de JPEG/PNG para WebP usando o encoder do Chrome.

    python3 tools/para-webp.py public/assets/<pasta>
    (abra http://127.0.0.1:4400/ no navegador; a pagina converte e grava)

Por que existe
--------------
Esta maquina nao tem encoder WebP. Nao ha cwebp nem Homebrew para instalar
um, e o sips recusa o formato: "Can't write format: org.webmproject.webp".
O Chrome embute libwebp e expoe pelo canvas, entao o caminho e servir as
imagens por HTTP, deixar a pagina converter, e gravar o retorno no disco.
Mesma origem para nao esbarrar em CORS.

Qualidade
---------
JPEG entra a 0.82 e PNG a 0.92. A diferenca existe porque PNG neste
repositorio costuma ser logotipo e arte chapada, onde artefato de borda
aparece; foto tolera compressao mais dura. Alfa e preservado: o canvas nao
recebe fundo, e o WebP carrega o canal.

Cuidados
--------
Grava ao lado do original, sem apagar nada. Confira o par de cada arquivo
antes de remover os originais, e compare a qualidade na largura real de
exibicao antes de trocar as referencias.
"""
import http.server, json, os, sys, urllib.parse

RAIZ = sys.argv[1]

# Imagem de compartilhamento nao entra. LinkedIn e Facebook nao geram preview
# de WebP, entao converter estas quebraria o card de todo link publicado.
POUPAR = ('og-card.png',)
POUPAR_PASTA = ('og',)

ARQS = []
for pasta, _, arquivos in os.walk(RAIZ):
    rel = os.path.relpath(pasta, RAIZ)
    if rel.split(os.sep)[0] in POUPAR_PASTA:
        continue
    for a in arquivos:
        if a in POUPAR:
            continue
        if a.lower().endswith(('.jpg', '.jpeg', '.png')):
            ARQS.append(os.path.relpath(os.path.join(pasta, a), RAIZ))
ARQS.sort()
feitos = {}

PAGINA = """<!doctype html><meta charset="utf-8"><title>webp</title>
<body><pre id="log"></pre><script>
const ARQS = %s;
const log = (t) => document.getElementById('log').textContent += t + '\\n';
(async () => {
  let n = 0;
  for (const nome of ARQS) {
    const q = /\\.png$/i.test(nome) ? 0.92 : 0.82;
    const img = await createImageBitmap(await fetch('/img/' + nome.split('/').map(encodeURIComponent).join('/')).then(r => r.blob()));
    const c = new OffscreenCanvas(img.width, img.height);
    c.getContext('2d').drawImage(img, 0, 0);
    const blob = await c.convertToBlob({ type: 'image/webp', quality: q });
    await fetch('/save/' + nome.split('/').map(encodeURIComponent).join('/'), { method: 'POST', body: blob });
    n++;
    if (n %% 20 === 0) log(n + '/' + ARQS.length);
  }
  document.title = 'PRONTO';
  log('PRONTO ' + n);
})();
</script></body>""" % json.dumps(ARQS)


class H(http.server.BaseHTTPRequestHandler):
    def log_message(self, *a): pass

    def _seguro(self, rel):
        alvo = os.path.realpath(os.path.join(RAIZ, rel))
        if not alvo.startswith(os.path.realpath(RAIZ) + os.sep):
            raise ValueError('fora da raiz')
        return alvo

    def do_GET(self):
        cam = urllib.parse.unquote(self.path)
        if cam == '/':
            corpo = PAGINA.encode('utf-8')
            self.send_response(200); self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(corpo))); self.end_headers(); self.wfile.write(corpo)
        elif cam.startswith('/img/'):
            dados = open(self._seguro(cam[5:]), 'rb').read()
            self.send_response(200); self.send_header('Content-Type', 'application/octet-stream')
            self.send_header('Content-Length', str(len(dados))); self.end_headers(); self.wfile.write(dados)
        else:
            self.send_response(404); self.end_headers()

    def do_POST(self):
        rel = urllib.parse.unquote(self.path)[6:]
        n = int(self.headers.get('Content-Length', 0))
        dados = self.rfile.read(n)
        destino = os.path.splitext(self._seguro(rel))[0] + '.webp'
        open(destino, 'wb').write(dados)
        feitos[rel] = len(dados)
        self.send_response(200); self.send_header('Content-Length', '2'); self.end_headers(); self.wfile.write(b'ok')


srv = http.server.HTTPServer(('127.0.0.1', 4400), H)
print('  %d arquivos em %s - servidor em http://127.0.0.1:4400/' % (len(ARQS), RAIZ), flush=True)
try:
    srv.serve_forever()
except KeyboardInterrupt:
    pass
