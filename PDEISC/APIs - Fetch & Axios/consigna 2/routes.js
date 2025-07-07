const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Mostrar formulario
router.get('/', controller.showForm);

// Procesar envío del formulario
router.post('/submit', controller.handleSubmit);

module.exports = router;