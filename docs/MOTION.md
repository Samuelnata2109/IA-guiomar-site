# Atualização de movimento — projeto existente

A identidade do Site e a URL foram preservadas. Não foram alterados os textos editoriais, dados institucionais, links, cores principais, imagens ou ordem das seções. Apenas mensagens de falhas reais foram acrescentadas ao laboratório. A audiência atual foi lida como pública e foi preservada na publicação.

## Rolagem e seções

Lenis 1.3.27, instalado pelo pacote oficial `lenis`, usa `autoRaf: false` e recebe tempo em milissegundos do único ticker GSAP. `lenis.on('scroll', ScrollTrigger.update)` sincroniza o scroll nativo de viewport, sem `scrollerProxy` ou wrapper transformado. O CSS padrão do Lenis elimina o conflito com `scroll-behavior: smooth` durante sua operação.

A inércia de toque permanece nativa (`syncTouch: false`), evitando a emulação de toque instável em versões antigas de iOS. Pausa ambiente e `prefers-reduced-motion` desligam a suavização. O ticker é removido na aba oculta; listeners e instância são destruídos no cleanup, inclusive durante remount do StrictMode. Âncoras internas preservam hash, foco por teclado e espaço do cabeçalho. Links externos e cliques modificados não são interceptados. Diálogos preservam sua rolagem interna.

Revelações são agrupadas por bloco de conteúdo para aparecerem progressivamente. Painéis de áreas ganham entrada com fade-up e uma camada interna de parallax de ±3%, separada da camada de hover. Transformações e opacidade são priorizadas; o glow utiliza a paleta existente.

## Robô preservado

O modelo original é composto por 11 meshes Three.js: cabeça, visor, dois olhos, corpo, dois braços, duas rodas, antena e ponta da antena. As mesmas geometrias, dimensões, posições finais, materiais e iluminação foram mantidas. Apenas grupos de transformação e referências foram acrescentados para cabeça, olhos, braços e pose. O fallback original em CSS também mantém sua aparência e usa GSAP.

- Idle: flutuação, piscada curta e movimento discreto de cabeça.
- Hover: ponteiro ou foco em Executar código direciona a cabeça ao botão. Não executa nenhum comando.
- Running: o executor aplica o comando real ao estado React; o renderer move até o alvo, com reação do corpo e partículas/símbolos roxos finitos.
- Success: só acontece após confirmação do renderer de que o alvo foi aplicado. Pequeno salto e brilho transitório dos olhos; volta ao estado de atenção/idle ao terminar a celebração.
- Error: recebe exceções reais do executor ou falhas reais de renderização/contexto WebGL enquanto uma execução está pendente. Inclina a cabeça e mostra a mensagem de falha. Não há erro aleatório, botão de erro ou espera artificial simulando processamento.

O editor existente continua oferecendo quatro comandos predefinidos. Não foi convertido em editor de JavaScript arbitrário. O executor reconhece esses comandos e mantém as mesmas alterações de LED, cor, movimento e rotação. Código desconhecido ou estado numérico inválido é rejeitado sem usar `eval`.

Durante uma execução, cliques duplicados são bloqueados. Reiniciar invalida o ID anterior; callbacks atrasados não podem marcar uma execução cancelada como sucesso. A contagem é atualizada somente na confirmação. Suspense não confirma comandos antes do renderer ativo. Na ausência de WebGL, o fallback confirma a conclusão real da timeline; com movimento reduzido, confirma a aplicação direta sem movimentação.

## Desempenho e verificação

A cena mantém importação dinâmica e DPR máximo 1,5. O frame loop roda apenas quando a experiência está próxima da viewport, a aba está visível, a pausa está desligada e movimento reduzido não está ativo. Partículas são seis elementos HTML, sem shaders ou sistemas de partículas permanentes. Os callbacks usam refs; nenhuma atualização React ocorre a cada frame.

Os testes automatizados cobrem o executor, a cena Three.js em renderer de testes, conclusão única, movimento reduzido, olhar, inclinação, geometria original, interações da página, ciclo de vida do Lenis e âncoras. O renderer de testes valida o grafo e transformações, sem substituir inspeção visual WebGL.

A ferramenta `cua_repl.js` não está disponível; `sites-preview status` continua retornando `preview relay unavailable`. Portanto, fluidez observada em aparelhos reais, FPS e comparação visual desta atualização não foram medidos. Não há garantia de Core Web Vitals ou ausência de travamentos sem essa etapa.
