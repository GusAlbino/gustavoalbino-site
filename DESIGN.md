---
name: Gustavo Albino
description: História em Quadrinhos. Papel quente, tinta cheia, borda fechada e sombra que não desfoca.
colors:
  ink: "#1B1B1B"
  ink-900: "#111111"
  ink-700: "#2E2E2E"
  ink-500: "#6B6B6B"
  ink-400: "#9A9A9A"
  paper-100: "#FFFFFF"
  paper-200: "#FCF8F3"
  paper-300: "#F8EFE8"
  paper-400: "#EDE0D4"
  paper-500: "#DDCBBA"
  vermilion: "#C33C29"
  vermilion-press: "#9E2E1E"
  vermilion-tint: "#F1D2CB"
  cerulean: "#0079A4"
  cerulean-press: "#00617F"
  cerulean-tint: "#CFE6EE"
  violet: "#5D357C"
  violet-press: "#472862"
  violet-tint: "#DED2E8"
  gold: "#EEBD23"
  gold-press: "#C99A10"
  gold-tint: "#FAEFC4"
  success: "#2E7D52"
  dot-ink: "rgba(27,27,27,0.16)"
typography:
  display:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 6.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.14em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "14px"
  pill: "999px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.5rem"
  6: "2rem"
  7: "3rem"
  8: "4rem"
  9: "6rem"
  10: "8rem"
components:
  button-primary:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.paper-100}"
    rounded: "{rounded.pill}"
  button-primary-press:
    backgroundColor: "{colors.vermilion-press}"
    textColor: "{colors.paper-100}"
  button-secondary:
    backgroundColor: "{colors.cerulean}"
    textColor: "{colors.paper-100}"
  button-tertiary:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.paper-100}"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.paper-100}"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.md}"
  kicker:
    textColor: "{colors.ink-500}"
    typography: "{typography.label}"
---

# Design

## Overview

**História em Quadrinhos.** O nome não foi aplicado por fora: descreve o que o sistema já fazia. A sombra não desfoca, ela desloca. A borda fecha o quadro. A retícula de pontos e a hachura a 45 graus estão no código desde o começo, e são os dois artefatos de impressão que definem a linguagem de quadrinho.

O papel é quente (`#F8EFE8`), não branco. A tinta é quase preta, não preta. As quatro cores de marca são chapadas e saturadas, sem gradiente, como cor de impressão de quatro cores.

Humor: direto, gráfico, sem hesitação. A página afirma, não sugere. Onde um sistema comum usaria sutileza (sombra difusa, borda de 1px, cinza médio), este usa contorno e contraste.

**Anti-referência confirmada:** portfólio de designer com fundo branco, tipografia leve e sombra difusa. O sistema existe justamente para não parecer isso.

## Colors

Duas famílias de base e quatro cores de marca. Nenhuma cor nova entra sem função declarada.

| papel | tinta |
|---|---|
| `paper-100` `#FFFFFF` superfície de card | `ink` `#1B1B1B` texto forte, borda, sombra |
| `paper-200` `#FCF8F3` fundo alternado | `ink-700` `#2E2E2E` corpo de texto |
| `paper-300` `#F8EFE8` fundo da página | `ink-500` `#6B6B6B` texto secundário |
| `paper-400` `#EDE0D4` linha suave | `ink-400` `#9A9A9A` texto apagado |

**As quatro de marca**, cada uma com press e tint:

| cor | papel no sistema |
|---|---|
| `vermilion` `#C33C29` | primária. Ação principal, destaque, estado de perigo |
| `cerulean` `#0079A4` | secundária. Editorial e dataviz, anel de foco, informação |
| `violet` `#5D357C` | terciária. Produto digital |
| `gold` `#EEBD23` | realce. Seleção de texto, aviso, botão de download |

Cada case pode carregar a própria cor, e carrega: `#E1241C` no Hercules, `#283618` na Yerba Fina, `#172554` na Runpace. Isso é identidade do cliente dentro do quadro, não extensão da paleta do site.

`dot-ink` `rgba(27,27,27,0.16)` existe só para a retícula e a hachura. Nunca como cor de texto ou de fundo.

## Typography

Três famílias, cada uma com trabalho declarado. Nenhuma decorativa.

- **Montserrat** carrega display e título. Peso 900 em caixa alta, entrelinha abaixo de 1, espaçamento negativo. É o letreiro.
- **Archivo** carrega texto corrido, rótulo e interface. Grotesca limpa, legível em bloco longo.
- **Space Mono** carrega kicker, ficha técnica e metadado. Caixa alta com `0.14em` de espaçamento. É a marca de prova, o carimbo.

