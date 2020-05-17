import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './App.module.css';
import Layout from '../Layout';
import Home from '../../routes/Home';
import Shop from '../../routes/Shop';
import Dashboard from '../../routes/Dashboard';
import RegisterModal from '../RegisterModal';
import LoginModal from '../LoginModal';
import refreshToken from '../../utilities/refreshToken';
import ProtectedRoute from '../ProtectedRoute';
import { loadUser } from '../../ducks/user';

const App = () => {
  const dispatch = useDispatch();

  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  useEffect(() => {
    const initSession = async () => {
      // Check if we have access token.
      const accessToken = localStorage.getItem('act');
      if (accessToken) {
        // Decode the access token.
        const { exp } = jwtDecode(accessToken);
        // If the access token is expired, go fetch a new one.
        if (Date.now() > exp * 1000) {
          await refreshToken();
        } else {
          setTimeout(refreshToken, exp * 1000 - Date.now());
        }
        dispatch(loadUser());
      }
    };
    initSession();
  }, []);

  const openRegister = () => setRegisterIsOpen(true);
  const closeRegister = () => setRegisterIsOpen(false);
  const openLogin = () => setLoginIsOpen(true);
  const closeLogin = () => setLoginIsOpen(false);

  return (
    <div className={styles.app}>
      <RegisterModal isOpen={registerIsOpen} close={closeRegister} />
      <LoginModal isOpen={loginIsOpen} close={closeLogin} />
      <BrowserRouter>
        <Layout openRegister={openRegister} openLogin={openLogin}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/shop' component={Shop} />
            <Route path='/dashboard/:section?' component={Dashboard} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
