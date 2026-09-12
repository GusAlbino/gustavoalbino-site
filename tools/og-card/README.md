# Card de compartilhamento (Open Graph)

Gera `public/assets/og-card.png` — a imagem que aparece quando o link do site
é compartilhado no WhatsApp, LinkedIn ou Slack.

## Regerar

```
cd tools/og-card
cp ../../public/assets/logo-seal-white.png selo-branco.png
qlmanage -t -s 1200 -o . card.html
sips -c 630 1200 card.html.png --out ../../public/assets/og-card.png
```

## Por que o card está desenhado assim

Não há ImageMagick nem Pillow nesta máquina. O `qlmanage` (Quick Look, nativo
do macOS) renderiza HTML para PNG, mas sempre num quadrado e com um
deslocamento de ~45px. O `sips` recorta apenas pelo centro, sem offset útil.

A saída: o card é posicionado no centro da página quadrada, com `left:-45px;
top:240px` compensando o deslocamento — assim o recorte central do `sips`
entrega exatamente os 1200×630. Se o macOS mudar esse comportamento, conferir
o resultado visualmente e reajustar esses dois valores.

A fonte display é a Montserrat ExtraBold instalada localmente. Archivo e Space
Mono não estão nesta máquina — por isso o card usa só a display, que é o que
carrega a identidade nesse tamanho.

O selo é o `logo-seal-white.png`. **Não** use o `logo-seal-black.png` com
filtro CSS: os vazios do desenho são brancos, não transparentes, e o filtro
transforma o selo num disco branco sólido.

## Conteúdo

Nome, cargo e disciplinas — informação de identificação, que é a função de um
card de link. Não usa a copy da hero de propósito: se a hero mudar, o card
continua correto.
