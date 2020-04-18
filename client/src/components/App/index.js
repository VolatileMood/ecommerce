import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import Layout from '../Layout';
import Home from '../../routes/Home';

const App = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
