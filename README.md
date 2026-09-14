# gustavoalbino.com.br

Site pessoal de Gustavo Albino. Fonte da verdade do site publicado.

- **Produção:** https://gustavoalbino.com.br
- **Hospedagem:** Cloudflare Workers (deploy automático via Git)
- **Registro do domínio:** Hostinger
- **Desenho:** Claude Design → convertido em site estático neste repositório

## Regra única

**Nada vai pro ar sem passar por Pull Request.** A branch `main` é o site publicado.
Toda alteração nasce em uma branch, vira PR, ganha um link de preview automático
da Cloudflare, e só entra em produção depois do merge.

## Fluxo de uma alteração

1. Desenho ajustado no Claude Design (quando for mudança visual).
2. Nova branch a partir da `main`, **sem herdar o upstream dela**:

   ```
   git switch -c nome-da-branch --no-track origin/main
   ```

   O `--no-track` não é detalhe. `git checkout -b nome origin/main` configura
   `origin/main` como upstream da branch nova, e cliente que empurra "a branch
   atual para o upstream dela" manda o trabalho direto para produção. O GitHub
   Desktop faz isso. Aconteceu em 13/09/2026 e foi assim que um commit pulou o
   PR. O hook de `pre-push` abaixo existe para essa mordida não repetir.

3. Commit das alterações, **um commit por branch**. A mensagem do commit vira
   a descrição do PR automaticamente, desde que o PR tenha um commit só e o
   repositório não tenha template. Por isso o template foi removido: ele
   substituía o preenchimento automático e o PR saía em branco.

   A regra de um commit por branch não é preferência de estilo, é o que os
   seis primeiros PRs mostraram:

   | PR | commits | descrição |
   |---|---|---|
   | #1 | 28 | template em branco |
   | #2 | 6 | template em branco |
   | #3 | **1** | **2.920 caracteres, correta** |
   | #4 | 6 | texto errado colado |
   | #5 | **1** | **preenchida, correta** |
   | #6 | 3 | vazia |

   Todo PR de commit único saiu certo. Todo PR que dependeu de colar saiu
   errado ou vazio, e os tempos entre abrir e mergear foram 13s, 14s, 47s e
   126s: colar texto no meio disso não sobrevive.

   Quando o trabalho tiver partes realmente independentes, o caminho é
   branches separados, e aí são dois PRs de commit único em vez de um PR de
   três commits sem descrição.
4. `git push -u origin nome-da-branch` e abrir o PR.
5. Conferir o preview antes do merge (ver a seção seguinte).
6. Merge, e a Cloudflare publica em produção sozinha.

## Conferir antes do merge

A Cloudflare comenta o link de preview no PR quando Workers Builds está
conectado ao repositório. Quando não houver comentário, serve o build local na
rede de casa e abre no próprio celular:

```
python3 -m http.server 4399 --directory public
```

Depois, no celular na mesma rede: `http://<ip-do-mac>:4399`. O IP sai de
`ipconfig getifaddr en0` ou `en1`.

Isso não é luxo. Em 13/09/2026 a hero passou na medição a 412px e mesmo assim
o botão "Vamos conversar" caía abaixo da dobra num Motorola Edge 60 Fusion,
porque a barra do Chrome come uns 100px que nenhum emulador mostra por padrão.

Checklist do merge:

- [ ] Abri o preview no desktop
- [ ] Abri o preview no celular de verdade, não só em emulador
- [ ] Textos sem placeholder e sem pendência aberta
- [ ] Imagens otimizadas, nada acima de ~300 KB sem motivo
- [ ] Links internos e externos funcionando
- [ ] Nenhum arquivo de trabalho de design (.afdesign/.fig) commitado

## Proteção da main

Duas camadas, porque regra escrita sozinha não segurou:

