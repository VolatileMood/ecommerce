import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.css';

const Table = (props) => {
  return (
    <table className={styles.table}>
      <tr>
        <td>Moo</td>
      </tr>
    </table>
  );
};

Table.propTypes = {};

export default Table;
