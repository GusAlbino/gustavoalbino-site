# -*- coding: utf-8 -*-
"""Gera public/sitemap.xml a partir do proprio index.html.

    python3 tools/gerar-sitemap.py

Por que le o index.html em vez de ter a lista aqui
--------------------------------------------------
As rotas vivem na tabela ROTAS e os cases no array CASES, dentro do
index.html. Repetir os enderecos aqui criaria duas listas para divergir: bastava
alguem renomear uma rota para o sitemap passar a anunciar pagina que nao existe,
e isso o buscador registra como erro. Entao a fonte continua sendo uma so, e
este script apenas le.

Cada endereco sai com os alternates de idioma (hreflang), que e o que diz ao
buscador que /cases/runpace e /en/cases/runpace sao a mesma pagina em duas
linguas, e nao conteudo duplicado.
"""
import io, os, re, sys
from datetime import date

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = os.path.join(RAIZ, 'public', 'index.html')
SAIDA = os.path.join(RAIZ, 'public', 'sitemap.xml')
SITE = 'https://gustavoalbino.com.br'

fonte = io.open(HTML, encoding='utf-8').read()

# rotas: { page, caminho, en }
bloco = fonte[fonte.index('const ROTAS = ['):fonte.index('\n];', fonte.index('const ROTAS = ['))]
rotas = []
for m in re.finditer(r"\{ page: '([^']+)',\s*caminho: '([^']*)'(?:,\s*en: '([^']*)')?", bloco):
    rotas.append((m.group(2), m.group(3) or m.group(2)))

# cases com pagina propria
bcases = fonte[fonte.index('const CASES = ['):fonte.index('\n];', fonte.index('const CASES = ['))]
cases = [cid for cid, resto in re.findall(r"id: '([a-z-]+)', cat: '[^']*', detail: (true)", bcases)]

pares = [(pt, en) for pt, en in rotas]
pares += [('cases/' + c, 'cases/' + c) for c in cases]

hoje = date.today().isoformat()

def url(pt, en):
    # Precisa bater exatamente com o que o canonical da pagina escreve, senao o
    # buscador ve dois enderecos para a home: com barra e sem.
    canon = (SITE + '/' + pt).rstrip('/') if pt else SITE + '/'
    alt_pt = canon
    alt_en = (SITE + '/en/' + en).rstrip('/')
    return """  <url>
    <loc>%s</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="%s"/>
    <xhtml:link rel="alternate" hreflang="en" href="%s"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="%s"/>
    <lastmod>%s</lastmod>
  </url>
  <url>
    <loc>%s</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="%s"/>
    <xhtml:link rel="alternate" hreflang="en" href="%s"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="%s"/>
    <lastmod>%s</lastmod>
  </url>""" % (canon, alt_pt, alt_en, alt_pt, hoje, alt_en, alt_pt, alt_en, alt_pt, hoje)

corpo = '\n'.join(url(pt, en) for pt, en in pares)
xml = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
%s
</urlset>
""" % corpo

io.open(SAIDA, 'w', encoding='utf-8').write(xml)
print('  %d enderecos (%d rotas + %d cases, x2 idiomas)' % (len(pares) * 2, len(rotas), len(cases)))
