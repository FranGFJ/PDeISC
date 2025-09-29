const db = require('../config/database');

const PortfolioModel = {
  // Obtener todos los portfolios - QUITAR is_active
  getAllPortfolios: (callback) => {
    const query = 'SELECT * FROM portfolios ORDER BY created_at DESC';
    console.log('📋 Ejecutando query:', query);
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error en getAllPortfolios:', err);
        console.error('Mensaje:', err.message);
      }
      callback(err, results);
    });
  },

  // Obtener portfolio por ID - QUITAR is_active
  getPortfolioById: (id, callback) => {
    const query = 'SELECT * FROM portfolios WHERE id = ?';
    db.query(query, [id], callback);
  },

  // Obtener portfolio por slug - QUITAR is_active
  getPortfolioBySlug: (slug, callback) => {
    const query = 'SELECT * FROM portfolios WHERE slug = ?';
    db.query(query, [slug], callback);
  },

  // Crear nuevo portfolio
  createPortfolio: (portfolioData, callback) => {
    const query = 'INSERT INTO portfolios SET ?';
    db.query(query, portfolioData, callback);
  },

  // Actualizar portfolio
  updatePortfolio: (id, portfolioData, callback) => {
    const query = 'UPDATE portfolios SET ? WHERE id = ?';
    db.query(query, [portfolioData, id], callback);
  },

  // Eliminar portfolio
  deletePortfolio: (id, callback) => {
    const query = 'DELETE FROM portfolios WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = PortfolioModel;