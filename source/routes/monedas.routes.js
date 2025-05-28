const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify.token');

const monedaController = require('../controllers/monedas.controller');
const criptoController = require('../controllers/criptomoneda.controller');

// Monedas
router.get('/moneda', verifyToken, monedaController.getAllMonedas);
router.post('/moneda', verifyToken, monedaController.createMoneda);

// Criptomonedas
router.get('/criptomoneda', verifyToken, criptoController.getAllCriptos);
router.post('/criptomoneda', verifyToken, criptoController.createCripto);
router.put('/criptomoneda/:id', verifyToken, criptoController.updateCripto);

module.exports = router;
