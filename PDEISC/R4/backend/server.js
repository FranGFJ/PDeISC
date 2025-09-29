const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const portfolioRoutes = require('./routes/portfolioRoutes');
const portfolioAdminRoutes = require('./routes/portfolioAdminRoutes');

// Usar rutas
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/admin', portfolioAdminRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API del Portfolio funcionando',
    version: '1.0 - Ultra Simplificada'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});