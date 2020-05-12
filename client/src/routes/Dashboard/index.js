import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaBoxes, FaBoxOpen, FaUsers, FaAlignCenter } from 'react-icons/fa';
import { GiStorkDelivery } from 'react-icons/gi';
import styles from './Dashboard.module.css';
import Table from '../../components/Table';
import SidebarItem from '../../components/SidebarItem';
import CategoryForm from '../../components/CategoryForm';
import { fetchCategories } from '../../ducks/dashboard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { section } = useParams();
  const dashboard = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (section === 'categories') {
      dispatch(fetchCategories());
    }
  }, [section]);

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
            <SidebarItem path='/dashboard' exact>
              <FaAlignCenter className={styles.sidebar__icon} />
              <span>Main</span>
            </SidebarItem>
            <SidebarItem path='/dashboard/categories'>
              <FaBoxes className={styles.sidebar__icon} />
              <span>Categories</span>
            </SidebarItem>
            <SidebarItem path='/dashboard/products'>
              <FaBoxOpen className={styles.sidebar__icon} />
              <span>Products</span>
            </SidebarItem>
            <SidebarItem path='/dashboard/users'>
              <FaUsers className={styles.sidebar__icon} />
              <span>Users</span>
            </SidebarItem>
            <SidebarItem path='/dashboard/orders'>
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
            <SidebarItem path='/dashboard' exact>
              <FaAlignCenter className={styles.sidebar__icon} />
            </SidebarItem>
            <SidebarItem path='/dashboard/categories'>
              <FaBoxes className={styles.sidebar__icon} />
            </SidebarItem>
            <SidebarItem path='/dashboard/products'>
              <FaBoxOpen className={styles.sidebar__icon} />
            </SidebarItem>
            <SidebarItem path='/dashboard/users'>
              <FaUsers className={styles.sidebar__icon} />
            </SidebarItem>
            <SidebarItem path='/dashboard/orders'>
              <GiStorkDelivery className={styles.sidebar__icon} />
            </SidebarItem>
          </div>
        )}
      </aside>
      <main className={styles.dashboard__main}>
        {section ? (
          <>
            <nav className={styles.main__nav}>
              <NavLink
                exact
                to={`/dashboard/${section}`}
                className={styles.nav__link}
                activeClassName={styles.active__link}
              >
                Table
              </NavLink>
              <NavLink
                exact
                to={`/dashboard/${section}/new`}
                className={styles.nav__link}
                activeClassName={styles.active__link}
              >
                Add New
              </NavLink>
            </nav>
            <div className={styles.content}>
              <Route
                exact
                path='/dashboard/categories/new'
                component={CategoryForm}
              />
              {dashboard[section].items && dashboard[section].items.length > 0 && (
                <Route exact path='/dashboard/:section'>
                  <Table
                    header={Object.keys(dashboard[section].items[0])}
                    data={dashboard[section].items}
                  />
                </Route>
              )}
            </div>
          </>
        ) : (
          <p>Main</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
