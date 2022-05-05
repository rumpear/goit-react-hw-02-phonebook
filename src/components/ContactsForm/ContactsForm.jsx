import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { Button } from './ContactsForm.styled';

export class ContactsForm extends PureComponent {
  state = {
    name: '',
    number: '',
  };

  onInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onSubmitForm = e => {
    e.preventDefault();

    const findDuplicate = this.checkDuplicateName();
    if (findDuplicate) {
      this.reset();
      return;
    }

    this.props.onAddContact(this.state);
    this.reset();
  };

  checkDuplicateName = () => {
    const { contacts } = this.props;
    const findDuplicate = contacts.find(({ name }) => name === this.state.name);
    if (findDuplicate) alert('findDuplicate');
    return findDuplicate;
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { onInputChange, onSubmitForm } = this;
    const { name, number } = this.state;

    return (
      <form onSubmit={onSubmitForm}>
        <p>Name</p>
        <input
          type="text"
          name="name"
          //   pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={onInputChange}
        />
        <p>Number</p>
        <input
          type="tel"
          name="number"
          //   pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={onInputChange}
        />
        <Button type="submit">Add contact</Button>
      </form>
    );
  }
}

ContactsForm.propTypes = {
  onSubmitForm: PropTypes.func,
  name: PropTypes.string,
  onInputChange: PropTypes.func,
  number: PropTypes.string,
};
