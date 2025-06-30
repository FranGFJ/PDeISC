// 1- push()
// a) Crear un array vacío y agregar tres frutas usando push().
const frutas = [];
frutas.push("manzana", "banana", "cereza");
console.log("Frutas:", frutas);

// b) Agregar los nombres de tus 3 amigos a un array existente llamado amigos.
const amigos = ["Carlos", "Ana"];
amigos.push("Luis", "Marta", "Sofía");
console.log("Amigos:", amigos);

// c) Dado un array de números, agregar un nuevo número solo si es mayor que el último número.
const numeros = [5, 10, 15];
const nuevoNumero = 20;
if (nuevoNumero > numeros[numeros.length - 1]) {
    numeros.push(nuevoNumero);
}
console.log("Números:", numeros);

// 2- pop()
// a) Eliminar el último elemento de un array de animales.
const animales = ["perro", "gato", "conejo"];
animales.pop();
console.log("Animales:", animales);

// b) Quitar el último producto de una lista de compras y mostrar cuál fue eliminado.
const compras = ["pan", "leche", "huevos"];
const eliminado = compras.pop();
console.log(`Producto eliminado: ${eliminado}`);
console.log("Compras:", compras);

// c) Usar un bucle while para vaciar un array con pop().
const tareas = ["limpiar", "estudiar", "cocinar"];
while (tareas.length > 0) {
    console.log(`Eliminando tarea: ${tareas.pop()}`);
}
console.log("Tareas:", tareas);

// 3- unshift()
// a) Agregar tres colores al principio de un array vacío.
const colores = [];
colores.unshift("rojo", "verde", "azul");
console.log("Colores:", colores);

// b) Dado un array de tareas, agregar una nueva tarea urgente al principio.
const pendientes = ["hacer compras", "pagar facturas"];
pendientes.unshift("llamar al médico");
console.log("Pendientes:", pendientes);

// c) Insertar el nombre de un usuario al principio de un array de usuarios conectados.
const usuariosConectados = ["usuario2", "usuario3"];
usuariosConectados.unshift("usuario1");
console.log("Usuarios conectados:", usuariosConectados);

// 4- shift()
// a) Quitar el primer número de un array de enteros.
const enteros = [10, 20, 30];
enteros.shift();
console.log("Enteros:", enteros);

// b) Eliminar el primer mensaje de un array de mensajes de chat.
const mensajes = ["Hola", "¿Cómo estás?", "Adiós"];
mensajes.shift();
console.log("Mensajes:", mensajes);

// c) Usar shift() para simular una cola de atención al cliente.
const colaClientes = ["cliente1", "cliente2", "cliente3"];
while (colaClientes.length > 0) {
    const atendido = colaClientes.shift();
    console.log(`Atendiendo a: ${atendido}`);
}
console.log("Cola de clientes:", colaClientes);

// 5- splice()
// a) Eliminar dos elementos desde la posición 1 de un array de letras.
const letras = ["a", "b", "c", "d"];
letras.splice(1, 2);
console.log("Letras:", letras);

// b) Insertar un nuevo nombre en la segunda posición sin eliminar nada.
const nombres = ["Pedro", "Juan"];
nombres.splice(1, 0, "María");
console.log("Nombres:", nombres);

// c) Reemplazar dos elementos por otros nuevos desde una posición determinada.
const herramientas = ["martillo", "destornillador", "alicate"];
herramientas.splice(1, 2, "llave inglesa", "sierra");
console.log("Herramientas:", herramientas);

// 6- slice()
// a) Copiar los primeros 3 elementos de un array de números.
const numerosGrandes = [100, 200, 300, 400];
const primerosTres = numerosGrandes.slice(0, 3);
console.log("Primeros tres números:", primerosTres);

// b) Crear una copia parcial de un array de películas desde la posición 2 hasta la 4.
const peliculas = ["Matrix", "Avatar", "Titanic", "Gladiador"];
const copiaParcial = peliculas.slice(2, 4);
console.log("Copia parcial de películas:", copiaParcial);

// c) Crear un array nuevo con los últimos 3 elementos sin modificarlos.
const ultimosTres = numerosGrandes.slice(-3);
console.log("Últimos tres números:", ultimosTres);

// 7- indexOf()
// a) Encontrar la posición de la palabra "perro" en un array.
const animales2 = ["gato", "perro", "conejo"];
const indicePerro = animales2.indexOf("perro");
console.log("Índice de 'perro':", indicePerro);

// b) Verificar si el número 50 está en un array y en qué posición.
const numeros2 = [10, 20, 50, 70];
const indice50 = numeros2.indexOf(50);
console.log("Índice de 50:", indice50);

// c) Dado un array de ciudades, mostrar el índice de "Madrid" o un mensaje si no está.
const ciudades = ["Barcelona", "Sevilla", "Madrid", "Valencia"];
const indiceMadrid = ciudades.indexOf("Madrid");
if (indiceMadrid !== -1) {
    console.log(`Madrid está en la posición ${indiceMadrid}`);
} else {
    console.log("Madrid no está en el array");
}

