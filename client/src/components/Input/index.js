import React from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Input.module.css';

const Input = ({ type, value, onChange, name, label }) => {
  return (
    <div className={styles.input__container}>
      <input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <button className={styles.password__button}>
        <FaEye />
      </button>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
