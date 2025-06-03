document.addEventListener('DOMContentLoaded', function() {
    const linksContainer = document.getElementById('links-container');
    const linkSelector = document.getElementById('link-selector');
    const newUrlInput = document.getElementById('new-url');
    const modifyButton = document.getElementById('modify-link');
    const changeLog = document.getElementById('change-log');
    
    // Enlaces predefinidos
    const predefinedLinks = {
        'create-google': {
            url: 'https://www.google.com',
            text: 'Google'
        },
        'create-youtube': {
            url: 'https://www.youtube.com',
            text: 'YouTube'
        },
        'create-github': {
            url: 'https://www.github.com',
            text: 'GitHub'
        },
        'create-twitter': {
            url: 'https://www.twitter.com',
            text: 'Twitter'
        },
        'create-maps': {
            url: 'https://maps.google.com',
            text: 'Google Maps'
        }
    };
    
    // Contador de enlaces creados
    let linkCounter = 1;
    
    // Función para agregar entrada al log
    function addLogEntry(message) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        changeLog.prepend(entry);
    }
    
    // Función para actualizar el selector de enlaces
    function updateLinkSelector() {
        const links = linksContainer.querySelectorAll('a');
        
        // Limpiar selector
        linkSelector.innerHTML = '<option value="">Seleccione un enlace</option>';
        
        if (links.length === 0) {
            linkSelector.disabled = true;
            modifyButton.disabled = true;
            return;
        }
        
        linkSelector.disabled = false;
        
        // Agregar opciones para cada enlace
        links.forEach((link, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${link.textContent} (${link.href})`;
            linkSelector.appendChild(option);
        });
    }
    
    // Función para crear un nuevo enlace
    function createLink(url, text) {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = `${text} #${linkCounter++}`;
        link.target = '_blank';
        link.dataset.originalHref = url;
        
        linksContainer.appendChild(link);
        updateLinkSelector();
        
        addLogEntry(`Enlace creado: ${text} → ${url}`);
    }
    
    // Eventos para botones de creación
    Object.keys(predefinedLinks).forEach(buttonId => {
        document.getElementById(buttonId).addEventListener('click', function() {
            const linkInfo = predefinedLinks[buttonId];
            createLink(linkInfo.url, linkInfo.text);
        });
    });
    
    // Evento para modificar enlace
    modifyButton.addEventListener('click', function() {
        const selectedIndex = linkSelector.value;
        const newUrl = newUrlInput.value.trim();
        
        if (selectedIndex === '' || newUrl === '') {
            alert('Por favor seleccione un enlace y proporcione una nueva URL');
            return;
        }
        
        const links = linksContainer.querySelectorAll('a');
        const selectedLink = links[selectedIndex];
        const oldUrl = selectedLink.href;
        
        // Validar URL
        try {
            new URL(newUrl); // Esto lanzará error si la URL no es válida
        } catch (e) {
            alert('Por favor ingrese una URL válida (incluya http:// o https://)');
            return;
        }
        
        // Modificar el enlace
        selectedLink.href = newUrl;
        newUrlInput.value = '';
        
        // Actualizar interfaz
        updateLinkSelector();
        
        // Registrar cambio
        const changeMessage = `Enlace modificado: ${oldUrl} → ${newUrl}`;
        addLogEntry(changeMessage);
        
        // Resaltar el enlace modificado
        selectedLink.style.animation = 'highlight 1s';
        setTimeout(() => {
            selectedLink.style.animation = '';
        }, 1000);
    });
    
    // Habilitar botón de modificar cuando haya texto
    newUrlInput.addEventListener('input', function() {
        modifyButton.disabled = this.value.trim() === '' || linkSelector.value === '';
    });
    
    // Actualizar botón cuando se selecciona un enlace
    linkSelector.addEventListener('change', function() {
        modifyButton.disabled = this.value === '' || newUrlInput.value.trim() === '';
        
        // Mostrar la URL actual en el input
        if (this.value !== '') {
            const links = linksContainer.querySelectorAll('a');
            const selectedLink = links[this.value];
            newUrlInput.value = selectedLink.href;
        }
    });
});