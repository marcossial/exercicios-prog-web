class Aluno {

    nome
    nota1
    nota2

    constructor(nome, nota1, nota2) {
        this.nome = nome;
        this.nota1 = nota1;
        this.nota2 = nota2;
    }
    
    calcularMedia() {
        return (this.nota1 + this.nota2) / 2
    }

}

const alunos = [
    new Aluno('Mario', 10, 5),
    new Aluno('Melissa', 7, 8),
    new Aluno('Moises', 5, 4),
];

const medias = alunos.map(a => a.calcularMedia())
let mediaSala = medias.reduce((a, n) => a + n, 0)
mediaSala /= medias.length

for (let m of medias) {
    console.log(m)
}

const aprovados = alunos.filter(a => a.calcularMedia() >= 6)
const reprovados = alunos.filter(a => a.calcularMedia() < 6)

for (let a of aprovados) {
    console.log("maior que 6: " + a.nome);
}

for (let r of reprovados) {
    console.log("menor que 6: " + r.nome);
}

console.log(mediaSala)