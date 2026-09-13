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
wrangler.jsonc   ← diz à Cloudflare que public/ é o site
public/
├── index.html   ← o canvas + as 2 tags do React
├── support.js   ← dc-runtime (gerado, não editar à mão)
├── _ds/…        ← design system: tokens + bundle dos componentes
└── assets/      ← imagens e vídeos (ver limitação abaixo)
```

Reimportar significa substituir `public/index.html`, `public/support.js` e
`public/_ds/`, e rodar o otimizador sobre os assets novos:

```
python3 tools/otimizar-assets.py <assets_do_handoff> public/assets public/index.html
```

## Ao reimportar: o que precisa ser refeito no index.html

O canvas nao conhece nenhuma destas alteracoes. Reimportar sobrescreve o
`index.html` e todas se perdem. Refazer, nesta ordem:

1. As duas tags do React 18, antes do `support.js` (ver acima).
2. O `<head>`: `lang`, `<title>`, `description`, as tags `og:`, o favicon e o
   `<link rel="stylesheet" href="responsivo.css">`.
3. Rodar `python3 tools/versionar-css.py` para carimbar o CSS.
4. As mudancas de conteudo e estrutura feitas fora do canvas — hero, secao de
   destaques, pagina Sobre, formulario ligado ao WhatsApp, download do CV.
5. A parede de marcas: a classe `ga-brands` na grade, `ga-brand` na celula,
   `repeat(4,1fr)` no lugar de `repeat(5,1fr)`, o campo `fit` em `BRANDS` (e o
   `logoStyle` que o consome) e a nota de rodape como 12a celula em vez do
   `<p>` abaixo da grade. Sao 11 marcas + 1 nota = 12 celulas, numero escolhido
   para fechar retangulo em 4, 3 e 2 colunas. Mexer na contagem de marcas sem
   mexer na grade deixa uma linha orfa.

Quando houver muito disto acumulado, o certo passa a ser levar as mudancas
**para dentro do canvas** e reexportar, em vez de reaplicar a cada vez.

## Logos das marcas

`tools/trim-logo.swift` (CoreGraphics puro, sem ImageMagick/Pillow) mede a
caixa de conteudo de um logo, recorta a margem vazia e regrava em PNG:

```
swiftc -O -o /tmp/trim-logo tools/trim-logo.swift
/tmp/trim-logo entrada.png saida.png 640            # recorta e limita a 640px
/tmp/trim-logo entrada.png /dev/null --dry          # so mede, nao escreve
/tmp/trim-logo arte.png logo.png 900 --chave-branco # tira o papel branco
```

`--chave-branco` usa flood fill a partir da borda: so o branco que encosta na
margem vira transparencia, entao contraforma de letra continua opaca. Foi
assim que o logo da Auroraeco saiu do postcard impresso — a unica copia em
resolucao util que existia era a que estava aplicada na arte.

O `--dry` e a forma de conferir o acervo inteiro de uma vez; todo logo deve
reportar `ocupa 100%/100%`. Se reportar menos, sobrou margem vazia e ele vai
renderizar menor que os vizinhos na parede de marcas.

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
