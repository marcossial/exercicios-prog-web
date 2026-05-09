// Variáveis globais
let perguntas = [];
let atual = 0;
let pontos = 0;

// Elementos HTML
const iniciar = document.getElementById('btnIniciar');
const elInicio = document.getElementById('inicio');
const elQuiz = document.getElementById('quiz');
const elResultado = document.getElementById('resultado');
const elProgresso = document.getElementById('progresso');
const elPergunta = document.getElementById('pergunta');
const elOpcoes = document.getElementById('opcoes');

iniciar.addEventListener('click', iniciarQuiz) 

async function buscarPerguntas() {
  const url =
    'https://tryvia.ptr.red/api.php'
    + '?amount=10&type=multiple';

  try {
    const res = await fetch(url);
    const data = await res.json();
    perguntas = data.results;
  } catch (erro) {
    console.log('Erro:', erro);
  }
}

function getAlternativas(pergunta) {
  const todas = [
    ...pergunta.incorrect_answers,
    pergunta.correct_answer
  ]
  return todas
    .sort(() => Math.random() - 0.5);
}

function exibirPergunta() {
  const p = perguntas[atual];
  const alternativas = getAlternativas(p);

  // elProgresso.textContent =
  //  `${atual + 1} / ${perguntas.length}`;
  const percentual = (atual / perguntas.length) * 100;
  elProgresso.style.width = `${percentual}%`;

  elPergunta.innerHTML =
  p.question;

  elOpcoes.innerHTML = '';
  alternativas.forEach((alt) => {
    const btn = document
      .createElement('button');
    btn.innerHTML = alt;
    btn.className = 'opcao';
    elOpcoes.appendChild(btn);
  });
}

let bloqueado = false;

elOpcoes.addEventListener('click',
  (e) => {
    if (bloqueado) return;
    if (!e.target.classList
      .contains('opcao')) return;

    bloqueado = true;

    const resposta =
      e.target.textContent;
    const correta =
      perguntas[atual].correct_answer;

    if (resposta === correta) {
      pontos++;
      e.target.classList
        .add('correta');
    } else {
      e.target.classList
        .add('errada');
    }

    // Avançar após 1 segundo
    setTimeout(() => {
      atual++;
      bloqueado = false;
      if (atual < perguntas.length) {
        exibirPergunta();
      } else {
        exibirResultado();
      }
    }, 1000);
  }
);

function exibirResultado() {
  // Esconder quiz, mostrar resultado
  elProgresso.style.width = '100%';
  elQuiz.hidden = true;
  elResultado.hidden = false;

  const total = perguntas.length;
  const pct =
    Math.round((pontos / total) * 100);

  let msg = 'Tente novamente!';
  if (pct >= 80) msg = 'Excelente!';
  else if (pct >= 60) msg = 'Bom trabalho!';

  let reiniciar = document.createElement('button');
  reiniciar.id = 'btnReiniciar';
  reiniciar.innerHTML = 'Jogar novamente';
  reiniciar.addEventListener('click', iniciarQuiz)

  elResultado.innerHTML = `
    <h2>${msg}</h2>
    <p>${pontos} de ${total} (${pct}%)</p>
  `;
  elResultado.appendChild(reiniciar);
}

let carregando = false;

async function iniciarQuiz() {
  if (carregando) return;
  carregando = true;
  atual = 0;
  pontos = 0;

  await buscarPerguntas();
  elInicio.hidden = true;
  elResultado.hidden = true;
  elQuiz.hidden = false;

  exibirPergunta();
  carregando = false;
}