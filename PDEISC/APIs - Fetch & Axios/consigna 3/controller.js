const axios = require('axios');

module.exports = {
    showSearchPage: async (req, res) => {
        try {
            res.render('index', { 
                title: 'Búsqueda de Usuarios',
                initialUsers: [],
                error: null
            });
        } catch (error) {
            res.render('index', {
                title: 'Error',
                initialUsers: [],
                error: 'Error al cargar la página'
            });
        }
    },

    getUsers: async (req, res) => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users = response.data.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                username: user.username
            }));
            res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error al obtener usuarios de la API' });
        }
    }
};