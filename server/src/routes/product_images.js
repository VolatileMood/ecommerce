const { Router } = require('express');
const multer = require('multer');
const product_images = require('../controllers/product_images');
const protect = require('../middlewares/protect');

const upload = multer();
const router = Router();

router
  .route('/:product_id', protect)
  .post(upload.any(), product_images.create)
  .put(product_images.update)
  .delete(product_images.delete);

router.route('/:product_id').get(product_images.read);

module.exports = router;
