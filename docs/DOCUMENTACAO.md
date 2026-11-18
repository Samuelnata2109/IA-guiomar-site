# Desenvolvimento de Sistemas — documentação técnica

EEEP Guiomar Belchior Aguiar · Cariré — Ceará

## Sumário

1. Introdução
2. Objetivos
3. Requisitos funcionais e não funcionais
4. Tecnologias utilizadas
5. Arquitetura
6. Estrutura de pastas
7. Componentes e manutenção por módulo
8. Funcionalidades da landing page
9. CODE QUEST 3D — funcionamento detalhado
10. Interface e identidade visual
11. Instalação e execução
12. Testes e validação
13. Publicação
14. Manutenção
15. Adição futura de fotos e vídeos
16. Estado atual e pendências
17. Considerações finais

## 1. Introdução

Este manual descreve a cópia organizada da landing page de Desenvolvimento de Sistemas da EEEP Guiomar Belchior Aguiar, Cariré — Ceará. A fonte é o código local exportado, não uma confirmação externa de currículo, calendário ou atividades escolares. O repositório original e o site publicado não foram alterados por esta exportação.

## 2. Objetivos

Entregar um projeto executável e modular, com rastreabilidade dos arquivos movidos e manutenção acessível. A reorganização preserva o comportamento visual, as dez fases, o executor JavaScript, animações, navegação, mídias e configurações. Não foram criadas novas funcionalidades nem conteúdo institucional.

## 3. Requisitos funcionais e não funcionais

Funcionais: navegação por âncoras; apresentação do curso; cinco disciplinas com modais; galerias de fotos e vídeos; temas claro/escuro; laboratório interativo; CODE QUEST com dez fases, ajuda, execução e progresso; matrículas, escola e localização. O componente de projetos preexistente é preservado com dados vazios.

Não funcionais: publicação estática, suporte a teclado, foco em modais, movimento reduzido, carregamento sob demanda do jogo e do 3D, fallback sem WebGL e adaptação responsiva. Metas de desempenho e fidelidade visual não são resultados medidos. O teste de teclado virtual e revisão visual nos dispositivos continuam pendentes.

## 4. Tecnologias utilizadas

React e TypeScript estruturam a aplicação; Vite gera o build estático. Tailwind está integrado, acompanhado de CSS próprio. GSAP/ScrollTrigger e Lenis controlam rolagem e revelações. Motion controla transições. Three.js e React Three Fiber renderizam os robôs. CodeMirror fornece o editor e Acorn analisa o JavaScript do jogo. Lucide fornece ícones; Fontsource fornece Inter e Space Grotesk.

Dependências declaradas (as versões resolvidas estão no package-lock.json):
@codemirror/autocomplete: ^6.20.4
@codemirror/commands: ^6.11.1
@codemirror/lang-javascript: ^6.2.5
@codemirror/language: ^6.13.1
@codemirror/state: ^6.7.6
@codemirror/view: ^6.43.15
@fontsource-variable/inter: ^5.3.0
@fontsource-variable/space-grotesk: ^5.3.0
@react-three/fiber: ^9.4.0
@tailwindcss/vite: ^4.1.0
acorn: ^8.19.0
gsap: ^3.13.0
lenis: ^1.3.27
lucide-react: ^0.468.0
motion: ^12.23.0
react: ^19.1.0
react-dom: ^19.1.0
tailwindcss: ^4.1.0
three: ^0.180.0

## 5. Arquitetura

main.tsx importa estilos e monta App.tsx. App compõe ThemeProvider, AmbientMotionContext, MotionConfig e SmoothScroll, seguido da navegação e das seções. Dados editoriais ficam em src/data. Componentes ui são reutilizados por seções. Features encapsulam o CODE QUEST e o laboratório.

Fluxo do jogo: editor → Acorn/interpretador → evento de execução → interface/AdventureWorld → confirmação do movimento → próxima instrução. O progresso é local à sessão, não depende de servidor.

Decisões de preservação: as fases e o interpretador continuam juntos em game/adventure.ts; SchoolLocation.tsx continua exportando Enrollment e Footer; Shared.tsx mantém suas exportações; CSS global não foi fragmentado para evitar mudanças na cascata. Não foram criadas pastas levels/utils vazias. Caminhos public/assets e public/media foram preservados para evitar links quebrados.

