import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ children, onClick, type, color, background }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
      style={{ background, color }}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Button;
