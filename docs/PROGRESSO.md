# Progresso do projeto

| Etapa | Status | Decisão ou pendência |
| --- | --- | --- |
| 01 — Análise e preparação do projeto | Documentação entregue, com análise do código bloqueada | Matriz e vídeo analisados. A cópia do código original é necessária para completar o mapa de arquivos e estabelecer o build de referência. |
| 01.1 — Complementação da análise | Concluída | Código integrado, arquitetura e paleta mapeadas, build de referência aprovado. |
| 02 — Alteração da paleta de cores | Concluída | Cores azuis aplicadas na interface e nas cenas gráficas. |
| 02.1 — Refinamento da identidade visual | Build aprovado | Hero e SVGs recoloridos. Verificação visual em navegador desktop e mobile indisponível nesta sessão. |
| 03 — Hero e apresentação do curso | Concluída, build aprovado | Conteúdo institucional adaptado para IA; captura visual em navegador limitada pelo Chromium headless. |
| 04 — Adaptação dos cinco cards | Conteúdo adaptado; build pendente | Cinco áreas da matriz aplicadas, com Machine Learning I e II no mesmo card. Build requer dependências já instaladas, conforme restrição da etapa. |
| 05 — Elementos gráficos dos cards e correção de composição | Concluída | Cinco ilustrações temáticas e composição validada em desktop e mobile. |
| 06 — Adaptação do Code Quest | Concluída | Seis missões de IA, com progressão, selos e modo JavaScript disponível. |
| 07 — Laboratório interativo | Concluída | Seis tarefas de treinamento, métricas e cena 3D com alternativa 2D. |
| 08 — Projetos e informações institucionais | Concluída, build aprovado | Conteúdo institucional alinhado a IA, galeria reutilizável e vazia até a escola fornecer projetos verificados. Confirmação dos dados institucionais listados abaixo depende da escola. |
| 09 — Responsividade e otimização | Concluída | Build sem avisos de chunks acima de 500 kB, 46 testes aprovados e dez larguras verificadas no Chromium. |
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

## Etapa 05 — Elementos gráficos dos cards e correção de composição

- Os cinco cards passaram a usar SVGs de chip inteligente, interface de prompt, rede neural, câmera com detecção e agente com fluxo automatizado. O catálogo de mídia mantém as chaves usadas pelos cards e pelas galerias.
- A composição interna reserva espaços para a arte e o texto. O card de abertura usa colunas em desktop, e os demais mantêm a arte acima do texto com enquadramento individual. A grade externa, a numeração e os controles existentes foram preservados.
- `npm ci` instalou as dependências do lockfile. `npm run build` gerou a distribuição com os cinco SVGs. Permaneceu o aviso do Vite sobre chunks acima de 500 kB.
- Em Chromium headless, os cinco SVGs carregaram e os títulos couberam sem sobreposição com a arte em 1440, 1024, 768, 390 e 320 px. As capturas de 1440 e 390 px foram revisadas e os cinco modais abriram e fecharam. A conferência foi feita com a preferência de movimento reduzido para medir a composição estática.

## Etapa 06 — Code Quest de Inteligência Artificial

O Code Quest já usava um modal carregado sob demanda, um tabuleiro React Three Fiber com o Byte animado e uma alternativa 2D. O modo JavaScript mantinha dez fases, código e progresso por sessão, com desbloqueio após chegar ao portal, sem pontuação numérica. A execução incluía editor, console, dicas, pausa e avanço por instrução. Esses recursos continuam disponíveis em **Aventura JavaScript**.

O modo principal reutiliza o cenário, o personagem, as animações, o portal e o ajuste da divisão dos painéis por teclado ou ponteiro. Cada missão concluída rende um selo e leva Byte à próxima casa. O jogador pode refazer as atividades, rever dicas e retomar os selos da mesma sessão. Em telas estreitas, o tabuleiro fica acima dos comandos e a área da atividade pode rolar com o botão de ação visível.

| Missão | Mecânica |
| --- | --- |
| Primeiro contato | Classificar sistemas que aprendem padrões e sistemas que seguem regras fixas. |
| Organizando os dados | Montar um conjunto variado e corretamente rotulado, evitando dados pessoais. |
| Ensinando a máquina | Escolher exemplos, executar o classificador por vizinho mais próximo e comparar as previsões ao inserir um rótulo trocado. |
| Olhos inteligentes | Classificar quadros desenhados e encaminhar o contorno oculto para revisão. |
| Mestre dos prompts | Montar a instrução com objetivo, contexto, detalhes e limites e comparar respostas simuladas. |
| Agente inteligente | Ordenar leitura, verificação, treino, classificação, encaminhamento e aviso. O fluxo testa uma imagem nítida e uma borrada, que exige revisão humana. |

As regras e o conteúdo ficam em `aiMissions.ts`. Os resultados são didáticos e locais. O jogo não usa serviços externos de IA.

