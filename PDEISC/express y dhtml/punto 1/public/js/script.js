document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los botones
    const btnAgregarH1 = document.getElementById('agregar-h1');
    const btnCambiarTexto = document.getElementById('cambiar-texto');
    const btnCambiarColor = document.getElementById('cambiar-color');
    const btnAgregarImagen = document.getElementById('agregar-imagen');
    const btnCambiarImagen = document.getElementById('cambiar-imagen');
    const btnCambiarTamano = document.getElementById('cambiar-tamano');
    
    const titulo = document.getElementById('titulo');
    const imagenContainer = document.getElementById('imagen-container');
    
    let imagenActual = null;
    let imagenes = ['/images/imagen1.jpg', '/images/imagen2.jpg'];
    let indiceImagen = 0;
    let colores = ['red', 'blue', 'green', 'purple', 'orange'];
    let indiceColor = 0;

    // Eventos
    btnAgregarH1.addEventListener('click', function() {
        titulo.textContent = 'Hola DOM';
    });

    btnCambiarTexto.addEventListener('click', function() {
        titulo.textContent = 'Chau DOM';
    });

    btnCambiarColor.addEventListener('click', function() {
        indiceColor = (indiceColor + 1) % colores.length;
        titulo.style.color = colores[indiceColor];
    });

    btnAgregarImagen.addEventListener('click', function() {
        if (!imagenActual) {
            imagenActual = document.createElement('img');
            imagenActual.src = imagenes[indiceImagen];
            imagenActual.alt = 'Imagen dinámica';
            imagenActual.style.maxWidth = '300px';
            imagenContainer.appendChild(imagenActual);
        }
    });

    btnCambiarImagen.addEventListener('click', function() {
        if (imagenActual) {
            indiceImagen = (indiceImagen + 1) % imagenes.length;
            imagenActual.src = imagenes[indiceImagen];
        }
    });

    btnCambiarTamano.addEventListener('click', function() {
    if (imagenActual) {
        // Obtener el ancho actual (usando getComputedStyle)
        const currentWidth = parseInt(getComputedStyle(imagenActual).width);
        
        // Definir los tamaños alternativos
        const smallWidth = 300;
        const largeWidth = 500;
        
        // Cambiar entre los dos tamaños
        const newWidth = currentWidth <= smallWidth ? largeWidth : smallWidth;
        
        // Aplicar el nuevo tamaño (quitando max-width si existe)
        imagenActual.style.maxWidth = 'none';
        imagenActual.style.width = `${newWidth}px`;
    } else {
        console.log("No hay imagen para cambiar de tamaño");
    }
});
});