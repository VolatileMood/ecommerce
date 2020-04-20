import React from 'react';
import styles from './RegisterModal.module.css';
import Modal from '../Modal';

const RegisterModal = ({ isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <span>RegisterModal</span>
    </Modal>
  );
};

export default RegisterModal;
