const { Router } = require('express');
const products = require('../controllers/products');
const protect = require('../middlewares/protect');

const router = Router();

router.route('/').post(protect, products.create).get(products.readAll);

router
  .route('/:product_id')
  .get(products.readOne)
  .put(protect, products.update)
  .delete(protect, products.delete);

module.exports = router;
