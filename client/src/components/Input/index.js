import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Input.module.css';

const Input = ({ type, value, onChange, name, label, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef();

  return (
    <div className={styles.input__container}>
      <div className={styles.input__wrapper}>
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          className={`${styles.input} ${
            type === 'password' && styles.input__password
          }`}
          placeholder=' '
          ref={inputRef}
        />
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
        {type === 'password' && (
          <button
            className={styles.password__button}
            onClick={() => {
              inputRef.current.focus();
              setShowPassword((showPassword) => !showPassword);
            }}
            type='button'
            tabIndex='-1'
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      {error && <span className={styles.input__error}>{error}</span>}
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
