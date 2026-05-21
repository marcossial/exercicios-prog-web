const http = require('http');
const fs = require('fs');
const { somarArray, raizQuadradaArray } = require('./utils');

const numeros = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
const resultadoSoma = somarArray(numeros);
const resultadoRaiz = raizQuadradaArray(numeros);

const conteudo = `Soma: ${resultadoSoma}\nRaiz: ${resultadoRaiz}`;

console.log(conteudo);

const server = http.createServer((req, res) => {
  res.writeHead(200, 'text/html');
  res.end(`
    <html>
      <head>
        <title>Node Server</title>
      </head>
      <body>
        <h1>Pagina disponibilizada pelo servidor HTTP</h1>
        <p>Soma: ${resultadoSoma}</p>
        <p>Raiz: ${resultadoRaiz}</p>
      </body>
    </html>
    `)
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});