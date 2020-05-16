import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './CreateCategory.module.css';
import CategoryForm from '../../components/CategoryForm';
import useForm from '../../hooks/useForm';
import { createCategory } from '../../ducks/dashboard';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    name: '',
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    (values, clear, close, setErrors) =>
      dispatch(createCategory(values, clear, close, setErrors)),
    initialValues,
    () => history.push('/dashboard/categories')
  );

  return (
    <div>
      <CategoryForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={values.name}
        error={errors}
      />
    </div>
  );
};

CreateCategory.propTypes = {};

export default CreateCategory;
