import { useState, useMemo } from 'react'
import Clicker from './Clicker.jsx'
import People from './People.jsx'


export default function App({ children, clickersCount }) {
  const [hasClicker, setHasClicker] = useState(true)
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  
  const colors = useMemo(() => {
    const colors = []
    for(let i = 0; i < clickersCount; i++) {
      colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 70%)`)
    }
    return colors
  }, [clickersCount])


  return (
    <>
      { children }

      <div> Total Count { count }</div>

      <button onClick={() => setHasClicker(!hasClicker)}>{hasClicker ? 'Hide' : 'Show'} Clicker</button>
      { 
        hasClicker && 
        <>
          { 
            [...Array(clickersCount)].map((value, index) => 
              <Clicker 
                increment={ increment } 
                keyName={`count${index}`}
                key={index} 
                color={ colors[index]}
              />
            ) 
          }
        </>        
      }
      <People />
    </>
  )
}