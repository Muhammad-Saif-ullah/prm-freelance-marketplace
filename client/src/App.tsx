import { useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState<string>('Click the button to check API status.')

  const checkAPIStatus = async () => {
    try {
      const response = await fetch('http://localhost:3000')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setStatus(`API Status: ${data.message}`)
    } catch (error) {
      setStatus('Error connecting to API')
    }
  }

  return (
    <>
      <h1>Welcome to the App</h1>
      <button type="button" onClick={checkAPIStatus}>Check API Status</button>
      <h2>API Status</h2>
      <p>{status}</p>
    </>
  )
}

export default App
