const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Rutas públicas para ver portfolios
router.get('/:slug', portfolioController.getPortfolioBySlug);
router.get('/:slug/personal-info', portfolioController.getPersonalInfoBySlug);

module.exports = router;