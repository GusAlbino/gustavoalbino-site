# -*- coding: utf-8 -*-
"""Diz se public/cabecalhos.json ainda corresponde ao index.html.

    python3 tools/conferir-cabecalhos.py      (sai 1 se estiver velho)

O manifesto guarda o sha256 do index.html de quando foi gerado. Se o index
mudou depois, o cabecalho servido passa a anunciar titulo, descricao ou imagem
que a pagina nao tem mais, e ninguem percebe: a pagina abre certa no navegador,
porque ali o JavaScript reescreve tudo. So o robo ve o errado.

Por isso o hook de pre-push chama este script.
"""
import hashlib, io, json, os, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IDX = os.path.join(RAIZ, 'public', 'index.html')
MAN = os.path.join(RAIZ, 'public', 'cabecalhos.json')

if not os.path.exists(MAN):
    print('cabecalhos.json nao existe. Rode: python3 tools/gerar-cabecalhos.py')
    sys.exit(1)

agora = hashlib.sha256(io.open(IDX, 'rb').read()).hexdigest()
gravado = json.load(io.open(MAN, encoding='utf-8')).get('fonte')

if agora != gravado:
    print('cabecalhos.json esta velho: o index.html mudou depois dele.')
    print('Rode: python3 tools/gerar-cabecalhos.py')
    sys.exit(1)

print('cabecalhos.json em dia.')
