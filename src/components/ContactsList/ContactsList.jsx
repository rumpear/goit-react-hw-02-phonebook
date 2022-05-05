import PropTypes from 'prop-types';
import { Button } from './ContactsList.styled';
import { VscClose } from 'react-icons/vsc';

export const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <div>
      <ul>
        {contacts.map(({ id, name, number }) => (
          <li key={id}>
            <p>{name}</p>
            <p>{number}</p>
            <Button
              type="button"
              onClick={() => {
                onDeleteContact(id);
              }}
            >
              <VscClose size={30} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func,
};
