import React, { Component } from 'react';
import styles from './Form.module.css';

export default class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <>
        <h2 className={styles.subtitle}>Add new contact</h2>
        <form
          className={styles.form}
          onSubmit={this.handleSubmitForm}
        >
          <div className={styles.formContainer}>
            <div>
              <label className={styles.label}>Name:</label>
              <input
                className={styles.input}
                placeholder="Enter name"
                onChange={this.handleInputChange}
                type="text"
                name="name"
                value={this.state.name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. 
                For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </div>
            <div>
              <label className={styles.label}>
                Number:
              </label>
              <input
                className={styles.input}
                placeholder="Enter number"
                onChange={this.handleInputChange}
                type="tel"
                name="number"
                value={this.state.number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, 
                parentheses and can start with +"
                required
              />
            </div>
          </div>
          <button type="submit" className={styles.addBtn}>
            Add <br /> Contact
          </button>
        </form>
      </>
    );
  }
}