- `npm ci` e `npm run build` passaram com o lockfile existente. O Vite manteve o aviso de chunks acima de 500 kB.
- No Chromium, as seis missões passaram no fluxo completo com WebGL por software. Foram conferidos acertos, erros, reinício, bloqueio de missões, selos, retomada após fechar o jogo e acesso ao modo JavaScript. Tabuleiro e controles couberam em 1440, 390 e 320 px. Com WebGL desativado, a primeira missão também passou no tabuleiro 2D com movimento reduzido e tema escuro.
- A suíte em execução sequencial teve 35 de 40 testes aprovados, incluindo os do Code Quest e da animação do Byte. As cinco falhas de cards, galerias, tema e projetos também ocorreram na `main`.

## Etapa 07 — Ensine o Robô 3D

O laboratório reutiliza a geometria e as animações do robô, a cena Three.js, a confirmação de ações pela renderização e a alternativa 2D. A interface apresenta o objetivo, recebe exemplos ou regras, executa a sequência, registra o resultado e permite corrigir a configuração. O terminal mantém os quatro comandos originais.

| Tarefa | O que o estudante configura e observa |
| --- | --- |
| Classificação de objetos | Rotula exemplos e testa um categorizador local que usa o exemplo mais próximo por tamanho e formato. |
| Desviando de obstáculos | Define se o robô para ou contorna uma barreira detectada pelo sensor simulado. |
| Reconhecimento de padrões | Compara o resultado de poucos exemplos com o de um conjunto mais variado em objetos fora do conjunto de treino. |
| Entrega inteligente | Define prioridade e sequência de análise, coleta e entrega. O leitor usa a etiqueta do objeto. |
| Aprendendo com os erros | Compara duas rotas com recompensas de +4 e −3. Cada resultado concluído atualiza a média da rota testada e influencia a escolha seguinte. |
| Robô autônomo | Combina percepção, desvio, classificação de novos objetos, transporte e entrega. Uma previsão errada leva ao destino errado. |

O motor em `training.ts` calcula as etapas localmente. As métricas de classificação, desvio, entrega e recompensa são registradas quando cada ação termina. A interrupção cancela as etapas pendentes. As tarefas usam objetos sintéticos, regras programadas e uma simulação de reforço com duas rotas fixas. O progresso vale durante a sessão atual do laboratório e o reinício limpa a configuração e as métricas da tarefa.

- `npm ci` e `npm run build` passaram com o lockfile existente. O Vite manteve o aviso de chunks acima de 500 kB.
- Dez testes específicos passaram, incluindo confirmação de movimento e rotação em 3D, transporte, classificação, desvio, ordem dos comandos e aprendizagem por recompensa. A suíte sequencial aprovou 41 de 46 testes, incluindo o Code Quest. As cinco falhas preexistentes abrangem cards, galeria, tema e projetos.
- O Chromium com WebGL por software passou pelas seis tarefas, incluindo erro, sucesso, interrupção, reinício, avanço e conferência dos resultados. O cenário e os controles couberam em 1440, 768, 390 e 320 px. As capturas de 1440 e 390 px foram revisadas. A primeira tarefa foi executada também com WebGL desativado. O percurso completo usou movimento reduzido após o teste de interrupção. A interpolação das animações foi verificada nos testes do renderizador 3D.

### Correção da orientação inicial do robô

- A geometria do rosto está voltada para +Z e a câmera observa a cena pelo lado +Z. O estado inicial apontava para −Z (`Math.PI`), deixando o robô de costas. Ajustei somente o heading inicial da arena e da simulação para `0`; a rotação do modelo continua acompanhando o heading lógico nas tarefas, sem offset visual fixo.
- `npm ci` foi executado sem alterar `package.json` ou `package-lock.json`; `npm run build` passou, com o aviso já conhecido de chunks acima de 500 kB. Capturas do cenário inicial em Chromium com WebGL por software confirmaram o rosto visível em desktop (1440 px) e mobile (390 px), sem overflow horizontal. A alteração também vale para reinício e troca de tarefa porque ambos recriam a arena por `startArena`.
- Os 10 testes focados de movimento 3D e treinamento passaram. As animações e trajetórias existentes continuam determinadas pelos headings de cada passo.

## Etapa 08 — Informações institucionais e projetos

- Rodapé identifica o curso técnico de Inteligência Artificial e a escola. A galeria não usa mais o endereço do site de Desenvolvimento de Sistemas; não havia um endereço institucional confirmado específico para IA.
- `src/data/content.ts` centraliza os projetos verificados. Cada entrada pode incluir mídia (imagens ou vídeos, texto alternativo, legenda e pôster), descrição, tecnologias, detalhes e URL. Para cadastrar um projeto, adicione uma entrada em `projects` com `id` único, `title`, uma `category` correspondente a uma área em `courses.ts` e uma `description`. Informe `media` com caminho público, `type`, `alt` descritivo, legenda opcional e pôster para vídeo. Preencha `technologies`, `details` e `url` somente quando confirmados. Mantenha a lista vazia enquanto não houver projetos de IA autorizados e comprovados.
- Permanecem para confirmação da escola o endereço institucional próprio do curso de IA, os canais oficiais de matrícula e o edital vigente, os textos institucionais aprovados, os recursos tecnológicos efetivamente usados nas aulas e os projetos/mídias autorizados para publicação. A descrição de possibilidades profissionais deve ser entendida como áreas de desenvolvimento, sem promessa de emprego ou qualificação.
- A lista de projetos permanece vazia, então a apresentação do estado vazio foi conferida por inspeção do fluxo existente. A validação real de galerias com imagens e vídeos requer fixtures autorizadas, que não foram fornecidas. O build passou na revisão subsequente; testes automatizados específicos da etapa não foram executados.