## 6. Estrutura de pastas

src/components/ui: modais, fotos, vídeos e mídia cinematográfica.
src/components/layout: navegação e tema.
src/components/animations: rolagem, revelações e contexto de movimento.
src/sections: Hero, SobreCurso, Disciplinas, CodeQuest, Projetos e Escola.
src/features/code-quest: components, editor, game, hooks, styles.
src/features/laboratorio: components e game.
src/data: disciplinas, mídias e referências institucionais.
src/styles: CSS global.
public/assets: imagens e licenças existentes.
public/images e public/media: espaços preparados para registros reais.
tests: testes automatizados existentes com imports atualizados.
docs: documentação corrente e histórico.
.github/workflows: publicação GitHub Pages.

Não há modelos 3D externos: os modelos são procedurais. Fontes vêm de pacotes Fontsource. Não foram inventados arquivos em videos/models/fonts.

## 7. Componentes e manutenção por módulo

components/ui — Depende de React, Motion, Lucide e dados de disciplinas. Ao alterar Modal, revise foco, fechamento e todos os modais; ao alterar galerias, revise abas, pausa e caminhos das mídias.

components/layout — Navegação e ThemeProvider dependem do contexto de movimento e do CSS global. Mudanças afetam todas as seções, âncoras e persistência do tema.

components/animations — GSAP, ScrollTrigger, Lenis e Motion. Alterações afetam revelações e rolagem global; verifique cleanup e movimento reduzido.

sections — Componentes reais da página, compostos por App.tsx. Disciplinas lê courses.ts; Escola reúne localização, matrículas e Footer. Preserve URLs e textos institucionais ao editar.

features/code-quest — Componentes dependem de editor, game e hooks. Mude apresentação nos componentes/styles; conteúdo de fases e soluções em game/adventure.ts; qualquer mudança de regra exige executar os testes das dez soluções.

features/laboratorio — Robô e executor do laboratório original. Depende de R3F, GSAP e Motion. Não confundir com BYTE: mudanças aqui não são mudanças no CODE QUEST.

data — courses.ts define os cards e conteúdo; courseMedia.ts cadastra fotos/vídeos; media.ts define assets das áreas e hero; content.ts guarda referências e projetos. Consumidores são seções e galerias.

Arquivos movidos (mapa completo e hashes em docs/REORGANIZACAO.json):
src/components/ui/Modal.tsx
src/components/ui/PhotoGallery.tsx
src/components/ui/ActivityGallery.tsx
src/components/ui/CinematicMedia.tsx
src/components/layout/Navigation.tsx
src/components/layout/ThemeProvider.tsx
src/components/animations/SmoothScroll.tsx
src/components/animations/Shared.tsx
src/components/animations/AmbientMotion.ts
src/sections/Hero/CinematicHero.tsx
src/sections/SobreCurso/Course.tsx
src/sections/Disciplinas/InteractiveShowcase.tsx
src/sections/Disciplinas/CourseModal.tsx
src/sections/Projetos/ProjectGallery.tsx
src/sections/Escola/SchoolLocation.tsx
src/sections/CodeQuest/CodeQuestSection.tsx
src/features/laboratorio/components/InteractiveCodeDemo.tsx
src/features/laboratorio/components/RobotScene.tsx
src/features/laboratorio/components/RobotFallback.tsx
src/features/laboratorio/components/RobotParticles.tsx
src/features/laboratorio/game/robotExecution.ts
src/features/code-quest/components/AdventureHelp.tsx
src/features/code-quest/hooks/useAdventureLayout.ts
src/features/code-quest/components/ByteCharacter.tsx
src/features/code-quest/components/CodeQuestGame.tsx
src/features/code-quest/game/types.ts
src/features/code-quest/components/ByteScene.tsx
src/features/code-quest/editor/AdventureEditor.tsx
src/features/code-quest/components/AdventureWorld.tsx
src/features/code-quest/game/adventure.ts
src/features/code-quest/styles/adventure.css
src/features/code-quest/styles/adventure-world.css
src/styles/global.css

## 8. Funcionalidades da landing page

Hero cinematográfica com fallback visual; sobre o curso; Robótica, Programação, Design, Manutenção e Redes; cards e modais acessíveis; galeria multimídia; jogo no acesso existente; laboratório com comandos reais; matrícula orientada às fontes oficiais; localização com Google Maps; navegação e rodapé. O conjunto ProjectGallery com lista vazia foi mantido porque já fazia parte do código: não se trata de projetos fictícios adicionados na exportação.

