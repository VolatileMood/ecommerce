const { Router } = require('express');
const users = require('./users');
const categories = require('./categories');
const products = require('./products');

const router = Router();

router.use('/users', users);
router.use('/categories', categories);
router.use('/products', products);

module.exports = router;
