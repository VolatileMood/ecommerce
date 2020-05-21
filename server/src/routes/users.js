const cookieParser = require('cookie-parser');
const { Router } = require('express');
const users = require('../controllers/users');
const protect = require('../middlewares/protect');
const { schemas, validate } = require('../middlewares/validations');

const router = Router();

router.post('/register', validate(schemas.register, 'body'), users.register);
router.post('/login', validate(schemas.login, 'body'), users.login);
router.get('/logout', cookieParser(), users.logout);
router.get('/refresh_token', cookieParser(), users.refreshToken);
router.get('/load_user', protect, users.loadUser);
router.get('/', protect, users.readAll);
router
  .route('/:user_id', protect)
  .get(users.readOne)
  .put(users.update)
  .delete(users.delete);

module.exports = router;
