const { Router } = require('express');
const users = require('./users');
const categories = require('./categories');

const router = Router();

router.use('/users', users);
router.use('/categories', categories);

module.exports = router;
