import { useState, useEffect } from 'react'
import noteService from './services/notes'
import './AppStyle.css'
// import { useState } from 'react'


const App = () => {
  const [notes, setNotes] = useState([])
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [selectAlert, setSelectAlert] = useState()
  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
        console.log(response.data)
      })
  }, [])

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

  const toggleError = (currentError, goodOrBad) => {
    setErrorMessage(
      currentError
     )
    setSelectAlert(
      goodOrBad
    )
     setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const giveName = (event) => {
    event.preventDefault()
      //person.some tarkistaa, että matchaakö jokin ja jos joo niin se palauttaa true arvon ja console.logaa nocando
    if(persons.some((person) => person.name === newName)) {
      toggleError("Name is already on the list", false)
    } else {
      const newPerson = { name: newName }
      const newPhone = { number: newNumber }
      const bigObject = {...newPerson, ...newPhone}

      noteService
      .create(bigObject)
        .then(response => {
          setNotes(notes.concat(response.data))
        })
        toggleError("Added name to the list, please refresh", true)
      console.log(newName)
      console.log(newNumber)
      console.log(persons)
    }
  }
    //filter hyvä ominaisuus muistaa! (oma muistiinpano)
    const filterPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase()));

    const removePerson = (id) => {
      if(window.confirm("Are you sure?")){
        noteService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        toggleError("Successfully removed person", true )
      }
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} whichAlert={selectAlert} />
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
        <NameList filterPersons={filterPersons}
        removePerson={removePerson}/>
      </ul>
    </div>
  )  
}


const NameList = (props) => {
  return (
    <div>
      {props.filterPersons.map((person, index) => (
        <li key={index}>{person.name} - {person.number}
         <button onClick={() => props.removePerson(person.id)}>Delete</button>
        </li>        
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
      onChange={props.onSearchChange}/>
    </div>
  )
}

const Notification = ({ message, whichAlert }) => {
  if (message === null) {
    return null
  }
  if(whichAlert === true) {
    return (
      <div className="noError">
        Successfully {message}
      </div>
    )
  } else if (whichAlert === false) {
    return (
      <div className="error">
        error: {message}
      </div>
    )
  }
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
export default App
