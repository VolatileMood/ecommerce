import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';
import styles from './Modal.module.css';

const Modal = ({ isOpen, children }) =>
  isOpen
    ? createPortal(
        <div className={styles.modal__container}>
          <div className={styles.modal}>{children}</div>
          <div className={styles.modal__overlay} />
        </div>,
        document.body
      )
    : null;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