// 8- includes()
// a) Comprobar si un array contiene la palabra "admin".
const roles = ["user", "moderator", "admin"];
const tieneAdmin = roles.includes("admin");
console.log("¿Contiene 'admin'?", tieneAdmin);

// b) Dado un array de colores, indicar si existe "verde".
const colores2 = ["rojo", "azul", "amarillo"];
const tieneVerde = colores2.includes("verde");
console.log("¿Contiene 'verde'?", tieneVerde);

// c) Verificar si un número está presente antes de sumarlo al array.
const numeros3 = [1, 2, 3];
const numeroNuevo = 4;
if (!numeros3.includes(numeroNuevo)) {
    numeros3.push(numeroNuevo);
}
console.log("Números:", numeros3);

// 9- forEach()
// a) Mostrar todos los nombres de un array con un saludo.
const nombres2 = ["Laura", "Carlos", "Ana"];
nombres2.forEach(nombre => console.log(`Hola, ${nombre}!`));

// b) Imprimir el doble de cada número de un array con forEach().
const numeros4 = [2, 4, 6];
numeros4.forEach(numero => console.log(numero * 2));

// c) Dado un array de objetos {nombre, edad}, mostrar cada nombre con su edad.
const personas = [
    { nombre: "Luis", edad: 30 },
    { nombre: "Marta", edad: 25 }
];
personas.forEach(persona => console.log(`${persona.nombre} tiene ${persona.edad} años.`));

// 10- map()
// a) Crear un nuevo array con cada número multiplicado por 3.
const numeros5 = [1, 2, 3];
const multiplicados = numeros5.map(numero => numero * 3);
console.log("Números multiplicados por 3:", multiplicados);

// b) Convertir un array de nombres en mayúsculas.
const nombres3 = ["luis", "ana", "sofia"];
const nombresMayus = nombres3.map(nombre => nombre.toUpperCase());
console.log("Nombres en mayúsculas:", nombresMayus);

// c) A un array de precios, agregarle el 21% de IVA y crear un nuevo array.
const precios = [100, 200, 300];
const preciosConIVA = precios.map(precio => precio * 1.21);
console.log("Precios con IVA:", preciosConIVA);

// 11- filter()
// a) Filtrar los números mayores a 10 de un array.
const numeros6 = [5, 15, 20, 8];
const mayores10 = numeros6.filter(numero => numero > 10);
console.log("Números mayores a 10:", mayores10);

// b) Dado un array de palabras, filtrar las que tengan más de 5 letras.
const palabras = ["sol", "montaña", "cielo", "río"];
const largas = palabras.filter(palabra => palabra.length > 5);
console.log("Palabras largas:", largas);

// c) Filtrar los usuarios activos de un array de objetos {nombre, activo}.
const usuarios = [
    { nombre: "Laura", activo: true },
    { nombre: "Carlos", activo: false }
];
const activos = usuarios.filter(usuario => usuario.activo);
console.log("Usuarios activos:", activos);

// 12- reduce()
// a) Sumar todos los elementos de un array.
const numeros7 = [1, 2, 3, 4];
const suma = numeros7.reduce((acum, num) => acum + num, 0);
console.log("Suma de números:", suma);

// b) Multiplicar todos los elementos de un array de enteros.
const numeros8 = [2, 3, 4];
const producto = numeros8.reduce((acum, num) => acum * num, 1);
console.log("Producto de números:", producto);

// c) Dado un array de objetos {precio}, obtener el total de precios.
const items = [
    { precio: 50 },
    { precio: 150 }
];
const totalPrecios = items.reduce((acum, item) => acum + item.precio, 0);
console.log("Total de precios:", totalPrecios);

// 13- sort()
// a) Ordenar un array de números de menor a mayor.
const numeros9 = [10, 5, 20, 15];
numeros9.sort((a, b) => a - b);
console.log("Números ordenados:", numeros9);

// b) Ordenar un array de palabras alfabéticamente.
const palabras2 = ["sol", "cielo", "montaña"];
palabras2.sort();
console.log("Palabras ordenadas:", palabras2);

// c) Dado un array de objetos {nombre, edad}, ordenarlos por edad.
const personas2 = [
    { nombre: "Laura", edad: 35 },
    { nombre: "Carlos", edad: 30 }
];
personas2.sort((a, b) => a.edad - b.edad);
console.log("Personas ordenadas por edad:", personas2);

// 14- reverse()
// a) Invertir un array de letras.
const letras2 = ["a", "b", "c"];
letras2.reverse();
console.log("Letras invertidas:", letras2);

// b) Invertir el orden de un array de números.
const numeros10 = [1, 2, 3];
numeros10.reverse();
console.log("Números invertidos:", numeros10);

// c) Dado un string, convertirlo en array y revertir el texto.
const texto = "hola";
const textoInvertido = texto.split("").reverse().join("");
console.log("Texto invertido:", textoInvertido);