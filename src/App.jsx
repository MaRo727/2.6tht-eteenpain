
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  const giveName = (event) => {
  event.preventDefault()
  //person.some tarkistaa, että matchaakö jokin ja jos joo niin se palauttaa true arvon ja console.logaa nocando
    if(persons.some((person) => person.name === newName)) {
      console.log("noCAndo")
    } else {
      const newPerson = { name: newName }
      setPersons ([...persons, newPerson])
      console.log(newName)
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
        </div>
        <div>
          <button type="submit" onClick={giveName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  )

}

export default App;
