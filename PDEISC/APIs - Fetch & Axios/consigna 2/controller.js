const axios = require('axios');

module.exports = {
    showForm: (req, res) => {
        res.render('index', { 
            showForm: true,  // Variable para controlar qué mostrar
            result: null,
            error: null
        });
    },

    handleSubmit: async (req, res) => {
        try {
            const { nombre, email } = req.body;
            
            // Simulamos el envío a la API (JSONPlaceholder siempre devuelve id: 11)
            const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
                name: nombre,
                email: email,
                id: Math.floor(Math.random() * 1000) + 11 // ID aleatorio para demostración
            });

            res.render('index', {
                showForm: false,
                result: {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email
                },
                error: null
            });
            
        } catch (error) {
            console.error('Error:', error);
            res.render('index', {
                showForm: true,
                result: null,
                error: 'Error al enviar el formulario: ' + error.message
            });
        }
    }
};