import React, { useState } from 'react'
import Logo from '../components/Logo';
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdVpnKey } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    
    const navigate = useNavigate()

    const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContext)

    const [state, setState] = useState('Log In');

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onSubmitHandeler = async (e) => {
      try {
        e.preventDefault();

        axios.defaults.withCredentials = true

        if(state === 'Sign Up'){
         const {data} =  await axios.post(backendUrl + '/api/auth/register', {name, email , password})
           if(data.success){
             setIsLoggedin(true)
             getUserData()
             navigate('/')
           }else{
             toast.error(data.message)
           }
        }else{
          const {data} =  await axios.post(backendUrl + '/api/auth/login', {email , password})
          if(data.success){
            setIsLoggedin(true)
            getUserData()
            navigate('/')
          }else{
            toast.error(data.message)
          }
        }
      } catch (error) {
        toast.error(data.message)
      }
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0'>
       <div onClick={()=> navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'>
       <Logo/>
       </div>

        <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300  text-sm'>

            <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'Sign Up' ? 'Sign Up' : 'Log In'}</h2>

            <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account'}</p>

            <form onSubmit={onSubmitHandeler}>
                {state === 'Sign Up' && (
                  <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-800'>
                  <FaUser/>
                  <input onChange={e =>setName(e.target.value)} value={name}
                   className='bg-transparent outline-none' type="text" placeholder='Full Name' required/>
                </div>
                )}
                

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-800'>
                  <IoMdMail/>
                  <input onChange={e =>setEmail(e.target.value)} value={email}
                   className='bg-transparent outline-none' type="email" placeholder='Email' required/>
                </div>

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-800'>
                  <MdVpnKey/>
                  <input onChange={e =>setPassword(e.target.value)} value={password}
                   className='bg-transparent outline-none' type="password" placeholder='Password' required/>
                </div>

                <p onClick={()=>navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot password?</p>

                <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900'>{state}</button>
            </form>

            {state === 'Sign Up' ? (
              <p className='text-gray-100 text-center text-sm mt-4'>Already have an account?{' '}
            <span onClick={()=> setState('Log In')} className='text-blue-400 cursor-pointer underline'>Login here</span>
            </p>
            ) : (
              <p className='text-gray-100 text-center text-sm mt-4'>Don't have an account?{' '}
            <span onClick={()=> setState('Sign Up')}  className='text-blue-400 cursor-pointer underline'>Sign Up</span>
            </p>
            )}


            
        </div>
    </div>
  )
}

export default Login