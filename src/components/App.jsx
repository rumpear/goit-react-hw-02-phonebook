import { nanoid } from 'nanoid';
import styled from 'styled-components';

import { PureComponent } from 'react';

import { Container } from './Container';
import { Section } from './Section';
import { ContactsFilter } from './ContactsFilter';
import { ContactsForm } from './ContactsForm';
import { ContactsList } from './ContactsList';

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

    this.setState(({ contacts }) => ({ contacts: [contact, ...contacts] }));
  };

  handleSearchContact = e => {
    console.log(e.currentTarget.value);
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

// * styles
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: 'Poppins', 'Roboto';

  padding: 40px;
  width: 400px;
  margin: 100px auto;
  background-color: rgba(151, 151, 151, 0.1);
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.322) 0px 2px 8px 0px;
`;

const TitlePhonebook = styled.h1`
  margin-bottom: 15px;
  font-size: 35px;
`;

const TitleContacts = styled.h1`
  margin-bottom: 15px;
  font-size: 25px;
`;
