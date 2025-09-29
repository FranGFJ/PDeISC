const express = require('express');
const router = express.Router();
const portfolioAdminController = require('../controllers/portfolioAdminController');

// Rutas de administración de portfolios
router.get('/portfolios', portfolioAdminController.getAllPortfolios);
router.get('/portfolios/:id', portfolioAdminController.getPortfolioById);
router.post('/portfolios', portfolioAdminController.createPortfolio);
router.put('/portfolios/:id', portfolioAdminController.updatePortfolio);
router.delete('/portfolios/:id', portfolioAdminController.deletePortfolio);

module.exports = router;