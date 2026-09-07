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

## Pendências

- [ ] Substituir o `index.html` placeholder pelo site real vindo do Claude Design
- [ ] Conectar o repositório à Cloudflare Pages
- [ ] Proteger a branch `main` (Require a pull request before merging)
- [ ] Apontar o domínio para a Cloudflare
