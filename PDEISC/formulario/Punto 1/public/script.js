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
        const usr = document.getElementById("usr").value.trim();
        const pass = document.getElementById("pass").value.trim();
      

        if (!usr || !pass) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Crear un elemento de lista para mostrar los resultados
        const li = document.createElement("li");

        // Crear contenido estructurado para el resultado
        li.innerHTML = `
            <p><strong>Usuario:</strong> ${usr}</p>
            <p><strong>Contraseña:</strong> ${pass}</p>
        `;

        // Agregar el resultado a la lista
        resultados.appendChild(li);

        // Limpiar el formulario
        form.reset();
        document.getElementById("cantidadHijosContainer").style.display = "none";
    });
});