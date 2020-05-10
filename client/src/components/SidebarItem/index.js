import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './SidebarItem.module.css';

const SidebarItem = ({ path, children }) => {
  return (
    <NavLink
      to={path}
      className={styles.sidebar__item}
      activeClassName={styles.item_active}
    >
      {children}
    </NavLink>
  );
};

SidebarItem.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SidebarItem;
