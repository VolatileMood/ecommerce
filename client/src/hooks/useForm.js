import { useState } from 'react';

const useForm = (callback, initialValues = {}, validate, close) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const clear = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    if (Object.keys(errors).length === 0) {
      callback(values, clear, close, setErrors);
    }
  };

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
