# Progresso do projeto

| Etapa | Status | Decisão ou pendência |
| --- | --- | --- |
| 01 — Análise e preparação do projeto | Documentação entregue, com análise do código bloqueada | Matriz e vídeo analisados. A cópia do código original é necessária para completar o mapa de arquivos e estabelecer o build de referência. |
| 01.1 — Complementação da análise | Concluída | Código integrado, arquitetura e paleta mapeadas, build de referência aprovado. |
| 02 — Alteração da paleta de cores | Concluída | Cores azuis aplicadas na interface e nas cenas gráficas. |
| 02.1 — Refinamento da identidade visual | Build aprovado | Hero e SVGs recoloridos. Verificação visual em navegador desktop e mobile indisponível nesta sessão. |
| 03 — Hero e apresentação do curso | Concluída, build aprovado | Conteúdo institucional adaptado para IA; captura visual em navegador limitada pelo Chromium headless. |
| 04 — Adaptação dos cinco cards | Conteúdo adaptado; build pendente | Cinco áreas da matriz aplicadas, com Machine Learning I e II no mesmo card. Build requer dependências já instaladas, conforme restrição da etapa. |
| 05 — Elementos gráficos e modelos 3D | Não iniciada | |
| 06 — Adaptação do Code Quest | Não iniciada | |
| 07 — Laboratório interativo | Não iniciada | |
| 08 — Projetos e informações institucionais | Não iniciada | |
| 09 — Responsividade e otimização | Não iniciada | O vídeo cobre somente a apresentação em desktop. |
| 10 — Testes e documentação final | Não iniciada | |

## Registro da etapa 01

- `git rev-parse HEAD` e `git ls-remote --heads origin` confirmaram o SHA `d0fbe9b5ada992b09b689e5ad8df4a4ad9f34a84` no checkout e na `main` remota de IA. A referência do código original de Desenvolvimento de Sistemas aguarda o acesso à cópia correspondente.
- A inspeção da árvore Git encontrou somente `README.md`, sem manifestos ou scripts versionados. `npm run build` na raiz retornou código 254 e `ENOENT` para `package.json`; a compilação não chegou a iniciar.
- A requisição ao site de referência falhou com HTTP 403 no túnel do proxy. A análise visual foi feita com a gravação. Arquivos, bibliotecas, comportamento responsivo e funcionamento ao vivo aguardam verificação.
- A proposta curricular foi lida na planilha anexada. Os dados publicados neste registro de trabalho correspondem à proposta, com uma divergência de carga horária registrada em [MATRIZ_IA.md](MATRIZ_IA.md).
- O escopo foi restrito à documentação. Nenhum arquivo preexistente foi alterado e nenhuma dependência foi instalada.

## Registro da etapa 01.1

- A branch local `work` foi atualizada por fast-forward para a `main` de IA no commit `9939841040ca48f035b8ddcea0e2781f2f56c8d5`. O checkout passou a conter `package.json`, `package-lock.json`, `src/` e `public/`. Os quatro documentos da etapa 01 foram preservados.
- O mapa em [ARQUITETURA.md](ARQUITETURA.md) registra os componentes, os cinco cards originais, a paleta e os estilos, Code Quest, laboratório, cenas 3D e regras responsivas. A análise da matriz e do vídeo foi reaproveitada.
- Em uma cópia temporária do commit, `npm ci` instalou 174 pacotes com Node.js 24.22.1 e npm 11.9.0. `npm run build` concluiu `tsc -b` e a compilação com Vite 7.3.8. A presença de `dist/index.html` foi verificada.
- O Vite emitiu um aviso sobre três chunks acima de 500 kB após minificação, sem impedir o build. São a entrada principal (538,96 kB), Code Quest (585,31 kB) e React Three Fiber (882,15 kB).
- Testes automatizados e validação em navegador ficaram fora desta rodada. Nenhum arquivo versionado foi modificado após a atualização do checkout. A etapa 02 aguarda autorização.

