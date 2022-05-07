import { nanoid } from 'nanoid';
import { PureComponent } from 'react';

import { Container } from './Container';
import { ContactsFilter } from './ContactsFilter';
import { ContactsForm } from './ContactsForm';
import { ContactsList } from './ContactsList';
import { Wrapper, TitlePhonebook, TitleContacts } from './App.styled';

export class App extends PureComponent {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = data => {
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({ contacts: [...contacts, contact] }));
  };

  handleSearchContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  handleFilterContact = () => {
    const { contacts, filter } = this.state;
    const normalizeFilterValue = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilterValue),
    );
  };

  handleDeleteContact = todoId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== todoId),
    }));
  };

  render() {
    const {
      handleAddContact,
      handleSearchContact,
      handleFilterContact,
      handleDeleteContact,
    } = this;
    const { filter } = this.state;
    const displayedContacts = handleFilterContact();

    return (
      <Container>
        <Wrapper>
          <TitlePhonebook>Phonebook</TitlePhonebook>
          <ContactsForm
            onAddContact={handleAddContact}
            contacts={displayedContacts}
          />
          <ContactsFilter
            value={filter}
            onSearchContact={handleSearchContact}
          />
          <TitleContacts>Contacts</TitleContacts>
          <ContactsList
            contacts={displayedContacts}
            onDeleteContact={handleDeleteContact}
          />
        </Wrapper>
      </Container>
    );
  }
}
