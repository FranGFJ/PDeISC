document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');
    const usersTable = document.getElementById('usersTable').querySelector('tbody');
    
    // Obtener usuarios al cargar la página
    let allUsers = [];
    
    try {
        const response = await fetch('/api/usuarios');
        allUsers = await response.json();
        renderUsers(allUsers);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
    
    // Función para renderizar usuarios
    function renderUsers(users) {
        usersTable.innerHTML = '';
        
        if (users.length === 0) {
            usersTable.innerHTML = '<tr><td colspan="5">No se encontraron usuarios</td></tr>';
            return;
        }
        
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.username}</td>
            `;
            usersTable.appendChild(row);
        });
    }
    
    // Filtrar usuarios al escribir
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredUsers = allUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.username.toLowerCase().includes(searchTerm)
        );
        renderUsers(filteredUsers);
    });
});