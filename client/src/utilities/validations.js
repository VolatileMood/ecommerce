import validator from 'validator';

const isString = (data) => typeof data === 'string' && data.length > 0;

const schemas = {
  register: (data) => {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'confirmPassword',
    ];
    const errors = {};
    // Check whether the values are strings.
    requiredFields.forEach((field) => {
      if (!isString(data[field])) {
        data[field] = '';
      }
    });
    if (!validator.isAlpha(data.firstName, 'de-DE')) {
      errors.firstName = 'Please enter valid first name.';
    }
    if (validator.isEmpty(data.firstName)) {
      errors.firstName = 'First Name is required.';
    }
    if (!validator.isAlpha(data.lastName, 'de-DE')) {
      errors.lastName = 'Please enter valid last name.';
    }
    if (validator.isEmpty(data.lastName)) {
      errors.lastName = 'Last Name is required.';
    }
    if (!validator.isEmail(data.email)) {
      errors.email = 'Please enter valid E-mail.';
    }
    if (validator.isEmpty(data.email)) {
      errors.email = 'E-mail is required.';
    }
    if (!validator.isLength(data.password, { min: 6 })) {
      errors.password = 'Password requires minimum 6 characters.';
    }
    if (validator.isEmpty(data.password)) {
      errors.password = 'Password is required.';
    }
    if (!validator.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = 'Confirm Password must match Password.';
    }
    if (validator.isEmpty(data.confirmPassword)) {
      errors.confirmPassword = 'Confirm Password is required.';
    }

    return errors;
  },
};

export default schemas;
