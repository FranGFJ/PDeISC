

// push()
function ejemploPush() {
  const frutas = [];
  frutas.push('manzana', 'banana', 'naranja');
  document.getElementById('push-1').innerHTML = `
    <p>Array resultante: <strong>[${frutas.join(', ')}]</strong></p>
  `;
}

// pop()
function ejemploPop() {
  const animales = ['perro', 'gato', 'elefante', 'tigre'];
  const eliminado = animales.pop();
  
  document.getElementById('pop-1').innerHTML = `
    <p>Array original: <strong>['perro', 'gato', 'elefante', 'tigre']</strong></p>
    <p>Elemento eliminado: <strong>${eliminado}</strong></p>
    <p>Array resultante: <strong>[${animales.join(', ')}]</strong></p>
  `;
}

// unshift()
function ejemploUnshift() {
  const colores = [];
  colores.unshift('azul', 'rojo', 'verde');
  document.getElementById('unshift-1').innerHTML = `
    <p>Array resultante: <strong>[${colores.join(', ')}]</strong></p>
  `;
}



// shift()
function ejemploShift() {
  const enteros = [10, 20, 30, 40];
  const eliminado = enteros.shift();
  document.getElementById('shift-1').innerHTML = `
    <p>Array original: <strong>[10, 20, 30, 40]</strong></p>
    <p>Elemento eliminado: <strong>${eliminado}</strong></p>
    <p>Array resultante: <strong>[${enteros.join(', ')}]</strong></p>
  `;
}


// splice()
function ejemploSplice() {
  const letras = ['a', 'b', 'c', 'd', 'e'];
  const eliminados = letras.splice(1, 2); // Elimina 2 elementos desde posición 1
  
  let resultado = `<p><strong>Eliminar elementos:</strong></p>`;
  resultado += `<p>Original: [a, b, c, d, e]</p>`;
  resultado += `<p>Eliminados: [${eliminados.join(', ')}]</p>`;
  resultado += `<p>Resultado: [${letras.join(', ')}]</p>`;
  
  // Insertar sin eliminar
  letras.splice(1, 0, 'x', 'y');
  resultado += `<p><strong>Insertar elementos:</strong></p>`;
  resultado += `<p>Resultado: [${letras.join(', ')}]</p>`;
  
  // Reemplazar elementos
  letras.splice(2, 2, 'm', 'n');
  resultado += `<p><strong>Reemplazar elementos:</strong></p>`;
  resultado += `<p>Resultado: [${letras.join(', ')}]</p>`;
  
  document.getElementById('splice-result').innerHTML = resultado;
}

// slice()
function ejemploSlice() {
  const numeros = [1, 2, 3, 4, 5];
  const primeros3 = numeros.slice(0, 3);
  
  const peliculas = ['Avengers', 'Batman', 'Spiderman', 'Superman', 'Ironman'];
  const parcialPeliculas = peliculas.slice(2, 4);
  
  const ultimos3 = numeros.slice(-3);
  
  let resultado = `<p><strong>Primeros 3 números:</strong> [${primeros3.join(', ')}]</p>`;
  resultado += `<p><strong>Películas 2-4:</strong> [${parcialPeliculas.join(', ')}]</p>`;
  resultado += `<p><strong>Últimos 3 números:</strong> [${ultimos3.join(', ')}]</p>`;
  
  document.getElementById('slice-result').innerHTML = resultado;
}

// indexOf()
function ejemploIndexOf() {
  const mascotas = ['gato', 'perro', 'pez', 'hamster'];
  const posPerro = mascotas.indexOf('perro');
  
  const numeros = [10, 20, 30, 40, 50];
  const pos50 = numeros.indexOf(50);
  
  const ciudades = ['Barcelona', 'Valencia', 'Sevilla'];
  const posMadrid = ciudades.indexOf('Madrid');
  
  let resultado = `<p><strong>Posición de 'perro':</strong> ${posPerro}</p>`;
  resultado += `<p><strong>Posición de 50:</strong> ${pos50}</p>`;
  resultado += `<p><strong>Posición de Madrid:</strong> ${posMadrid !== -1 ? posMadrid : 'No encontrada'}</p>`;
  
  document.getElementById('indexOf-result').innerHTML = resultado;
}

// includes()
function ejemploIncludes() {
  const usuarios = ['user1', 'admin', 'user2'];
  const tieneAdmin = usuarios.includes('admin');
  
  const colores = ['rojo', 'verde', 'azul'];
  const tieneVerde = colores.includes('verde');
  
  const numeros = [5, 10, 15, 20];
  const numero = 15;
  const existe = numeros.includes(numero);
  
  let resultado = `<p><strong>¿Hay admin?:</strong> ${tieneAdmin ? 'Sí' : 'No'}</p>`;
  resultado += `<p><strong>¿Hay verde?:</strong> ${tieneVerde ? 'Sí' : 'No'}</p>`;
  resultado += `<p><strong>¿El número ${numero} existe?:</strong> ${existe ? 'Sí' : 'No'}</p>`;
  
  document.getElementById('includes-result').innerHTML = resultado;
}

