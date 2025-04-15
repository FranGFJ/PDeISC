function calcularPromedio(n1, n2, n3) {
  let promedio = 0;

  promedio = (n1 + n3 + n3)/ 3;
  return promedio;

}


function calcularPorcentaje(parte, total) {
  if (total === 0) {
      return "El total no puede ser cero.";
  }
  return (parte / total) * 100;
}


function perimetro(base, altura) {
  return 2* (base + altura);
}



export { calcularPromedio, calcularPorcentaje, perimetro };