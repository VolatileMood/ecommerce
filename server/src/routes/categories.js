const { Router } = require('express');
const categories = require('../controllers/categories');
const protect = require('../middlewares/protect');

const router = Router();

router.route('/').post(categories.create).get(categories.readAll);

router
  .route('/:category_id')
  .get(categories.readOne)
  .put(categories.update)
  .delete(categories.delete);

module.exports = router;
