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
2. Nova branch a partir da `main` — nunca commitar direto na `main`.
3. Commit das alterações.
4. Abrir PR no GitHub Desktop.
5. A Cloudflare comenta no PR um link de preview — **conferir ali**.
6. Merge → a Cloudflare publica em produção sozinha.

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

## Estado atual

| Item | Situação |
|---|---|
| Site importado do canvas | ✅ feito |
| Assets otimizados | ✅ 365,4 MB → 76,2 MB |
| Roda fora do Claude Design | ✅ verificado |
| Publicado no GitHub | ✅ público |
| Configuração da Cloudflare no repo | ✅ `wrangler.jsonc` |
| Deploy servindo o site | ⬜ ainda sai "Hello World!" |
| Branch `main` protegida | ⬜ falta |
| Domínio apontado | ⬜ falta |

## Pendências

**Para publicar:**

- [ ] Proteger a `main` (Require a pull request before merging, **0 aprovações**)
- [ ] Confirmar na Cloudflare que o projeto está ligado a este repositório
- [ ] Mergear o PR #1 e ver o site substituir o `Hello World!`
- [x] ~~Conformidade dos assets da Kaya Mind~~ — resolvido: nenhuma tela do
      produto é reproduzida. O case descreve processo, sistema e decisões, e a
      página traz nota explícita de propriedade da Kaya Mind.
- [ ] Apontar `gustavoalbino.com.br` para a Cloudflare (por último)

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
- [ ] **WebP:** o `sips` desta máquina não gera WebP. Alternativa sem instalar
      nada: ligar o Polish da Cloudflare.
