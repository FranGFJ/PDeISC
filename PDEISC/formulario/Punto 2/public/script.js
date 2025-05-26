function mostrarCantidadHijos(tieneHijos) {
    const container = document.getElementById('cantidadHijosContainer');
    if (tieneHijos) {
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
        document.getElementById('canthijos').value = ''; 
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const cargarListadoBtn = document.getElementById("cargarListado");
    const lista = document.getElementById("lista");
    const resultados = document.getElementById("resultados");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const edad = document.getElementById("edad").value.trim();
        const fecha = document.getElementById("fecha").value.trim();

        if (!nombre || !apellido || !edad || !fecha) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (!/^\d{1,3}$/.test(edad)) {
            alert("La edad debe ser un número entre 1 y 3 dígitos.");
            return;
        }

        // Crear un elemento de lista para mostrar los resultados
        const li = document.createElement("li");

        // Crear contenido estructurado para el resultado
        li.innerHTML = `
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Apellido:</strong> ${apellido}</p>
            <p><strong>Edad:</strong> ${edad}</p>
            <p><strong>Fecha de nacimiento:</strong> ${fecha}</p>
        `;

        // Agregar el resultado a la lista
        resultados.appendChild(li);

        // Limpiar el formulario
        form.reset();
        document.getElementById("cantidadHijosContainer").style.display = "none";
    });
});