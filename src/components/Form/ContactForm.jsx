import { Form, Label, Input, ButtomSubmit } from './ContactForm.styled'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiFillPhone } from 'react-icons/ai'

import React, { Component } from 'react'

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  }

  onChangeInput = (event) => {
    const value = event.target.value
    this.setState({
      [event.target.name]: value,
    })
  }

  onSubmitButton = (event) => {
    event.preventDefault()
    console.log(this.state.name)

    this.props.onSubmit(this.state)

    this.reset()
  }

  reset = () => {
    this.setState({
      name: '',
      number: '',
    })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmitButton}>
        <Label>
          <BsFillPersonFill /> Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            onChange={this.onChangeInput}
            value={this.state.name}
          />
        </Label>
        <Label>
          <AiFillPhone /> Number
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            onChange={this.onChangeInput}
            value={this.state.number}
          />
        </Label>
        <ButtomSubmit type="submit" value="Add contact">
          Add contact
        </ButtomSubmit>
      </Form>
    )
  }
}
