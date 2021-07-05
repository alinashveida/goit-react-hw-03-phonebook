import { Input, Label } from './Filter.styled'
import { FaSearch } from 'react-icons/fa'

export default function Filter({ value, onChange }) {
  return (
    <Label>
      <FaSearch /> Find contacts by name
      <Input name="filter" onChange={onChange} value={value}></Input>
    </Label>
  )
}
