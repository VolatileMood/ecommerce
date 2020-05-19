import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageList.module.css';

// Rendering individual images.
const Image = ({ image }) => {
  return (
    <div className={styles.image__container}>
      <img alt={`img - ${image.id}`} src={image.src} className={styles.image} />
    </div>
  );
};

const ImageList = ({ images }) => {
  // Render each image by calling Image component.
  const renderImage = (image) => {
    return <Image image={image} key={`${image.id}-image`} />;
  };

  // Return the list of files.
  return (
    <section className={styles.image__list}>{images.map(renderImage)}</section>
  );
};

ImageList.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageList;
