import { useState } from 'react'
import {Signup} from './components/Signup'
import {Signin} from './components/Signin'
import {Send} from './components/Send'
import {Dashboard} from './components/Dashboard'
import {useNavigate,BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/send" element={<Send></Send>}></Route>
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
