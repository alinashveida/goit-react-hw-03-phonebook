import { ContactsList, ContactItem, DeleteButton } from './ContactsList.styled'
import { AiOutlineUser } from 'react-icons/ai'
import { FiX } from 'react-icons/fi'

export default function ContactsListSection({ contacts, onDeleteContact }) {
  return (
    <ContactsList>
      {contacts.map((contact) => (
        <ContactItem key={contact.id}>
          <AiOutlineUser /> {contact.name}: {contact.number}
          <DeleteButton onClick={() => onDeleteContact(contact.id)}>
            <FiX></FiX>
          </DeleteButton>
        </ContactItem>
      ))}
    </ContactsList>
  )
}
