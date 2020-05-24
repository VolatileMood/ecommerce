const db = require('../database');
const streamUpload = require('../utilities/streamUpload');

exports.create = async (req, res, next) => {
  try {
    // Get product id from url.
    const { product_id } = req.params;
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
    // Get all images of the product with given id.
    const productImages = await db('product_images')
      .select()
      .where({ product_id });
    // Send response with images.
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

exports.delete = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const imageArray = await db('product_images')
      .del()
      .where(product_id)
      .returning('*');
    const deletedImage = imageArray[0];

    res.status(200).json({
      status: 'success',
      message: 'Product image successfully deleted.',
    });
  } catch (error) {
    next(error);
  }
};
