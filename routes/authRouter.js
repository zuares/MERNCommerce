
const router = require('express').Router();
const auth = require('../middleware/auth');

// Controlller
const AuthController = require('../controller/AuthController')

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/refresh_token', AuthController.refreshToken);
router.get('/info', auth, AuthController.getUser);

module.exports = router;