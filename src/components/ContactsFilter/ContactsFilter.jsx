import PropTypes from 'prop-types';

export const ContactsFilter = ({ value, onSearchContact }) => {
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        required
        value={value}
        onChange={onSearchContact}
      />
    </div>
  );
};

ContactsFilter.propTypes = {
  value: PropTypes.string,
  onSearchContact: PropTypes.func,
};
