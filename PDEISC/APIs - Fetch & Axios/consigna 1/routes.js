const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', async (req, res) => {
    try {
        const data = await controller.getUsersData();
        res.render('index', data);
    } catch (err) {
        console.error('Error en la ruta:', err);
        res.render('index', {
            fetchUsers: [],
            axiosUsers: [],
            error: 'Error al procesar la solicitud',
            apiEndpoint: 'https://jsonplaceholder.typicode.com/users',
            lastUpdated: new Date().toLocaleString()
        });
    }
});

module.exports = router;