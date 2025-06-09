// Función para actualizar la tabla de animales
        function updateAnimalsTable(animals) {
            const container = document.getElementById('animalsTableContainer');
            
            if (animals.length === 0) {
                container.innerHTML = '<p class="no-animals">No hay animales registrados todavía.</p>';
                return;
            }
            
            let html = `
                <table id="animalsTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Jaula</th>
                            <th>Tipo</th>
                            <th>Peso (kg)</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            animals.forEach(animal => {
                // Esto convierte el número del tipo de animal a texto para mostrarlo en la tabla
                let type;
                switch(animal.IdTypeAnimal) {
                    case 1: type = 'Felino'; break;
                    case 2: type = 'Ave'; break;
                    case 3: type = 'Reptil'; break;
                    default: type = 'Otro';
                }
                
                html += `
                    <tr>
                        <td>${animal.IdAnimal}</td>
                        <td>${animal.nombre}</td>
                        <td>${animal.JaulaNumero}</td>
                        <td>${type}</td>
                        <td>${animal.peso}</td>
                    </tr>
                `;
            });
            
            html += `
                    </tbody>
                </table>
            `;
            
            container.innerHTML = html;
        }
        
        window.addEventListener('DOMContentLoaded', function() {
            // Manejar el envío del formulario
            document.getElementById('animalForm').addEventListener('submit', async function(e) {
                e.preventDefault(); // Evita que la página se recargue al enviar el formulario
                
                // Toma los valores del formulario y los pone en un objeto
                const nombre = this.nombre.value.trim();
                const jaula = parseInt(this.JaulaNumero.value);
                const tipo = this.IdTypeAnimal.value;
                const peso = parseFloat(this.peso.value);
        
                if (nombre.length < 2 || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre)) {
                    alert('El nombre debe tener al menos 2 letras y solo puede contener letras y espacios.');
                    this.nombre.focus();
                    return;
                }
                if (isNaN(jaula) || jaula < 1 || jaula > 100) {
                    alert('El número de jaula debe ser entre 1 y 100.');
                    this.JaulaNumero.focus();
                    return;
                }
                if (!tipo) {
                    alert('Seleccione un tipo de animal.');
                    this.IdTypeAnimal.focus();
                    return;
                }
                if (isNaN(peso) || peso < 0.1 || peso > 1000) {
                    alert('El peso debe ser entre 0.1 y 1000 kg.');
                    this.peso.focus();
                    return;
                }
        
                const formData = {
                    nombre: nombre,
                    JaulaNumero: jaula,
                    IdTypeAnimal: tipo,
                    peso: peso
                };
        
                try {
                    // Envía los datos al servidor usando fetch (POST)
                    const response = await fetch('/api/animals', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData) // Convierte el objeto a texto JSON
                    });
                    
                    const data = await response.json(); // Convierte la respuesta a objeto
                    
                    if (data.success) {
                        alert(`Animal agregado correctamente con ID: ${data.animal.IdAnimal}`);
                        this.reset(); // Limpia el formulario
                        updateAnimalsTable(data.animals); // Actualiza la tabla con los nuevos datos
                    } else {
                        alert(`Error: ${data.error}`);
                    }
                } catch (error) {
                    alert('Error al agregar el animal');
                    console.error(error);
                }
            });
            
            // Consultas: cada botón hace una petición al servidor y muestra el resultado
            document.getElementById('countJaula5Btn').addEventListener('click', async function() {
                const response = await fetch('/api/animals/countJaula5');
                const data = await response.json();
                
                // Muestra el resultado en la página
                document.getElementById('queryResults').innerHTML = `
                    <div class="result-box">
                        <h3>Cantidad de animales en Jaula 5 con peso menor a 3kg:</h3>
                        <p class="result">${data.count}</p>
                    </div>
                `;
            });
            
            document.getElementById('countFelinosBtn').addEventListener('click', async function() {
                const response = await fetch('/api/animals/countFelinos');
                const data = await response.json();
                
                document.getElementById('queryResults').innerHTML = `
                    <div class="result-box">
                        <h3>Cantidad de felinos entre jaulas 2 a 5:</h3>
                        <p class="result">${data.count}</p>
                    </div>
                `;
            });
            
            document.getElementById('animalJaula4Btn').addEventListener('click', async function() {
                const response = await fetch('/api/animals/animalJaula4');
                const data = await response.json();
                
                document.getElementById('queryResults').innerHTML = `
                    <div class="result-box">
                        <h3>Animal en Jaula 4 con peso menor a 120kg:</h3>
                        <p class="result">${data.animal}</p>
                    </div>
                `;
            });
        });