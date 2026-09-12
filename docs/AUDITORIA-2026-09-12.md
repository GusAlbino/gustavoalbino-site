# Auditoria — 12/09/2026

Duas avaliações independentes sobre `public/index.html`, antes do primeiro
deploy: uma crítica de UX/design e uma avaliação de posicionamento. Os achados
marcados **[verificado]** foram conferidos diretamente no arquivo.

**Nota de usabilidade: 18/40** (heurísticas de Nielsen)

---

## P0 — impedem a publicação

Todos verificados no arquivo.

### P0-1 · O formulário de contato descarta todo lead, e mente que enviou

```js
submitContact = (e) => { e.preventDefault(); this.setState({ sent: true }); };
```

Nenhum dos campos tem `name` (0 de 2 inputs). Não há endpoint. E o site responde
*"Mensagem enviada! Obrigado pelo contato — retorno em até 2 dias úteis."*

Isso é pior que não ter formulário: o visitante vai embora acreditando que
falou com você, e conclui que você não respondeu. Destrói o objetivo primário
— fechar projeto — em silêncio.

**Correção:** endpoint real (Worker da Cloudflare, Formspree ou Resend), `name`
em todos os campos, estado de erro de verdade, e `mailto:` visível como
alternativa.

### P0-2 · WhatsApp é número de exemplo

```js
whatsapp: 'https://wa.me/5500000000000'
```

Aparece em três lugares: CTA da home, canais do Contato e rodapé. Três links
mortos no canal de conversão mais direto do Brasil.

### P0-3 · Não existe layout mobile

**Zero** `@media` no `index.html`. O design system inteiro tem uma única, e é
`prefers-reduced-motion`. Medido a 391 px: a hero resolve para
`grid-template-columns: 269px 50px` — a foto renderiza como uma tira de 48 px
de largura; os cards de pilares ficam com 66,8 px; e 6 dos 10 logos de cliente
somem atrás de `overflow:hidden`.

O dono de empresa pequena abre link no telefone.

### P0-4 · O `<head>` não identifica o site

Sem `<title>`, sem `lang`, sem `description`, sem `og:image`. Compartilhado no
WhatsApp ou LinkedIn, o link aparece como URL crua, sem título e sem imagem —
no formato em que a maioria dos leads vai receber.

### P0-5 · "Baixar CV" não baixa CV

`downloadCV` apenas rola até `#cv-section`. Os dois botões (PT e EN) chamam a
mesma função e **não existe nenhum PDF em `assets/`**. É o único botão primário
vermilion do cabeçalho e a primeira ação de todo recrutador.

---

## P1 — importantes

- **A home não mostra trabalho nenhum.** Entre a hero e o CV há 819 px de
  autobiografia de trail running e nenhuma imagem de projeto.
- **3 dos 7 cases são clique morto** — `openCase` sai cedo sem `detail: true`.
  Os dois de maior peso estratégico são justamente os vazios: **Kaya Doc**
  (emprego atual, prova de SaaS e design system) e **Run For Your Life** (o
  "case âncora" do discurso outdoor). **[verificado]**
- **`kicker: 'Acervo · 4 cases'` enquanto 7 cards renderizam.** **[verificado]**
- **Sem roteamento por URL.** Navegação e idioma são só `setState`. Nenhum case
  é linkável, o botão "voltar" do navegador sai do site, e o EN — **100%
  traduzido, inclusive os quatro cases** — é invisível para busca. Trabalho
  bilíngue pronto e jogado fora.
- **A página "Prova de trabalho" não prova:** 5 dos 9 itens não têm imagem, e
  um deles se chama literalmente `'Identidade A'`.
- **Buraco de 8 anos no CV:** a timeline salta de nov/2011 para jul/2020. A hero
  afirma "4 países" e o Sobre cita Austrália e Portugal, mas **não há nenhuma
  entrada desses dois países** na timeline.
- **Ferramentas datam o perfil:** a lista traz Adobe XD nível 4. XD foi
  descontinuado, e isso contradiz o fluxo real Affinity-first.
- **Peso:** a home carrega 4 imagens somando ~4,4 MB. Só 5 de 16 `<img>` têm
  `loading="lazy"`; nenhuma tem `width`/`height` (layout shift garantido).

---

## P2 / P3 — resumo

