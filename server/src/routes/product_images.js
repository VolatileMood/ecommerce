const { Router } = require('express');
const product_images = require('../controllers/product_images');
const protect = require('../middlewares/protect');

const router = Router();

router
  .route('/', protect)
  .post(product_images.create)
  .put(product_images.update)
  .delete(product_images.delete);

router.route('/:product_id').get(product_images.read);

module.exports = router;
