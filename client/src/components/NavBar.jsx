import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import Login from '../pages/Login';
import Logo from './Logo';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const NavBar = () => {

    const {userData, backendUrl, setUserData , setIsLoggedin } = useContext(AppContext);
    
    const logout = async () => {
      try {
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl + '/api/auth/logout')
        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        navigate('/')

      } catch (error) {
        toast.error(error.message)
      }
    }

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }


  return (
    <div className='w-full flex flex-row items-center justify-between p-5 sm:px-20  absolute top-0'>
        <div className=' cursor-pointer'>
          <Logo/>
        </div>

        <div>
          {userData ? 
          <div  className='flex justify-center items-center text-center rounded-full p-2 w-10 h-10 text-white bg-black relative group'>{userData.name[0]}
             <div className='absolute hidden group-hover:block mt-20  text-black rounded-full bg-white w-24  text-center'>
             <ul className='list-none m-0 p-2 text-sm'>
              <li onClick={logout} className='py-1 px-2 cursor-pointer'>Log Out</li>
             </ul>
             </div>
          </div>
          

          :  <button onClick={handleLogin} className='flex items-center gap-2 border border-grey-500 rounded-full px-6 py-2  hover:bg-gray-100 hover:text-black transition-all'>Login</button>}

        </div>
       
    </div>
  )
}

export default NavBar