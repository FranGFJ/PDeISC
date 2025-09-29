const PortfolioModel = require('../models/portfolioModel');

const portfolioController = {
  // Obtener portfolio por slug
  getPortfolioBySlug: (req, res) => {
    const { slug } = req.params;
    
    PortfolioModel.getPortfolioBySlug(slug, (err, portfolioResults) => {
      if (err) {
        console.error('Error obteniendo portfolio:', err);
        return res.status(500).json({ error: 'Error del servidor' });
      }
      
      if (portfolioResults.length === 0) {
        return res.status(404).json({ error: 'Portfolio no encontrado' });
      }

      const portfolio = portfolioResults[0];
      const portfolioId = portfolio.id;
      
      // Obtener todos los datos relacionados
      PortfolioModel.getSkills(portfolioId, (err, skills) => {
        PortfolioModel.getExperiences(portfolioId, (err, experiences) => {
          PortfolioModel.getProjects(portfolioId, (err, projects) => {
            PortfolioModel.getAchievements(portfolioId, (err, achievements) => {
              res.json({
                ...portfolio,
                skills: skills || [],
                experiences: experiences || [],
                projects: projects || [],
                achievements: achievements || []
              });
            });
          });
        });
      });
    });
  },

  // Obtener información personal por slug
  getPersonalInfoBySlug: (req, res) => {
    const { slug } = req.params;
    
    PortfolioModel.getPortfolioBySlug(slug, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error del servidor' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Portfolio no encontrado' });
      }
      res.json(results[0]);
    });
  }
};

module.exports = portfolioController;