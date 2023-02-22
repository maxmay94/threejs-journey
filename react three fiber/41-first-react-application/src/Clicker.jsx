import { useState, useEffect } from 'react'

export default function Clicker({ keyName, color, increment }) {
  const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))

  useEffect(() => {
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
      <button onClick={ buttonClick }>Click me</button>
      <br />
      <button onClick={() => setCount(0)}>Clear Clicks</button>
    </div>
  )
}