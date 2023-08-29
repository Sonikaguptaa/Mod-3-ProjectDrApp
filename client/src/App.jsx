import { useState } from 'react'
import { Routes, Route, } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (

    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />


      </Routes>


    </div>



  )
}

export default App
