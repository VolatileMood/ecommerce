import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiBalloonDog, GiShop } from 'react-icons/gi';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
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
          <Link to='/cart' className={styles.header__link}>
            <FaShoppingCart className={styles.header__link} />
            <span className={styles.link__text}>Cart</span>
          </Link>
        </li>
        <li>
          <Link to='/user' className={styles.header__link}>
            <FaUserAlt />
            <span className={styles.link__text}>User</span>
          </Link>
        </li>
        <li>
          <Link to='/dashboard' className={styles.header__link}>
            <MdDashboard />
            <span className={styles.link__text}>Dashboard</span>
          </Link>
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
      <div className={styles.header__left}>
        <Link to='/' className={styles.header__logo}>
          <GiBalloonDog className={styles.header__logo__icon} />
          Kaito
        </Link>
        <Link to='/shop' className={styles.header__link}>
          <GiShop />
          <span className={styles.link__text}>Shop</span>
        </Link>
      </div>
      {isFetching ? <span>Placeholder</span> : nav}
    </header>
  );
};

export default Header;
