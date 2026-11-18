# Atualização de cards, temas e Code Quest — 11/11/2026

A suíte atual cobre o percurso completo do jogo, colisões, rede, respostas, persistência, vitória/reinício/retorno ao curso, os cinco modais, galerias ampliadas, foco, tema, laboratório e integração Lenis. Execução final: 25 testes aprovados, zero falhas. TypeScript e build de produção aprovados. Os testes usam JSDOM e o renderer de testes do React Three Fiber; não são screenshots nem medições de navegador. A verificação visual em navegador continua bloqueada pela infraestrutura; as seis resoluções permanecem pendentes. Consulte `EXPERIENCE.md` e `MOTION.md`.

# Atualização de movimento

A atualização preserva o Site existente e acrescenta Lenis, revelações progressivas, parallax discreto e cinco estados do robô. Consulte `MOTION.md` para o fluxo de execução real e os testes adicionais. A verificação inicial abaixo permanece como registro; a quantidade atual de testes está no relatório de execução da atualização.

# QA — 10/11/2026

## Verificado

- TypeScript: compilação sem erros.
- Vite: build estático de produção concluído.
- Seis testes automatizados de componentes passaram (JSDOM, sem navegador real):
  1. Menu abre, fecha ao navegar e retorna o foco com Escape.
  2. Controle de movimento emite alteração de estado.
  3. LED liga/desliga, cor muda, posição circula entre limites, rotação incrementa e reinício restaura a cena.
  4. Filtros preservam estados vazios sem inventar trabalhos.
  5. Com fixture isolada de teste, filtro e modal de detalhes funcionam; fixture não é incluída nos dados publicados.
  6. Telefone, URL de matrícula, mapa incorporado e atributos de links externos são preservados.
- Testes usam movimento reduzido e fallback sem WebGL. Renderização real do canvas permanece pendente.
- Imagem hero WebP: aproximadamente 93 KiB. Cinco ilustrações SVG: cerca de 3–5 KiB cada. Logo otimizado: cerca de 23 KiB.
- Fontes locais WOFF2, carregamento com font-display: swap.
- Three.js é carregado por importação dinâmica quando a seção interativa está próxima da viewport; o HTML inicial não faz preload do chunk 3D. O chunk 3D tem aproximadamente 239 KiB gzip; o build sinaliza o tamanho descomprimido acima de 500 kB. Não foi ocultado o aviso.
- Imagens fora da hero carregam com lazy loading. Vídeos opcionais têm poster e preload none.
- A cena 3D é desmontada fora da região visível e usa DPR limitado. Reduced motion remove flutuação e usa frame sob demanda. Existe fallback CSS para WebGL indisponível.
- Links Google Maps (busca e embed): HTTP 200 na verificação por HTTP. Exibição visual do iframe depende de confirmação no navegador.
- Site original: HTTP 200. SEDUC-CE: HTTP 503 observado nesta sessão; URL oficial mantida conforme a fonte e o briefing. Disponibilidade externa não é controlada por esta aplicação.
- GitHub Pages: `base: './'`, assets relativos, navegação por âncoras, nenhum runtime de servidor. Workflow de Actions incluído. Não executado no repositório da escola.

## Pendente — não declarar concluído

| Verificação                                      | Estado                                                          |
| ------------------------------------------------ | --------------------------------------------------------------- |
| 1920 × 1080                                      | CSS implementado; screenshot e inspeção pendentes               |
| 1440 × 900                                       | CSS implementado; screenshot e inspeção pendentes               |
| 1280 × 800                                       | CSS implementado; screenshot e inspeção pendentes               |
| 768 × 1024                                       | CSS implementado; screenshot e inspeção pendentes               |
| 390 × 844                                        | CSS implementado; screenshot e inspeção pendentes               |
| 360 × 800                                        | CSS implementado; screenshot e inspeção pendentes               |
| Overflow horizontal e cortes de composição       | Pendente em navegador                                           |
| ScrollTrigger, hover, toque e curvas visuais     | Código integrado; inspeção visual pendente                      |
| Console e rede no navegador                      | Pendente                                                        |
| Contraste, leitor de tela e teclado no navegador | Estilos de foco e semântica implementados; auditoria pendente   |
| LCP < 2,5 s / CLS < 0,1 / INP < 200 ms           | Metas não medidas                                               |
| Comparação pixel perfect                         | Pinterest 403; sem screenshots de referência                    |
| Vídeos Higgsfield                                | Sem credenciais, prompts e integração preparados                |
| Fotografia real da escola                        | Ausente na página de origem; não substituída por foto inventada |

A ferramenta `cua_repl.js` exigida pelo fluxo de preview gerenciado não foi disponibilizada. `sites-preview status` retornou “preview relay unavailable: No such file or directory”. Por isso não foi criado servidor alternativo nem alegada validação visual. A inspeção estática e os testes de componentes não equivalem à QA em navegador.

## Roteiro para revisão visual posterior

1. Abrir a publicação nas seis resoluções, aguardar fontes e assets, capturar hero e página completa.
2. Verificar limites de texto, margens, imagens, ausência de overflow e menu em toque.
3. Percorrer todas as âncoras, testar tabulação, foco visível, Escape e links externos.
4. Executar todos os comandos, alternar pausa, reduzir movimento no sistema e repetir.
5. Com conteúdo institucional real disponível, testar cada filtro e modal, incluindo restauração de foco.
6. Medir Lighthouse mobile e Web Vitals em dispositivo real; corrigir antes de afirmar as metas.
7. Comparar com screenshots da referência no mesmo viewport, quando fornecidos.
