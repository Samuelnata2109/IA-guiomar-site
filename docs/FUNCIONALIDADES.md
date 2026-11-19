# Funcionalidades

## Site institucional

A página reúne cabeçalho com navegação por âncoras, Hero, apresentação do curso, cinco cards, Code Quest, projetos, laboratório, matrículas, localização e rodapé. Cada card abre um diálogo com tópicos, atividades sugeridas, tecnologias e galeria com abas de fotografias e vídeos. O catálogo de projetos pode exibir descrição, imagem, vídeo, tecnologias e links. As seções apresentam estados vazios enquanto não houver material aprovado. A aparência acompanha a preferência do dispositivo e pode ser alterada no cabeçalho, que também controla as animações ambientes.

## Code Quest

O modo principal acompanha Byte em seis missões. O jogador pode tentar novamente, reiniciar a atividade atual e rever missões já abertas. Cada missão concluída rende um selo e libera a próxima. A tela final reúne os seis selos e permite recomeçar a aventura. O progresso sobrevive à recarga na mesma sessão. Os resultados são simulações didáticas locais.

| Missão | Atividade |
| --- | --- |
| Primeiro contato | Distinguir sistemas baseados em regras de sistemas que aprendem com dados |
| Organizando os dados | Escolher exemplos nítidos, variados e corretamente rotulados |
| Ensinando a máquina | Treinar com exemplos e comparar previsões quando um rótulo está errado |
| Olhos inteligentes | Reconhecer formas e pedir revisão de um quadro ambíguo |
| Mestre dos prompts | Montar uma instrução e comparar a resposta simulada com a de um pedido vago |
| Agente inteligente | Ordenar o fluxo e testar uma imagem nítida e outra que requer revisão |

A **Aventura JavaScript** tem dez fases, editor CodeMirror, dicas, console e execução passo a passo. O jogador usa comandos de Byte para chegar ao portal. Acorn analisa o texto e o jogo interpreta um subconjunto da linguagem. O executor tem limites de tamanho, passos e profundidade e aceita interrupção. Código editado, fase, modo de ajuda e progresso ficam na sessão.

## Ensine o Robô

O laboratório exibe a arena e os controles da tarefa. O estudante configura a entrada, testa o robô, observa os resultados e pode interromper, reiniciar ou avançar. As métricas refletem as ações confirmadas pela cena. O progresso fica em memória enquanto a interface do laboratório permanece montada.

| Tarefa | Resultado observado |
| --- | --- |
| Classificação de objetos | Acertos e erros ao classificar objetos de tamanho diferente |
| Desviando de obstáculos | Detecção da barreira, parada ou desvio conforme a regra |
| Reconhecimento de padrões | Comparação entre exemplos limitados e variados |
| Entrega inteligente | Ordem dos comandos e entregas para a categoria correta |
| Aprendendo com os erros | Recompensas de −3 e +4 e escolha da rota pela média |
| Robô autônomo | Classificação, desvio, coleta e entrega em um só percurso |

O terminal também mantém quatro comandos introdutórios de LED, cor, deslocamento e rotação. Os dois jogos usam WebGL2 quando disponível e oferecem cenários 2D com as mesmas regras.
