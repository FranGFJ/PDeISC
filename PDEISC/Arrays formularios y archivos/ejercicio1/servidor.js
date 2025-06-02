const express = require('express'); 
const fs = require('fs'); 
const path = require('path'); 

const app = express(); 
const PORT = 3000; 

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

// Ruta POST para guardar los números enviados desde el cliente
app.post('/guardar-numeros', (req, res) => {
     const { numeros } = req.body;
    
    // Valida que se hayan enviado entre 10 y 20 números
    if (!numeros || numeros.length < 10 || numeros.length > 20) {
        return res.status(400).json({ 
            error: 'Debe ingresar entre 10 y 20 números' 
        });
    }

    // Une los números en un solo string, separados por saltos de línea
    const contenido = numeros.toString();
    const filePath = path.join(__dirname, 'numeros.txt');

    // Escribe el contenido en el archivo 'numeros.txt'
    fs.writeFile(filePath, contenido, (err) => {
        if (err) {
            // Si hay un error, devuelve una respuesta HTTP 500 (Error interno del servidor)
            return res.status(500).json({ 
                error: 'Error al guardar el archivo' 
            });
        }
        // Si no hay errores, devuelve una respuesta JSON exitosa
        res.json({ 
            mensaje: 'Archivo guardado correctamente como numeros.txt',
            numeros: numeros
        });
    });
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});