import { useState } from 'react'
import Clicker from './Clicker.jsx'

export default function App({ children }) {
  const [hasClicker, setHasClicker] = useState(true)

  return (
    <>
      { children }
      <h1>My Neat Application</h1>
      <button onClick={() => setHasClicker(!hasClicker)}>{hasClicker ? 'Hide' : 'Show'} Clicker</button>
      { 
        hasClicker && 
          <div>
            <Clicker keyName='countA' color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` }/> 
            <Clicker keyName='countB' color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` }/> 
            <Clicker keyName='countC' color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` }/> 
          </div>
      }
    </>
  )
}