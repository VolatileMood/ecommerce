import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoryForm.module.css';
import Input from '../Input';
import Button from '../Button';

const CategoryForm = ({ value, handleChange, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.category__form}>
      <Input
        type='text'
        value={value}
        onChange={handleChange}
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

CategoryForm.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
};

export default CategoryForm;
