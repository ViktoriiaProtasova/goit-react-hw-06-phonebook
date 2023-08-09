import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from 'redux/contactsSlice';
import PropTypes from 'prop-types';

const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  const createContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`Oops! ${name} is already in contacts.`);
    } else {
      dispatch(addContacts({ name, number }));
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    createContact({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form name="contact-form" className="mb-3" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          autoFocus
          className="form-control"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={name}
        />
      </label>
      <label className="form-label">
        Number
        <input
          type="tel"
          name="number"
          className="form-control"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
          value={number}
        />
      </label>
      <button className="btn btn-outline-primary" type="submit">
        Add contact
      </button>
    </form>
  );
};

Form.propTypes = { createContact: PropTypes.func.isRequired };

export default Form;
