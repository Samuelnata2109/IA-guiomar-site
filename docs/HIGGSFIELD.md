# Pipeline de cenas Higgsfield

Status: integração e credenciais indisponíveis nesta sessão. Nenhum vídeo foi gerado ou exportado pela Higgsfield. Os assets atuais são fallbacks e o robô do laboratório é interativo, sem vídeo. Não há pacote de SDK ou endpoint inventado.

Documentação indicada: https://open.higgsfield.ai/ e https://higgsfield.ai/ai-motion-design. Antes da integração, confirmar os modelos, formatos e parâmetros na documentação vigente. Gerar durante o desenvolvimento, usando credenciais apenas no ambiente de geração. Não usar variáveis `VITE_*` para segredos.

## Direção compartilhada

Premium cinematic CGI, deep black-purple background #090514, electric violet #9333EA lighting, soft lavender rim lights, restrained cyan accents, polished metal and translucent glass, controlled volumetric lighting, no logos, no embedded text, no characters copied from references. Stable objects, subtle continuous camera motion, clean silhouette, seamless loop.

## Storyboards e prompts

| Cena       | Enquadramento                                | 0–2s                          | 2–4s                           | 4–6s                                     |
| ---------- | -------------------------------------------- | ----------------------------- | ------------------------------ | ---------------------------------------- |
| Hero       | 16:9; 45% de espaço negativo à esquerda      | Halo revela estação flutuante | Componentes orbitam lentamente | Câmera e objetos retornam à pose inicial |
| Robótica   | Braço à direita, não cortar pinça            | Luz revela sensores           | Órbita de câmera de 6 graus    | Retorno suave com luz estável            |
| Jogos      | Controle central, objetos pequenos em órbita | Reflexo atravessa controle    | Elementos flutuam              | Retorno à composição original            |
| Design     | Interfaces em camadas                        | Painéis se afastam            | Formas se organizam            | Painéis retornam sem cortes              |
| Manutenção | Gabinete aberto em três quartos              | Câmera revela placa-mãe       | Foco acompanha CPU e memória   | Retorna ao enquadramento inicial         |
| Redes      | Servidores em perspectiva isométrica         | Primeiro pulso acende         | Pulso percorre conexões        | Luz retorna ao estado inicial            |

Hero prompt:
“A futuristic digital universe illuminated by deep violet and electric purple lights. A premium three-dimensional computer workstation floats in a dark technological environment. Robotic components, gaming controllers, processors and luminous circuit elements orbit gracefully around the central composition. Volumetric purple lighting, cinematic reflections, smooth camera movement, subtle particles, premium CGI, ultra-detailed materials, seamless looping motion, high-end technology commercial aesthetic. Horizontal 16:9 composition, empty dark left 45 percent for HTML headings, no text, no logos.”

Robótica prompt:
“A polished articulated robotic arm in a futuristic laboratory, exposed sensors and circuit boards, violet rim lights, subtle cyan sensor glow. Slow six-degree camera orbit returning to the exact starting pose. Dark purple seamless background, subject fully visible on the right, premium CGI, no text or logo.”

Jogos prompt:
“A premium metallic game controller floating with original geometric game-design objects. Electric purple and blue lighting, soft studio reflections. Slow synchronized orbit returning to the opening arrangement, dark background, no brands, no text, no copyrighted game characters.”

Design prompt:
“Layered translucent digital interface panels, original abstract UI shapes and three-dimensional geometric elements. Purple glass, lavender highlights. Panels gently transform and organize then return to their initial state, all typography omitted, no logos.”

Manutenção prompt:
“An open desktop computer case with detailed motherboard, processor and RAM. Premium brushed metal surfaces, violet technical lighting. Gentle cinematic reveal across internal components, returning to the original three-quarter view. No brands, no text.”

Redes prompt:
“Original miniature servers and devices interconnected by luminous violet lines in a dark futuristic isometric environment. Digital pulses travel along connections in a seamless six-second loop, restrained cyan accents, no logos, no text.”

## Exportação e revisão

1. Gerar imagens-base consistentes e revisar materiais, enquadramento e ausência de marcas.
2. Animar com um modelo efetivamente disponível na conta Higgsfield.
3. Comparar primeiro e último frames e eliminar saltos, deformações e flicker.
4. Exportar master local. Comprimir em MP4 H.264 e WebM VP9, sem áudio, 24/30fps; reduzir resolução/bitrate para cada viewport conforme medição. Meta inicial: 720p nos painéis e 1080p na hero, ajustável.
5. Exportar poster WebP com enquadramento idêntico. Revisar contraste sobre texto HTML.
6. Salvar em `public/assets/video/` e editar `src/data/media.ts` com caminhos relativos `./assets/...`.
7. `CinematicMedia` usa poster, lazy preload, playsInline, muted, loop e IntersectionObserver. Usa imagem estática com movimento reduzido ou falha no vídeo.
8. O botão de pausa ambiente também controla vídeos via contexto React. Validar com os arquivos reais após a integração. O pipeline de geração e revisão permanece pendente; configurar caminhos não equivale a concluir os vídeos.
9. Repetir testes visuais, acessibilidade e desempenho nos seis viewports antes de aprovar novos assets.

## Extensão CODE QUEST (preparação, sem geração realizada)

A área Jogos foi substituída por Programação no briefing atualizado. Usar como base uma estação portátil em perspectiva com painéis de código e símbolos abstratos, iluminação violeta e materiais metálicos; `programacao.svg` é o fallback local atual.

Prompt compartilhado para introdução, portal e vitória:
“Premium futuristic 3D robot adventure, compact white and violet robot with expressive digital eyes, floating circuit platforms, holographic portals, cinematic volumetric lighting, deep violet environment, high-end CGI, polished sci-fi game art, consistent character design. No embedded text, no logos. Match the locally implemented BYTE character proportions and materials.”

Storyboard opcional: 0–2s BYTE desperta em uma plataforma; 2–4s circuito ilumina um portal; 4–6s câmera estabiliza com espaço negativo para títulos HTML. Vitória: núcleo acende, BYTE comemora, partículas violetas se dissipam. Revisar loop, enquadramento, compressão e poster antes de integrar. Os vídeos futuros são ornamentais; nunca controlam a lógica, a validação ou a progressão das missões.
