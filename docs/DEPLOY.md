# Publicação no GitHub Pages

O endereço do site é [samuelnata2109.github.io/IA-guiomar-site](https://samuelnata2109.github.io/IA-guiomar-site/).

O workflow `.github/workflows/deploy.yml` dispara em pushes para `main`, inclusive os gerados por merge de PR. Ele também oferece execução manual por `workflow_dispatch`. O job `build` usa Node 22, executa `npm ci` e compila com o base path do Pages. O job `deploy` publica o artefato `dist` no ambiente `github-pages`. A suíte roda separadamente antes da integração.

## Conferência antes do PR

```sh
npm ci
npm test
npm run build -- --base=/IA-guiomar-site/
```

Sirva o build sob `/IA-guiomar-site/` para conferir caminhos absolutos e relativos. Por exemplo, se houver Python 3 disponível, use um diretório temporário.

```sh
destino=$(mktemp -d)
cp -R dist "$destino/IA-guiomar-site"
python3 -m http.server 4173 --bind 127.0.0.1 --directory "$destino"
```

Abra `http://127.0.0.1:4173/IA-guiomar-site/`, teste âncoras, fontes, ilustrações e carregamentos sob demanda, incluindo WebGL e CodeMirror. Confira também o caminho de qualquer mídia cadastrada.

## Conferência após a integração

1. Confirme o merge na `main` e identifique o SHA publicado.
2. Na aba **Actions**, abra a execução **Deploy Vite to GitHub Pages** para aquele SHA e confira a conclusão dos jobs `build` e `deploy`.
3. Confira a URL pública e valide a página após a publicação. Se a implantação falhar, use o log do job para diferenciar falha de build, artefato e configuração de Pages.
