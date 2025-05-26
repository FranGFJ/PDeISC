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
        const sexo = document.querySelector('input[name="sexo"]:checked').value;
        const dni = document.getElementById("dni").value.trim();
        const ec = document.getElementById("ec").value.trim();
        const nacionalidad = document.getElementById("nacionalidad").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const mail = document.getElementById("mail").value.trim();
        const hijos = document.querySelector('input[name="hijos"]:checked').value;
        const canthijos = document.getElementById("canthijos").value.trim();

        if (!nombre || !apellido || !edad || !fecha || !sexo || !dni || !ec || !nacionalidad || !telefono || !mail || !hijos) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        if (!/^\d{1,3}$/.test(edad)) {
            alert("La edad debe ser un número entre 1 y 3 dígitos.");
            return;
        }

        if (!/^\d{1,8}$/.test(dni)) {
            alert("El DNI debe contener entre 1 y 8 dígitos.");
            return;
        }

        if (!/^\d{1,10}$/.test(telefono)) {
            alert("El teléfono debe contener entre 1 y 10 dígitos.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        if (hijos === "si" && (!canthijos || !/^\d{1,2}$/.test(canthijos))) {
            alert("Por favor, ingresa una cantidad válida de hijos.");
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
            <p><strong>Sexo:</strong> ${sexo}</p>
            <p><strong>DNI:</strong> ${dni}</p>
            <p><strong>Estado civil:</strong> ${ec}</p>
            <p><strong>Nacionalidad:</strong> ${nacionalidad}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Mail:</strong> ${mail}</p>
            <p><strong>Hijos:</strong> ${hijos}</p>
            <p><strong>Cantidad de hijos:</strong> ${canthijos || "N/A"}</p>
        `;

        // Agregar el resultado a la lista
        resultados.appendChild(li);

        // Limpiar el formulario
        form.reset();
        document.getElementById("cantidadHijosContainer").style.display = "none";
    });
});