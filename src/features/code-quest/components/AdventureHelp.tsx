export const commands=[
 {name:'Mover para frente',code:'await byte.moverFrente();',explain:'Faz BYTE avançar uma posição na direção para a qual está olhando.'},
 {name:'Virar à direita',code:'await byte.virarDireita();',explain:'Gira BYTE 90 graus à direita, sem avançar.'},
 {name:'Virar à esquerda',code:'await byte.virarEsquerda();',explain:'Gira BYTE 90 graus à esquerda, sem avançar.'},
 {name:'Verificar o caminho',code:'byte.caminhoLivre()',explain:'Responde true (verdadeiro) quando é possível avançar e false (falso) quando há obstáculo ou borda.'}
];
export const concepts=[
 ['Comandos','Uma instrução diz ao robô o que fazer.','await byte.moverFrente();'],
 ['Funções','Uma função reúne ações com um nome. Você pode chamá-la novamente.','async function andar() {\n  await byte.moverFrente();\n}\nawait andar();'],
 ['Parênteses','Os parênteses chamam uma função e guardam informações que ela recebe.','byte.moverFrente()'],
 ['Chaves','As chaves agrupam instruções que pertencem ao mesmo bloco.','if (byte.caminhoLivre()) {\n  await byte.moverFrente();\n}'],
 ['Variáveis','Uma variável é um nome que guarda um valor.','let passos = 4;'],
 ['await','Espera a ação terminar antes de começar a próxima.','await byte.moverFrente();'],
 ['for','Repete um bloco. i começa em zero; enquanto for menor que 4, executa e soma 1.','for (let i = 0; i < 4; i++) {\n  await byte.moverFrente();\n}'],
 ['if','Escolhe uma ação quando uma condição é verdadeira.','if (byte.caminhoLivre()) {\n  await byte.moverFrente();\n}'],
 ['else','Escolhe o outro caminho quando o if é falso.','if (byte.caminhoLivre()) {\n  await byte.moverFrente();\n} else {\n  await byte.virarDireita();\n}'],
 ['Operadores lógicos','&& significa E, || significa OU e ! inverte verdadeiro e falso.','if (byte.caminhoLivre() && 2 < 4) {\n  await byte.moverFrente();\n}']
];
