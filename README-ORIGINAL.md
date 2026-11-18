# Desenvolvimento de Sistemas — EEEP Guiomar

Landing page institucional em React, TypeScript e Vite. Direção de arte violeta, rolagem Lenis integrada a GSAP/ScrollTrigger, microinterações Motion, laboratório com Three.js/React Three Fiber e fallback CSS. Conteúdo institucional verificado no site original em 10/11/2026.

## Rodar

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Node.js 22 recomendado. Produção estática em `dist/`; nenhum servidor Node.js é necessário. Tailwind 4 é integrado pelo plugin Vite; a direção de arte usa tokens e CSS dedicado. Fontes Space Grotesk e Inter são hospedadas junto à aplicação.

## Publicar no GitHub Pages

O `base: './'` permite domínio raiz ou subdiretório. A aplicação usa âncoras, sem rotas que precisem de fallback de servidor. O workflow `.github/workflows/pages.yml` executa testes, build e deploy; no repositório de destino, configurar Settings → Pages → Source → GitHub Actions. Não foi feito push para o repositório institucional nem publicação no domínio da escola.

## Editar

- `src/data/content.ts`: conteúdo verificado e projetos. A lista de projetos está vazia na fonte original. Inserir somente trabalhos reais, com imagens e permissões adequadas.
- `src/data/courses.ts`: disciplinas, sugestões educativas e fotografias/legendas dos modais.
- `src/lib/adventure.ts`: executor JavaScript restrito e dez fases educativas.
- `src/components/quest/`: jogo e personagem BYTE, carregados sob demanda.
- `src/components/ThemeProvider.tsx`: tema global e persistência.
- `src/data/media.ts`: posters e caminhos opcionais de vídeos.
- `src/components/`: componentes por seção e responsabilidade.
- `src/styles.css`: tokens e composição responsiva.
- `docs/DISCOVERY.md`: fontes e limitações da referência.
- `docs/HIGGSFIELD.md`: storyboards, prompts e integração futura.
- `docs/QA.md`: verificações e pendências.
- `docs/ADVENTURE.md`: nova aventura JavaScript, tutor e segurança.
- `docs/EXPERIENCE.md`: cards, modais, galerias, tema global e Code Quest.
- `docs/MOTION.md`: integração Lenis, estados interativos do robô e validação da atualização.

O laboratório usa comandos predefinidos; não executa código arbitrário. Os comandos alteram o estado React, a cor da interface, o LED, a posição e a rotação do robô. A galeria possui filtros e modal nativo com suporte de teclado para futuros projetos, sem atribuir exemplos fictícios aos alunos.

## Limitações de entrega

Pinterest bloqueado (403), sem comparações pixel perfect. Higgsfield sem credenciais, sem vídeos gerados. Fotografia da escola ausente na fonte. Navegador gerenciado indisponível; validação visual, console de navegador e Core Web Vitals permanecem pendentes. A atualização preserva a audiência atual do Site. Publicação técnica não equivale à aprovação institucional do conteúdo sugerido.
