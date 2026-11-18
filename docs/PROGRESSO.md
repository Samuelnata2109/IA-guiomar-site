# Progresso do projeto

| Etapa | Status | Decisão ou pendência |
| --- | --- | --- |
| 01 — Análise e preparação do projeto | Documentação entregue, com análise do código bloqueada | Matriz e vídeo analisados. A cópia do código original é necessária para completar o mapa de arquivos e estabelecer o build de referência. |
| 01.1 — Complementação da análise | Concluída | Código integrado, arquitetura e paleta mapeadas, build de referência aprovado. |
| 02 — Alteração da paleta de cores | Concluída | Cores azuis aplicadas na interface e nas cenas gráficas. |
| 02.1 — Refinamento da identidade visual | Build aprovado | Hero e SVGs recoloridos. Verificação visual em navegador desktop e mobile indisponível nesta sessão. |
| 03 — Hero e apresentação do curso | Não iniciada | |
| 04 — Adaptação dos cinco cards | Não iniciada | Seleção registrada em [MATRIZ_IA.md](MATRIZ_IA.md). |
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
