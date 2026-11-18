# Desenvolvimento de Sistemas — projeto organizado

Cópia independente; original preservado.

## Executar

Node.js 22 recomendado.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

## Organização e manutenção

### components/ui

Depende de React, Motion, Lucide e dados de disciplinas. Ao alterar Modal, revise foco, fechamento e todos os modais; ao alterar galerias, revise abas, pausa e caminhos das mídias.

### components/layout

Navegação e ThemeProvider dependem do contexto de movimento e do CSS global. Mudanças afetam todas as seções, âncoras e persistência do tema.

### components/animations

GSAP, ScrollTrigger, Lenis e Motion. Alterações afetam revelações e rolagem global; verifique cleanup e movimento reduzido.

### sections

Componentes reais da página, compostos por App.tsx. Disciplinas lê courses.ts; Escola reúne localização, matrículas e Footer. Preserve URLs e textos institucionais ao editar.

### features/code-quest

Componentes dependem de editor, game e hooks. Mude apresentação nos componentes/styles; conteúdo de fases e soluções em game/adventure.ts; qualquer mudança de regra exige executar os testes das dez soluções.

### features/laboratorio

Robô e executor do laboratório original. Depende de R3F, GSAP e Motion. Não confundir com BYTE: mudanças aqui não são mudanças no CODE QUEST.

### data

courses.ts define os cards e conteúdo; courseMedia.ts cadastra fotos/vídeos; media.ts define assets das áreas e hero; content.ts guarda referências e projetos. Consumidores são seções e galerias.

Estilos globais: `src/styles/global.css`; estilos do jogo: `src/features/code-quest/styles`. Assets mantêm os caminhos de `public/`. Testes ficam em `tests/`.

## Documentação

- [Manual completo](docs/DOCUMENTACAO.md)
- [PDF](docs/desenvolvimento-de-sistemas-documentacao.pdf)
- [Validação](docs/VALIDACAO.md)
- [Mapa de arquivos](docs/REORGANIZACAO.json)
- [Inventário](docs/ESTRUTURA.txt)
- [Cadastrar fotos e vídeos](public/media/README.md)

O executor e as fases permanecem juntos em game/adventure.ts; Escola mantém Enrollment e Footer no componente original. Essas decisões evitam mudanças funcionais. Nenhum conteúdo institucional foi inventado.
