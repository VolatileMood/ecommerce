const db = require('../database');
const AppError = require('../utilities/appError');

exports.create = async (req, res, next) => {
  try {
    console.log('Create: ', req.body);
    const data = await db('products').insert(req.body).returning('*');
    res.status(201).json({
      status: 'success',
      data: {
        product: data[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.readAll = async (_req, res, next) => {
  try {
    const data = await db('products').select();
    res.status(200).json({
      status: 'success',
      data: {
        products: data,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.readOne = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const data = await db('products').select().where('id', product_id);
    if (data.length === 0) {
      throw new AppError(404, 'Product with ID not found.');
    }
    res.status(200).json({
      status: 'success',
      data: {
        product: data[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const data = await db('products')
      .where('id', product_id)
      .update(req.body, '*');
    res.status(200).json({
      status: 'success',
      data: {
        product: data[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    await db('products').where('id', product_id).del();
    res.status(200).json({
      status: 'success',
      message: 'Product successfully deleted.',
    });
  } catch (error) {
    next(error);
  }
};
