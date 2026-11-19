# Testes e validação

## Executar a suíte

```sh
npm ci
npm run build
npm test
npm audit
```

Para isolar um arquivo, rode `./node_modules/.bin/tsx --test tests/robot-training.test.tsx`. A suíte usa o runner do Node.js, jsdom para interações e React Three Test Renderer para transformações da cena. O build verifica TypeScript e gera os assets no Vite. O [guia de deploy](DEPLOY.md) inclui a validação do base path.

| Arquivo em `tests/` | Cobertura |
| --- | --- |
| `experience.test.tsx` e `interactions.test.tsx` | Modais e foco, mídia, informações institucionais, navegação, temas, projetos, terminal e interface do Code Quest |
| `ai-missions.test.tsx` | Seis missões, entradas incompletas, rótulos e validação do fluxo de agente |
| `adventure.test.tsx` | Dez soluções, erros, limites do intérprete, interrupção e execução de comandos |
| `adventure-world.test.tsx` | Movimento de Byte e movimento reduzido |
| `robot-training.test.tsx` | Seis tarefas, casos incorretos, métricas e escolha a partir de recompensas |
| `robot-motion.test.tsx` | Execução de comandos, interpolação, estados visuais e transporte |
| `smooth-scroll.test.tsx` | Âncoras, foco, limpeza do loop e movimento reduzido |

## Roteiro de navegador

1. Confira cabeçalho, Hero, apresentação, cinco cards, projetos, escola e rodapé. Abra os destinos de navegação e confira tema, pausa de animações e retorno de foco por Escape.
2. Abra os cinco modais de disciplinas. Alterne as abas pelo teclado, avance uma foto, amplie e feche. Teste imagem e vídeo com dados temporários em ambiente de validação. Confira o estado dos catálogos sem mídias.
3. No Code Quest, experimente entrada incompleta e reinício em cada missão. Conquiste os seis selos, recarregue na mesma sessão e confirme a persistência. Na aventura JavaScript, execute um comando, chegue ao portal e confira a retenção do código.
4. No laboratório, rotule e treine, teste parada e desvio, compare modelos, ordene a coleta e a entrega, observe as recompensas e execute o desafio autônomo. Confirme a orientação inicial frontal, interrupção, reinício, métricas e conclusão. Em tela estreita, deixe o botão de execução e o robô no campo visível.
5. Repita os jogos com WebGL2 indisponível e confirme os cenários 2D. Dê atenção à rolagem fora da arena, às transições de aba e à limpeza de recursos ao fechar a cena.
6. Em desktop e mobile, confira console, requisições de assets, quebras de texto e overflow. Priorize 1920, 1440, 1366, 1024, 768, 430, 390, 360 e 320 px. Confira com e sem movimento reduzido.

## Resultado da etapa 10

O build de produção e o build com base `/IA-guiomar-site/` passaram em Node.js 24.22.1 e npm 11.9.0. A suíte executou 46 testes, com 46 aprovados, 0 reprovados e 0 ignorados. O maior chunk JavaScript do build padrão mediu 430,44 kB minificado, 137,27 kB em gzip. O Vite não emitiu aviso de chunks acima de 500 kB.

O `npm audit` retornou zero ocorrências conhecidas. A busca por padrões comuns de credenciais em arquivos rastreados não encontrou correspondências. O Code Quest usa a AST do Acorn com regras e limites de execução. A suíte inclui verificações de recusa de acesso a recursos do navegador e execução dinâmica. A verificação de padrões é restrita aos arquivos atuais do repositório.

A informação oficial sobre calendário, recursos e acervo institucional depende da escola. O estado do workflow remoto e o conteúdo da URL de produção não puderam ser confirmados por causa do proxy. Firefox e WebKit não foram executados porque seus downloads retornaram 403. Celulares físicos, tecnologias assistivas e medição de desempenho em campo ficam pendentes.
