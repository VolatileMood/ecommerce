import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './RegisterModal.module.css';
import Modal from '../Modal';
import Input from '../Input';
import useForm from '../../hooks/useForm';
import validations from '../../utilities/validations';
import Button from '../Button';
import yellowTracksuit from '../../media/images/yellowTracksuit.jpeg';
import { register } from '../../ducks/user';

const RegisterModal = ({ isOpen, close }) => {
  const dispatch = useDispatch();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    (data, clearForm, closeModal, setFormErrors) =>
      dispatch(register(data, clearForm, closeModal, setFormErrors)),
    initialValues,
    validations.register,
    close
  );

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.register}>
        <img src={yellowTracksuit} className={styles.register__image} />
        <div className={styles.register__main}>
          <h1>Sign Up</h1>
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
            <Button type='submit' background='var(--blue)' color='white'>
              Register
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
