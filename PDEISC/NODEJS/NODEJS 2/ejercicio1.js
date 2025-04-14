import{ calcularPromedio, calcularPorcentaje, perimetro } from './modulo1.js';
import { createServer } from 'node:http';


const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
   
      <table>
        <tbody>
          <tr>
            <td>PROMEDIO: </td>
            <td>${calcularPromedio(7, 10, 8)}</td>
          </tr>
          <tr>
            <td>PORCENTAJE</td>
            <td>${calcularPorcentaje(25, 150)}</td>
          </tr>
          <tr>
            <td>PERIMETRO:</td>
            <td>${perimetro(5,15)}</td>
          </tr>
        </tbody>
      </table>
  `);
});

server.listen(8080, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:8080');
});






