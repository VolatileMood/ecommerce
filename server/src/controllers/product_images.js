const db = require('../database');
const streamUpload = require('../utilities/streamUpload');
const AppError = require('../utilities/appError');

exports.create = async (req, res, next) => {
  try {
    // Get product id from url.
    const { product_id } = req.params;
    // Check whether product with id exists.
    const productArray = await db('products').select().where('id', product_id);
    // If no product with id found, return an error.
    if (productArray.length === 0) {
      throw new AppError(404, 'Product with ID not found.');
    }
    // Upload all image files to cloudinary.
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const { public_id, secure_url } = await streamUpload(file);
        return { product_id, public_id, image_url: secure_url };
      })
    );
    // Save all product image links to the database.
    const imageArray = await db('product_images').insert(uploadedImages, '*');
    // Send response with image links.
    res.status(201).json({
      status: 'success',
      data: {
        images: imageArray,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    // Check whether product with id exists.
    const productArray = await db('products').select().where('id', product_id);
    if (productArray.length === 0) {
      throw new AppError(404, 'Product with ID not found.');
    }
    // Get all images of the product with given id.
    const productImages = await db('product_images')
      .select()
      .where({ product_id });
    res.status(200).json({
      status: 'success',
      data: {
        productImages,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
