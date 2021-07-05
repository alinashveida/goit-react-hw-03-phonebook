import React, { Component } from 'react'
import { Title, SubTitle, Container } from './App.styled'
import ContactForm from '../Form/ContactForm'
import ContactsListSection from '../ContactsList/ContactsList'
import Filter from '../Filter/Filter'
import contacts from '../Data/contacts.json'
import shortid from 'shortid'
import { error } from '@pnotify/core'
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css'

export default class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  }

  forSubmitHendler = (data) => {
    const newContact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    }

    if (this.state.contacts.some((contact) => contact.name === data.name)) {
      error({
        title: 'Error',
        text: `${data.name} is already in contact`,
        autoOpen: true,
        minHeight: '16px',
        maxTextHeight: null,
        animateSpeed: 'normal',
        shadow: true,
        delay: 1500,
      })
      return
    }

    this.setState((prevState) => ({
      contacts: [newContact, ...prevState.contacts],
    }))
  }

  onChangeFilter = (event) => {
    const value = event.target.value
    this.setState({
      [event.target.name]: value,
    })
  }

  DeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }))
  }

  getFilterContacts = () => {
    const { filter, contacts } = this.state

    const normalizedFilter = filter.toLowerCase()

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    )
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parseContacts = JSON.parse(contacts)

    if (parseContacts) {
      this.setState({ contacts: parseContacts })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {
    const filterContacts = this.getFilterContacts()

    return (
      <Container>
        <Title>Phonebook</Title>

        <ContactForm onSubmit={this.forSubmitHendler}></ContactForm>

        <SubTitle>Contacts</SubTitle>

        <Filter value={this.state.filter} onChange={this.onChangeFilter} />

        <ContactsListSection
          contacts={filterContacts}
          onDeleteContact={this.DeleteContact}
        />
      </Container>
    )
  }
}
