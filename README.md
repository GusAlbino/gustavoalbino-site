# gustavoalbino.com.br

Site pessoal de Gustavo Albino. Fonte da verdade do site publicado.

- **Produção:** https://www.gustavoalbino.com.br
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

**BLOQUEIA A PUBLICAÇÃO — conformidade de assets da Kaya Mind:**

O Kaya Doc é produto da Kaya Mind. A regra do titular é clara: **só pode ser
publicado o que já existe no site oficial `kayadoc.com`, e os assets devem ir
próximos do original, sem alteração.** O próprio arquivo do Figma carrega o
aviso de propriedade exclusiva e proibição de reprodução não autorizada.

- [ ] **Remover ou substituir** `public/assets/cases/kaya-doc/comparador.jpg`,
      `biblioteca.jpg` e `descubra.jpg`. Os três vieram de pasta local, não do
      site oficial — as telas ficam atrás de login.
- [ ] **A hero aponta para `comparador.jpg`.** Trocar antes de qualquer deploy.

O que é público e pode ser usado: o hero de `kayadoc.com/static/images/home-v2/`
(porém é imagem gerada por IA, com artefatos visíveis quando ampliada), o logo
oficial em `static/images/rebranding/`, e o próprio site público.

**Para publicar:**

- [ ] Proteger a `main` (Require a pull request before merging, **0 aprovações**)
- [ ] Confirmar na Cloudflare que o projeto está ligado a este repositório
- [ ] Mergear o PR #1 e ver o site substituir o `Hello World!`
- [ ] Apontar `gustavoalbino.com.br` para a Cloudflare (por último)

**Qualidade, depois de estar no ar:**

- [ ] **Vídeos:** os 3 MP4 do case Hercules somam 30,8 MB dos 76,2 MB totais.
      Não há `ffmpeg` nesta máquina. Recomprimir (HandBrake resolve) para ~3 MB cada.
- [ ] **Fotos do hero:** `hero-runner`, `hero-suica`, `hero-trail` e `sobre-suica`
      estão com ~1 MB cada. Cabe decisão do designer se vale baixar a qualidade.
- [ ] **SEO:** todo o conteúdo é renderizado por JavaScript — o HTML servido vem
      quase vazio. Buscadores e prévias de link (WhatsApp, LinkedIn) não veem nada.
      Resolver com pré-renderização ou, no mínimo, tags Open Graph estáticas no `<head>`.
- [ ] **Ruído no console:** o `_ds_bundle.js` embute um UI kit de demonstração
      (`ui_kits/portfolio/app.jsx`) que registra 2 erros React #299. Inofensivo, mas sujo.
- [ ] **WebP:** o `sips` desta máquina não gera WebP. Com ele, as imagens cairiam
      mais uns 30%. Alternativa sem instalar nada: ligar o Polish da Cloudflare.
