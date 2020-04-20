import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Layout from '../Layout';
import Home from '../../routes/Home';
import RegisterModal from '../RegisterModal';
import LoginModal from '../LoginModal';

const App = () => {
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);

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
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
