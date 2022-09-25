import React from 'react';
import styles from './ContactsList.module.css';

const ContactsList = ({ contacts, onDeleteContact }) => (
  <>
    <div className={styles.containerList}>
      <ul className={styles.list}>
        {contacts.map(({ id, number, name }) => (
          <li className={styles.item} key={id}>
            <div className={styles.textContainer}>
              <p className={styles.text}>{name}:</p>
              <p className={styles.number}>{number}</p>
              <button
                className={styles.removeBtn}
                onClick={() => onDeleteContact(id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default ContactsList;
