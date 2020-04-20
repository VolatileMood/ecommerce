import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ openRegister, children }) => {
  return (
    <>
      <Header openRegister={openRegister} />
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  openRegister: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
