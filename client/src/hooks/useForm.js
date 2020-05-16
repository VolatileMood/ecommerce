import { useState } from 'react';

const useForm = (callback, initialValues = {}, close, ...rest) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const clear = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    callback(values, ...rest, clear, close, setErrors);
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
