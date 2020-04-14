const { Router } = require('express');
const users = require('../controllers/users');
const { schemas, validate } = require('../middlewares/validations');

const router = Router();

router.post('/register', validate(schemas.register), users.register);
router.post('/login', validate(schemas.login), users.login);
router.get('/logout', users.logout);
router.get('/refresh_token', users.refresh_token);

module.exports = router;
