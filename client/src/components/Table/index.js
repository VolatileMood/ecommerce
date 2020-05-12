import React from 'react';
import PropTypes from 'prop-types';
import { MdDelete, MdUpdate } from 'react-icons/md';
import styles from './Table.module.css';

const Table = ({ data }) => {
  const tableHeader = Object.keys(data[0]);

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            {tableHeader.map((header) => (
              <th>{header}</th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {Object.values(row).map((value) => (
                <td>{value}</td>
              ))}
              <td>
                <button>
                  <MdUpdate className={styles.icon} />
                </button>
              </td>
              <td>
                <button>
                  <MdDelete className={styles.icon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Table;
