import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ openRegister, openLogin, children }) => {
  return (
    <>
      <Header openRegister={openRegister} openLogin={openLogin} />
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  openRegister: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
