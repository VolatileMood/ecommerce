import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './Dashboard.module.css';
import Table from '../../components/Table';
import SidebarItem from '../../components/SidebarItem';
import { FaBoxes, FaBoxOpen, FaUsers } from 'react-icons/fa';
import { GiStorkDelivery } from 'react-icons/gi';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const minimizeSidebar = () => setSidebarOpen(false);

  const expandSidebar = () => setSidebarOpen(true);

  return (
    <div className={styles.dashboard}>
      <aside className={styles.dashboard__sidebar}>
        <div className={styles.sidebar__item}>
          {sidebarOpen ? (
            <IoIosArrowBack
              className={styles.sidebar__icon}
              onClick={minimizeSidebar}
            />
          ) : (
            <IoIosArrowForward
              className={styles.sidebar__icon}
              onClick={expandSidebar}
            />
          )}
        </div>
        <SidebarItem path='/'>
          <FaBoxes className={styles.sidebar__icon} /> Categories
        </SidebarItem>
        <SidebarItem path='/'>
          <FaBoxOpen className={styles.sidebar__icon} /> Products
        </SidebarItem>
        <SidebarItem path='/'>
          <FaUsers className={styles.sidebar__icon} /> Users
        </SidebarItem>
        <SidebarItem path='/'>
          <GiStorkDelivery className={styles.sidebar__icon} /> Orders
        </SidebarItem>
      </aside>
      <main className={styles.dashboard__main}>
        <p>Main</p>
        <Table />
      </main>
    </div>
  );
};

export default Dashboard;