- O único botão primário do cabeçalho é "Baixar CV" — otimiza para o recrutador,
  que é o público **secundário**. Dono de empresa não quer currículo.
- `email: 'gustavorsalbino@gmail.com'` ao lado de `© gustavoalbino.com.br`.
  **[verificado]**
- Nenhum preço, faixa, processo ou prazo. O formulário pede "a verba aproximada"
  sem dar âncora nenhuma para o visitante responder.
- Três nomes para a mesma seção: nav "Projetos" → rota `galeria` → kicker
  "Prova de trabalho" → título "Projetos".
- **PT e EN não são equivalentes:** a terceira oferta muda de idioma
  ("Estratégias de design" vs "Digital Experiences"), e o EN **perde o sinal de
  10+ anos** no kicker do CV — justamente no idioma que o recrutador lê.
- **A hero em quadrinhos é código morto:** o bloco `heroComic` de três painéis
  nunca renderiza, porque os props publicados trazem `heroLayout: 'classic'`. A
  melhor expressão do sistema comic-book está desligada.
- Campos de formulário sem `for`/`id`/`autocomplete` — leitor de tela anuncia
  campos sem rótulo.
- 18 alvos de toque abaixo de 44 px no mobile.
- `sobre.imgTag: 'Trail na Suíça'` contradiz `sobre.imgCaption: 'Pedra Grande,
  Horto Florestal — SP'` para a mesma imagem.
- A palavra `placeholder` está no bundle publicado (`hero.imgCaption`).
- `assets/sobre-pedra-grande.jpg` (924 KB) não é referenciado em lugar nenhum.

---

## Posicionamento — o trail

**Conceito certo, execução invertida.** O modelo escolhido foi "híbrido com
hierarquia": hero vende senioridade em design, trail vive no Sobre como
assinatura pessoal. Não é isso que está no ar.

O trail aparece em **seis lugares**, quatro acima ou dentro da dobra: metade
direita da hero, a tagline, o marquee (onde `'Trail'` é listado como disciplina
ao lado de Branding e UI/UX), o Sobre, o CTA e o rodapé. Um sinal concentrado
vale mais que seis diluídos — a repetição não reforça, denuncia esforço.

### A linha que cruza de identidade para promessa

> "Quando uma marca de trilha, um evento ou um atleta me procura, **eu já
> entendo o briefing antes dele ser escrito**." **[verificado]**

*"Eu treino, eu compito"* é identidade: verdadeira, verificável, incontestável.
A frase acima é **promessa de competência setorial sem um único projeto do
setor**. Some-se a isso `intro: 'Alguns nascidos na trilha'` — factualmente
falso — e um filtro "Outdoor" cujo único card não tem imagem nem página.

O site promete prova, cria a porta, e a porta não abre. Pior do que nunca ter
mencionado outdoor.

Quem lê isso mais rápido é exatamente o público-alvo: gente que corre há dez
anos identifica em segundos um recém-chegado reivindicando status de quem está
dentro. Primeira competição em 2025 é início. Humildade, aqui, é estratégia de
entrada — não boa educação.

### Recomendado

Manter o modelo e **implementar a hierarquia que ainda não existe**: trail sai
da hero, do marquee, do CTA, do rodapé e da intro dos cases, e vive inteiro e
forte em **um lugar só** — o Sobre, onde o texto é bom. Cortar apenas a frase
da promessa. A presença de trail vai para onde a comunidade está (Instagram,
Strava, o corpo na largada), não para o site. Quando existir o primeiro case
real do setor, aí o trail sobe — com prova atrás.

---

## Ordem recomendada

1. **Fazer o site receber um lead e sobreviver num celular** — P0-1 a P0-5.
   Enquanto não houver um caminho de conversão que funcione onde o tráfego
   está, todo o resto é decoração.
2. **Dar case ao Kaya Doc.** É o ativo que serve os dois objetivos ao mesmo
   tempo: dono de PME lê "faz produto sério", recrutador lê "Lead contratável".
   Hoje é card morto.
3. **Reconstruir a dobra sobre prova, não sobre adjetivo** — cargo atual, logos
   de cliente reais, miniaturas de case.
4. **Implementar a hierarquia do trail** e cortar as promessas sem lastro.
5. **Roteamento por URL e `/en`** — os quatro cases e a tradução inteira já
   existem e hoje não podem ser linkados nem indexados.
