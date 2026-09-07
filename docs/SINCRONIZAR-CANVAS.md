# Como atualizar o site a partir do Claude Design

O site é o canvas `Site Gustavo Albino.dc.html` do projeto Claude Design
`78d0eb0b-c2ba-4d4c-b6d6-66f89f785147`, rodando fora do Claude Design.

## O que difere do canvas original

Exatamente **uma** alteração. O `dc-runtime` (`support.js`) exige `window.React`
e `window.ReactDOM`, que o editor do Claude Design injeta e um navegador comum
não tem. Por isso, no `index.html`, duas tags foram inseridas **imediatamente
antes** do `<script src="./support.js">`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
```

React **18** é obrigatório — o runtime usa `ReactDOM.createRoot`.

Fora isso, `index.html` é o canvas byte a byte. Reimportar = baixar o canvas de
novo e reinserir essas duas linhas na mesma posição.

## Estrutura

```
index.html    ← o canvas + as 2 tags do React
support.js    ← dc-runtime (gerado, não editar à mão)
_ds/…         ← design system: tokens + bundle dos componentes
assets/       ← imagens e vídeos (ver limitação abaixo)
```

## Limitação conhecida no transporte de assets

A API de leitura do projeto Claude Design (`DesignSync.get_file`) **corta em
256 KiB**, o que equivale a ~192 KiB de imagem. Arquivos maiores voltam
truncados e corrompidos (PNG sem chunk `IEND`).

Consequência: os assets **não** podem ser puxados por essa via. Eles precisam
vir da exportação/download do projeto no Claude Design, ou dos originais locais.

## Verificado em 2026-09-07

Servido como site estático comum, sem Claude Design, funcionaram:

- renderização das 6 seções (React 18 UMD + dc-runtime)
- os 15 componentes do design system carregam sem erro
- navegação entre páginas (Home ↔ Cases)
- alternância de idioma PT ↔ EN em toda a interface
- filtros de categoria

## Ruído conhecido (não quebra nada)

O `_ds_bundle.js` embute um UI kit de demonstração,
`ui_kits/portfolio/app.jsx`, que tenta se montar num container inexistente e
registra 2 erros React #299 no console. Não afeta o site. Pode ser removido do
bundle numa limpeza futura.

## Pendência de qualidade

Todo o conteúdo é renderizado por JavaScript no cliente — o HTML servido vem
praticamente vazio. Isso significa **SEO fraco**: buscadores e prévias de link
(WhatsApp, LinkedIn) não veem o conteúdo. Resolver depois com pré-renderização
ou tags Open Graph estáticas no `<head>`. Não bloqueia a publicação.
