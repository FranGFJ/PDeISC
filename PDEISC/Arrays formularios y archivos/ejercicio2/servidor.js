const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3032;

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Crear directorios necesarios
['uploads', 'results'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Ruta para subir archivos
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    const filePath = req.file.path;
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Procesamiento robusto de números
    const numbers = content.split(',')
      .map(num => num.trim())
      .filter(num => num !== '' && !isNaN(num))
      .map(num => parseFloat(num));

    if (numbers.length === 0) {
      return res.status(400).json({ error: 'El archivo no contiene números válidos' });
    }

    // Filtrar números que comienzan y terminan igual
    const filteredNumbers = numbers.filter(num => {
      const str = num.toString();
      return str[0] === str[str.length - 1];
    }).sort((a, b) => a - b);

    // Calcular estadísticas
    const stats = {
      total: numbers.length,
      useful: filteredNumbers.length,
      useless: numbers.length - filteredNumbers.length,
      percentage: (filteredNumbers.length / numbers.length * 100).toFixed(2)
    };

    // Guardar resultados
    const resultFilename = `result-${Date.now()}.txt`;
    const resultPath = path.join(__dirname, 'results', resultFilename);
    fs.writeFileSync(resultPath, filteredNumbers.join('\n'));

    res.json({
      success: true,
      numbers: filteredNumbers,
      statistics: stats,
      resultFile: resultFilename
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al procesar el archivo' });
  }
});

// Ruta para descargar resultados
app.get('/api/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'results', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: 'Archivo no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});