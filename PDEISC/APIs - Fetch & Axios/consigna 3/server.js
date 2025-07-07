const express = require('express');
const path = require('path');
const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const searchRoutes = require('./routes');
app.use('/', searchRoutes);

// Puerto 3002 como solicitado
const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});