Os conteúdos educativos dos cards estão identificados como sugestões. Fotos ausentes usam placeholders explícitos; vídeos ausentes usam mensagem de espera. Nenhuma mídia real de estudante foi fabricada.

## 9. CODE QUEST 3D — funcionamento detalhado

Dez fases progressivas:
1. Primeiro portal — Primeiro comando
2. Uma ação depois da outra — Sequência
3. Mude de direção — Funções e ações
4. Quatro passos — Laço for
5. Dobre a esquina — Repetição e navegação
6. Escolha o caminho — if / else
7. Guarde um número — Variáveis
8. Até encontrar a barreira — Condições e laços
9. Sua própria função — Funções reutilizáveis
10. Restaure o universo — Desafio final

Comandos: await byte.moverFrente(); await byte.virarDireita(); await byte.virarEsquerda(); byte.caminhoLivre(). Direção inicial: frente corresponde a z decrescente. O terreno é uma grade com limites, obstáculos e portal. A vitória exige alcançar a coordenada de destino.

Guiado, Explorador e Livre controlam assistência sem apagar o código existente. Quatro níveis de dicas chegam a uma solução explicada; inseri-la exige ação explícita. O guia explica comandos, funções, parênteses, chaves, variáveis, await, for, if, else e operadores. BYTE usa diálogos predefinidos, sem API de IA.

CodeQuestGame mantém o estado; AdventureEditor integra CodeMirror, histórico, autocompletar e destaque de linha; AdventureWorld e ByteScene desenham o cenário e BYTE; AdventureHelp centraliza exemplos; useAdventureLayout trata altura e divisor.

O interpretador aceita um subconjunto de JavaScript com valores numéricos/booleanos, let/const, operações, for/while, if/else e funções nomeadas permitidas. Não usa eval nem Function; não expõe DOM, rede, globals nem navegação arbitrária por propriedades. Há limites de entrada, passos e recursão. Não é um executor JavaScript geral.

Eventos transportam linha, variáveis, condição e posição reais. O loop aguarda a confirmação de movimento. Parar, fechar ou reiniciar cancelam a execução. Erros não apagam progresso; mensagens amigáveis preservam detalhes técnicos. Pausa, continuação, avanço unitário e velocidade permanecem disponíveis.

Persistência: sessionStorage guarda códigos, fase, modo e conclusão; localStorage guarda a preferência de largura dos painéis. Reinício de fase preserva o código; Jogar novamente reinicia a aventura. Sem storage, a interface continua utilizável. A renderização dispõe de fallback 2D para indisponibilidade de WebGL.

## 10. Interface e identidade visual

Roxo #7c3aed, violeta #9333ea, neon #a855f7 e lavanda #c084fc; fundo escuro #090514 e superfície #140a24. Títulos Space Grotesk e textos Inter. Tema claro usa tokens próprios, sem inversão de cores.

O estado exportado inclui rolagem normal do CODE QUEST: BYTE, terminal e cabeçalho não ficam sticky. Desktop tem divisor ajustável; mobile apresenta mundo, editor, Executar/Parar, console e ferramentas recolhíveis. Editor possui scroll interno. A preferência de movimento reduzido é respeitada. A exportação não alterou estas regras.

## 11. Instalação e execução

Pré-requisito recomendado: Node.js 22 e npm (o workflow usa Node 22). Extraia o ZIP e abra um terminal na pasta desenvolvimento-de-sistemas.

1. npm ci
2. npm run dev
3. Abra a URL informada pelo Vite.

Verificação: npm test. Build: npm run build. Prévia local da distribuição: npm run preview. Não abra index.html diretamente como arquivo: o desenvolvimento exige Vite. Não há servidor Node em produção. Não há segredo de API necessário para a landing page atual.

## 12. Testes e validação

A cópia recebeu npm ci a partir do lockfile. Os 37 testes passaram, sem falhas, e o build TypeScript/Vite foi concluído. Consulte docs/VALIDACAO.md para o resultado final. Os testes cobrem navegação, cards/modais, galeria, temas, laboratório, Lenis, soluções das dez fases, isolamento do interpretador, erros, cancelamento, progresso, controles e renderer 3D.

