# Arquitetura do IA-guiomar-site

A etapa 01.1 analisou a cópia do site de Desenvolvimento de Sistemas integrada no commit `9939841040ca48f035b8ddcea0e2781f2f56c8d5` de `IA-guiomar-site`. Esse SHA é a referência para comparações no repositório de IA. A origem Git da implementação em Desenvolvimento de Sistemas permanece sem SHA confirmado.

## Estrutura e dependências

`index.html` inicializa o tema antes da montagem. `src/main.tsx` monta React e importa as três folhas de estilo do projeto. `src/App.tsx` compõe a página única e os provedores de tema e movimento. `src/sections/` concentra as seções, `src/features/` as experiências interativas, `src/components/` a infraestrutura visual compartilhada e `src/data/` o conteúdo e os catálogos de mídia. `public/` contém os recursos estáticos. `tests/` contém as suítes existentes.

O projeto usa React 19, TypeScript 5.9, Vite 7 e Tailwind CSS 4 com CSS próprio. Motion, GSAP com ScrollTrigger e Lenis cuidam das animações e da rolagem. Lucide fornece ícones e Fontsource fornece Space Grotesk e Inter. Three.js e React Three Fiber renderizam as cenas 3D. CodeMirror e Acorn apoiam a edição e análise de JavaScript no Code Quest. O `package.json` oferece `dev`, `build`, `preview` e `test`. O build executa `tsc -b && vite build`.

## Seções e módulos

| Área | Arquivos e responsabilidades |
| --- | --- |
| Navegação e animações compartilhadas | `src/components/layout/Navigation.tsx` reúne navegação e controles. `src/components/animations/SmoothScroll.tsx`, `Shared.tsx` e `AmbientMotion.ts` centralizam rolagem, revelações e pausa de movimento. |
| Hero e apresentação | `src/sections/Hero/CinematicHero.tsx` renderiza a abertura e seus efeitos GSAP. `src/sections/SobreCurso/Course.tsx` apresenta o curso. `src/data/content.ts` reúne dados institucionais. |
| Disciplinas | `src/data/courses.ts` define, nesta ordem, **Robótica, Programação, Design, Manutenção e Redes**. `src/sections/Disciplinas/InteractiveShowcase.tsx` monta a grade e os efeitos dos cards. `CourseModal.tsx`, `src/components/ui/Modal.tsx`, `ActivityGallery.tsx` e `PhotoGallery.tsx` compõem os detalhes e galerias. |
| Code Quest | `src/sections/CodeQuest/CodeQuestSection.tsx` abre o jogo sob demanda. Em `src/features/code-quest/`, `components/CodeQuestGame.tsx` organiza a experiência, `game/adventure.ts` define fases e execução, `editor/AdventureEditor.tsx` integra o CodeMirror e `components/AdventureWorld.tsx` renderiza o tabuleiro. `AdventureHelp.tsx` contém a ajuda. |
| Projetos | `src/sections/Projetos/ProjectGallery.tsx` concentra a apresentação de projetos. |
| Laboratório | Em `src/features/laboratorio/`, `components/InteractiveCodeDemo.tsx` controla os exemplos e a execução, `game/robotExecution.ts` aplica os comandos ao estado e `components/RobotScene.tsx`, `RobotFallback.tsx` e `RobotParticles.tsx` compõem a visualização. |
| Matrícula, escola e rodapé | `src/sections/Escola/SchoolLocation.tsx` contém as três áreas. |

## Paleta e estilos

- `src/styles/global.css` define tipografia, layout, estados, animações, cores literais e os tokens de tema. O tema escuro inclui `--purple: #7c3aed`, `--electric: #9333ea`, `--neon: #a855f7`, `--lavender: #c084fc`, fundo `#090514`, superfície `#140a24` e realce ciano `#38bdf8`. O seletor `:root[data-theme="light"]` sobrescreve tokens no tema claro.
- `index.html` e `src/components/layout/ThemeProvider.tsx` sincronizam o fundo inicial, a preferência de tema e a cor do navegador.
- `src/features/code-quest/styles/adventure.css` e `adventure-world.css` concentram as cores da interface do jogo, do editor e do tabuleiro alternativo. `AdventureWorld.tsx` e `ByteScene.tsx` declaram também materiais e luzes do 3D.
- No laboratório, `RobotScene.tsx` define materiais, luzes e grade. `robotExecution.ts` e `InteractiveCodeDemo.tsx` associam as cores de interface aos exemplos e ao estado. O fundo e as ilustrações em `public/assets/` têm cores próprias.

