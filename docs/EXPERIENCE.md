> Histórico da versão anterior. O CODE QUEST de três missões abaixo foi substituído pela aventura de dez fases descrita em [ADVENTURE.md](ADVENTURE.md).

# Atualização da experiência — 11/11/2026

## Mesmo projeto

Mantidos o projeto Sites existente, o código React/TypeScript/Vite, Tailwind/CSS dedicado, a identidade violeta, as fontes, os dados institucionais, os links e as seções anteriores. A audiência atual do Site foi identificada como pública e deve ser preservada. A atualização acumula as melhorias de Lenis/GSAP e do robô do laboratório solicitadas anteriormente.

## Cards e modais

Robótica ocupa a primeira linha inteira. Programação/Design e Manutenção/Redes formam duas linhas de duas colunas, com proporções iguais. No mobile, todos os cards são empilhados. Programação substitui Jogos por solicitação do usuário e utiliza uma nova ilustração vetorial original em perspectiva, com materiais e gradientes consistentes com as demais áreas.

`src/data/courses.ts` centraliza os cinco conteúdos tipados: ID, nome, subtítulo, descrição, tópicos, práticas sugeridas, ferramentas, imagens e legendas. Os novos tópicos são identificados como sugestões educativas, não como confirmação da matriz curricular ou registro de atividades já realizadas.

Os cards usam botões reais sobre sua superfície. `Modal.tsx` mantém diálogo nativo no top layer, fechamento com Escape e backdrop, foco contido e restaurado, bloqueio de scroll com contagem para modais aninhados e animação de abertura/fechamento. A galeria reutilizável fornece miniaturas, imagem ampliada, anterior/próxima, legendas, lazy loading e fallback de falha de imagem.

Não foram recebidas fotografias de alunos. `public/images/robotica`, `programacao`, `design`, `manutencao` e `redes` estão preparadas. Os placeholders são explicitamente identificados. Para inserir fotos reais, siga `public/images/README.md`.

## Tema global

`ThemeProvider.tsx` detecta a preferência do sistema, preserva a escolha manual em `localStorage` e responde a mudanças de preferência quando não há escolha salva. Um script pequeno no início de `index.html` define o tema antes da renderização da aplicação. O botão com sol/lua está na navegação. Tokens semânticos e estilos para cada seção cobrem a página, os modais e o jogo. Não são usados filtros de inversão de cores.

## CODE QUEST

A nova seção aparece imediatamente após as áreas e antes dos projetos. O item de navegação leva à seção. O jogo é importado dinamicamente ao iniciar e abre no mesmo site, sem cadastro.

1. **Primeiro código:** grade 5×5, cinco obstáculos, fila limitada a 20 comandos e execução visual sequencial. Limites, colisões e destino são verificados por funções puras. O percurso é comprovadamente solucionável em 8 comandos: cima, cima, cima, direita, direita, direita, direita, cima. Limpar/reiniciar cancela a execução anterior. Fechar o jogo também cancela o movimento pendente.
2. **Reconecte a rede:** selecione pares de dispositivos. São válidas apenas três conexões: computador 1–roteador, computador 2–roteador e roteador–servidor. A ordem de seleção é indiferente; conexões duplicadas, ligações inválidas e auto-conexões recebem feedback. Verificar rede conclui somente quando todas as conexões estão presentes.
3. **Salve o sistema:** três questões sobre sequência, repetição e condição. Cada resposta é validada, oferece explicação e aceita nova tentativa. Avançar após acertar registra o progresso. Ativar o núcleo leva à vitória.

`sessionStorage` preserva a etapa, conexões e questões concluídas. Payloads inválidos ou incompatíveis são descartados. O jogo funciona mesmo quando storage está indisponível, sem persistência. Reinício completo pede confirmação dentro do jogo; Jogar novamente na vitória reinicia diretamente. Explorar o curso fecha o diálogo e restaura o foco na seção de áreas.

BYTE é um personagem novo para o jogo; o robô preexistente do laboratório não foi substituído. BYTE tem materiais brancos/violetas, formas arredondadas, olhos emissivos e estados idle, movimento, erro, sucesso e celebração. O modelo usa React Three Fiber e carrega sob demanda. Há fallback HTML/CSS com a mesma linguagem visual; a lógica das missões é independente do renderer. DPR limitado, frames suspensos em aba oculta/movimento reduzido/pausa e recursos desmontados ao fechar.

## Assets e limites

Higgsfield continua sem integração ou credenciais. Nenhum vídeo foi gerado nessa plataforma. Portais, partículas e feedback são procedurais. Os prompts adicionais estão em `HIGGSFIELD.md`.

O screenshot mencionado no pedido não foi anexado; o companion snapshot não continha documento. O Pinterest continuava indisponível na verificação inicial. O visual existente foi a referência de preservação. Não foi realizada comparação pixel perfect.

A ferramenta de navegador gerenciado `cua_repl.js` não está disponível, e o preview relay está indisponível. Por isso, não há screenshots das seis resoluções, auditoria de console de navegador, medição de FPS/Core Web Vitals ou afirmação de ausência de overflow visual em aparelhos reais. As regras responsivas e os controles de toque foram implementados; a revisão visual permanece necessária.

## Verificação final

25 testes passaram, incluindo fluxo completo das missões, retorno ao curso, abertura pelo CTA, cancelamento ao fechar, modais, galeria, tema, executor, cena 3D e Lenis. Build TypeScript/Vite aprovado. O chunk principal tem cerca de 180 kB gzip; o núcleo Three.js, carregado sob demanda, cerca de 238 kB gzip. O aviso de tamanho de chunks acima de 500 kB sem compressão é mantido e não significa medição de desempenho real.