1. **Hook local**, que recusa qualquer push apontando para `refs/heads/main`.
   Hooks não são versionados pelo git, então cada clone precisa instalar:

   ```
   cp tools/hooks/pre-push .git/hooks/pre-push && chmod +x .git/hooks/pre-push
   ```

   Para publicar a `main` de propósito: `PERMITIR_MAIN=1 git push origin main`.

2. **Branch protection no GitHub**, que é a camada que o hook não alcança
   (push pela web, por outro clone, pelo celular). Em Settings → Branches →
   Add branch ruleset, alvo `main`, marcando "Require a pull request before
   merging". É grátis em repositório público.

## Estrutura

```
wrangler.jsonc     # diz à Cloudflare o que servir — sem ele, sai "Hello World!"
public/            # ISTO é o site publicado
├── index.html     #   o canvas + as 2 tags do React
├── support.js     #   dc-runtime (gerado, não editar à mão)
├── _ds/           #   design system: tokens + bundle dos componentes
└── assets/        #   177 arquivos, 76,2 MB
docs/              # documentação — fora do ar
tools/             # scripts de manutenção — fora do ar
.github/           # template de PR
```

Só `public/` vai para a web. README, `docs/` e `tools/` ficam de fora de propósito.

## Configuração na Cloudflare

O repositório carrega a configuração em `wrangler.jsonc`, então quase nada
precisa ser preenchido na interface:

| Campo | Valor |
|---|---|
| Production branch | `main` |
| Build command | *(vazio — não há build)* |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

**Por que existe o `wrangler.jsonc`:** Cloudflare Pages descobre sozinho o que
servir a partir do diretório de saída. Cloudflare Workers, não — sem esse
arquivo declarando `assets.directory`, ele publica o script padrão
`Hello World!` em vez do site.

## Manutenção

- Reimportar o site do Claude Design → `docs/SINCRONIZAR-CANVAS.md`
- Otimizar assets novos → `tools/otimizar-assets.py`
- **Depois de editar `public/responsivo.css` → `python3 tools/versionar-css.py`**
  (carimba o link com o hash do conteúdo, para o navegador buscar a versão nova)
- Regerar o card de compartilhamento → `tools/og-card/README.md`

## Rollback

GitHub → histórico de commits → `Revert` no commit problemático → PR → merge.
Em emergência: Cloudflare → o projeto → Deployments → deploy anterior → `Rollback`.

## DNS — estado anterior à migração (registrado em 2026-09-07)

Guardado para referência caso seja preciso reverter:

| Tipo | Nome | Valor |
|---|---|---|
| NS | @ | nova.dns-parking.com / cosmos.dns-parking.com (Hostinger) |
| A | @ | 2.57.91.91 |
| A | www | 2.57.91.91 |
| MX | @ | *(nenhum — domínio não tem e-mail)* |
| TXT | @ | *(nenhum)* |

## SEO

O que está feito:

| peça | onde |
|---|---|
| `robots.txt` | `public/robots.txt`, aponta para o sitemap |
| `sitemap.xml` | gerado por `tools/gerar-sitemap.py`, 36 endereços |
| title, description, canonical | por rota, em `escreverCabecalho()` |
| `hreflang` pt-BR / en / x-default | por rota, nas duas direções |
| Open Graph e Twitter card | no `<head>`, com `og:url` e `og:title` por rota |
| JSON-LD | `Person` e `WebSite` em toda página, mais `CreativeWork` nos cases |
| Imagem de compartilhamento | uma por case, gerada por `tools/gerar-og-cases.py` |
| Cabeçalho servido por rota | `public/cabecalhos.json` + `src/worker.js` |

**Não há `priority` nem `changefreq` no sitemap.** O Google confirma que ignora
os dois, e ignora porque quase todo site marcava tudo como prioridade máxima. E
o `lastmod` vem do git, do último commit que tocou o `index.html`, não da data
em que o arquivo foi gerado: sitemap que diz "tudo mudou hoje" ensina o buscador
a tratar o campo como ruído no site inteiro, e aí ele perde a única função que
tem, que é decidir se vale revisitar.

