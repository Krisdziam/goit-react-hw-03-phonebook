import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import ContactsList from './ContactsList/ContactsList';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        'savedContacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem('savedContacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  deleteContact = contactId => {
    const info = toast.info(`Contact deleted`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== contactId
      ),
    }));
    return info;
  };

  formSubmitHandler = data => {
    if (this.isDuplicate(data)) {
      // return alert(`${data.name} already exist`)
      const error = toast.error(
        `${data.name} already exist`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        }
      );
      return error;
    }
    const success = toast.success(`Contact added`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { id: nanoid(), ...data },
      ],
    }));
    return success;
  };

  filterState = e => {
    const filter = e.target.value;
    this.setState({
      filter: filter,
    });
  };
  filterContactsByName = () => {
    const { contacts, filter } = this.state;
    const normalizeContacts = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeContacts)
    );
  };

  isDuplicate({ name }) {
    const { contacts } = this.state;
    const result = contacts.find(
      contact => contact.name === name
    );
    return result;
  }

  render() {
    const filteredContacts = this.filterContactsByName();

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />
        <h2>Contacts:</h2>

        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
        <Filter
          filter={this.state.filter}
          filterState={this.filterState}
        />
        <ToastContainer />
      </div>
    );
  }
}
