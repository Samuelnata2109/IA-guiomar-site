# Design system do IA Guiomar

A identidade do curso combina azul profundo e branco, tipografia editorial e referências visuais à tecnologia. Use superfícies sólidas, contraste claro entre níveis e um único acento por ação. Reserve gradientes, transparências e brilhos para os usos existentes em que cumprem uma função visual.

## Tokens e hierarquia

Os valores compartilhados vivem em `src/styles/tokens.css`. `global.css` importa os tokens e aplica as classes existentes. O tema claro é permanente. `ThemeProvider` aplica `data-theme="light"` no elemento raiz e remove preferências de tema antigas do armazenamento local. Não há alternância por controle ou preferência do sistema.

| Grupo | Padrão |
| --- | --- |
| Paleta | `--blue-deep` e `--blue-brand` são azuis de marca. Escolha cores de interface pelo papel, como `--bg`, `--surface`, `--panel`, `--text`, `--muted` e `--heading-accent`. Use sempre o tema claro permanente. |
| Bordas e superfícies | Use `--line` para separadores, `--border` para contornos, `--control` para controles e `--panel-shadow` para superfícies elevadas. |
| Tipografia | Inter para corpo e interface. Space Grotesk para títulos. O corpo parte de 16 px e os títulos de seção usam a escala fluida `--heading-section-size`. Use um título principal por página ou fluxo e preserve a ordem semântica dos subtítulos. |
| Ritmo e largura | Use a família `--space-*` para espaçamento entre elementos. O contêiner compartilhado tem máximo de 1440 px e margens laterais de 56, 36 ou 20 px. `--section-padding` regula o respiro vertical, e `--radius` é o raio de referência para painéis. |
| Controles e estados | Reutilize `.button` e as variantes `.button-primary`, `.button-outline`, `.button-text` e `.button-white` nos contextos correspondentes. Os tokens cobrem dimensões, foco visível, deslocamento no hover e escala no pressionamento. Use `aria-current` para a página ativa e o atributo nativo `disabled` em botões indisponíveis. |
| Movimento | Use transições curtas de 200 a 250 ms nas interações e respeite `prefers-reduced-motion`. Mantenha efeitos ambientes em seu escopo e use `transform` ou `opacity` para animações novas quando possível. |
| Camadas | `--z-nav` situa o cabeçalho acima do conteúdo e `--z-skip-link` mantém o atalho de teclado visível. O cabeçalho do diálogo usa `--z-dialog-header` dentro do próprio diálogo. Reutilize o `Modal` nativo, que usa a camada superior do navegador. |

`--purple`, `--neon`, `--electric`, `--lavender`, `--ink` e outros nomes anteriores continuam como aliases de compatibilidade. Use os papéis semânticos em código novo. A Hero e os jogos mantêm as escalas e os efeitos próprios.

## Responsividade

Use CSS nativo para os pontos de quebra. Variáveis CSS definem os valores que mudam em cada faixa, pois não podem ser usadas em condições de `@media`.

| Largura | Comportamento de referência |
| --- | --- |
| A partir de 1600 px | Composição ampla da Hero existente. |
| Até 1100 px | Contêiner com margem lateral de 36 px. |
| Até 1000 px | Menu mobile, navbar com 85 px e seções com 90 px de espaçamento vertical padrão. |
| Até 700 px | Colunas empilhadas, margem lateral de 20 px, navbar com 78 px e seções com 72 px de espaçamento padrão. |
| Até 380 px | Ajustes locais para telas estreitas. |

Em páginas internas, a navbar ocupa sua altura no fluxo. A Home mantém a sobreposição sobre a Hero. O menu mobile compartilha `--nav-height` com a barra.

## Integrações futuras com o 21st.dev

1. Avalie a origem, a licença e as dependências declaradas antes de incorporar código. O catálogo usa componentes React e TypeScript distribuídos em formato de registro shadcn. Revise os arquivos propostos antes de aplicar mudanças de configuração. O projeto já usa Tailwind via Vite. [Documentação do 21st.dev](https://docs.21st.dev/)
2. Coloque componentes React reutilizáveis em `src/components/ui/`. Mantenha composição de página em `src/pages/` ou `src/sections/` e lógica de jogo em `src/features/`. Traga apenas o código necessário à interação aprovada. Prefira os componentes, utilitários e dependências que já existem.
3. Mapeie cores, dimensões, sombras e tempo de transição aos tokens do projeto. Mantenha variáveis e seletores específicos do componente no seu próprio escopo. Confira o tema claro em telas estreitas e sem suporte a hover.
4. Preserve a semântica de botões e links, nomes acessíveis, ordem de tabulação, foco visível e retorno de foco de diálogos. Para controles novos, use `--control-target` como referência de área clicável. Verifique contraste nos estados normal, hover, foco, ativo e desabilitado, e sinalize estados com mais de um recurso visual.
5. Prefira efeitos breves e discretos, com alternativa para movimento reduzido. Compare os recursos iniciais antes e depois da integração e mantenha módulos pesados sob demanda. Em mudanças de página, confira o caminho de produção do GitHub Pages.

A etapa 12.1 estabelece esses padrões sem adicionar componentes de catálogo. As integrações serão avaliadas nas etapas de cada página.
