#!/usr/bin/env python3
"""
Otimiza os assets exportados do Claude Design para uso na web e corrige as
referencias no index.html.

Uso:
    python3 tools/otimizar-assets.py <assets_origem> public/assets public/index.html

Regras
------
1. Nada e ampliado. Imagem menor que MAX_DIM e mantida no tamanho nativo.
2. PNG com transparencia real continua PNG (a lista KEEP_PNG abaixo).
3. Todo o resto vira JPEG de qualidade JPEG_Q.
4. Video e vetor sao copiados sem alteracao.
5. As trocas de extensao sao propagadas para o index.html.

Como KEEP_PNG foi apurada
-------------------------
`sips -g hasAlpha` diz apenas que existe canal alfa, nao que ele e usado.
Cada PNG foi decodificado num canvas e teve o canal alfa varrido pixel a
pixel. Dos 92 PNGs com canal alfa, 56 eram totalmente opacos (exportacao
padrao) e viraram JPEG; os 36 abaixo usam transparencia de fato e sao todos
logos e marcas. Verificado em 2026-09-07.
"""
import os, shutil, subprocess, sys

MAX_DIM = 1600
JPEG_Q  = 82

KEEP_PNG = {
    "cases/yerba-fina/logo-extenso.png", "cases/yerba-fina/logo-principal.png",
    "cases/yerba-fina/logo-simbolo-slogan.png", "cases/yerba-fina/logo-simbolo.png",
    "cases/othelo/disc-dark.png", "cases/othelo/disc-white.png",
    "cases/othelo/logo-dark.png", "cases/othelo/logo-terracota.png",
    "cases/othelo/logo-white.png", "cases/othelo/logo-negative.png",
    "cases/othelo/logo-orange.png",
    "cases/hercules/logo-primario.png", "cases/hercules/logo-secundario.png",
    "cases/hercules/logo-sec-vermelho.png", "cases/hercules/logo-sec-branco.png",
    "cases/hercules/logo-sec-preto.png", "cases/hercules/logo-icone.png",
    "logos/healing-wildflower-icon.png", "logos/healing-wildflower-prime.png",
    "logos/healing-wildflower-second.png", "logos/lorena-marinho.png",
    "logos/mama-journeys-stacked.png", "logos/mama-journeys-primary.png",
    "logos/mama-journeys-icon.png",
    "brands/mindmaze.png", "brands/glance.png", "brands/beforeudig.png",
    "brands/duetto.png", "brands/geolantis360.png", "brands/pelicancorp.png",
    "brands/auroraeco.png",
    "logo-seal-black.png", "logo-seal-white.png",
    "monogram-black.png", "monogram-white.png", "wordmark-ring-black.png",
}

COPIAR_SEM_MEXER = {".mp4", ".svg", ".webp"}


def dimensoes(caminho):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", caminho],
                         capture_output=True, text=True).stdout
    g = dict(l.strip().split(": ", 1) for l in out.splitlines() if ": " in l)
    return int(g.get("pixelWidth", 0)), int(g.get("pixelHeight", 0))


def main(origem, destino, html):
    renomeados = {}
    antes = depois = 0
    convertidos = mantidos = copiados = 0

    for root, _, arquivos in os.walk(origem):
        for nome in sorted(arquivos):
            if nome.startswith("."):
                continue
            src = os.path.join(root, nome)
            rel = os.path.relpath(src, origem)
            ext = os.path.splitext(nome)[1].lower()
            antes += os.path.getsize(src)

            if ext in COPIAR_SEM_MEXER:
                dst = os.path.join(destino, rel)
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(src, dst)
                copiados += 1
                depois += os.path.getsize(dst)
                continue

            w, h = dimensoes(src)
            precisa_reduzir = max(w, h) > MAX_DIM
            vira_jpeg = rel not in KEEP_PNG and ext != ".jpg"

            rel_saida = os.path.splitext(rel)[0] + ".jpg" if vira_jpeg else rel
            dst = os.path.join(destino, rel_saida)
            os.makedirs(os.path.dirname(dst), exist_ok=True)

            if vira_jpeg or ext in (".jpg", ".jpeg"):
                cmd = ["sips", "-s", "format", "jpeg", "-s", "formatOptions", str(JPEG_Q)]
                if precisa_reduzir:
                    cmd += ["-Z", str(MAX_DIM)]
                cmd += [src, "--out", dst]
                subprocess.run(cmd, capture_output=True)
                convertidos += 1
            elif precisa_reduzir:
                subprocess.run(["sips", "-Z", str(MAX_DIM), src, "--out", dst],
                               capture_output=True)
                mantidos += 1
            else:
                shutil.copy2(src, dst)
                mantidos += 1

            if rel_saida != rel:
                renomeados[os.path.basename(rel)] = os.path.basename(rel_saida)
            depois += os.path.getsize(dst)

    # Propaga as trocas de extensao para o HTML. Os caminhos aparecem tanto
    # inteiros ('assets/x/y.png') quanto montados por concatenacao
    # (PASTA + 'y.png'), entao a substituicao e feita pelo nome do arquivo.
    # Ha um unico basename repetido no projeto (card-cover.png, em dois cases)
    # e ambos recebem o mesmo destino, entao a troca global e segura.
    fonte = open(html, encoding="utf-8").read()
    trocas = 0
    for velho, novo in renomeados.items():
        if velho in fonte:
            trocas += fonte.count(velho)
            fonte = fonte.replace(velho, novo)
    open(html, "w", encoding="utf-8").write(fonte)

    print(f"  convertidos p/ JPEG : {convertidos}")
    print(f"  mantidos como PNG   : {mantidos}")
    print(f"  copiados (video/svg): {copiados}")
    print(f"  referencias no HTML : {trocas} trocadas ({len(renomeados)} arquivos)")
    print(f"  antes : {antes/1048576:8.1f} MB")
    print(f"  depois: {depois/1048576:8.1f} MB   ({100*(1-depois/antes):.1f}% menor)")


if __name__ == "__main__":
    main(*sys.argv[1:4])
