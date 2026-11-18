# Fotografias e vídeos das atividades

Coloque arquivos em `public/media/<disciplina>/fotos/` ou `public/media/<disciplina>/videos/`.
Disciplinas: robotica, programacao, design, manutencao, redes.

Cadastre em `src/data/courseMedia.ts`, no array da disciplina:

```ts
robotica: [
  { id: 'aula-foto-01', type: 'foto', src: 'media/robotica/fotos/aula.jpg', title: 'Montagem de circuitos', caption: 'Legenda do registro real.' },
  { id: 'aula-video-01', type: 'video', src: 'media/robotica/videos/aula.mp4', title: 'Circuito em funcionamento', caption: 'Legenda do vídeo real.', poster: 'media/robotica/fotos/capa.jpg' },
],
```

Use IDs únicos. Não inclua `public/` no caminho. MP4 e WebM são aceitos pelo player nativo, conforme os codecs suportados no navegador. A capa é opcional; sem ela, aparece um ícone de reprodução. Nenhum vídeo é baixado antes da seleção. Adicione somente arquivos reais existentes. Para remover uma mídia, remova sua entrada.

Os placeholders de fotos anteriores continuam aparecendo enquanto não há fotos cadastradas aqui. Ao cadastrar fotos, elas passam a compor a galeria da disciplina. Fotos antigas reais, caso cadastradas em courses.ts, devem ser mantidas: a galeria também as inclui.

Após alterações: `npm install`, `npm run build`. Para desenvolvimento: `npm run dev`.