// forEach()
function ejemploForEach() {
  const nombres = ['Ana', 'Juan', 'María'];
  let saludos = '';
  nombres.forEach(nombre => saludos += `<p>¡Hola, ${nombre}!</p>`);
  
  const numeros = [1, 2, 3, 4];
  let dobles = '';
  numeros.forEach(num => dobles += `<p>${num} × 2 = ${num * 2}</p>`);
  
  const personas = [
    { nombre: 'Carlos', edad: 25 },
    { nombre: 'Ana', edad: 30 }
  ];
  let infoPersonas = '';
  personas.forEach(p => infoPersonas += `<p>${p.nombre} (${p.edad} años)</p>`);
  
  let resultado = `<div><strong>Saludos:</strong>${saludos}</div>`;
  resultado += `<div><strong>Dobles:</strong>${dobles}</div>`;
  resultado += `<div><strong>Personas:</strong>${infoPersonas}</div>`;
  
  document.getElementById('forEach-result').innerHTML = resultado;
}

// map()
function ejemploMap() {
  const numeros = [1, 2, 3, 4];
  const triples = numeros.map(num => num * 3);
  
  const nombres = ['ana', 'juan', 'maría'];
  const mayusculas = nombres.map(nombre => nombre.toUpperCase());
  
  const precios = [10, 20, 30, 40];
  const preciosConIVA = precios.map(precio => (precio * 1.21).toFixed(2));
  
  let resultado = `<p><strong>Números × 3:</strong> [${triples.join(', ')}]</p>`;
  resultado += `<p><strong>Nombres mayúsculas:</strong> [${mayusculas.join(', ')}]</p>`;
  resultado += `<p><strong>Precios con IVA:</strong> [${preciosConIVA.join(', ')}]</p>`;
  
  document.getElementById('map-result').innerHTML = resultado;
}

// filter()
function ejemploFilter() {
  const numeros = [5, 12, 8, 15, 3, 20];
  const mayores10 = numeros.filter(num => num > 10);
  
  const palabras = ['casa', 'ordenador', 'sol', 'teclado'];
  const largas = palabras.filter(palabra => palabra.length > 5);
  
  const usuarios = [
    { nombre: 'Ana', activo: true },
    { nombre: 'Juan', activo: false },
    { nombre: 'María', activo: true }
  ];
  const activos = usuarios.filter(usuario => usuario.activo);
  
  let resultado = `<p><strong>Números > 10:</strong> [${mayores10.join(', ')}]</p>`;
  resultado += `<p><strong>Palabras largas:</strong> [${largas.join(', ')}]</p>`;
  resultado += `<p><strong>Usuarios activos:</strong> ${JSON.stringify(activos)}</p>`;
  
  document.getElementById('filter-result').innerHTML = resultado;
}

// reduce()
function ejemploReduce() {
  const numeros = [1, 2, 3, 4, 5];
  const suma = numeros.reduce((total, num) => total + num, 0);
  
  const producto = numeros.reduce((total, num) => total * num, 1);
  
  const productos = [
    { precio: 10 },
    { precio: 20 },
    { precio: 30 }
  ];
  const totalPrecios = productos.reduce((total, producto) => total + producto.precio, 0);
  
  let resultado = `<p><strong>Suma:</strong> ${suma}</p>`;
  resultado += `<p><strong>Producto:</strong> ${producto}</p>`;
  resultado += `<p><strong>Total precios:</strong> ${totalPrecios}</p>`;
  
  document.getElementById('reduce-result').innerHTML = resultado;
}

// sort()
function ejemploSort() {
  const numeros = [5, 1, 4, 2, 3];
  const numerosOrdenados = [...numeros].sort((a, b) => a - b);
  
  const palabras = ['perro', 'gato', 'elefante', 'abeja'];
  const palabrasOrdenadas = [...palabras].sort();
  
  const personas = [
    { nombre: 'Carlos', edad: 25 },
    { nombre: 'Ana', edad: 30 },
    { nombre: 'Luis', edad: 22 }
  ];
  const personasOrdenadas = [...personas].sort((a, b) => a.edad - b.edad);
  
  let resultado = `<p><strong>Números ordenados:</strong> [${numerosOrdenados.join(', ')}]</p>`;
  resultado += `<p><strong>Palabras ordenadas:</strong> [${palabrasOrdenadas.join(', ')}]</p>`;
  resultado += `<p><strong>Personas por edad:</strong> ${JSON.stringify(personasOrdenadas)}</p>`;
  
  document.getElementById('sort-result').innerHTML = resultado;
}

// reverse()
function ejemploReverse() {
  const letras = ['a', 'b', 'c', 'd'];
  const letrasInvertidas = [...letras].reverse();
  
  const numeros = [1, 2, 3, 4, 5];
  const numerosInvertidos = [...numeros].reverse();
  
  const texto = "Hola mundo";
  const textoInvertido = texto.split('').reverse().join('');
  
  let resultado = `<p><strong>Letras invertidas:</strong> [${letrasInvertidas.join(', ')}]</p>`;
  resultado += `<p><strong>Números invertidos:</strong> [${numerosInvertidos.join(', ')}]</p>`;
  resultado += `<p><strong>Texto invertido:</strong> "${textoInvertido}"</p>`;
  
  document.getElementById('reverse-result').innerHTML = resultado;
}