## Recursos 3D e comportamento responsivo

O tabuleiro, o personagem Byte e o robô do laboratório são construídos em código com geometrias e materiais Three.js. `AdventureWorld.tsx`, `ByteCharacter.tsx` e `InteractiveCodeDemo.tsx` oferecem alternativas ao WebGL2. Não há arquivos de modelos 3D versionados. `src/data/media.ts` mapeia o pôster WebP do hero e as ilustrações SVG dos cards. `src/data/courseMedia.ts` inicia os catálogos das cinco galerias vazios.

`global.css` ajusta contêineres, grade, navegação e modais em faixas que incluem 1600, 1100, 1000, 700, 420 e 380 px. O Code Quest usa regras específicas em 900, 800 e 600 px. `useAdventureLayout.ts` lê a altura do viewport visual e permite ajustar a divisão desktop por ponteiro ou teclado. Os estilos e componentes respeitam a preferência por movimento reduzido. O comportamento em dispositivos foi mapeado pelo código e ainda não foi verificado em navegador nesta etapa.

## Registro visual da etapa 01

O registro abaixo descreve o checkout anterior à integração dos fontes. Para os caminhos e detalhes de implementação confirmados, consulte o mapa acima.


O checkout de `Samuelnata2109/IA-guiomar-site` corresponde à `main` remota no commit `d0fbe9b5ada992b09b689e5ad8df4a4ad9f34a84`. A árvore desse commit contém somente `README.md`, que descreve a finalidade institucional do projeto. O SHA referencia o repositório de IA observado na etapa 01. O commit do código original de Desenvolvimento de Sistemas permanece desconhecido.

A estrutura da aplicação, os componentes React, o uso de TypeScript, as dependências, os scripts, os arquivos de estilo e os caminhos dos recursos dependem da cópia do código-fonte. O mapa abaixo se apoia na gravação de 57 segundos, em enquadramento desktop. A tentativa de acesso ao site de referência retornou HTTP 403 no túnel do proxy.

| Área | Evidência na gravação | Localização no código |
| --- | --- | --- |
| Hero e apresentação institucional | A gravação começa na apresentação do curso e da escola, com título em destaque e texto em colunas. O hero completo fica fora do trecho. | Indisponível |
| Cards de disciplinas | Robótica ocupa uma linha inteira. Programação, Design, Manutenção e Redes aparecem em duas linhas de dois cards. Há realce de contorno durante a interação. | Indisponível |
| Modais e galerias | O modal de Robótica demonstra rolagem interna, fechamento, conteúdo em colunas e uma galeria com abas de fotografias e vídeos, setas e miniaturas. | Indisponível |
| Code Quest | A chamada abre um desafio JavaScript com seletor de fases, tabuleiro isométrico, editor com sugestões, console e avanço após concluir a primeira fase. | Indisponível |
| Laboratório interativo | A seção combina exemplos de código, botão de execução e um painel que mostra o robô e o retorno da ação. | Indisponível |
| Projetos e informações institucionais | A gravação mostra a apresentação da escola e o início de uma chamada sobre ensino médio e formação técnica. A seção de projetos e o rodapé ficam fora do trecho demonstrado. | Indisponível |
| Gráficos e recursos 3D | Os cards mostram braço robótico, notebook, interfaces, gabinete e servidores. O Code Quest mostra um tabuleiro em perspectiva e o laboratório exibe um robô sobre uma grade. A técnica de renderização e os formatos dos recursos aguardam inspeção do código. | Indisponível |

A paleta observada usa fundo quase preto, superfícies em violeta escuro, realces em roxo e lilás, gradientes roxos, texto branco e texto secundário acinzentado. A tipografia aparenta ser sem serifa, com títulos em caixa alta em várias seções. Códigos de cor, famílias tipográficas, duração e curvas das transições aguardam inspeção dos estilos.

A gravação demonstra o realce dos cards, a abertura e o fechamento de modal, o progresso no tabuleiro e mudanças no painel do laboratório. A grade de duas colunas e os painéis lado a lado foram observados em desktop. Breakpoints, navegação por toque e comportamento dos modais, do jogo e do laboratório em telas menores permanecem pendentes.
