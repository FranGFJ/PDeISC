document.addEventListener('DOMContentLoaded', () => {
    // Obtiene referencias a los elementos del HTML por su ID
    const numeroInput = document.getElementById('numero-input');
    const agregarBtn = document.getElementById('agregar-btn');
    const guardarBtn = document.getElementById('guardar-btn');
    const numerosLista = document.getElementById('numeros-lista');
    const contador = document.getElementById('contador');
    const mensajeDiv = document.getElementById('mensaje');
    
    // Array donde se guardarán los números ingresados por el usuario
    let numeros = [];
    
    // Asignan las funciones con los botones correspondientes 
    agregarBtn.addEventListener('click', agregarNumero);
    guardarBtn.addEventListener('click', guardarNumeros);
    
    // Función para agregar un número al array
    function agregarNumero() {
        // Obtiene el valor ingresado y elimina espacios en blanco
        const valor = numeroInput.value.trim();
        
        // Si el campo está vacío, muestra un mensaje de error
        if (!valor) {
            mostrarMensaje('Por favor ingrese un número', 'error');
            return;
        }
        
        
        if (numeros.length >= 20) {
            mostrarMensaje('Ya ha ingresado el máximo de 20 números', 'error');
            return;
        }
        
        // Convierte el valor a número decimal y agrega numero al array
        const numero = parseFloat(valor);
        
        numeros.push(numero);
        
       
        actualizarLista();
        
        // Habilita el botón de guardar si hay al menos 10 números
        if (numeros.length >= 10) {
            guardarBtn.disabled = false;
        }
        
    
        numeroInput.value = '';
        numeroInput.focus();
    }
    
    // Función para mostrar la lista de números y el contador en pantalla
    function actualizarLista() {
        numerosLista.innerHTML = numeros.join(', ');
        contador.textContent = numeros.length;
    }
    
    // Función para mostrar mensajes de error o éxito al usuario
    function mostrarMensaje(texto, tipo) {
        mensajeDiv.textContent = texto;
        mensajeDiv.className = tipo;
        
        // El mensaje desaparece después de 3 segundos
        setTimeout(() => {
            mensajeDiv.textContent = '';
            mensajeDiv.className = '';
        }, 3000);
    }
    
    // Función para enviar los números al servidor y guardarlos en un archivo
    function guardarNumeros() {
        fetch('/guardar-numeros', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ numeros }), 
        })
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(data => {
            
            if (data.error) {
                mostrarMensaje(data.error, 'error');
            } else {
                mostrarMensaje(data.mensaje, 'success');
                console.log('Números guardados:', data.numeros);
            }
        })
        .catch(error => {
            // Si ocurre un error en la petición, muestra mensaje de error
            mostrarMensaje('Error al guardar los números', 'error');
            console.error('Error:', error);
        });
    }
});