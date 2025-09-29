const PortfolioModel = require('../models/portfolioModel');

const portfolioAdminController = {
  // Obtener todos los portfolios
  getAllPortfolios: (req, res) => {
    PortfolioModel.getAllPortfolios((err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error del servidor' });
      }
      res.json(results);
    });
  },

  // Obtener portfolio por ID
  getPortfolioById: (req, res) => {
    const { id } = req.params;
    
    PortfolioModel.getPortfolioById(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error del servidor' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ error: 'Portfolio no encontrado' });
      }

      res.json(results[0]);
    });
  },

  // Crear nuevo portfolio
  createPortfolio: (req, res) => {
    const portfolioData = {
      user_name: req.body.user_name,
      title: req.body.title,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      about: req.body.about,
      slug: req.body.user_name.toLowerCase().replace(/\s+/g, '-')
    };

    PortfolioModel.createPortfolio(portfolioData, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error creando portfolio: ' + err.message });
      }
      res.json({ 
        message: 'Portfolio creado exitosamente', 
        id: results.insertId
      });
    });
  },

  // Actualizar portfolio
  updatePortfolio: (req, res) => {
    const { id } = req.params;
    const portfolioData = {
      user_name: req.body.user_name,
      title: req.body.title,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      about: req.body.about
    };

    PortfolioModel.updatePortfolio(id, portfolioData, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error actualizando portfolio' });
      }
      res.json({ message: 'Portfolio actualizado exitosamente' });
    });
  },

  // Eliminar portfolio
  deletePortfolio: (req, res) => {
    const { id } = req.params;
    PortfolioModel.deletePortfolio(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error eliminando portfolio' });
      }
      res.json({ message: 'Portfolio eliminado exitosamente' });
    });
  }
};

module.exports = portfolioAdminController;