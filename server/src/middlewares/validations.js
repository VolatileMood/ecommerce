const Joi = require('@hapi/joi');
const AppError = require('../utilities/appError');

exports.schemas = {
  register: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  }),
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.validate = (schema, props) => (req, _res, next) => {
  try {
    const { error } = schema.validate(req[props], { abortEarly: false });
    if (!error) {
      return next();
    }
    const errMessage = error.details.reduce((obj, err) => {
      obj[err.path[0]] = err.message;
      return obj;
    }, {});
    throw new AppError(422, errMessage);
  } catch (error) {
    next(error);
  }
};
