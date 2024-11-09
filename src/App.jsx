import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DocScanner from './Components/DocScanner'
function App() {

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <DocScanner />
      </div>
    </div>
  )
}

export default App
