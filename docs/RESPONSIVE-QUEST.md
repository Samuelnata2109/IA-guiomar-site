# CODE QUEST — workspace responsivo

Alterações limitadas à apresentação do jogo: CodeQuestGame.tsx reorganiza os mesmos controles; useAdventureLayout.ts controla somente largura/altura da interface; adventure.css define a composição. Interpretador, fases, progresso, modelo e câmera permanecem intactos.

Cenário, editor, Executar/Parar e console formam uma área única no fluxo normal de rolagem do modal. Abaixo ficam os grupos recolhíveis Ajuda para iniciantes, Ferramentas de programação, Execução avançada e Aprenda JavaScript. O editor continua montado e preserva seu conteúdo.

Até 900px: cenário acima do editor, altura disponível por visualViewport com fallback dvh. Console compacto com scroll próprio. Acima de 900px: painéis 60/40 com divisor arrastável, setas/Home/End e preferência em localStorage. O divisor não interfere no estado do jogo. Listeners de resize são removidos ao desmontar.

Testes DOM verificam agrupamento, preservação das funcionalidades, painéis recolhíveis e ajuste por teclado. Build TypeScript/Vite verificado. Não há ferramenta de navegador nesta sessão: revisão visual em 360×800, 390×844, 768×1024, 1366×768, 1920×1080, zoom125/150% e teclado virtual permanece pendente. Não declarar pixel perfect nem validação em aparelhos reais antes dessa revisão.
