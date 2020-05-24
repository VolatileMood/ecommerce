const { Router } = require('express');
const multer = require('multer');
const product_images = require('../controllers/product_images');
const protect = require('../middlewares/protect');
const product = require('../middlewares/product');

const upload = multer();
const router = Router();

router
  .route('/:product_id')
  .post(protect, product, upload.any(), product_images.create)
  .get(protect, product, product_images.read)
  .delete(protect, product, product_images.delete);

router.route('/:product_id').get(product_images.read);

module.exports = router;
