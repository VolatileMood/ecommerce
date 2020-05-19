import React from 'react';
import PropTypes from 'prop-types';
import styles from './Textarea.module.css';

const Textarea = ({ value, onChange, label, name }) => {
  return (
    <div className={styles.textarea__container}>
      <textarea
        id={label}
        className={styles.textarea}
        placeholder=' '
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={label} className={styles.textarea__label}>
        {label}
      </label>
    </div>
  );
};

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Textarea;