Fontes de case entram só dentro do case: Anton e Saira Stencil One no Hercules, Permanent Marker e Oswald em uso pontual. Não sobem para o sistema.

Escala: `3.5rem` a `6.5rem` no display com `clamp`, depois `3rem`, `2.25rem`, `1.625rem`, `1.25rem`. Corpo em `1rem`, apoio em `0.875rem` e `0.75rem`.

## Layout

Quatro larguras de container: `640px`, `860px`, `1100px`, `1320px`. O conteúdo editorial fica em 1100 e a página cheia em 1320.

Medianiz responsiva: `clamp(1.25rem, 4vw, 4rem)`.

Escala de espaço em dez passos, de `0.25rem` a `8rem`, com `--gap` padrão em `1rem`, apertado em `0.5rem` e folgado em `2rem`.

**Corte de empilhamento: 1024px.** Abaixo disso, coluna fixa (`position: sticky`) vira estática. Em uma coluna, elemento grudado faz o conteúdo passar por trás e parece defeito de rolagem.

## Elevation & Depth

**A sombra é estrutural, e é decisão, não herança.** Ela separa plano e dá peso de objeto impresso. Não simula luz.

| token | valor | uso |
|---|---|---|
| `shadow-pop-sm` | `3px 3px 0 0 ink` | elemento pequeno, chip, badge |
| `shadow-pop` | `4px 4px 0 0 ink` | card padrão |
| `shadow-pop-lg` | `7px 7px 0 0 ink` | peça de destaque, capa |
| `shadow-pressed` | `2px 2px 0 0 ink` | estado pressionado |
| `shadow-pop-color` | `5px 5px 0 0 vermilion` | realce, uso econômico |

Zero desfoque em todas. `shadow-float`, com desfoque, existe no arquivo de tokens e **não é usada**: é resíduo do template.

Profundidade também vem de textura, não só de sombra: retícula (`ga-halftone`, grade de 10px; `ga-halftone-lg`, grade de 16px) e hachura a 45 graus (`ga-hatch`).

## Shapes

Borda é parte da forma, não acabamento.

| token | valor | uso |
|---|---|---|
| `bw-ink` | `2px solid ink` | padrão. Card, botão, campo |
| `bw-bold` | `3px solid ink` | peça de destaque, divisor de seção |
| `border-hair` | `1px solid paper-400` | separador interno, dentro de um quadro já fechado |

Raio: `4px`, `8px` (padrão de card), `14px`, e `999px` para pílula. O botão é pílula; o card é `8px`. Nada é quadrado vivo e nada é redondo demais.

## Components

**Botão.** Pílula, borda de 2px em tinta, sombra sólida. Quatro variantes de cor mais fantasma. No pressionado, a sombra encolhe de `4px` para `2px` e o botão desce: o movimento é de carimbo, não de elevação.

**Card.** Superfície branca sobre papel quente, borda de 2px, raio de 8px, `shadow-pop`. Com imagem de capa, o título vive sobre degradê escuro na base. **Sem textura de pontos na capa:** foi removida de propósito, a imagem já basta.

**Kicker.** Space Mono, caixa alta, `0.14em`, em `ink-500` ou na cor do case. Abre seção e nomeia o que vem.

**Ficha técnica.** Grade de três colunas, cabeçalho em tinta com rótulo em gold, células com borda suave. Rótulo em mono pequeno, valor em display 800.

**Parede de logos.** Grade de 4, 3 ou 2 colunas por largura, cada logo com fator ótico próprio para compensar a área de tinta.

**Navbar.** Sticky em `top: 0`, é o único sticky que sobrevive ao empilhamento. Colapsa em hambúrguer abaixo de 1039px.

## Do's and Don'ts

**Faça**

- Feche o quadro. Borda de 2px em tinta é o padrão, não a exceção.
- Desloque a sombra, nunca desfoque. `Npx Npx 0 0`.
- Use cor chapada. Gradiente só onde já existe, no degradê de leitura sobre imagem.
- Deixe o case trazer a cor dele para dentro do próprio case.
- Use mono para metadado e display para afirmação. Archivo fica com o que se lê.
- Reserve espaço de imagem com proporção declarada, sempre.

**Não faça**

- Não use `shadow-float` nem qualquer sombra com desfoque. Está no arquivo e é resíduo.
- Não ponha retícula sobre capa de card. Já foi removido uma vez.
- Não suba fonte de case para o sistema.
- Não use `position: sticky` abaixo de 1024px, fora a navbar.
- Não use `dot-ink` como cor de texto ou de fundo.
- Não amacie: borda de 1px, cinza médio e sombra difusa desfazem o sistema inteiro.
- Não escreva travessão em texto de interface. Regra de voz do dono, vale em PT e EN.
