import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter></BrowserRouter>
    </div>
  );
};

export default App;
