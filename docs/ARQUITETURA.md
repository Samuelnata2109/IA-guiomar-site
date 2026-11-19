# Arquitetura do IA-guiomar-site

O projeto é uma aplicação React com seis páginas navegáveis. `index.html` inicializa o tema e prioriza o pôster da Hero. `src/main.tsx` monta a aplicação em Strict Mode, e `src/App.tsx` define as rotas. O Vite gera uma distribuição estática para o GitHub Pages.

## Tecnologias da entrega

| Uso | Versões do lockfile |
| --- | --- |
| Interface e build | React e React DOM 19.3.1, TypeScript 5.9.3, Vite 7.3.8, Tailwind CSS 4.3.5 |
| Animação e rolagem | GSAP 3.15.1 com ScrollTrigger, Motion 12.43.0, Lenis 1.3.27 |
| Cena 3D | Three.js 0.180.0, React Three Fiber 9.8.2 |
| Editor e interpretação | CodeMirror 6, Acorn 8.19.0 |
| Testes | Node.js, tsx 4.23.15, jsdom 31.0.0, Testing Library e React Three Test Renderer |

Use `package.json` para os scripts e as dependências declaradas e `package-lock.json` para as versões resolvidas. Lucide fornece os ícones e Fontsource serve Inter e Space Grotesk.

## Diretórios e responsabilidades

| Diretório ou arquivo | Responsabilidade |
| --- | --- |
| `src/sections/` | Hero, apresentação, cinco cards, entrada do Code Quest, projetos, escola, matrículas e rodapé |
| `src/components/layout/` | Layout compartilhado, navegação e temas |
| `src/pages/` | Componentes que organizam as seções de cada rota |
| `src/components/ui/` | Diálogos, galerias, mídia e detecção de WebGL |
| `src/components/animations/` | Revelações, rolagem Lenis e movimento ambiente |
| `src/data/` | Disciplinas em `courses.ts`, mídias em `courseMedia.ts` e `media.ts`, projetos e mapa em `content.ts` |
| `src/features/code-quest/` | Interfaces, seis missões de IA, intérprete da aventura JavaScript, editor, cenário e estilos |
| `src/features/laboratorio/` | Seis tarefas, motores didáticos, terminal, robô, arena e estilos |
| `src/styles/global.css` | Layout, tokens, temas, estilos compartilhados e breakpoints |
| `public/` e `tests/` | Assets estáticos e suíte automatizada |
| `.github/workflows/deploy.yml` | Build e implantação no GitHub Pages |

As cinco entradas de `courses.ts` seguem a [matriz curricular](MATRIZ_IA.md). Seus IDs `robotica`, `programacao`, `design`, `manutencao` e `redes` são vínculos internos entre cards, estilos e mídia.

## Páginas e navegação

| Rota no React Router | URL no Pages após o subdiretório | Conteúdo |
| --- | --- | --- |
| `/` | `#/` | Hero, matrículas e localização |
| `/curso` | `#/curso` | Apresentação do curso |
| `/areas` | `#/areas` | Cinco cards de disciplinas, modais e galerias |
| `/code-quest` | `#/code-quest` | Code Quest de IA, Aventura JavaScript e Ensine o Robô 3D |
| `/projetos` | `#/projetos` | Galeria de projetos |
| `/escola` | `#/escola` | Informações da escola e mapa, também presentes na Home |

`SiteLayout.tsx` renderiza cabeçalho, rodapé, conteúdo principal e controles de tema, rolagem e movimento. O `Outlet` recebe a página atual. Os links internos usam `Link` e `NavLink`, e o item atual tem `aria-current="page"`. O layout atualiza o título, o foco e a rolagem quando o endereço muda. O link de matrículas usa `#/#matriculas`, e o atalho de teclado usa a âncora `#conteudo` na rota atual. As âncoras antigas das seções que viraram páginas redirecionam para suas rotas. O endereço antigo `#laboratorio` abre `#/code-quest#laboratorio` com foco na seção.

O `HashRouter` mantém a rota no fragmento da URL. A abertura direta e a atualização sempre pedem o mesmo `index.html` ao GitHub Pages, sem depender de redirecionamento no servidor. Rotas desconhecidas exibem a página de endereço não encontrado. A Home está no carregamento inicial. As cinco páginas secundárias usam `React.lazy` e `Suspense`, além do carregamento separado dos jogos, editor e cenas 3D quando usados.

## Estado e temas

`ThemeProvider.tsx` lê a preferência do sistema e grava a escolha manual em `localStorage` com a chave `ds-guiomar-theme`. O atributo `data-theme` e a meta `theme-color` refletem a escolha. Os tokens de tema pertencem a `global.css`. A pausa das animações ambientes pertence ao estado de `SiteLayout.tsx`. As animações também consultam `prefers-reduced-motion`.

O Code Quest grava a quantidade de selos de IA em `sessionStorage` com `ds-code-quest-ai-v1`. A aventura JavaScript guarda fase, código, modo e fases resolvidas com `ds-code-quest-adventure-v1`. A divisão dos painéis usa `ds-quest-panel-width` em `localStorage`. No laboratório, o progresso e as métricas ficam em memória na página.

## Carregamento e renderização

Os jogos do Code Quest são carregados ao abrir o respectivo modo. `AdventureWorld.tsx` usa o mapa 2D enquanto a cena carrega ou quando WebGL2 fica indisponível. `RobotViewport.tsx` monta a cena quando a arena se aproxima da área visível e desmonta-a ao sair dessa faixa ou ocultar a aba. A cena e a versão 2D aplicam as ações ao mesmo estado de jogo. Interações em andamento usam confirmação de aplicação e permitem interrupção.

`vite.config.ts` mantém o suporte a caminhos relativos e separa GSAP, editor e módulos 3D. O workflow usa o base path retornado pelo GitHub Pages. Consulte [publicação](DEPLOY.md).

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
