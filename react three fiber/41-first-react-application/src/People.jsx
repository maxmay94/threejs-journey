import { useState, useEffect } from 'react'

export default function People() {

  const[people, setPeople] = useState([])

  useEffect(() => {
    getPeople()
  }, [])

  const getPeople = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const result = await response.json()
    setPeople(result)
  } 


  return (
    <div>
      <h2>People</h2>
      <ul>
        {
          people ?
          people.map(person =>
            <li key={person.id}>{ person.name }</li>
          )
          :
          <div>LOADING DATA</div>
        }
      </ul>
    </div>
  )
}