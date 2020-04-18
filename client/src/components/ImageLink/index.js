import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ImageLink.module.css';

const ImageLink = ({ path, src, alt, buttonLabel }) => {
  return (
    <Link to={path} className={styles.image__link}>
      <img src={src} alt={alt} className={styles.image} />
      {buttonLabel && (
        <span className={styles.image__button}>{buttonLabel}</span>
      )}
    </Link>
  );
};

ImageLink.propTypes = {
  path: PropTypes.string.isRequired,
  src: PropTypes.node.isRequired,
  alt: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
};

export default ImageLink;
