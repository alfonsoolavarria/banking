const express = require('express');
const router = express.Router();

const monedasRoutes = require('./monedas.routes');
const userRoutes = require('./user.routes');

router.use('/user', userRoutes); //CRUD de user
router.use('/coin', monedasRoutes); //CRUD de monedas

module.exports = router;