import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Main from './Main'
// import { useDispatch, useSelector } from 'react-redux'
// import { signInStart,signInSuccess,signInFailure } from '../redux store/user/userSlice'
// import OAuth from '../components/OAuth'


export default function Login() {
  const [formData,setFormData] = useState({}) 
  const [userData,setUserData] = useState()
  // const dispatch = useDispatch();
  // const {loading,error} = useSelector((state)=>state.user)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit =async (e) =>{
    e.preventDefault();
    try {
      // dispatch(signInStart());
      const res = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if(data.success === false){
        console.log(data.message)
      }else{
        console.log(data)
        setUserData(data.rest)
        localStorage.setItem('token',data.token)
        navigate('/')
        
      }
      <Main data={data}/>
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div  className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
    <form className='flex flex-col gap-4 mx-auto' onSubmit={handleSubmit}>
      <input type="email" className='p-3 rounded-lg border' placeholder='email' id='email' onChange={handleChange}/>
      <input type="password" className='p-3 rounded-lg border' placeholder='password' id='password' onChange={handleChange}/>
      <button disabled={loading} className='rounded-lg p-3 uppercase bg-slate-700 text-white hover:opacity-95 disabled:opacity-80'>{loading?'loading...':'Sign In'}</button>
    
    </form>
    <div className='flex gap-2 mt-4'>
      <p>Dont have an account?</p>
      <Link to="/signup" className='text-blue-700'>Sign Up</Link>
    </div>
    {error && <p className='text-red-500'>{error}</p>}
  </div>
  )
}
