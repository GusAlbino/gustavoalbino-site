# -*- coding: utf-8 -*-
"""Gera a imagem de compartilhamento de cada case.

    python3 tools/gerar-og-cases.py      (com o servidor local rodando na 4399)

Por que existe
--------------
Todo link compartilhado do site usava o mesmo og-card.png, entao case de
branding e case de produto chegavam identicos no LinkedIn. As capas dos cases
serviriam melhor, mas estao em WebP, e LinkedIn e Facebook nao geram preview
desse formato: apontar og:image direto para elas quebraria o preview de todo
link. Dai o JPEG.

Por que Chrome headless e nao qlmanage
--------------------------------------
O gerador do card principal usa qlmanage, que renderiza sempre num quadrado e
com deslocamento de ~45px, obrigando a recortar depois. O Chrome headless
entrega 1200x630 exatos, que e a medida que o Open Graph pede, e ainda carrega
as fontes do proprio site.
"""
import io, os, re, shutil, subprocess, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUB = os.path.join(RAIZ, 'public')
SAIDA = os.path.join(PUB, 'assets', 'og')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
SERVIDOR = 'http://127.0.0.1:4399'

PALETA = {'var(--violet)': '#5D357C', 'var(--paper-100)': '#FFFFFF', 'var(--ink)': '#1B1B1B',
          'var(--vermilion)': '#C33C29', 'var(--gold)': '#EEBD23', 'var(--cerulean)': '#0079A4'}
cor = lambda v: PALETA.get(v, v)

fonte = io.open(os.path.join(PUB, 'index.html'), encoding='utf-8').read()
bloco = fonte[fonte.index('const CASES = ['):fonte.index('\n];', fonte.index('const CASES = ['))]

casos = []
for m in re.finditer(
        r"id: '([a-z-]+)'[\s\S]{0,200}?color: '([^']+)', fg: '([^']+)'[\s\S]{0,300}?"
        r"bgImage: '([^']+)'[\s\S]{0,500}?title: \{ pt: '([^']+)'[\s\S]{0,200}?typeLabel: \{ pt: '([^']+)'"
        r"[\s\S]{0,200}?blurb: \{ pt: '((?:[^'\\]|\\.)+)'", bloco):
    casos.append(dict(id=m.group(1), cor=cor(m.group(2)), fg=cor(m.group(3)), capa=m.group(4),
                      titulo=m.group(5), tipo=m.group(6), blurb=m.group(7).replace("\\'", "'")))

GABARITO = """<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;900&family=Oswald:wght@500;700&display=swap">
<style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden}
  .card{width:1200px;height:630px;display:grid;grid-template-columns:660px 540px;background:%(cor)s}
  .capa{background-image:url("%(capa)s");background-size:cover;background-position:center;border-right:8px solid #1B1B1B}
  .lado{padding:56px 52px;display:flex;flex-direction:column;justify-content:space-between;color:%(fg)s}
  .tipo{font-family:Oswald,system-ui;font-weight:500;font-size:20px;letter-spacing:.18em;text-transform:uppercase;opacity:.72}
  h1{font-family:Montserrat,system-ui;font-weight:900;text-transform:uppercase;letter-spacing:-.03em;
     line-height:.92;font-size:%(tamanho)spx;margin:18px 0 0}
  .frase{font-family:Montserrat,system-ui;font-weight:600;font-size:21px;line-height:1.42;margin:20px 0 0;opacity:.88;
     display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
  .pe{font-family:Oswald,system-ui;font-weight:500;font-size:19px;letter-spacing:.14em;text-transform:uppercase;opacity:.82}
</style>
<div class="card">
  <div class="capa"></div>
  <div class="lado">
    <div>
      <div class="tipo">%(tipo)s</div>
      <h1>%(titulo)s</h1>
      <p class="frase">%(blurb)s</p>
    </div>
    <div class="pe">gustavoalbino.com.br</div>
  </div>
</div>
"""

os.makedirs(SAIDA, exist_ok=True)
tmp = os.path.join(PUB, '_og_tmp.html')
feitos = []
try:
    for c in casos:
        # titulo longo encolhe, para nunca estourar a caixa
        n = len(c['titulo'])
        c['tamanho'] = 70 if n <= 9 else (60 if n <= 14 else 50)
        c['capa'] = SERVIDOR + '/' + c['capa']
        io.open(tmp, 'w', encoding='utf-8').write(GABARITO % c)
        png = os.path.join(SAIDA, c['id'] + '.png')
        subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars',
                        '--force-device-scale-factor=1', '--window-size=1200,630',
                        '--virtual-time-budget=8000', '--screenshot=' + png,
                        SERVIDOR + '/_og_tmp.html'], capture_output=True, timeout=90)
        jpg = os.path.join(SAIDA, c['id'] + '.jpg')
        subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '86', png, '--out', jpg],
                       capture_output=True)
        os.remove(png)
        feitos.append((c['id'], os.path.getsize(jpg) // 1024))
finally:
    if os.path.exists(tmp): os.remove(tmp)

for i, kb in feitos:
    print('  %-16s %sKB' % (i + '.jpg', kb))
print('  %d imagens em public/assets/og/' % len(feitos))
