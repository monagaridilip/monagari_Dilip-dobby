import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import { signInStart,signInSuccess,signInFailure } from '../redux store/user/userSlice'

export default function Signup() {
  const [formData,setFormData] = useState({}) 
  const [loading,setLoading] = useState(false)
//   const dispatch = useDispatch();
  
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
    //   dispatch(signInStart())
    console.log(formData.email,formData.password)
      const res = await fetch('http://localhost:8080/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:formData.email,password:formData.password}),
      });
      const data = await res.json();
      console.log(data);
      if(data.success === false){
        console.log(data)
      }
      else{
        console.log(data)
        navigate('/signin')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div  className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
    <form className='flex flex-col gap-4 mx-auto' onSubmit={handleSubmit}>
      <input type="email" className='p-3 rounded-lg border' placeholder='email' id='email' onChange={handleChange}/>
      <input type="password" className='p-3 rounded-lg border' placeholder='password' id='password' onChange={handleChange}/>
      <button disabled={loading} className='rounded-lg p-3 uppercase bg-slate-700 text-white hover:opacity-95 disabled:opacity-80'>{loading?'loading...':'Sign Up'}</button>
  
    </form>
    <div className='flex gap-2 mt-4'>
      <p>Have an account?</p>
      <Link to="/login" className='text-blue-700'>Sign in</Link>
    </div>
    {/* {error && <p className='text-red-500'>{error}</p>} */}
  </div>
  )
}
