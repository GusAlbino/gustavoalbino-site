#!/bin/sh
# importar-arte.sh <origem> <destino.jpg> <maiorLado> <qualidade>
#
# Converte arte de trabalho em asset de site. Tres cuidados que o sips sozinho
# nao toma:
#
# 1. Forca sRGB. Arte pronta para grafica costuma ser CMYK com perfil SWOP.
#    O sips preserva o espaco, e um JPEG CMYK tem quatro canais em vez de
#    tres: o banner do Muros saia com 782KB a 1000x333, que e 2,3 bytes por
#    pixel. Convertido para sRGB, o mesmo arquivo deu 90KB. Fora o peso, CMYK
#    no navegador tambem desloca a cor.
# 2. So reduz quando a imagem passa do teto. `sips -Z` aumenta imagem menor.
# 3. Remove o perfil embutido depois da conversao, que em arte de impressao
#    chega a centenas de KB.
SRGB="/System/Library/ColorSync/Profiles/sRGB Profile.icc"
[ -f "$1" ] || { echo "origem nao existe: $1" >&2; exit 1; }
w=$(sips -g pixelWidth  "$1" 2>/dev/null | tail -1 | tr -dc 0-9)
h=$(sips -g pixelHeight "$1" 2>/dev/null | tail -1 | tr -dc 0-9)
maior=$([ "$w" -gt "$h" ] && echo "$w" || echo "$h")
if [ "$maior" -gt "$3" ]; then
  sips -Z "$3" -m "$SRGB" -s format jpeg -s formatOptions "$4" "$1" --out "$2" >/dev/null 2>&1
else
  sips -m "$SRGB" -s format jpeg -s formatOptions "$4" "$1" --out "$2" >/dev/null 2>&1
fi
[ -f "$2" ] || { echo "falhou: $2" >&2; exit 1; }
printf "  %-30s %sx%s  %sKB\n" "$(basename "$2")" \
  "$(sips -g pixelWidth "$2" | tail -1 | tr -dc 0-9)" \
  "$(sips -g pixelHeight "$2" | tail -1 | tr -dc 0-9)" \
  "$(( $(stat -f%z "$2") / 1024 ))"
