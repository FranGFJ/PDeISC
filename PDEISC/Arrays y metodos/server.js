const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para variables compartidas
app.use((req, res, next) => {
  res.locals.appTitle = 'Ejercicios con Arrays';
  res.locals.menuItems = [
    { text: 'Inicio', url: '/' },
    { text: 'Ejercicios', url: '/ejercicios' }
  ];
  next();
});

// Datos de ejemplo para los ejercicios
const dataEjemplos = {
  frutas: ['manzana', 'banana', 'naranja'],
  animales: ['perro', 'gato', 'elefante', 'tigre'],
  colores: ['rojo', 'verde', 'azul'],
  enteros: [10, 20, 30, 40],
  letras: ['a', 'b', 'c', 'd', 'e'],
  numeros: [1, 2, 3, 4, 5],
  peliculas: ['Avengers', 'Batman', 'Spiderman', 'Superman', 'Ironman'],
  mascotas: ['gato', 'perro', 'pez', 'hamster'],
  ciudades: ['Barcelona', 'Valencia', 'Madrid', 'Sevilla'],
  usuarios: ['user1', 'admin', 'user2'],
  nombres: ['Ana', 'Juan', 'María'],
  personas: [
    { nombre: 'Carlos', edad: 25 },
    { nombre: 'Ana', edad: 30 },
    { nombre: 'Luis', edad: 22 }
  ],
  precios: [10, 20, 30, 40],
  productos: [
    { precio: 10 },
    { precio: 20 },
    { precio: 30 }
  ],
  palabras: ['casa', 'ordenador', 'sol', 'teclado'],
  usuariosActivos: [
    { nombre: 'Ana', activo: true },
    { nombre: 'Juan', activo: false },
    { nombre: 'María', activo: true }
  ]
};

// Rutas
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Inicio'
  });
});

app.get('/ejercicios', (req, res) => {
  res.render('ejercicios', {
    title: 'Todos los Ejercicios',
    data: dataEjemplos
  });
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));