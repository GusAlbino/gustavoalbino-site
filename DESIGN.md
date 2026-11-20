---
name: Gustavo Albino
description: Quadrinhos escuro. Dashboard em quadros com contorno preto grosso e sombra dura, sobre fundo escuro chapado com meio-tom. Sem modo claro.
colors:
  fundo: "#232020"
  quadro: "#141212"
  tinta: "#000000"
  texto: "#F8EFE8"
  apoio: "#A8A8A8"
  vermilion: "#E8604C"
  ouro: "#EEBD23"
  cerulean: "#3FB0DC"
  violet: "#A57BD0"
  branco-nome: "#FFFFFF"
typography:
  display:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    lineHeight: 1.5
  label:
    fontFamily: "Space Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "0.12em"
rounded:
  quadro: "6px"
  botao: "6px"
  seta: "12px"
  tag: "4px"
components:
  quadro:
    backgroundColor: "{colors.quadro}"
    rounded: "{rounded.quadro}"
  botao:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.botao}"
---

# Design v3 · Quadrinhos escuro

Substitui a v2 (Vidro). A v1, História em Quadrinhos em papel claro, está na tag `v1-historia-em-quadrinhos` e na branch `legacy/v1`. A v3 volta à linguagem da v1 (contorno grosso, sombra dura, meio-tom) sobre fundo escuro, no formato de dashboard da home.

Arquivos: `public/ds-v2/tokens.css` (tokens e componentes base) e `public/ds-v2/componentes.css` (logo, navegação, rótulo de seção, rodapé). A pasta mantém o nome `ds-v2` para não quebrar links. O protótipo é `public/estudos/home-v2.html`.

## Regra principal

**Não existe fundo claro em lugar nenhum.** Nem página, nem quadro, nem botão, nem modo. O botão de modo claro/escuro foi removido. Texto claro sobre superfície escura; o claro só aparece como texto, como cor de destaque (amarelo) ou dentro de imagem.

## O que continua

As famílias (Montserrat para display, Archivo para texto, Space Mono para rótulo), a caixa alta pesada no display, o vermilion como cor da marca.

## Cor

| papel | token | valor |
|---|---|---|
| Fundo da página | `--bg` | `#232020`, chapado |
| Quadro | `--escuro` | `#141212` |
| Contorno e sombra | `--tinta` | `#000000` |
| Texto | `--fg` | `#F8EFE8` |
| Texto de apoio | `--muted` | `#A8A8A8` |
| Destaque, links, subtítulo do hero | `--hl` | `#E8604C` (vermilion AMOLED) |
| Chamada principal | `--ouro` | `#EEBD23` |
| Nome no hero | | `#FFFFFF`, branco único |
| Ilustração apenas | `--c2`, `--c3` | `#3FB0DC`, `#A57BD0` |

O fundo é `#232020` e não preto puro de propósito: contorno e sombra pretos precisam de uma superfície mais clara que eles para aparecer. Contraste de texto sobre `#141212`: `#F8EFE8` 15:1, `#E8604C` 5,4:1, `#EEBD23` 10,7:1.

**Sem degradê.** Nem no fundo, nem sobre imagem, nem em quadro. Profundidade vem de sombra dura e de meio-tom.

## Fundo

Cor chapada `--bg` com uma trama de pontos de meio-tom (`radial-gradient` repetido a 14px, 7% de opacidade). É padrão, não degradê. Sem orbes, sem grade em perspectiva, sem vinheta.

## Quadro

`.card`: fundo `--escuro`, contorno de **3px preto**, raio **6px**, sombra dura `6px 6px 0 #000` (sem desfoque). No hover de quadro que é link: desloca `-3px,-3px` e a sombra vai a `9px`. Pressionado: sem deslocamento, sombra de 2px.

Variantes:

- `card--hl`: chapado em vermilion, texto preto. Uso: bloco de contato do rodapé.
- `card--img`: imagem de borda a borda, sem degradê. Meio-tom escuro no canto inferior direito. Etiqueta (`.rot`) transparente na base: preto a 58%, desfoque de 8px, borda de 2px creme a 55%, raio 4px.

## Tipo

- **Display** (`.disp`): Montserrat 900, caixa alta, `-0.03em`, entrelinha 0,9.
- **Corpo**: Archivo 15px, 1,5.
- **Rótulo** (`.mono`): Space Mono 700, 11px, caixa alta, `0.12em`.
- **Cargo sem container** (`.tag-ouro`): rótulo em amarelo, sem caixa nem borda. Não vira botão nem selo.

## Botões

Contorno de 3px preto, raio 6px, sombra dura de 3px, que vai a 5px no hover com deslocamento de 2px.

| classe | uso | fundo |
|---|---|---|
| `.btn--ouro` | chamada principal, **um por tela** (ex.: Ver trabalhos) | `#EEBD23`, texto preto |
| `.btn` | ação padrão (ex.: Contato) | vermilion, texto preto |
| `.btn--ghost` | secundário (ex.: Vamos conversar) | `#141212`, texto creme |

Setas de carrossel: 42px, raio **12px**, fundo `#141212`, contorno de 2px. No hover ficam amarelas.

## Navegação e rótulo de seção

- **Navbar**: quadro escuro com os links à esquerda e, à direita, seletor de idioma PT/EN e botão Contato. Link ativo ou em hover: sublinhado de 3px em vermilion. Sem botão de modo.
- **Rótulo de seção** (`.rotulo`): ponto branco, título branco em Montserrat 900, linha tracejada de 3px em cinza e, à direita, link em vermilion em negrito. **Sem container.** O amarelo de legenda foi descartado.

## Rodapé

Um quadro escuro com marca, Cases, Projetos, mapa do site e contato. O único bloco em destaque é o de contato, em vermilion com texto preto. Título "Vamos conversar" em até 26px, e-mail em até 18px, redes em 15px. Sem o rótulo "Novos projetos".

## Hero da home

O **nome** (Gustavo / Albino) é o título, em branco único, na maior escala que cabe, quase tocando a foto (cerca de 10px de folga). Acima, o cargo "Senior Designer · Lead Designer" em amarelo, sem container. Abaixo, em vermilion, "Mais de 10 anos de design. Hoje, mais de 3.000 profissionais de saúde usam o que eu desenho.", e os botões, com 34px de respiro entre o subtítulo e eles.

## Layout

Home: uma dobra em desktop (`min-height: 820px`), grade de seis colunas. Celular (abaixo de 960px): uma coluna e rolagem. Páginas internas usam o mesmo topo (logo + navbar), o mesmo rótulo de seção e o mesmo rodapé, e organizam o conteúdo em quadros sobre a grade.

## Movimento

Entrada em sequência (cada quadro sobe e aparece, 90ms entre eles), destaque rotativo da home a cada 7s com pausa no hover, e sombra que desloca no hover. Tudo desliga com `prefers-reduced-motion`.

## Faça e não faça

**Faça**

- Use contorno preto de 3px e sombra dura em todo quadro e botão.
- Mantenha um único botão amarelo por tela.
- Deixe a cor de destaque (vermilion) para links, subtítulo e o bloco de contato.
- Confira contraste de qualquer cor nova sobre `#141212`.

**Não faça**

- Fundo claro, em qualquer elemento ou modo.
- Degradê (fundo, imagem ou quadro) e sombra desfocada.
- Container em volta de cargo ou de rótulo de seção.
- Mais de um botão amarelo por tela.
- Preto puro no fundo da página: o contorno preto sumiria.
