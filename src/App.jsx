
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: "040 40404044"
    },
    {
      name: 'Ada Lovelace', 
      number: '39-44-5323523' 
    },
    { 
      name: 'Dan Abramov', 
      number: '12-43-234345' 
    },
    { 
      name: 'Mary Poppendieck', 
      number: '39-23-6423122' 
    }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setNewSearch] = useState("")
  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchInputChange = (event) => {
    setNewSearch(event.target.value)
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
    //filter hyvä ominaisuus muistaa! (oma muistiinpano)
    const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );
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
          <Search onSearchChange={handleSearchInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={giveName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filterPersons.map((person, index) => (
          <li key={index}>{person.name} - {person.number}</li>
        ))}
      </ul>
    </div>
  )

}
const Search = (props) => {




  return (
    <input 
    placeholder='Filter'
    type="text"
    onChange={props.onSearchChange}
   />
  )
}
export default App;
