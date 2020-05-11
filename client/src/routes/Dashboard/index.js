import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './Dashboard.module.css';
import Table from '../../components/Table';
import SidebarItem from '../../components/SidebarItem';
import { FaBoxes, FaBoxOpen, FaUsers, FaAlignCenter } from 'react-icons/fa';
import { GiStorkDelivery } from 'react-icons/gi';

const Dashboard = ({ match }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const minimizeSidebar = () => setSidebarOpen(false);

  const expandSidebar = () => setSidebarOpen(true);

  return (
    <div className={styles.dashboard}>
      <aside
        className={`${styles.dashboard__sidebar} ${
          !sidebarOpen && styles.sidebar_minimized
        }`}
      >
        {sidebarOpen ? (
          <div className={styles.sidebar__inner}>
            <IoIosArrowBack
              className={styles.sidebar__icon}
              onClick={minimizeSidebar}
            />
            <SidebarItem path={`${match.url}`} exact>
              <FaAlignCenter className={styles.sidebar__icon} />
              <span>Main</span>
            </SidebarItem>
            <SidebarItem path={`${match.url}/categories`}>
              <FaBoxes className={styles.sidebar__icon} />
              <span>Categories</span>
            </SidebarItem>
            <SidebarItem path={`${match.url}/products`}>
              <FaBoxOpen className={styles.sidebar__icon} />
              <span>Products</span>
            </SidebarItem>
            <SidebarItem path={`${match.url}/users`}>
              <FaUsers className={styles.sidebar__icon} />
              <span>Users</span>
            </SidebarItem>
            <SidebarItem path={`${match.url}/orders`}>
              <GiStorkDelivery className={styles.sidebar__icon} />
              <span>Orders</span>
            </SidebarItem>
          </div>
        ) : (
          <div className={styles.sidebar__inner}>
            <IoIosArrowForward
              className={styles.sidebar__icon}
              onClick={expandSidebar}
            />
            <SidebarItem path={`${match.url}`} exact>
              <FaAlignCenter className={styles.sidebar__icon} />
            </SidebarItem>
            <SidebarItem path={`${match.url}/categories`}>
              <FaBoxes className={styles.sidebar__icon} />
            </SidebarItem>
            <SidebarItem path={`${match.url}/products`}>
              <FaBoxOpen className={styles.sidebar__icon} />
            </SidebarItem>
            <SidebarItem path={`${match.url}/users`}>
              <FaUsers className={styles.sidebar__icon} />
            </SidebarItem>
            <SidebarItem path={`${match.url}/orders`}>
              <GiStorkDelivery className={styles.sidebar__icon} />
            </SidebarItem>
          </div>
        )}
      </aside>
      <main className={styles.dashboard__main}>
        <p>Main</p>
        <Table />
      </main>
    </div>
  );
};

export default Dashboard;
