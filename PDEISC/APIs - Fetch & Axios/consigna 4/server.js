const express = require('express');
const app = express();
const PORT = 3003;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware para archivos estáticos y parsear JSON
app.use(express.static('public'));
app.use(express.json());

// Datos de ejemplo
const alumnos = [
  { id: 1, nombre: 'Juan Pérez', curso: 'Matemáticas' },
  { id: 2, nombre: 'María García', curso: 'Literatura' },
  { id: 3, nombre: 'Carlos López', curso: 'Historia' }
];

// Ruta API para obtener alumnos
app.get('/api/alumnos', (req, res) => {
  res.json(alumnos);
});

// Ruta para agregar un alumno (para demostrar POST)
app.post('/api/alumnos', (req, res) => {
  const nuevoAlumno = {
    id: alumnos.length + 1,
    nombre: req.body.nombre,
    curso: req.body.curso
  };
  alumnos.push(nuevoAlumno);
  res.status(201).json(nuevoAlumno);
});

// Ruta principal que renderiza la vista
app.get('/', (req, res) => {
  res.render('index');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});