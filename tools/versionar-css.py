#!/usr/bin/env python3
"""
Carimba o responsivo.css com um sufixo derivado do proprio conteudo, para que o
navegador busque a versao nova quando o arquivo muda — e so quando ele muda.

Uso:
    python3 tools/versionar-css.py

Por que existe
--------------
O site e servido como arquivos estaticos e o index.html linka o CSS por nome
fixo. Navegador que ja visitou guarda a folha em cache e continua servindo a
antiga depois de uma atualizacao. Isso aconteceu durante o proprio
desenvolvimento: o layout responsivo foi corrigido e o teste seguiu mostrando o
comportamento velho, duas vezes.

A alternativa comum e um numero de versao incrementado a mao, que alguem
esquece de subir. Aqui o sufixo e o hash do conteudo: se o arquivo nao mudou,
nada muda; se mudou, o endereco muda sozinho.

Rode depois de editar public/responsivo.css e antes de commitar.
"""
import hashlib, re, sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
CSS = RAIZ / "public" / "responsivo.css"
HTML = RAIZ / "public" / "index.html"


def main():
    if not CSS.exists():
        sys.exit(f"nao encontrei {CSS}")
    digest = hashlib.sha256(CSS.read_bytes()).hexdigest()[:8]

    html = HTML.read_text(encoding="utf-8")
    padrao = re.compile(r'(<link rel="stylesheet" href="responsivo\.css)(\?v=[0-9a-f]+)?(">)')
    achado = padrao.search(html)
    if not achado:
        sys.exit("nao achei o <link> do responsivo.css no index.html")

    atual = (achado.group(2) or "")[3:]
    if atual == digest:
        print(f"  ja esta em dia (v={digest})")
        return

    HTML.write_text(padrao.sub(rf'\1?v={digest}\3', html, count=1), encoding="utf-8")
    print(f"  {atual or '(sem versao)'} -> {digest}")


if __name__ == "__main__":
    main()
