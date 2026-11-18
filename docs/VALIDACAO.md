# Validação da cópia organizada

- `npm ci`: concluído com lockfile original.
- `npm test`: 37 testes aprovados, zero falhas.
- `npm run build`: TypeScript e Vite concluídos.
- Imports relativos atualizados e resolvidos pelo build e pelos testes.
- Arquivos públicos preservados byte a byte; ZIP antigo de download excluído deliberadamente.
- Código do executor e das dez fases preservado; somente sua localização mudou.
- Fluxos DOM: navegação, cards/modais, galeria de fotos/vídeos, temas e CODE QUEST cobertos pela suíte.
- Original: nenhum arquivo modificado pela reorganização; git status limpo.
- PDF: 20 páginas A4, sumário com páginas, texto pesquisável, fontes incorporadas; integridade lida por pdfinfo/pdftotext.
- ZIP: CRC verificado por zipfile.testzip e membros inspecionados.

Limites: não houve navegação visual em navegador real. Revisão responsiva, teclado virtual, reprodução de vídeos reais, codecs e métricas de desempenho permanecem pendentes. O build mantém aviso de chunks acima de 500 kB, inclusive Three.js e editor do jogo carregados sob demanda. Nenhuma declaração de fidelidade pixel perfect ou desempenho medido.
