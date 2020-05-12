import React from 'react';
import PropTypes from 'prop-types';
import { MdDelete, MdUpdate } from 'react-icons/md';
import styles from './Table.module.css';

const Table = ({ header, data }) => {
  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            {header.map((head) => (
              <th key={head}>{head}</th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
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
  header: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default Table;
