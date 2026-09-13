# Auditoria de responsivo — 12/09/2026

Motivo: a página **Projetos** saiu desconfigurada no celular depois do
lançamento. A auditoria se abriu para o site inteiro.

Tudo aqui foi **medido no navegador** a 375×812 (iPhone padrão), não estimado.
Os números antes/depois vêm de `getBoundingClientRect` e `getComputedStyle`
rodados nas seis páginas e nas quatro subpáginas de acervo.

---

## Por que o remendo não pegou a página Projetos

O `responsivo.css` mirava `grid-template-columns`. A galeria de Projetos
**nunca usou grid**: ela é CSS multi-column.

```html
<div style="columns:3; column-gap:20px">
```

Multi-column não tem `grid-template-columns`, então passou inteira por baixo de
todas as regras do arquivo — inclusive da que transforma qualquer grade em
coluna única no celular. No iPhone os quatro cards ficavam em **três colunas de
96px**, com os títulos quebrados em sílabas soltas ("ANUÁ / RIOS / DA / CANN").

O mesmo padrão estava em mais dois lugares que ninguém tinha olhado: a página
de **Ilustração Autoral** (`columns:3`) e a de **E-books** (`column-width:210px`).

---

## P0 — defeitos que quebravam o uso

### P0-1 · Projetos em três colunas de 96px no celular · **corrigido**

| | antes | depois |
|---|---|---|
| Colunas | 3 | 1 |
| Largura do card | 96px | 327px |
| Título | quebrado em sílabas | inteiro |

Os cards agora aparecem **um por vez na vertical**. Os mosaicos de imagem
(Ilustração e E-books) ficaram em duas colunas de 158px de propósito: são
miniaturas de folhear, não cartões de entrada — em uma coluna a página de
e-books passaria de 30 telas.

### P0-2 · Trocar de página não voltava ao topo · **corrigido**

Este não era só do celular: valia em qualquer largura, e estava no ar.

```css
html, body { overflow-x: hidden; }   /* linha 2 do responsivo.css */
```

`overflow-x: hidden` nos elementos de raiz transfere a rolagem para o `<body>`.
A partir daí `window.scrollTo` — que é o que `go()` e `openCase()` chamavam —
**não fazia nada**. Medido: rolagem em 1.500px, clique em "Cases", rolagem
continua em 1.500px. Quem estivesse no meio da home caía no meio dos cases e
concluía que o clique falhou.

Duas correções: `overflow-x: clip` (corta o estouro sem criar contêiner de
rolagem) e um `scrollTop()` que também zera `documentElement` e `body`.

De quebra, a rolagem passou de suave a **instantânea**. Animar a volta ao topo
atravessando nove telas de home demora e confunde; e animação o navegador pausa
quando a aba está em segundo plano — a página abria no meio.

### P0-3 · Rodapé com os links colados numa linha · **corrigido**

O rodapé mostrava `Home Sobre Cases Projetos Serviços Contato` como uma frase
só. Causa: a regra de alvo de toque cobria `footer a, footer button` e impunha
`display: inline-flex !important`, atropelando o `display: block` que os links
traziam no estilo inline. A regra criada para acessibilidade quebrou o layout.

Agora os links são `flex` empilhados, com **44px de altura** cada.

---

## P1 — atrito real

### P1-1 · O cabeçalho comia 17% da tela · **corrigido (hamburguer)**

Com seis páginas, seletor de idioma e botão de CV, a nav quebrava em três
linhas: **136px de uma tela de 812**. A faixa horizontal rolável que existia
resolvia a altura, mas escondia metade dos destinos atrás de um gesto que
ninguém adivinha — Serviços, Contato, idioma e CV ficavam fora da tela.

| | antes | depois |
|---|---|---|
| Altura do cabeçalho | 136px | **72px** |
| Destinos visíveis sem gesto | 3 de 6 | 6 de 6 (no painel) |

A barra do celular ficou com **logo · CONTATO · ☰**. O painel traz os seis
links, o seletor de idioma e o **Baixar CV como botão secundário**.

O corte é em **1040px**, e o número foi medido: a fileira inteira pede 829px, e
com o logo e o respiro lateral fecha em 1035px. Abaixo disso ela quebraria em
duas linhas. Tablet em paisagem entra no hamburguer — e é onde ele deve estar
mesmo, é tela de toque.

No desktop o **Contato saiu da fileira de links e virou o botão de ação**
(vermelho), com o **Baixar CV** ao lado como secundário. Antes o CV era o único
botão do cabeçalho, e era primário: o site pedia currículo com mais ênfase do
que pedia conversa.

### P1-2 · Alvos de toque abaixo do mínimo · **corrigido**

O mínimo acessível é 44px.

| Onde | antes | depois |
|---|---|---|
| Chips de filtro (Cases e Projetos) | 32px | 44px |
| Links de canal do Contato | **18px** | 48px |
| Links do rodapé | 18px | 44px |

Os chips não tinham classe nenhuma no markup — por isso a regra de 44px, que
existia desde a primeira correção, nunca os alcançou. Ganharam `.ga-chip`.

Os canais do Contato viraram rótulo em cima, valor embaixo, com separador: o
rótulo ocupava uma coluna fixa de 96px que espremia o endereço de e-mail.

### P1-3 · Um 404 em toda visita à home · **corrigido**

O navegador pedia `GET /%7B%7B%20a.cover%20%7D%7D` — que é `{{ a.cover }}`,
o placeholder do template, tratado como endereço.

