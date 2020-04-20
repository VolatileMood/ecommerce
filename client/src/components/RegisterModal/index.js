import React from 'react';
import styles from './RegisterModal.module.css';
import Modal from '../Modal';
import Input from '../Input';
import useForm from '../../hooks/useForm';
import validations from '../../utilities/validations';
import Button from '../Button';
import { register } from '../../ducks/user';

const RegisterModal = ({ isOpen, close }) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    register,
    initialValues,
    validations.register
  );

  return (
    <Modal isOpen={isOpen} close={close}>
      <form className={styles.register__form} onSubmit={handleSubmit}>
        <Input
          type='text'
          label='First Name'
          name='firstName'
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Input
          type='text'
          label='Last Name'
          name='lastName'
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Input
          type='text'
          label='E-mail'
          name='email'
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          type='password'
          label='Password'
          name='password'
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          type='password'
          label='Confirm Password'
          name='confirmPassword'
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <Button type='submit'>Register</Button>
      </form>
    </Modal>
  );
};

export default RegisterModal;
