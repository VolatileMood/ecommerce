const db = require('../database');
const AppError = require('../utilities/appError');

exports.register = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {};

exports.logout = async (req, res, next) => {};

exports.refresh_token = async (req, res, next) => {};
