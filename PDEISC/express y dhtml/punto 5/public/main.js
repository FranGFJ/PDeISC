document.addEventListener('DOMContentLoaded', function() {
    const elementsContainer = document.getElementById('elements-container');
    const emptyMessage = document.querySelector('.empty-message');
    
    // Plantillas de elementos HTML
    const elementTemplates = {
        heading: `
            <div class="generated-element generated-heading">
                <h2>Título Dinámico</h2>
            </div>
        `,
        paragraph: `
            <div class="generated-element">
                <p>Este es un párrafo generado dinámicamente usando innerHTML.</p>
            </div>
        `,
        list: `
            <div class="generated-element">
                <h3>Lista de Ejemplo</h3>
                <ul class="generated-list">
                    <li>Primer elemento de la lista</li>
                    <li>Segundo elemento de la lista</li>
                    <li>Tercer elemento con de la lista</li>
                    <li>Cuarto elemento</li>
                </ul>
            </div>
        `,
        table: `
            <div class="generated-element">
                <h3>Tabla de Ejemplo</h3>
                <table class="generated-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Usuario 1</td>
                            <td>usuario1@example.com</td>
                            <td>Admin</td>
                        </tr>
                        <tr>
                            <td>Usuario 2</td>
                            <td>usuario2@example.com</td>
                            <td>Editor</td>
                        </tr>
                        <tr>
                            <td>Usuario 3</td>
                            <td>usuario3@example.com</td>
                            <td>Lector</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
    };
    
    
    // Función para agregar elemento
    function addElement(type) {
        if (emptyMessage.style.display !== 'none') {
            elementsContainer.innerHTML = '';
        }
        
        elementsContainer.innerHTML += elementTemplates[type];
        
    }
    
    // Eventos para los botones
    document.getElementById('add-heading').addEventListener('click', () => addElement('heading'));
    document.getElementById('add-paragraph').addEventListener('click', () => addElement('paragraph'));
    document.getElementById('add-list').addEventListener('click', () => addElement('list'));
    document.getElementById('add-table').addEventListener('click', () => addElement('table'));
    
    
    
    // Manejar envío de formularios generados (delegación de eventos)
    elementsContainer.addEventListener('submit', function(e) {
        e.preventDefault();
        if (e.target.tagName === 'FORM') {
            alert('Formulario enviado (esto es una simulación)');
        }
    });
    
    
});