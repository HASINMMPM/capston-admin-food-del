import React, { useContext } from 'react'
import { Context } from './Global/ContextList';

const Footer = () => {
    const {  role,id } = useContext(Context);
  return (
    <main className='flex flex-col md:flex-row justify-between items-center fixed bottom-0 bg-primary w-full text-sm md:text-xl py-2'>
        
        <p className='text-secondary'>User ID: <span className='text-white'>{id}</span> </p>
   
      {/* Add more footer content here */}
    </main>
  )
}

export default Footer