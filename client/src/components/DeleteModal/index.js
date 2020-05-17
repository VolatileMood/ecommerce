import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import styles from './DeleteModal.module.css';
import Modal from '../Modal';
import Button from '../Button';
import { deleteCategory } from '../../ducks/dashboard';

const DeleteModal = ({ isOpen, close, deleteId, section }) => {
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} close={close}>
      <MdClose className={styles.modal__close} onClick={close} />
      <div className={styles.delete__modal}>
        <span className={styles.text}>
          Are you sure you want to delete this?
        </span>
        <span className={styles.text}>
          In '{section}' with ID: {deleteId}
        </span>
        <div className={styles.button__container}>
          <Button color='white' background='var(--blue)' onClick={close}>
            Cancel
          </Button>
          <Button
            color='white'
            background='red'
            onClick={() => dispatch(deleteCategory(deleteId, close))}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

DeleteModal.propTypes = {};

export default DeleteModal;