## Continuação da etapa 02.1

- O checkout permaneceu na branch `codex/etapa-02-1-refinamento-visual`, baseada na `main` remota em `c4b1f71`.
- `npm ci --cache /tmp/guiomar-npm-cache --no-audit --no-fund` falhou com avisos de tarballs corrompidos e erros `TAR_ENTRY_ERROR ENOENT`, além de tentativa de criar `/home/agent/.npm/_cacache`. Nenhuma dependência ou lockfile foi alterado.
- Com o Vite existente no ambiente, `npm run build` passou, executando `tsc -b` e Vite 7.3.8. O Vite manteve aviso sobre chunks acima de 500 kB.
- A validação visual desktop/mobile em navegador não foi possível nesta sessão.

## Etapa 03 — Hero e apresentação do curso

- Cabeçalho atualizado para Inteligência Artificial • Curso Técnico • Guiomar, com ícone BrainCircuit da biblioteca Lucide. Metadados de título e descrição SEO atualizados em index.html.
- Hero usa os textos aprovados para o público iniciante e mantém a arte, destinos dos links e animações. Apresentação institucional reescrita com explicação acessível de IA, dados, padrões, aplicações, criatividade e uso responsável, orientada pela matriz documentada.
- `npm ci --cache /tmp/ia-guiomar-npm-cache --no-audit --no-fund` instalou 174 pacotes sem mudanças nos manifestos. `npm run build` passou em TypeScript e Vite 7.3.8, com o aviso preexistente sobre chunks acima de 500 kB.
- A captura Chromium headless em desktop excedeu o limite de execução e não gerou imagem; mobile também não foi validado visualmente. Sem screenshot, corte e overflow não puderam ser confirmados visualmente.

## Etapa 04 — Adaptação dos cards das disciplinas

- Os cinco cards e os conteúdos dos modais foram adaptados aos cinco grupos aprovados em MATRIZ_IA.md. Machine Learning I e II estão reunidos no card 03. A faixa introdutória acompanha os novos títulos.
- Mantive os IDs internos existentes para preservar o vínculo entre cada card, sua imagem atual, seus estilos, galeria e interações. Nenhuma imagem foi substituída e nenhum componente visual foi reorganizado.
- A conferência estática confirmou cinco entradas na lista `courses` e preservação dos IDs usados por `media` e `courseMedia`. Não foi possível executar validação interativa em navegador nesta sessão.
- `npm run build` foi tentado e falhou imediatamente com `sh: 1: tsc: not found`, pois `node_modules` não está presente. A instalação de dependências não foi executada, em respeito à restrição explícita da etapa.

## Etapa 02.2 — Correção cromática dos cards

- Na branch iniciada da main em `dc13bd5`, a renderização dos cards foi rastreada de `InteractiveShowcase.tsx` para `CinematicMedia.tsx` e para os SVGs mapeados em `src/data/media.ts`. Os cinco recursos são SVGs da pasta `public/assets`, sem PNG, WebP ou modelo 3D nos cards. `--area-color` também colore halo e detalhes usando os dados de `src/data/courses.ts`.
- A etapa 02.1 havia recolorido os SVGs, mas manteve cores de destaque por card, incluindo índigo `#818cf8` em Programação. Essa cor seguia tingindo o halo e a apresentação visual. Os SVGs e as cores temáticas agora usam a paleta azul moderada.
- `npm ci --cache /tmp/ia-guiomar-npm-cache --no-audit --no-fund` instalou 174 pacotes sem alterar manifestos ou lockfile. `npm run build` passou com TypeScript e Vite 7.3.8. Vite ainda alerta sobre chunks acima de 500 kB.
- Os cinco SVGs recoloridos foram confirmados em `dist/assets`. Não foi possível capturar imagens do site: o Chromium headless falhou ao criar o perfil temporário e não concluiu a segunda tentativa. Validação cromática visual em desktop e mobile permanece pendente.
