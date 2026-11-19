# Manual de manutenção

## Títulos e informações institucionais

1. Atualize o título da aba e a descrição do documento em `index.html`.
2. Edite a abertura em `src/sections/Hero/CinematicHero.tsx` e o texto de apresentação em `src/sections/SobreCurso/Course.tsx`.
3. Use `src/components/layout/Navigation.tsx` para rótulos e links do cabeçalho. Ao ajustar um rótulo, confira o link da versão mobile e preserve o ID de destino.
4. Edite matrícula, telefone, endereço, mapa incorporado e rodapé em `src/sections/Escola/SchoolLocation.tsx`. O link externo do mapa é `mapLink` em `src/data/content.ts`. Mantenha os dois destinos do mapa coerentes.
5. Confirme na escola os dados de matrícula, texto, uso de tecnologias e autorização de divulgação de mídias antes de publicá-los.

## Disciplinas e galerias

- Edite textos, tópicos, sugestões de atividade, ferramentas e descrições em `src/data/courses.ts`. Preserve os cinco IDs e a ordem aprovada. As ilustrações são vinculadas aos mesmos IDs em `src/data/media.ts`. Se o nome de uma área mudar, ajuste a categoria correspondente de seus projetos e a faixa em `Course.tsx`.
- Coloque fotos autorizadas em `public/media/<id>/fotos/` e vídeos em `public/media/<id>/videos/`. Use o guia de [cadastro de mídias](../public/media/README.md) para preencher `src/data/courseMedia.ts`. Preencha título descritivo e legenda. Use caminhos relativos a `public/`, sem incluir `public/` nem a barra inicial. Confira os codecs nos navegadores usados.
- As fotos legadas em `courses.ts` usam `images[].src`, `alt` e `caption`. Se não houver registros reais para uma disciplina, mantenha os placeholders rotulados. Evite cadastrar a mesma foto nos dois lugares.

## Projetos

1. Coloque os arquivos autorizados em `public/media/projetos/<id>/`. Use nomes simples, sem espaços.
2. Adicione uma entrada ao array `projects` de `src/data/content.ts` com `id` único, `title`, `description` e `category` igual ao campo `name` de uma área em `courses.ts`.
3. Em `media`, adicione itens com `type: "image"` ou `"video"`, o `src` com prefixo `./media/projetos/<id>/` e um `alt` descritivo. A primeira mídia fornece a capa. Para vídeo, informe `poster` se houver uma imagem de capa. Use `caption` para a legenda visual.
4. Preencha `technologies`, `details` e `url` quando confirmados. Abra o card, filtre pela categoria e confira imagem, vídeo e link no build com o subdiretório do Pages.
5. Para retirar uma entrada, remova-a do array e confira se algum outro item usa os mesmos arquivos antes de removê-los.

## Elementos gráficos e estilos

- Coloque o arquivo em `public/assets/` e atualize o `poster` em `src/data/media.ts`. Se mudar o pôster da Hero, ajuste também o preload em `index.html`. Preserve enquadramento e proporção. Use os SVGs dos cards e o WebP da Hero como referência de formatos e tamanhos.
- Os tokens e a maioria dos breakpoints ficam em `src/styles/global.css`. Os estilos dos jogos ficam em `src/features/code-quest/styles/` e `src/features/laboratorio/styles/training.css`. Confira o foco e o contraste nos dois temas e preserve o movimento reduzido.
- As cenas são construídas em código. Byte está em `src/features/code-quest/components/ByteScene.tsx`. Robô e arena ficam em `src/features/laboratorio/components/RobotScene.tsx` e `TrainingArena.tsx`. Confira também as representações 2D em `AdventureWorld.tsx`, `ByteCharacter.tsx` e `RobotFallback.tsx`.

## Missões e tarefas

- **Code Quest de IA** — altere enunciados, opções, avaliação, rota e selos em `src/features/code-quest/game/aiMissions.ts`. Confira a interface e a progressão em `components/AiQuestGame.tsx` no mesmo módulo. Rode `tests/ai-missions.test.tsx` e teste os estados de erro, reinício e conclusão.
- **Aventura JavaScript** — edite fases, soluções e interpretação em `src/features/code-quest/game/adventure.ts`. As dicas compartilhadas ficam em `components/AdventureHelp.tsx` e o editor em `editor/AdventureEditor.tsx`. Confira que as dez soluções chegam ao portal e os limites e a interrupção seguem ativos.
- **Ensine o Robô** — edite tarefas, amostras e simulação em `src/features/laboratorio/game/training.ts`. As opções, execução e métricas pertencem a `components/TrainingLab.tsx` no mesmo módulo. Valide as regras em `tests/robot-training.test.tsx` e a renderização em `tests/robot-motion.test.tsx`. A arena usa posição e orientação do estado inicial do treinamento. O terminal usa `game/robotExecution.ts`.

Rode a [suíte e a revisão de navegador](TESTES.md) antes de abrir o PR. A [publicação](DEPLOY.md) descreve a validação do build com o caminho de projeto e a conferência após o merge.
