# IA Guiomar

Site institucional do curso técnico de Inteligência Artificial da EEEP Guiomar Belchior Aguiar, em Cariré (CE). Apresenta o curso, as cinco áreas curriculares, as galerias, os projetos e duas experiências didáticas que rodam no navegador. [Site no GitHub Pages](https://samuelnata2109.github.io/IA-guiomar-site/)

A Home reúne Hero, matrículas e localização. O menu abre as páginas do curso, áreas, Code Quest, projetos e escola. Os endereços usam fragmentos como `#/areas` para funcionar em acesso direto no GitHub Pages.

## Desenvolver

Use Node.js 22.22.2 ou mais recente da série 22, como no GitHub Actions. A versão 24 também é compatível a partir de 24.15.0. O `package-lock.json` fixa as dependências.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

O Vite informa o endereço local no terminal. Use `npm run dev` para editar e `npm run preview` depois do build para conferir `dist/`.

## Documentação

- [Arquitetura e versões](docs/ARQUITETURA.md)
- [Funcionalidades e progresso local dos jogos](docs/FUNCIONALIDADES.md)
- [Manutenção de conteúdo, assets e jogos](docs/MANUTENCAO.md)
- [Testes, roteiro de validação e limitações](docs/TESTES.md)
- [Publicação pelo GitHub Actions](docs/DEPLOY.md)
- [Matriz curricular](docs/MATRIZ_IA.md) e [histórico por etapa](docs/PROGRESSO.md)
- [Changelog](CHANGELOG.md)

A documentação e o PDF da referência original permanecem disponíveis como [registro histórico](docs/DOCUMENTACAO.md). Para trabalhar na versão de IA, use os guias acima.
