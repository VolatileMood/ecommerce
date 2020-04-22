import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiBalloonDog } from 'react-icons/gi';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import styles from './Header.module.css';
import Button from '../Button';
import { logout } from '../../ducks/user';

const Header = ({ openRegister, openLogin }) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isFetching = useSelector((state) => state.user.isFetching);

  let nav;

  if (isAuthenticated) {
    nav = (
      <ul className={styles.header__nav}>
        <li>
          <FaShoppingCart />
        </li>
        <li>
          <FaUserAlt />
        </li>
        <li>
          <Button
            background='var(--blue)'
            color='white'
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </li>
      </ul>
    );
  } else {
    nav = (
      <ul className={styles.header__nav}>
        <li>
          <Button background='var(--blue)' color='white' onClick={openRegister}>
            Register
          </Button>
        </li>
        <li>
          <Button background='var(--blue)' color='white' onClick={openLogin}>
            Log In
          </Button>
        </li>
      </ul>
    );
  }

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.header__logo}>
        <GiBalloonDog className={styles.header__logo__icon} />
        Kaito
      </Link>
      {isFetching ? <span>Placeholder</span> : nav}
    </header>
  );
};

export default Header;
