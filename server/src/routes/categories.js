const { Router } = require('express');
const categories = require('../controllers/categories');
const protect = require('../middlewares/protect');

const router = Router();

router.route('/').post(protect, categories.create).get(categories.readAll);

router
  .route('/:category_id')
  .get(categories.readOne)
  .put(protect, categories.update)
  .delete(protect, categories.delete);

module.exports = router;
