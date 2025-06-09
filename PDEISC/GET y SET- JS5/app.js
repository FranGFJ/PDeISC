// Importa las librerías necesarias para crear el servidor y manejar rutas
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Importa funciones de otro archivo (main.js) que manejan la lógica de los animales
import {
    addAnimal,
    countAnimalsJaula5Under3kg, 
    countFelinosJaula2a5, 
    findAnimalJaula4Under120kg, 
    getAllAnimals 
} from './animales.js';

// Estas líneas ayudan a encontrar la carpeta actual del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crea la aplicación de servidor
const app = express();

// Configura el motor de plantillas (EJS) para mostrar páginas HTML dinámicas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Permite que el servidor entienda datos enviados por formularios y en formato JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para parsear JSON

// Permite servir archivos estáticos (como CSS, imágenes, JS) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal: cuando alguien entra a la página, muestra la lista de animales
app.get('/', (req, res) => {
    res.render('index', { animals: getAllAnimals() });
});

// Ruta para agregar un animal (se usa con JavaScript desde el navegador)
app.post('/api/animals', async (req, res) => {
    try {
        const newAnimal = await addAnimal(req.body); // Agrega el animal con los datos recibidos
        res.json({ 
            success: true,
            animal: newAnimal,
            animals: getAllAnimals() // Devuelve la lista actualizada
        });
    } catch (error) {
        console.log(error); 
        res.status(400).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Ruta para contar animales en jaula 5 con menos de 3kg
app.get('/api/animals/countJaula5', (req, res) => {
    res.json({ count: countAnimalsJaula5Under3kg() });
});

// Ruta para contar felinos entre jaulas 2 y 5
app.get('/api/animals/countFelinos', (req, res) => {
    res.json({ count: countFelinosJaula2a5() });
});

// Ruta para buscar animal en jaula 4 con menos de 120kg
app.get('/api/animals/animalJaula4', (req, res) => {
    res.json({ animal: findAnimalJaula4Under120kg() });
});

// Inicia el servidor en el puerto 3005 y muestra un mensaje en la consola
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});