## Ajuste institucional do rodapé

- Na `main` mais recente, o único arquivo de logo é `public/assets/logo-ds-guiomar.png`, sem logo de IA nem arquivo separado da Guiomar. Removi a imagem DS do rodapé, mantendo apenas a identificação textual do curso, e removi o favicon que reutilizava esse mesmo arquivo.
- Busca restrita às seções institucionais não encontrou outros textos de Desenvolvimento de Sistemas. Mantive intactas a chave de tema, os jogos, os cards e a Hero Section.
- `npm run build` passou. O Vite apresentou aviso de bundles acima de 500 kB.

## Etapa 09 — Otimização, responsividade e correção de bugs

- O Vite separa GSAP, CodeMirror, React Three Fiber, o núcleo de Three.js e o renderizador WebGL sem alterar o limite do aviso. O cenário 3D do Code Quest é carregado após detectar WebGL2. A alternativa 2D funciona sem baixar Three.js. O pôster da Hero continua com prioridade de carregamento.
- A detecção de WebGL2 é compartilhada e adiada até o primeiro uso. O laboratório usa `IntersectionObserver` no lugar de medições a cada rolagem e desmonta o canvas fora da faixa de 150 px ao redor da área visível ou quando a aba está oculta. O Code Quest usa renderização sob demanda quando o cenário está fora da área visível, com movimento reduzido, em pausa ou com a aba oculta. A renderização passa a confirmar movimentos diretamente quando a animação está suspensa. A configuração e o progresso dos jogos ficam fora dos canvases.
- A faixa de disciplinas quebra linhas em tablets. Em Chromium a 768 px, a largura rolável caiu de 816 para 753 px, igual à largura útil. Foram verificadas as larguras de 1920, 1440, 1366, 1024, 820, 768, 430, 390, 360 e 320 px sem rolagem horizontal na página. Em 320 × 568 px, o cenário e o botão de execução da aventura JavaScript ficaram visíveis juntos.
- Ajustei os contrastes dos rótulos, das abas e do foco em tema claro. O modal de projeto recebeu um nome acessível, um botão de fechamento maior e limites de tamanho para os vídeos. Os cards de projetos exibem a capa estática, quando disponível, e só carregam o vídeo no modal.
- Corrigi a perda da fonte de vídeo na galeria de disciplinas quando o React Strict Mode repete a limpeza de efeitos. O player ainda pausa ao fechar. Atualizei as cinco expectativas da suíte que usavam os nomes das antigas áreas, a cor antiga de tema claro ou o texto anterior do estado vazio.
- Chromium com WebGL por software e com WebGL desativado confirmou a primeira missão de IA, a recuperação do selo ao reabrir, a conclusão da primeira fase JavaScript e a primeira tarefa no laboratório. A conferência com WebGL também confirmou a desmontagem do canvas do laboratório após a rolagem e a preservação do resultado. Os percursos registraram zero exceções de JavaScript e zero erros de console.
- Chromium confirmou os temas, o menu mobile, as âncoras, o rodapé, as abas, a galeria ampliada, o retorno de foco e o estado vazio de projetos. Fixtures temporárias, sem registro no catálogo, confirmaram o carregamento de imagem e a reprodução WebM nos modais de projeto e de disciplina. O rodapé usa a identificação textual aprovada e os arquivos do projeto não oferecem uma logo institucional separada. O axe não apontou violações nas regras WCAG selecionadas para a página nos dois temas e para os modais de curso e IA inspecionados.

| Métrica | Antes, `5302edc` | Depois |
| --- | ---: | ---: |
| Maior chunk JS minificado | 882,15 kB | 430,44 kB |
| Chunks JS acima de 500 kB | 3 | 0 |
| JS inicial sem compressão, incluindo preloads | 558,60 kB | 557,20 kB |
| Testes aprovados | 41 de 46 | 46 de 46 |

O build de TypeScript e Vite passou. A comparação usa o tamanho dos arquivos locais e os recursos observados no Chromium com cache desativado. As medições não incluem Web Vitals de campo nem consumo de GPU em aparelhos reais.

Para a etapa 10, ficam a verificação em Safari e Firefox, a medição em celulares físicos e a conferência com tecnologias assistivas. O proxy bloqueou a checagem externa dos destinos da SEDUC e do Maps. Os endereços no site foram conferidos. A confirmação de dados, projetos e mídias institucionais segue com a escola.
