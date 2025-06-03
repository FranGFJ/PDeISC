document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    const resultsDiv = document.getElementById('results');

    // Mapas para mostrar nombres
    const paises = {
        'ar': 'Argentina',
        'cl': 'Chile',
        'co': 'Colombia',
        'mx': 'México',
        'pe': 'Perú',
        'es': 'España',
        'otro': 'Otro'
    };
    const interesesMap = {
        'tecnologia': 'Tecnología',
        'deportes': 'Deportes',
        'musica': 'Música',
        'viajes': 'Viajes',
        'lectura': 'Lectura'
    };

    // Validación personalizada para checkboxes
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const checkboxes = document.querySelectorAll('input[name="intereses"]:checked');
        if (checkboxes.length === 0) {
            alert('Por favor seleccione al menos un interés');
            return;
        }

        // Obtener datos del formulario
        const formData = new FormData(registrationForm);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            edad: formData.get('edad'),
            genero: formData.get('genero'),
            pais: formData.get('pais'),
            intereses: formData.getAll('intereses'),
            comentarios: formData.get('comentarios')
        };

        // Construir HTML de resultados
        let html = `
            <h2>Datos Registrados</h2>
            <div class="result-item"><strong>Nombre:</strong> <span>${data.nombre}</span></div>
            <div class="result-item"><strong>Email:</strong> <span>${data.email}</span></div>
            <div class="result-item"><strong>Edad:</strong> <span>${data.edad}</span></div>
            <div class="result-item"><strong>Género:</strong> <span>${data.genero}</span></div>
            <div class="result-item"><strong>País:</strong> <span>${paises[data.pais] || data.pais}</span></div>
            <div class="result-item"><strong>Intereses:</strong> <span>${
                data.intereses.length > 0
                    ? data.intereses.map(i => interesesMap[i] || i).join(', ')
                    : 'Ninguno seleccionado'
            }</span></div>
        `;
        if (data.comentarios) {
            html += `<div class="result-item"><strong>Comentarios:</strong> <span>${data.comentarios}</span></div>`;
        }

        resultsDiv.innerHTML = html;
        resultsDiv.scrollIntoView({ behavior: "smooth" });
    });

    // Mejorar la experiencia de usuario
    const ageInput = document.getElementById('edad');
    ageInput.addEventListener('input', function() {
        if (this.value < 18) {
            this.setCustomValidity('Debes tener al menos 18 años');
        } else {
            this.setCustomValidity('');
        }
    });
});