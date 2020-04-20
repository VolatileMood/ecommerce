import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './LoginModal.module.css';
import Modal from '../Modal';
import Input from '../Input';
import useForm from '../../hooks/useForm';
import validations from '../../utilities/validations';
import Button from '../Button';
import yellowTracksuit from '../../media/images/yellowTracksuit.jpeg';
import { login } from '../../ducks/user';

const LoginModal = ({ isOpen, close }) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    (data, clearForm, closeModal, setFormErrors) =>
      dispatch(login(data, clearForm, closeModal, setFormErrors)),
    initialValues,
    validations.login,
    close
  );

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.login}>
        <img src={yellowTracksuit} className={styles.login__image} />
        <div className={styles.login__main}>
          <h1>Sign In</h1>
          <form className={styles.login__form} onSubmit={handleSubmit}>
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
            <Button type='submit' background='var(--blue)' color='white'>
              Log In
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
