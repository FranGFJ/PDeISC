document.addEventListener('DOMContentLoaded', function() {
    // Navegación entre secciones
    const navButtons = document.querySelectorAll('.nav-buttons button');
    const sections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Ocultar todas las secciones
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // Mostrar solo la sección seleccionada
            document.getElementById(targetSection).classList.remove('hidden');
        });
    });

    // Mostrar la primera sección por defecto
    document.getElementById('dom-manipulation').classList.remove('hidden');

    //Manipulación del DOM
    const domTarget = document.getElementById('dom-target');
    let colorIndex = 0;
    const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#5f27cd'];

    document.getElementById('create-element').addEventListener('click', function() {
        const newElement = document.createElement('p');
        newElement.textContent = '¡Nuevo elemento creado!';
        domTarget.appendChild(newElement);
    });

    document.getElementById('change-text').addEventListener('click', function() {
        if (domTarget.lastElementChild) {
            domTarget.lastElementChild.textContent = 'Texto modificado!';
        }
    });

    document.getElementById('change-color').addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        domTarget.style.backgroundColor = colors[colorIndex];
    });

    //Event Listeners
    const eventBox = document.getElementById('clickable-box');
    const eventMessage = document.getElementById('event-message');

    eventBox.addEventListener('click', function() {
        eventMessage.textContent = 'Clic detectado!';
        this.style.backgroundColor = '#48dbfb';
    });

    eventBox.addEventListener('mouseenter', function() {
        eventMessage.textContent = 'Mouse entró!';
        this.style.transform = 'scale(1.1)';
    });

    eventBox.addEventListener('mouseleave', function() {
        eventMessage.textContent = 'Mouse salió!';
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = '#ff6b6b';
    });

    eventBox.addEventListener('mousedown', function() {
        eventMessage.textContent = 'Botón presionado!';
        this.style.backgroundColor = '#1dd1a1';
    });

    eventBox.addEventListener('mouseup', function() {
        eventMessage.textContent = 'Botón liberado!';
        this.style.backgroundColor = '#48dbfb';
    });

    //Validación de Formulario
    const validationForm = document.getElementById('validation-form');
    const emailInput = document.getElementById('user-email');
    const emailError = document.getElementById('email-error');

    validationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        emailError.textContent = '';
        
        if (!emailInput.value) {
            emailError.textContent = 'El email es requerido';
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            emailError.textContent = 'Ingresa un email válido';
            return;
        }
        
        alert('Formulario válido! Enviado: ' + emailInput.value);
    });

    //Arrastrar y Soltar
    const draggable = document.getElementById('draggable');
    const dropzone = document.getElementById('dropzone');

    draggable.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', this.id);
        setTimeout(() => this.style.opacity = '0.4', 0);
    });

    draggable.addEventListener('dragend', function() {
        this.style.opacity = '1';
    });

    dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.backgroundColor = '#ffbf69';
    });

    dropzone.addEventListener('dragleave', function() {
        this.style.backgroundColor = '#ff9f1c';
    });

    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(id);
        
        this.appendChild(draggedElement);
        this.style.backgroundColor = '#ff9f1c';
        draggedElement.style.opacity = '1';
        draggedElement.textContent = '¡Soltado!';
    });

    //Animaciones
    const animateButton = document.getElementById('animate-button');
    const animatedBox = document.querySelector('.animated-box');

    animateButton.addEventListener('click', function() {
        animatedBox.classList.toggle('animate');
        this.textContent = animatedBox.classList.contains('animate') 
            ? 'Detener Animación' 
            : 'Iniciar Animación';
    });
});