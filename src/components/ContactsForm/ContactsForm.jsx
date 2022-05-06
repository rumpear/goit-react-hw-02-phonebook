import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { Form, Title, Input, Button } from './ContactsForm.styled';

const INITIAL_VALUES = {
  name: '',
  number: '',
};

export class ContactsForm extends PureComponent {
  state = { ...INITIAL_VALUES };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmitForm = e => {
    const { checkDuplicateName, resetForm, state } = this;
    const { onAddContact } = this.props;

    e.preventDefault();

    const findDuplicate = checkDuplicateName();
    if (findDuplicate) {
      resetForm();
      return;
    }

    onAddContact && onAddContact(state);
    resetForm();
  };

  checkDuplicateName = () => {
    const { contacts } = this.props;
    const findDuplicate = contacts.find(({ name }) => name === this.state.name);
    if (findDuplicate) alert('findDuplicate');
    return findDuplicate;
  };

  resetForm = () => {
    this.setState({ ...INITIAL_VALUES });
  };

  render() {
    const { handleInputChange, handleSubmitForm } = this;
    const { name, number } = this.state;

    return (
      <Form onSubmit={handleSubmitForm}>
        <Title>Name</Title>
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInputChange}
        />
        <Title>Number</Title>
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
        />
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

ContactsForm.propTypes = {
  handleSubmitForm: PropTypes.func,
  handleInputChange: PropTypes.func,
  name: PropTypes.string,
  number: PropTypes.string,
};
