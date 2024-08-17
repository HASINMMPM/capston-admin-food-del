import React from 'react'
import logo from "/Logo.png";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-secondary max-w-screen-2xl divide-x divide-primary  container mx-auto'>
        <div className="flex flex-row justify-between items-center pr-4">
          <Link to="/">
            <img src={logo} alt="logo"  className='w-16 md:w-32 h-16 md:h-32'/>
          </Link>
            <p className='text-lg md:text-2xl font-bold text-primary font-heading'>Admin Panel</p>
            <button className='text-lg md:text-xl rounded-md   text-white hover:text-black duration-500 bg-primary hover:bg-transparent py-2 px-4 hover:border-primary border-0 hover:border-2'>Signup</button>
        </div>
    </header>
  )
}

export default Header