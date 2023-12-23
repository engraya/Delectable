import React, { useState } from 'react';
import DarkMode from './DarkMode/DarkMode';
import { Link } from 'react-router-dom';
import logo from '../images/food1.png'

function NavBar() {
  const repoGithubUrl = ""
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };


  return (
    <div className='mb-20'>
      <nav className="dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <a className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} alt="Logo" style={{ height: '60px', width: '60px' }} />
              <span className="self-center text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-sky-400 underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Delectable</span>
              <span className="bg-blue-100 text-blue-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">pro</span>
            </a>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
            <DarkMode />
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded={mobileMenuOpen}
              aria-controls="navbar-cta"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className={`md:items-center align-middle justify-between p-4 bg-white rounded-lg shadow dark:bg-gray-700 w-full md:w-auto md:order-1 md:flex md:flex-row ${mobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/">
                  <a onClick={closeMobileMenu} className="block py-2 px-3 text-cyan-600 md:hover:text-cyan-900 rounded md:bg-transparent md:p-0" aria-current="page">Home</a>
                </Link>
              </li>
              <li>
                <Link to="/destinations">
                  <a onClick={closeMobileMenu} className="block py-2 px-3 text-cyan-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-900 md:p-0 md:dark:hover:text-cyan-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Destinations</a>
                </Link>
              </li>
              <li>
                <Link to="/gallery">
                  <a onClick={closeMobileMenu} className="block py-2 px-3 text-cyan-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-900 md:p-0 md:dark:hover:text-cyan-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Gallery</a>
                </Link>
              </li>
              <li>   
              </li>
              
            </ul>
            
          </div>
          
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
