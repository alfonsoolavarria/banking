const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');


router.post('/auth/login', userController.loginUser); //iniciar sesion.

router.post('/auth/register', userController.createUser); //crear usuarios.


module.exports = router;