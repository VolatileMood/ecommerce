import React from 'react';
import styles from './RegisterModal.module.css';
import Modal from '../Modal';
import Input from '../Input';

const RegisterModal = ({ isOpen, close }) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <span>RegisterModal</span>
      <Input type='text' label='First Name' name='firstName' />
      <Input type='text' label='Last Name' name='lastName' />
      <Input type='text' label='E-mail' name='email' />
      <Input type='password' label='Password' name='password' />
      <Input type='password' label='Confirm Password' name='confirmPassword' />
    </Modal>
  );
};

export default RegisterModal;
