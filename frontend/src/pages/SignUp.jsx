import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {

  const [Values, setValues] = useState({
    username:"",
    email:"",
    password:"",
    address:"",
  });
  const navigate = useNavigate();
  const change = (e)=>{
    const {name,value}=e.target;
    setValues({...Values, [name]:value});
  }
  const submit = async () => {
    try {
        if (Values.username === "" || Values.password === "" || Values.email === "" || Values.address === "" ) {
            alert("All fields are required");
        } else {
            console.log("Sending data:", Values);
            const response = await axios.post("http://localhost:1000/api/v1/sign-up", Values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert(response.data.message);
            navigate("/login");
        }
    } catch (error) {
        if (error.response) {
            console.log("Error response:", error.response.data);
            alert(`Error: ${error.response.data.message}`);
        } else if (error.request) {
            console.log("Error request:", error.request);
            alert("Error: No response from server");
        } else {
            console.log("Error message:", error.message);
            alert(`Error: ${error.message}`);
        }
    }
}

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center '>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 mt-10 mb-10  '>
      <p className='mt-5 text-zinc-200 text-xl text-center'>Sign Up</p>
      <div className='mt-4'>
        <div>
          <label htmlFor='' className='text-zinc-400'>Username:</label>
          <input type="text" value={Values.username} onChange={change} className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' required name='username' placeholder='xyz123' />
        </div>
      </div>

      <div className='mt-4'>
        <div>
          <label htmlFor='' className='text-zinc-400'>Password:</label>
          <input type="password" value={Values.password} onChange={change} className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' required name='password' placeholder='********' />
        </div>
      </div>

      <div className='mt-4'>
        <div>
          <label htmlFor='' className='text-zinc-400'>Email:</label>
          <input type="email" value={Values.email} onChange={change} className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' required name='email' placeholder='xyz@gmail.com' />
        </div>
      </div>


      <div className='mt-4'>
        <div>
          <label htmlFor='' className='text-zinc-400'>Address:</label>
          <textarea name="address" value={Values.address} onChange={change} id="" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'></textarea>
        </div>
      </div>

      <div className='mt-4'>
        <div>
          <button name='signup' onClick={submit} className='w-full mt-2 bg-blue-500 p-4 rounded hover:bg-blue-700 hover:text-white'>Sign-up</button>
          <p className='mt-4 text-zinc-100 text-center text-l'>Or</p>
          <p className='mt-4 text-zinc-400 text-center mb-5'>Already have an Account ? <Link to="/login" className='mt-4 text-zinc-400 hover:text-blue-500 underline'>Login</Link> </p>
          
          
        </div>
      </div>
      
      
      </div>
    </div>
  )
}

export default SignUp