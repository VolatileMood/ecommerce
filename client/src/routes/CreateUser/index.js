import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styles from './CreateUser.module.css';
import Input from '../../components/Input';
import Button from '../../components/Button';

const CreateUser = () => {
  const [role, setRole] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (fn) => (event) => fn(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className={styles.create__user__form} onSubmit={handleSubmit}>
      <Select
        placeholder='Role'
        options={[
          { value: 'user', label: 'User' },
          { value: 'admin', label: 'Admin' },
        ]}
        value={role}
        onChange={setRole}
      />
      <Input
        label='First Name'
        value={firstName}
        onChange={handleChange(setFirstName)}
      />
      <Input label='Last Name' value={lastName} onChange={setLastName} />
      <Input label='E-mail' value={email} onChange={setEmail} />
      <Input label='Password' value={password} onChange={setPassword} />
      <Input
        label='Confirm Password'
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      <Button type='submit' className={styles.create__user__button}>
        Create User
      </Button>
    </form>
  );
};

CreateUser.propTypes = {};

export default CreateUser;
