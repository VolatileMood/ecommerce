import React from 'react';
import { Link } from 'react-router-dom';
import { GiBalloonDog } from 'react-icons/gi';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import styles from './Header.module.css';
import Button from '../Button';
import RegisterModal from '../RegisterModal';

const Header = ({ openRegister }) => {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.header__logo}>
        <GiBalloonDog className={styles.header__logo__icon} />
        Kaito
      </Link>
      <ul className={styles.header__nav}>
        <li>
          <FaShoppingCart />
        </li>
        <li>
          <FaUserAlt />
        </li>
        <li>
          <Button background='var(--blue)' color='white' onClick={openRegister}>
            Register
          </Button>
        </li>
        <li>
          <Button background='var(--blue)' color='white'>
            Log In
          </Button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
