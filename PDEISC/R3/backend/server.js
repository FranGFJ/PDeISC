const express = require('express');
const app = express();

// ...otros requires y middlewares...

// Crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
  
  // Validación mejorada
  const camposRequeridos = {
    nombre: 'Nombre es requerido',
    apellido: 'Apellido es requerido',
    celular: 'Celular es requerido',
    fecha_nacimiento: 'Fecha de nacimiento es requerida',
    email: 'Email es requerido'
  };

  const errores = [];
  Object.entries(camposRequeridos).forEach(([campo, mensaje]) => {
    if (!req.body[campo]) errores.push(mensaje);
  });

  if (errores.length > 0) {
    return res.status(400).json({ 
      error: 'Validación fallida',
      detalles: errores,
      datosRecibidos: req.body  // ← Esto ayuda a debuggear
    });
  }

  // Resto del código...
});

// Obtener usuario por ID
app.get('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;
  // Aquí tu lógica para buscar el usuario en la base de datos por id
  // Ejemplo con MySQL:
  connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(results[0]);
  });
});

// Actualizar usuario por ID
app.put('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  // Lógica para actualizar el usuario
  connection.query('UPDATE usuarios SET ? WHERE id = ?', [userData, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    res.json({ message: 'Usuario actualizado' });
  });
});

// Eliminar usuario por ID
app.delete('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;
  // Lógica para eliminar el usuario
  connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    res.json({ message: 'Usuario eliminado' });
  });
});

// ...otros endpoints y middlewares...

module.exports = app;

