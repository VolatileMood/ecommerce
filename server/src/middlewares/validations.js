const Joi = require('@hapi/joi');

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
  const { error } = schema.validate(req[props], { abortEarly: false });
  if (!error) {
    return next();
  }
  next(error);
};
