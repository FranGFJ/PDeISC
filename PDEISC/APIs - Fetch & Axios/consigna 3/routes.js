const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Mostrar página de búsqueda
router.get('/', controller.showSearchPage);

// Obtener usuarios (API endpoint)
router.get('/api/usuarios', controller.getUsers);

module.exports = router;