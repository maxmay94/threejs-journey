import { useState, useEffect, useRef } from 'react'

export default function Clicker({ keyName, color, increment }) {
  const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))
  const buttonRef = useRef()

  useEffect(() => {

    buttonRef.current.style.backgroundColor = 'papayawhip'
    buttonRef.current.style.color = 'salmon'
    
    return () => {
      localStorage.removeItem(keyName)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(keyName, count)
  }, [count])

  const buttonClick = () => {
    increment()
    setCount(value => value + 1)
  }

  return (
    <div style={{color: color}}>
      <br />
      Clicker Count is at { count }
      <br />
      <button ref={buttonRef} onClick={ buttonClick }>Click me</button>
      <br />
      <button onClick={() => setCount(0)}>Clear Clicks</button>
    </div>
  )
}