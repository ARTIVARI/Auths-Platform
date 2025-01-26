import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Header = () => {

   const {userData} = useContext(AppContext)

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center'>
        <img src='/Hero.png' className='w-52 h-52 rounded-full sm:mb-6 mb-1'/>

        <h1 className='flex items-center gap-2 text-xl sm:text-3xl sm:font-bold font-semibold  mb-1'>Hey {userData ? userData.name : 'Developer' } !
        <img className='w-14 h-14 aspect-square' src='/hand.gif'/></h1>

        <h2 className='text-3xl sm:text-5xl font-bold mb-4'>Welcome to our App</h2>
        <p className='mb-8 max-w-md'>Let's start with a quick product tour and create some new tech</p>

        <button className='border border-gray-500 rounded-full px-8 py-3 hover:bg-gray-100 hover:text-black transition-all'>Get Started</button>
    </div>
  )
}

export default Header