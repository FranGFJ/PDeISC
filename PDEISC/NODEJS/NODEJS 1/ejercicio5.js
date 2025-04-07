// server.mjs
import { createServer } from 'node:http';
import { suma, resta, multiplicacion, division } from './calculos.js';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ejercicio 5</title>
      <style>
        table {
          width: 50%;
          margin: 20px auto;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f4f4f4;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f1f1f1;
        }
      </style>
    </head>
    <body>
      <h1 style="text-align: center;">Resultados de Operaciones</h1>
      <table>
        <thead>
          <tr>
            <th>Operación</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Suma (4 + 5)</td>
            <td>${suma(4, 5)}</td>
          </tr>
          <tr>
            <td>Resta (3 - 6)</td>
            <td>${resta(3, 6)}</td>
          </tr>
          <tr>
            <td>Multiplicación (2 * 7)</td>
            <td>${multiplicacion(2, 7)}</td>
          </tr>
          <tr>
            <td>División (20 / 4)</td>
            <td>${division(20, 4)}</td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
  `);
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
