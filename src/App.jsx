import { useState, useEffect } from 'react'
import axios from 'axios'
// import { useState } from 'react'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { 
  //     name: 'Arto Hellas',
  //     number: "040 40404044"
  //   },
  //   {
  //     name: 'Ada Lovelace', 
  //     number: '39-44-5323523' 
  //   },
  //   { 
  //     name: 'Dan Abramov', 
  //     number: '12-43-234345' 
  //   },
  //   { 
  //     name: 'Mary Poppendieck', 
  //     number: '39-23-6423122' 
  //   }
  // ]) 
  const [notes, setNotes] = useState([])
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

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
      // setPersons ([...persons, bigObject])
      axios
      .post('http://localhost:3001/persons', bigObject)
      .then(response => {
        console.log(response)
      })
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
        <NameNumber
            newName={newName}
            newNumber={newNumber}
            handleInputChange={handleInputChange}
            handleNumberInputChange={handleNumberInputChange}
          />
        </div>
        <div>
          <button type="submit" onClick={giveName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <Filter filterPersons={filterPersons}
        onSearchChange={handleSearchInputChange}/>
        <NameList filterPersons={filterPersons}/>
      </ul>
    </div>
  )
  
}
const NameList = (props) => {
  return (
    <div>
      {props.filterPersons.map((person, index) => (
        <li key={index}>{person.name} - {person.number}</li>
      ))}
    </div>
  )
}

const Filter = (props) => {
  return(
    <div>
      <input 
    placeholder='Filter'
    type="text"
    onChange={props.onSearchChange}
    />

      
    </div>
  )
}

const NameNumber = (props) => {
  return (
    <div>
       <input 
          placeholder='name'
          type="text"
          value={props.newName}
          onChange={props.handleInputChange}/>

          <input 
          placeholder='number'
          type="text"
          value={props.newNumber}
          onChange={props.handleNumberInputChange}/>
    </div>
  )
}
export default App;
