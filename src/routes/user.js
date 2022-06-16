const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/registration', userController.registration);
router.post('/create', userController.create);
router.get('/login', userController.login);
router.post('/check-login', userController.checkLogin);
router.get('/logout', userController.logout);

module.exports = router;









