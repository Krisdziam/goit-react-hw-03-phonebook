import React from 'react';
import styles from './Filter.module.css';

const Filter = ({ filter, filterState }) => {
  return (
    <>
      <label className={styles.label}>
        Find contacts by name: <br />
        <input
          className={styles.input}
          placeholder="Enter name"
          onChange={filterState}
          name="filter"
          type="text"
          value={filter}
        />
      </label>
    </>
  );
};

export default Filter;
