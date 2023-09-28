
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: "040 40404044"
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const giveName = (event) => {
  event.preventDefault()
  //person.some tarkistaa, että matchaakö jokin ja jos joo niin se palauttaa true arvon ja console.logaa nocando
    if(persons.some((person) => person.name === newName)) {
      alert("no can do")
    } else {
      const newPerson = { name: newName }
      const newPhone = { number: newNumber }
      const bigObject = {...newPerson, ...newPhone}
      setPersons ([...persons, bigObject])
      console.log(newName)
      console.log(newNumber)
      console.log(persons)
    }
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <input 
          placeholder='name'
          type="text"
          value={newName}
          onChange={handleInputChange}/>

          <input 
          placeholder='number'
          type="text"
          value={newNumber}
          onChange={handleNumberInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={giveName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name} - {person.number}</li>
        ))}
      </ul>
    </div>
  )

}

export default App;
