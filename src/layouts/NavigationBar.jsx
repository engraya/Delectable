import React, { useState } from 'react';
import DarkMode from './DarkMode/DarkMode';
import { Link } from 'react-router-dom';
import logo from '../images/food1.png'
import { RxDropdownMenu } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";




const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Trending', href: '/trending' },
    { name: 'Vegetarian', href: '/vegetarian' },
    { name: 'Cuisines', href: '/cuisines' },
  ];
  

function NavigationBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="inset-x-0 top-0 lg:px-20 sticky">
      <nav className="flex items-center z-999 p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1 justify-center items-center z-999">
          <Link to="/" className="-m-1.5 p-1.5">
          <img src={logo} alt="Logo" className='flex justify-center items-center' style={{ height: '30px', width: '30px' }} />
          </Link>
          <Link to="/" className='mt-3 dark:text-slate-100'>
            <div className="font-extrabold text-xl mx-2 dark:text-slate-100">Delectable</div>
          </Link>
          <div className="hidden lg:flex lg:gap-x-12 p-3 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href} className="text-md font-extrabold leading-6 text-gray-900 dark:text-slate-100">
              {item.name}
            </Link>
          ))}
        </div>
        </div>
        <div className='ml-4'>
        <DarkMode />
        </div>
        <div className="flex lg:hidden ml-10">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <RxDropdownMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-100 text-gray-800 border-t border-gray-200">
      
          <div className="p-4">
          <div className='flex justify-end cursor-pointer' onClick={() => setMobileMenuOpen(false)}>
          <IoMdCloseCircle size="1.5rem"/>
          </div>
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="block text-md font-bold leading-6 py-2" onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default NavigationBar
