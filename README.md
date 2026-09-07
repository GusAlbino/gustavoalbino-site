# gustavoalbino.com.br

Site pessoal de Gustavo Albino. Fonte da verdade do site publicado.

- **Produção:** https://www.gustavoalbino.com.br
- **Hospedagem:** Cloudflare Pages (deploy automático)
- **Registro do domínio:** Hostinger
- **Desenho:** Claude Design → convertido em HTML estático neste repositório

## Regra única

**Nada vai pro ar sem passar por Pull Request.** A branch `main` é o site publicado.
Toda alteração nasce em uma branch, vira PR, ganha um link de preview automático
da Cloudflare, e só entra em produção depois do merge.

## Fluxo de uma alteração

1. Desenho ajustado no Claude Design (quando for mudança visual).
2. Nova branch a partir da `main` — nunca commitar direto na `main`.
3. Commit das alterações.
4. Abrir PR no GitHub Desktop.
5. A Cloudflare comenta no PR um link `https://<hash>.<projeto>.pages.dev` — **conferir ali**.
6. Merge → a Cloudflare publica em produção sozinha, em ~1 minuto.

## Estrutura

```
/
├── index.html          # página principal
├── assets/
│   ├── css/
│   ├── img/
│   └── fonts/
└── .github/
    └── pull_request_template.md
```

## Build

Nenhum. É HTML estático puro.
Configuração na Cloudflare Pages:

| Campo | Valor |
|---|---|
| Framework preset | None |
| Build command | *(vazio)* |
| Output directory | `/` |
| Production branch | `main` |

## Rollback

GitHub → histórico de commits → `Revert` no commit problemático → PR → merge.
Ou, para emergência: Cloudflare Pages → Deployments → deploy anterior → `Rollback`.

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
| Site importado do canvas | ✅ feito (branch `site/import-canvas`) |
| Assets otimizados | ✅ 365,4 MB → 76,2 MB |
| Roda fora do Claude Design | ✅ verificado |
| Publicado no GitHub | ⬜ falta |
| Ligado à Cloudflare Pages | ⬜ falta |
| Branch `main` protegida | ⬜ falta |
| Domínio apontado | ⬜ falta |

## Pendências

**Para publicar:**

- [ ] Publicar o repositório no GitHub (público, para ter proteção de branch grátis)
- [ ] Conectar à Cloudflare Pages — preset None, build vazio, output `/`
- [ ] Proteger a `main` (Require a pull request before merging)
- [ ] Abrir o PR #1 com a branch `site/import-canvas` e conferir no preview
- [ ] Apontar `gustavoalbino.com.br` para a Cloudflare (por último)

**Qualidade, depois de estar no ar:**

- [ ] **Vídeos:** os 3 MP4 do case Hercules somam 30,8 MB de um total de 76,2 MB.
      Não há `ffmpeg` nesta máquina. Recomprimir (HandBrake resolve) para ~3 MB cada.
- [ ] **Fotos do hero:** `hero-runner`, `hero-suica`, `hero-trail` e `sobre-suica`
      estão com ~1 MB cada. Cabe decisão do designer se vale baixar a qualidade.
- [ ] **SEO:** todo o conteúdo é renderizado por JavaScript — o HTML servido vem
      quase vazio. Buscadores e prévias de link (WhatsApp, LinkedIn) não veem nada.
      Resolver com pré-renderização ou, no mínimo, tags Open Graph estáticas no `<head>`.
- [ ] **Ruído no console:** o `_ds_bundle.js` embute um UI kit de demonstração
      (`ui_kits/portfolio/app.jsx`) que registra 2 erros React #299. Inofensivo, mas sujo.
- [ ] **WebP:** o `sips` desta máquina não gera WebP. Com ele, as imagens cairiam
      mais uns 30%. Depende de instalar `cwebp` ou usar o Polish da Cloudflare.