**O `robots.txt` separa dois tipos de robô de IA.** Busca e leitura sob demanda
(`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot` e os agentes de usuário)
ficam liberados, porque é por onde aparece citação com link. Coleta para
treinamento (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`,
`Applebot-Extended`) fica bloqueada. Não há `llms.txt`: em 2026 nenhum
assistente o consome em produção, então seria arquivo decorativo.

**O sitemap é gerado, não escrito à mão.** Ele lê `ROTAS` e `CASES` do próprio
`index.html`, pelo mesmo motivo da tabela de rotas ser uma só: lista repetida
diverge, e sitemap que anuncia página inexistente é erro registrado no Search
Console. **Rode `python3 tools/gerar-sitemap.py` sempre que criar, renomear ou
remover uma rota ou um case.**

### Pré-renderização, e por que não

O corpo do site é desenhado por JavaScript. O HTML servido não vem vazio: vem
com o template, e nele há **890 chaves `{{ }}` não interpoladas**. Se o buscador
não executasse o script, indexaria uma página cujo texto visível é
`{{ t.hero.h1a }}`, o que é pior que página em branco.

**Isso foi testado, não suposto.** Em 14/09/2026, no Search Console, URL
Inspection → Test live URL em `/cases/hercules`: resultado *"URL is available to
Google"*, *"Page can be indexed"*, e o Screenshot mostra **o case montado**, com
o texto real. O Google executa o JavaScript antes de indexar.

Um detalhe que engana no mesmo relatório: *"Video detected"* não prova
renderização. As duas tags `<video>` estão literais no HTML servido, dentro do
template. O que prova é o Screenshot.

Com isso, pré-renderizar não se paga. E não seria barato:

O runtime do Claude Design **remove** o `<x-dc>` do documento e cria um
`<div id="dc-root">` no lugar. Conteúdo colocado dentro do `x-dc` corrompe a
leitura do template; colocado fora, vira um segundo `dc-root` visível ao lado do
verdadeiro. Não há ponto de injeção seguro sem trocar o runtime. A alternativa
seria servir 36 documentos completos: 13 MB, e cada palavra alterada reescreve
os 36 arquivos.

Se um dia esse teste voltar a dar outro resultado, a conta muda e vale refazer.

### Peso da página

A home baixava **9.599 KB**, dos quais **7.482 KB eram os dois vídeos do case
Hercules**, que nela nunca aparecem. O motivo é o *preload scanner*: o navegador
lê o HTML cru e busca todo `src` que encontra, antes de o JavaScript existir.
Como o documento é único e carrega o template de todas as páginas, os vídeos e
quatro imagens de case eram buscados sempre.

Hoje são **1.146 KB**, e nenhum byte de vídeo.

O que resolve é caminho que o scanner não enxerga. Imagem vinda de dado entra
como `background-image` num `<div role="img">`, nunca como `<img src>`, porque
`src="{{ x }}"` é pior que o literal: o scanner pede a chave como se fosse
endereço e recebe o `index.html` inteiro de volta, 371 KB por imagem. Isso foi
medido, não deduzido.

Vídeo fica com `preload="none"` e o caminho vindo de dado. Numa página de case é
o visitante que decide quando assistir.

**Toda imagem do site é WebP**, com duas exceções de propósito: `og-card.png` e
`assets/og/*.jpg`, que são as imagens de compartilhamento. LinkedIn e Facebook
não geram preview de WebP. `tools/para-webp.py` conhece essa lista e as pula.

### Cabeçalho servido

O corpo do site é desenhado por JavaScript, e o cabeçalho também: `title`,
`canonical`, `og:*` e `hreflang` eram escritos por `escreverCabecalho()` a cada
rota. Quem lê o HTML servido sem executar nada via **sempre o cabeçalho da
home**, nas 36 rotas: mesmo título, mesma `og:image`, e `canonical` apontando
para `/`.

Esse canonical era o pior dos três, porque afirma que todo case é a home. E
LinkedIn, WhatsApp e Slack não executam JavaScript, então os cards de
compartilhamento por case eram invisíveis para eles.

A correção tem duas peças. `tools/gerar-cabecalhos.py` abre cada rota num
navegador de verdade e grava o cabeçalho que o app escreveria em
`public/cabecalhos.json`, 74 KB. `src/worker.js` costura esses valores na
resposta com HTMLRewriter, que trabalha em fluxo. Qualquer erro ali cai no
arquivo original: cabeçalho errado é ruim, site fora do ar é pior.

O gerador usa o navegador, e não o Chrome de linha de comando, porque o
`--dump-dom` depende de *virtual time* fechar e nesta página ele nunca fecha: a
parede de marcas tem animação CSS infinita. Trava até com orçamento de 3
segundos.

Uma armadilha que custou dois deploys: **por padrão a Cloudflare serve arquivo
que existe direto da borda, sem invocar o worker.** Como `/` resolve para
`index.html`, que existe, a home saía sem `hreflang` e sem JSON-LD enquanto as
outras 35 rotas saíam certas, porque nenhuma delas existe como arquivo. O que
liga o worker em toda requisição é `run_worker_first: true` no `wrangler.jsonc`.
O sintoma engana porque na home o título correto é o título padrão, então só a
contagem das tags acrescentadas denuncia.

**O manifesto guarda o sha256 do `index.html`.** `tools/conferir-cabecalhos.py`
compara, e o hook de pre-push recusa o push se o index mudou sem regerar.
Cabeçalho velho é pior que nenhum: passa a anunciar título que a página não tem,
e é invisível no navegador, onde o JavaScript reescreve tudo. Só o robô vê o
errado. Para empurrar mesmo assim, `PERMITIR_CABECALHO_VELHO=1 git push`.

**As imagens de compartilhamento também são geradas.** Um card 1200x630 por
case, com a capa à esquerda e tipo, nome e a frase do case à direita. Saem em
JPEG de propósito: as capas do site são WebP, e LinkedIn e Facebook não geram
preview desse formato, então apontar `og:image` direto para elas quebraria o
preview de todo link compartilhado. **Rode `python3 tools/gerar-og-cases.py`
com o servidor local no ar quando mudar a capa, o nome ou a frase de um case.**

O endereço da home sai como `https://gustavoalbino.com.br/`, com barra, para
bater exatamente com o que o canonical escreve. Sem isso o buscador vê dois
endereços para a mesma página.

O que falta é o corpo, e está nas pendências: o HTML servido continua vindo
sem conteúdo até o JavaScript rodar.

## Credencial do terminal

O `git` da linha de comando tem um Personal Access Token guardado no chaveiro
do macOS, sob `github.com`, com o helper `osxkeychain`. É o que permite dar push
sem o GitHub Desktop.

**Expira em 13 de dezembro de 2026.** Quando expirar, todo push pela linha de
comando volta a falhar com `403`, e a mensagem não diz que o motivo é validade.
Se esse erro aparecer, comece por aí.

O token é *fine-grained*, limitado a este repositório, com duas permissões:
`Metadata: Read-only`, que vem sozinha, e `Contents: Read and write`, que é a
que autoriza escrita. Com `Repository access` em "Public repositories" ele lê e
não escreve, o que produz o mesmo `403` e foi o que aconteceu na primeira
tentativa.

Para revogar o acesso da linha de comando sem mexer no GitHub Desktop, que tem
armazenamento próprio:

```
printf 'protocol=https\nhost=github.com\n' | git credential-osxkeychain erase
```

Abrir pull request continua fora daqui: precisa do token num cabeçalho de API, e
o token não sai do chaveiro para isso. O ciclo é push pela linha de comando, PR
pelo navegador.

## Rotas

Cada página e cada case têm endereço próprio. O mapa vive em uma tabela só,
`ROTAS` em `public/index.html`, lida nos dois sentidos por `caminhoDe()` e
`rotaDe()`. Uma tabela lida nos dois sentidos evita o erro clássico de duas
listas que divergem com o tempo.

| estado | endereço | em inglês |
|---|---|---|
| `home` | `/` | `/en` |
| `sobre` | `/sobre` | `/en/about` |
| `cases` | `/cases` | `/en/cases` |
| `case` | `/cases/<id>` | `/en/cases/<id>` |
| `galeria` | `/projetos` | `/en/projects` |
| `anuarios` | `/projetos/relatorios` | `/en/projects/reports` |
| `ebooks` | `/projetos/ebooks` | `/en/projects/ebooks` |
| `culturais` | `/projetos/culturais` | `/en/projects/cultural` |
| `logos` | `/projetos/logos` | `/en/projects/logos` |
| `ilustracao` | `/projetos/ilustracao` | `/en/projects/illustration` |
| `servicos` | `/servicos` | `/en/services` |
| `contato` | `/contato` | `/en/contact` |

O inglês ganhou prefixo de caminho em vez de um parâmetro porque caminho
separado é o sinal que o buscador entende como outra página. Endereço
desconhecido cai na home e se corrige sozinho com `replaceState`, para que link
velho compartilhado continue abrindo o site.

Três peças fazem isso funcionar, e as três são necessárias:

**`<base href="/">` no `<head>`.** O mesmo `index.html` é servido em
`/cases/runpace`, então todo caminho relativo resolveria contra `/cases/`.
Sem o `base`, `support.js`, o CSS e as imagens dão 404 e o site abre em branco
em qualquer endereço fora da raiz. Esse defeito apareceu no teste.

**`src/worker.js`.** Caminho de rota não é arquivo, e o Workers devolvia 404 em
toda recarga fora da raiz. O script devolve o `index.html` apenas em caminho
sem extensão; `/assets/x.webp` que não existe continua 404 de verdade.

**`escreverCabecalho()`.** Como o corpo é desenhado por JavaScript, title,
description, canonical, `og:*` e `hreflang` também precisam ser escritos a cada
troca de página. Sem isso, as doze rotas herdavam o título da home.

Uma folga conhecida: endereço inventado responde 200 antes de se corrigir para
a home, o que para o buscador é um *soft 404*. Fechar isso exigiria repetir a
tabela de rotas dentro do worker, que é justamente a duplicação que o desenho
evita.

## Redirect do `www`

O `www` e o domínio raiz serviam o mesmo site em dois endereços, o que para
busca é conteúdo duplicado. A correção não está neste repositório: é uma
**Redirect Rule** no painel da Cloudflare, em Rules → Redirect Rules.

| campo | valor |
|---|---|
| Nome | `www para apex` |
| If | Hostname equals `www.gustavoalbino.com.br` |
| Then | Dynamic redirect |
| Expressão | `concat("https://gustavoalbino.com.br", http.request.uri.path)` |
| Status | 301 |
| Preserve query string | ligado |

Três decisões dentro dela. **Dynamic** e não Static, senão todo endereço do
`www` cairia na home em vez do caminho equivalente. **301** e não 302, porque
só o permanente transfere autoridade de busca. E fica na borda, não no Worker:
o `wrangler.jsonc` é de propósito sem `main`, e um script de redirect ali
viraria o handler de todas as requisições, trocando uma regra de painel por um
ponto único de falha no site inteiro.

Conferido: `https://www.gustavoalbino.com.br/assets/anuarios/2025-cover.webp`
devolve 301 para o mesmo caminho no apex, em um salto, com query string
preservada.

## Estado atual

| Item | Situação |
|---|---|
| Site importado do canvas | ✅ feito |
| Assets otimizados | ✅ 365,4 MB → 64 MB (imagem toda em WebP) |
| Roda fora do Claude Design | ✅ verificado |
| Publicado no GitHub | ✅ público |
| Configuração da Cloudflare no repo | ✅ `wrangler.jsonc` |
| Deploy servindo o site | ✅ no ar em gustavoalbino.com.br |
| Domínio apontado | ✅ feito |
| `www` redirecionando para o apex | ✅ Redirect Rule, 301 |
| Branch `main` protegida | ✅ ruleset ativo: PR obrigatório, sem force push, sem deleção |

## Pendências

**Para publicar:**

- [ ] Proteger a `main` (Require a pull request before merging, **0 aprovações**)
- [x] ~~Confirmar na Cloudflare que o projeto está ligado a este repositório~~
- [x] ~~Mergear o PR #1 e ver o site substituir o `Hello World!`~~
- [x] ~~Conformidade dos assets da Kaya Mind~~ — resolvido: nenhuma tela do
      produto é reproduzida. O case descreve processo, sistema e decisões, e a
      página traz nota explícita de propriedade da Kaya Mind.
- [x] ~~Apontar `gustavoalbino.com.br` para a Cloudflare~~

**Qualidade, depois de estar no ar:**

- [ ] **Aviso "Cases em produção" está desatualizado.** Diz que o conteúdo
      detalhado "entra em breve", mas 4 dos 5 cases já têm página completa.
      Vende o trabalho por menos do que ele é. Só o Kaya Doc falta — tratar
      junto com a construção daquele case.
- [ ] **Preload entre páginas.** O site é um HTML único, e o preload scanner do
      navegador baixa `<img src>` de páginas que o visitante nunca abre. Hoje
      `stat-canhamo.jpg` e `hero-explore.jpg` (581 KB, do case Yerba Fina)
      ainda carregam na home. A correção é arquitetural: `loading="lazy"` nas
      imagens fora da dobra, ou separar as páginas em arquivos.
- [x] ~~**Roteamento por URL**~~ feito. Cada página e cada case têm endereço
      próprio (`/cases/runpace`), o inglês vive em `/en/...`, e voltar e
      avançar do navegador funcionam. Detalhe abaixo, em *Rotas*.
- [ ] **Cards da galeria removidos por falta de material:** Identidade A,
      Telas de Produto, Design System, Dataviz · Power BI e Experimentos.
      Podem voltar com imagem real. Para Dataviz existe
      `Website /Page - Web Design & UI Design/Dashboard design_PBI.jpg`.
- [x] ~~**Vídeos**~~ feito. Os do case Hercules foram de 30,8 MB para 7,3 MB.
      Um dos três não era usado em lugar nenhum e saiu. Os outros dois foram
      recomprimidos por `tools/comprimir-video.swift`, que existe porque o
      `avconvert` desta máquina mira qualidade e não tamanho: pelo
      `Preset1280x720`, o vídeo de 15,9 MB saía com 25,9 MB.
- [x] ~~**Corpo pré-renderizado**~~ descartado, e agora com teste. Ver
      *Pré-renderização* abaixo.
- [x] ~~**Imagens de compartilhamento por case**~~ feito. Cada case tem a sua,
      em `public/assets/og/`, gerada por `tools/gerar-og-cases.py`.
- [ ] **Ruído no console:** o `_ds_bundle.js` embute um UI kit de demonstração
      que registra 2 erros React #299. Inofensivo.
- [x] ~~**WebP**~~ feito. As 228 imagens de `anuarios`, `cases`, `ebooks` e
      `ebooks-kaya` viraram WebP: 42,1 MB → 15,3 MB. O `sips` desta máquina
      recusa o formato e não há `cwebp` nem Homebrew, então a conversão roda
      pelo encoder do próprio Chrome, via `tools/para-webp.py`.
