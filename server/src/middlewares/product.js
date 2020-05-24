const db = require('../database');
const AppError = require('../utilities/appError');

const product = async (req, res, next) => {
  try {
    console.log('Product Middleware');
    // Get product id from url.
    const { product_id } = req.params;
    // Check whether the product with id exists.
    const productArray = await db('products').select().where('id', product_id);
    // No product found, throw an error.
    if (productArray.length === 0) {
      throw new AppError('404', 'Product with ID not found.');
    }
    // Otherwise, go next.
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = product;
