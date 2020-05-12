const db = require('../database');
const AppError = require('../utilities/appError');

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log('Category Name', req.body);
    // Check whether category name is already taken.
    const categoryName = await db('categories').select().where({ name });
    if (categoryName.length > 0) {
      return res.json({
        status: 'error',
        message: {
          name: 'Category Name is already taken',
        },
      });
    }
    // Create new category.
    const data = await db('categories').insert(req.body).returning('*');
    res.status(201).json({
      status: 'success',
      data: {
        category: data[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.readAll = async (_req, res, next) => {
  try {
    const data = await db('categories').select();
    res.status(200).json({
      status: 'success',
      data: {
        categories: data,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.readOne = async (req, res, next) => {};

exports.update = async (req, res, next) => {};

exports.delete = async (req, res, next) => {};
