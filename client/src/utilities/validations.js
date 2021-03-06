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
  login: (data) => {
    const requiredFields = ['email', 'password'];
    const errors = {};
    // Check whether the values are strings.
    requiredFields.forEach((field) => {
      if (!isString(data[field])) {
        data[field] = '';
      }
    });
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

    return errors;
  },
  category: (data) => {
    const requiredFields = ['name'];
    const errors = {};
    // Check whether the values are strings.
    requiredFields.forEach((field) => {
      if (!isString(data[field])) {
        data[field] = '';
      }
    });
    if (validator.isEmpty(data.name)) {
      errors.name = 'Name is required';
    }
    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  },
  product: (data) => {
    const requiredFields = ['category_id', 'name', 'description', 'price'];
    const errors = {};
    requiredFields.forEach((field) => {
      if (!isString(data[field])) {
        data[field] = '';
      }
    });
    if (!validator.isLength(data.name, { max: 200 })) {
      errors.name = 'Name must be less than 200 characters';
    }
    if (validator.isEmpty(data.name)) {
      errors.name = 'Name is required';
    }
    if (!validator.isLength(data.description, { max: 2000 })) {
      errors.description = 'Description must be less than 2000 characters';
    }
    if (validator.isEmpty(data.description)) {
      errors.description = 'Description is required';
    }
    if (!validator.isNumeric(data.price)) {
      errors.price = 'Price must be numeric';
    }
    if (validator.isEmpty(data.price)) {
      errors.price = 'Price is required';
    }
    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

export default schemas;