Limites: testes DOM e renderer não comprovam fidelidade visual em aparelhos, teclado virtual, codecs de vídeo ou desempenho real. Não há navegador gerenciado disponível nesta sessão. Revisão visual 360×800, 390×844, 768×1024, 1366×768, 1920×1080 e zoom125/150% permanece pendente. Arquivos reais de vídeo ainda precisam de teste de reprodução.

## 13. Publicação

vite.config.ts mantém base ./, React e Tailwind. npm run build gera dist, excluído do ZIP por ser reconstruível. Publique o conteúdo de dist em hospedagem estática.

GitHub Pages: envie o projeto a um repositório, selecione Settings → Pages → Source: GitHub Actions. O workflow .github/workflows/pages.yml instala Node22, executa npm ci, testes e build e publica dist ao receber push em main ou disparo manual. Habilite permissões adequadas de Pages/Actions no repositório.

O manifesto privado de identidade do Sites não acompanha a exportação. A cópia não está vinculada automaticamente ao site original, evitando publicações acidentais sobre ele. Nenhuma implantação foi executada nesta entrega.

## 14. Manutenção

Antes de editar, crie uma branch ou backup. Modifique conteúdo em src/data, apresentação nas seções/styles e componentes compartilhados apenas quando a mudança realmente for transversal. Use o mapa de reorganização para localizar os caminhos antigos.

Após atualizar dependências, mantenha package.json e package-lock.json consistentes; execute npm ci, npm test e npm run build. Preserve limpeza de listeners, animações e contexto WebGL. Não coloque credenciais em public/ ou em código enviado ao navegador. Para contato, endereço e matrículas, confirme a fonte institucional antes de alterar.

Os documentos históricos em docs registram versões anteriores e caminhos antigos; este manual e REORGANIZACAO.json descrevem a cópia atual. README-ORIGINAL.md preserva o README recebido.

## 15. Adição futura de fotos e vídeos

Edite os cards em src/data/courses.ts: nome, descrição, tópicos, atividades, ferramentas e imagens. Não remova IDs usados pelo cadastro de mídias.

Arquivos reais: public/media/robotica/fotos ou videos; repita para programacao, design, manutencao e redes. Cadastre cada item em src/data/courseMedia.ts com id único, type foto/video, src sem public/ inicial, title, caption e poster opcional. Exemplo de caminho: media/robotica/videos/aula.mp4. Para capa: media/robotica/fotos/capa.jpg.

O player usa controls e preload metadata, sem autoplay; suporta MP4/WebM conforme codecs do navegador e pausa ao fechar ou trocar de aba. Miniaturas não carregam todos os vídeos. A aba de fotos preserva registros antigos reais e acrescenta os novos. Sem cadastro, mantém placeholders e a mensagem de vídeos em breve. Para remover, retire a entrada da configuração e, se não houver outros usos, o arquivo.

Não há upload público ou painel administrativo. Depois de editar arquivos/configuração, gere o build e publique novamente. Consulte public/media/README.md para exemplo TypeScript completo.

## 16. Estado atual e pendências

A exportação reorganiza arquivos e imports em uma cópia independente. Não atualiza o site publicado. Todas as dez fases e as soluções existentes foram mantidas. Arquivos estáticos foram preservados byte a byte; não foram criadas mídias fictícias.

Pendências anteriores: revisão visual mobile/desktop, teclado virtual, zoom, teste com estudantes, métricas de desempenho e vídeos/fotos reais. Higgsfield não está conectado; não há vídeos gerados por essa plataforma. Aviso de chunks grandes do Vite é informativo e deve ser avaliado com métricas antes de otimizar.

Exclusões deliberadas: node_modules, dist, caches, logs, .git, identidade .openai, antigos ZIPs de download e arquivos .env. Esses itens não são necessários para reconstruir o projeto e não foram apagados do original.

## 17. Considerações finais

A estrutura aproxima os arquivos de suas responsabilidades sem reescrever o jogo ou redesenhar a landing page. O lockfile, testes, workflow e arquivos públicos permitem reconstrução independente. Use o PDF como visão técnica, os Markdown para manutenção e o mapa de movimentos para rastrear cada módulo. A conclusão da validação automatizada não substitui a homologação visual e institucional.