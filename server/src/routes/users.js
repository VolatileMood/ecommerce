const { Router } = require('express');
const users = require('../controllers/users');

const router = Router();

router.post('/register', users.register);
router.post('/login', users.login);
router.get('/logout', users.logout);
router.get('/refresh_token', users.refresh_token);

module.exports = router;
