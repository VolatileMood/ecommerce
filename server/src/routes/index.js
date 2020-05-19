const { Router } = require('express');
const users = require('./users');
const categories = require('./categories');
const products = require('./products');
const product_images = require('./product_images');

const router = Router();

router.use('/users', users);
router.use('/categories', categories);
router.use('/products', products);
router.use('/product_images', product_images);

module.exports = router;
