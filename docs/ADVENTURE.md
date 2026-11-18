# CODE QUEST 3D — JavaScript Adventure

Substitui as três missões anteriores no mesmo acesso da landing page. Nenhuma seção institucional foi removida. Dez fases introduzem comandos, sequências, ações, `for`, navegação, `if/else`, variáveis, condições com laços, funções e um desafio final.

O tutor BYTE usa regras e textos locais, sem IA externa. Guiado é o modo inicial; Explorador e Livre preservam o código e o progresso. Dicas chegam a uma solução explicada, inserida somente por ação do jogador. O guia fica disponível durante a aventura.

## Execução e segurança

O código é JavaScript analisado por Acorn e interpretado por uma lista explícita de nós permitidos. Não utiliza `eval` ou `Function`, não expõe DOM, rede, storage, objetos globais ou propriedades arbitrárias. O escopo pedagógico é um subconjunto de JavaScript, não todo o ambiente JavaScript de um navegador. Laços, recursão e tamanho da entrada têm limites. Cancelamento encerra execuções ao parar, recomeçar ou fechar.

Os eventos do interpretador informam linha, variáveis, decisões e posição reais. A interface aguarda cada ação, permite pausa/continuação e avanço unitário. A cena R3F reutiliza o modelo BYTE; sem WebGL, a mesma posição é representada em uma grade 2D funcional. Preferência de movimento reduzido é respeitada.

## Validação

`npm test` verifica soluções das dez fases, erros, isolamento do executor e fluxos educativos, além das funcionalidades anteriores da página. `npm run build` verifica TypeScript e gera a distribuição estática.

O navegador gerenciado não está disponível nesta sessão. Portanto, testes DOM/renderer não substituem revisão visual nos seis tamanhos solicitados, medição de FPS, contraste automatizado e ensaio com estudantes iniciantes. Não há afirmação de pixel perfect ou de desempenho medido. Higgsfield não foi utilizado; cenário e efeitos são procedurais.
