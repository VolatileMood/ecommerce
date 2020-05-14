import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from './CategoryForm.module.css';
import Input from '../Input';
import Button from '../Button';

const CategoryForm = ({ title, callback, validation }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formError = validation({ name });
    if (Object.keys(formError).length > 0) {
      return setError(formError);
    }
    dispatch(callback({ name }, setError, history));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.category__form}>
      <span className={styles.form__title}>{title}</span>
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