O preload scanner lê o HTML bruto **antes** de o React hidratar, vê
`src="{{ a.cover }}"` e sai buscando. Das seis imagens com placeholder no
`src`, cinco tinham `loading="lazy"` (que o scanner respeita) e **uma não** —
a capa dos anuários. Era a única, e era exatamente a que gerava o 404.

Corrigido com `loading="lazy"`, que também é o comportamento certo: é imagem
de subpágina, não precisa carregar na home.

### P1-4 · Dois `componentDidMount` na mesma classe · **corrigido**

Descoberto ao ligar o Esc no menu: a classe `Component` passou a ter dois
`componentDidMount`, e em JavaScript o segundo **apaga** o primeiro em silêncio
— sem erro, sem aviso. O de vídeos venceu; o do teclado nunca rodou. Os dois
foram fundidos, e `bindVideos` continua ligando os dois vídeos do case Hercules
(verificado).

Fica o registro porque a armadilha é fácil de repetir: a classe já tem mais de
250 linhas de métodos, e um segundo `componentDidUpdate` ou
`componentWillUnmount` quebraria do mesmo jeito.

### P1-5 · Respiro caçado por string · **corrigido**

O remendo mirava combinações exatas de padding (`80px 24px`, `72px 24px`).
Existem **mais de vinte** combinações diferentes no arquivo, e a própria página
Projetos usava uma que não estava na lista (`64px 24px 88px`). Agora o alvo é o
contêiner de página — sempre `max-width:1180px` ou `1240px`, 80 ocorrências —,
que é estável mesmo se o canvas for reexportado.

---

## Verificação final

Seis páginas e quatro subpáginas, a 375×812:

| Página | barra horizontal | multicoluna espremida | alvo < 44px |
|---|---|---|---|
| Home | não | — | 0 |
| Sobre | não | — | 0 |
| Cases | não | — | 0 |
| **Projetos** | não | **não** | 0 |
| Serviços | não | — | 0 |
| Contato | não | — | 0 |
| Anuários | não | — | 0 |
| Ilustração | não | 2 col · 158px (proposital) | 0 |
| E-books | não | 2 col · 158px (proposital) | 0 |
| Logo & Marca | não | — | 0 |

Larguras varridas sem quebra nem estouro: **320, 375, 768, 1024, 1039, 1040,
1280, 1440**. Em 1039 aparece o hamburguer; em 1040, a fileira completa em uma
linha só de 36px.

O único elemento mais largo que a tela é o marquee da home (2.540px), que é
assim de propósito e não gera barra de rolagem.

---

## Crítica de design — o que não é defeito, é decisão

Coisas que funcionam, mas custam resultado. Nenhuma foi alterada.

### 1. A página Projetos promete quatro acervos e entrega quatro cards

O texto diz "Quatro acervos abertos". Em coluna única isso vira uma lista de
quatro itens em 3,2 telas. Os cards não dizem **o que tem dentro**: "Anuários
da Cannabis · REPORTS" não conta que atrás dele há 12,6 telas de material.

**Sugestão:** contagem no card — "9 edições", "12 ilustrações", "34 e-books",
"6 marcas". Número é a prova de que o acervo existe; o rótulo de categoria só
repete o filtro logo acima.

### 2. Os filtros filtram quatro itens em cinco categorias

Cada chip deixa exatamente **um card** na tela. É controle que não controla
nada, ocupando 88px acima da dobra no celular — espaço que hoje empurra o
primeiro card para fora da primeira tela.

**Sugestão:** tirar os filtros enquanto forem quatro acervos. Voltam quando o
acervo crescer.

### 3. O card de E-books disputa legibilidade com a própria capa

A capa escolhida (`strains.jpg`) traz tipografia clara na base, exatamente onde
o título do card entra. O véu foi reforçado (fecha mais embaixo e mais forte),
o que resolve o contraste — mas continuam dois textos no mesmo lugar.

**Sugestão:** trocar por uma capa de base limpa, ou subir o título do card.

### 4. Alturas diferentes nos cards da galeria — fica como está

Testei uniformizar em 4:3: a coluna fica mais regular e **o enquadramento
piora**, porque cada altura foi escolhida para a capa que está ali. A do
anuário é vertical e perde a marca "Kaya" quando cortada. Ritmo vale menos que
a peça legível. Revertido de propósito.

### 5. A home tem 9,4 telas de celular

É a página mais longa do site por larga margem — a seguinte tem 3,7. Não é
defeito, mas é onde o visitante decide ficar ou sair.

---

## O que continua pendente

Nada disto entrou nesta rodada:

- **Roteamento por URL.** Nenhum case é linkável, o botão "voltar" do navegador
  sai do site, e o inglês — 100% traduzido — é invisível para busca. Segue
  sendo a maior pendência técnica do site. O hamburguer torna isso mais
  sensível: agora que navegar é fácil, não poder compartilhar o destino pesa
  mais.
- **`/favicon.ico` devolve 404.** O ícone funciona — o `<head>` aponta para
  `assets/logo-seal-black.png` —, mas o navegador ainda procura o arquivo no
  caminho padrão. Cosmético, resolve-se pondo um `favicon.ico` na raiz.
- **Preload entre páginas**, **SEO com corpo vazio**, **vídeos do Hercules** —
  ver a lista do `README.md`.

## O menu, como ficou

| Gesto | Resultado |
|---|---|
| Toque no ☰ | abre; o ícone vira ✕ |
| Toque num destino | navega, fecha e volta ao topo |
| Toque fora do painel | fecha |
| `Esc` | fecha (vale no tablet e no notebook estreito) |
