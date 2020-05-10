const db = require('../database');
const protect = require('../middlewares/protect');
const AppError = require('../utilities/appError');

exports.create = async (req, res, next) => {
  try {
    const arr = await db('categories').insert(req.body);
  } catch (error) {
    next(error);
  }
};

exports.readAll = async (req, res, next) => {};

exports.readOne = async (req, res, next) => {};

exports.update = async (req, res, next) => {};

exports.delete = async (req, res, next) => {};
