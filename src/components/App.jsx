import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, addContacts } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';
import Form from './Form/Form';
import ContactList from './Contacts/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const createContact = ({ name, number }) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`Oops! ${name} is already in contacts.`);
    } else {
      dispatch(addContacts({ name, number }));
    }
  };

  const handleFilter = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };

  const getFilteredContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDelete = id => dispatch(deleteContact(id));

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        color: '#010101',
      }}
    >
      <div className="formWrapper">
        <h1>Phonebook</h1>
        <Form createContact={createContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilter} />
        <ContactList contacts={getFilteredContact()} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default App;
