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
| Branch `main` protegida | ⬜ falta |

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
- [ ] **Roteamento por URL.** Navegação e idioma são só `setState`. Nenhum case
      é linkável, o botão "voltar" do navegador sai do site, e o inglês —
      100% traduzido — é invisível para busca.
- [ ] **Cards da galeria removidos por falta de material:** Identidade A,
      Telas de Produto, Design System, Dataviz · Power BI e Experimentos.
      Podem voltar com imagem real. Para Dataviz existe
      `Website /Page - Web Design & UI Design/Dashboard design_PBI.jpg`.
- [ ] **Vídeos:** os 3 MP4 do case Hercules somam 30,8 MB. Não há `ffmpeg`
      nesta máquina; o HandBrake resolve.
- [ ] **SEO:** o conteúdo é renderizado por JavaScript. O `<head>` já tem
      title, description e Open Graph, mas o corpo servido vem vazio.
- [ ] **Ruído no console:** o `_ds_bundle.js` embute um UI kit de demonstração
      que registra 2 erros React #299. Inofensivo.
- [x] ~~**WebP**~~ feito. As 228 imagens de `anuarios`, `cases`, `ebooks` e
      `ebooks-kaya` viraram WebP: 42,1 MB → 15,3 MB. O `sips` desta máquina
      recusa o formato e não há `cwebp` nem Homebrew, então a conversão roda
      pelo encoder do próprio Chrome, via `tools/para-webp.py`.
