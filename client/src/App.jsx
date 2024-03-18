import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Main from './components/Main'
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import { useEffect, useState } from 'react'


function App() {
  const [token,setToken] = useState(null);
  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[token])
  console.log("APP.JSX",token)
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='login' element={<Login/>}></Route>
      {token?
      <Route path='/' element={<Main/>}/>:
      <Route path='login' element={<Login/>}></Route>
      }
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
