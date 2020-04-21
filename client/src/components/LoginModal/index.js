import React from 'react';
import { useDispatch } from 'react-redux';
import { MdClose } from 'react-icons/md';
import styles from './LoginModal.module.css';
import Modal from '../Modal';
import Input from '../Input';
import useForm from '../../hooks/useForm';
import validations from '../../utilities/validations';
import Button from '../Button';
import leaningFence from '../../media/images/leaningFence.jpg';
import { login } from '../../ducks/user';

const LoginModal = ({ isOpen, close }) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    (data, clearForm, closeModal) =>
      dispatch(login(data, clearForm, closeModal)),
    initialValues,
    validations.login,
    close
  );

  return (
    <Modal isOpen={isOpen}>
      <MdClose onClick={close} className={styles.modal__close} />
      <div className={styles.login}>
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
        <img src={leaningFence} className={styles.login__image} />
      </div>
    </Modal>
  );
};

export default LoginModal;
