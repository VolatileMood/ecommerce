import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Layout from '../Layout';
import Home from '../../routes/Home';
import RegisterModal from '../RegisterModal';

const App = () => {
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);

  const openRegister = () => setRegisterIsOpen(true);
  const closeRegister = () => setRegisterIsOpen(false);

  return (
    <div className={styles.app}>
      <RegisterModal isOpen={registerIsOpen} close={closeRegister} />
      <BrowserRouter>
        <Layout openRegister={openRegister}>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
