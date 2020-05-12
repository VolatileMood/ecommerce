import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './CategoryForm.module.css';
import Input from '../Input';
import Button from '../Button';
import validations from '../../utilities/validations';
import { createCategory } from '../../ducks/dashboard';

const CategoryForm = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formError = validations.createCategory({ name });
    if (Object.keys(formError).length > 0) {
      return setError(formError);
    }
    dispatch(createCategory({ name }, setError));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.category__form}>
      <Input
        type='text'
        value={name}
        onChange={(event) => setName(event.target.value)}
        name='name'
        label='Name'
        error={error.name}
      />
      <Button type='submit' color='white' background='var(--blue)'>
        Submit
      </Button>
    </form>
  );
};

CategoryForm.propTypes = {};

export default CategoryForm;
