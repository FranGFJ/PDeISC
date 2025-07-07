const axios = require('axios');
const fetch = require('node-fetch');

module.exports = {
    getUsersData: async () => {
        try {
            // Obtener con Fetch
            const fetchResponse = await fetch('https://jsonplaceholder.typicode.com/users');
            const fetchUsers = await fetchResponse.json();
            
            // Obtener con Axios
            const axiosResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
            const axiosUsers = axiosResponse.data;
            
            return {
                fetchUsers: fetchUsers.map(user => ({ name: user.name, email: user.email })),
                axiosUsers: axiosUsers.map(user => ({ name: user.name, email: user.email })),
                error: null, // Asegúrate de incluir esto
                apiEndpoint: 'https://jsonplaceholder.typicode.com/users',
                lastUpdated: new Date().toLocaleString()
            };
        } catch (error) {
            console.error('Error:', error);
            return {
                fetchUsers: [],
                axiosUsers: [],
                error: 'Error al obtener datos de la API', // Mensaje de error claro
                apiEndpoint: 'https://jsonplaceholder.typicode.com/users',
                lastUpdated: new Date().toLocaleString()
            };
        }
    }
};