import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkMode from '../layouts/DarkMode/DarkMode';
import logo from "../images/food1.png";
import { RxDropdownMenu } from "react-icons/rx";
import { IoMdCloseCircle } from "react-icons/io";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Trending', href: '/trending' },
  { name: 'Vegetarian', href: '/vegetarian' },
  { name: 'Cuisines', href: '/cuisines' },
];

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 shadow w-full md:w-auto px-5 py-0.5 z-40 flex justify-between md:rounded-lg bg-secondary/20 backdrop-blur-md only-bottom">
      <div className="container flex sm:flex-row justify-between items-center mx-auto py-2 px-4">
        <div className="flex items-center text-2xl">
          <Link to="/" className="flex justify-center items-center">
            <img src={logo} alt="logo" width={40} height={40} />
            <h1 className="text-xl ml-2 font-bold underline transition-colors hover:text-foreground/80 sm:text-sm">
              Delectable
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-center sm:mt-0 space-x-6 middleDiv">
          {navigation.map((item) => (
            <Link
              to={item.href}
              key={item.href}
              className="flex items-center text-xl font-medium dark:border-blue-500 border-emerald-600 hover:border-b-4 hover:border-emerald-600 rounded-b-md transition-colors hover:text-foreground/80 sm:text-sm"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <DarkMode />
        <div className="flex lg:hidden ml-10 relative">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <RxDropdownMenu className="h-6 w-6" aria-hidden="true" />
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-100 text-gray-800 border-t border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4">
                <div className="flex justify-end cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                  <IoMdCloseCircle size="1.5rem" />
                </div>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block text-md font-bold leading-6 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
