# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primário: quem decide contratar design numa marca que precisa aguentar crescer.** De dono de negócio pequeno a líder de time de produto no exterior. Chega pelo LinkedIn, por indicação ou por busca, geralmente com um problema já formado ("nossa marca não sustenta o que a gente virou") e pouco tempo para avaliar. Julga por prova de trabalho, não por descrição de serviço.

**Secundário: recrutador ou head de design avaliando para vaga.** Lê em inglês, procura profundidade em produto digital e design system antes de qualquer coisa, e costuma abrir o currículo antes do site inteiro.

**Terceiro, e é diferencial e não recorte: quem vive do mundo outdoor.** Marca de esporte, assessoria, organizador de prova. Quando esse público disputa espaço com o primário numa mesma página, **o primário ganha**. O outdoor entra como prova de que ele entende um nicho por dentro, nunca como moldura que estreita o portfólio.

## Product Purpose

Portfólio pessoal que converte em duas saídas, ambas válidas ao mesmo tempo: **projeto novo de cliente** e **vaga de emprego**. Sucesso é a pessoa sair do site com contexto suficiente para abrir uma conversa, não apenas com boa impressão.

O site é também a prova da própria competência: foi desenhado, construído, publicado e mantido pelo dono, incluindo infraestrutura.

## Positioning

A combinação, que um concorrente vizinho não copia sem mentir:

- dez anos em **três frentes de verdade** (marca, produto digital, editorial e dataviz), com peça entregue em cada uma
- **lead de design system em produto SaaS real**: 353 componentes-mestre, tokens em duas camadas, cada artefato em desktop, tablet e mobile
- **vivência outdoor praticada**, não observada: trilha desde 2018, corrida na montanha desde 2019, primeira prova em 2025
- morou e trabalhou fora em dois lugares, Sydney e Lausanne, e atende em quatro idiomas

O argumento não é "designer que também corre". É que ele não olha o mundo outdoor de fora, e ao mesmo tempo não se estreita nele.

## Operating Context

- Atende **remoto**, do Brasil, em português e inglês. Clientes no Brasil e no exterior.
- **Tempo de resposta declarado: 2 dias úteis.** É promessa publicada, não estimativa.
- O contato acontece por formulário que monta mensagem de **WhatsApp**, com e-mail como alternativa. Ele pede projeto, prazo e verba aproximada já no primeiro contato.
- O currículo é oferecido em PDF, nos dois idiomas, e o botão segue o idioma da página.
- Trabalho atual: Lead Designer na Kaya Mind desde maio de 2022, em paralelo com freelance desde 2014.

## Capabilities and Constraints

**Arquitetura.** Documento HTML único (~370 KB) com todo o conteúdo em dicionários PT e EN, desenhado em tempo de execução pelo runtime do Claude Design. Servido por Cloudflare Workers.

**Rotas.** 36 endereços: 11 rotas mais 7 cases, nos dois idiomas. Inglês em prefixo de caminho (`/en/...`).

**O corpo é desenhado por JavaScript.** O HTML servido traz o template com chaves não interpoladas. Testado em 14/09/2026 no Search Console: o Google executa o script e vê o conteúdo real. Pré-renderizar o corpo **não é possível com segurança** neste runtime, que remove o container e cria outro no lugar.

**Arquivos gerados que envelhecem em silêncio:** `cabecalhos.json`, `sitemap.xml`, `assets/og/*.jpg` e o carimbo do `responsivo.css`. Há guarda automática só para o primeiro. Ver README.

**Imagem de compartilhamento nunca em WebP.** LinkedIn e Facebook não geram preview desse formato. O resto do site é WebP.

**Restrição de terceiro, confirmada:** as telas do Kaya Doc não são reproduzidas no site. O produto é propriedade da Kaya Mind, e o case descreve processo, sistema e decisões sem redistribuir a interface. Isso está escrito na própria página e deve continuar.

**Em aberto:** rota inventada ainda responde 200 antes de se corrigir para a home, o que para o buscador é *soft 404*. Decisão adiada com o custo registrado.

## Brand Commitments

- **"Lead Designer" aparece no hero.** Decisão de setembro de 2026, que substitui a regra anterior do Plano de Portfólio v2.2 (que mandava usar só "Designer").
- **Zero travessão em qualquer texto do site.** Regra declarada pelo dono, vale para PT e EN.
- **Nada de "disponível para 2026"** nem qualquer promessa datada que envelheça sozinha.
- Tipografia: Montserrat no display, Anton e Saira Stencil One em uso de case, Oswald e Permanent Marker em apoio.
- Marca própria: selo e monograma em `assets/`, com o case de branding dela no próprio site.
- O site é bilíngue **por completo**. Meia tradução já foi tratada como defeito duas vezes.

## Evidence on Hand

Material real, não amostra. Tudo em `public/assets/`.

| acervo | o que é |
|---|---|
| 7 cases com página própria | Runpace, Kaya Doc, Othelo, Jimi Oliver, Yerba Fina, Gustavo Albino, Hercules |
| 8 anuários e relatórios | Kaya Mind, 2022 a 2025, com capa oficial, ficha técnica e link para a fonte |
| 43 e-books | série Kaya Mind, a partir de 2022 |
| 3 projetos culturais | com lei de incentivo, patrocinador, local, data e entregáveis |
| parede de logos | 12 marcas parceiras, mais showcase de marca própria |
| currículo | PDF em PT e EN, export de 14/09/2026 |

**Ausências que o trabalho futuro não pode inventar:** não há depoimento de cliente, não há métrica de resultado de negócio atribuída às peças, e não há estudo de caso com antes e depois quantificado. Se um desses aparecer no site, tem que vir de fonte real.

## Product Principles

1. **Prova antes de promessa.** Cada afirmação do site tem peça, número ou documento atrás. Adjetivo sem lastro é o que o portfólio mais rejeita.
2. **O portfólio é largo, o diferencial é fundo.** Outdoor aprofunda, nunca estreita. Um visitante de outro segmento não pode sair achando que ele só atende esporte.
3. **Duas saídas, um site.** Cliente e recrutador leem o mesmo material com olhos diferentes. Nenhuma decisão pode servir um e cegar o outro.
4. **O que é gerado precisa de guarda, não de disciplina.** Arquivo derivado envelhece em silêncio, porque no navegador tudo abre certo. Só o robô vê o errado.
5. **Nada sai sem medição em produção.** Conferir na fonte já produziu resposta falsa duas vezes. Mede-se onde o defeito apareceria.
