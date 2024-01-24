import React, { useState } from "react";
import DarkMode from "./DarkMode/DarkMode.jsx";
import { Link } from "react-router-dom";
import logo from "../images/food1.png";
import { RxGithubLogo } from "react-icons/rx";

const githubRepoUrl = "https://github.com/engraya/delectable-food-webapp";
function NavBar() {
  const repoGithubUrl = "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="dark:bg-gray-900 bg-gray-100/80 sticky w-full z-20 top-0 start-0 border-b border-gray-300 dark:border-gray-900 backdrop-blur-md shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <span className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              alt="Logo"
              style={{ height: "60px", width: "60px" }}
            />
            <span className="self-center text-2xl font-extrabold bg-clip-text bg-gradient-to-r to-purple-600 from-sky-400 underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
              Delectable
            </span>
            <span className="bg-blue-100 text-blue-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-0.5 h-5 w-5 text-yellow-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
          <Link to={githubRepoUrl} target="_blank">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-1"
            >
              <RxGithubLogo />
            </button>
          </Link>
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
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`md:items-center align-middle justify-between p-4 my-4 bg-white rounded-lg shadow dark:bg-gray-700 w-full md:w-auto md:order-1 md:flex md:flex-row ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/">
                <a
                  onClick={closeMobileMenu}
                  className="block py-2 px-3 text-cyan-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-900 md:p-0 md:dark:hover:text-cyan-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link to="/trending">
                <a
                  onClick={closeMobileMenu}
                  className="block py-2 px-3 text-cyan-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-900 md:p-0 md:dark:hover:text-cyan-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Trending
                </a>
              </Link>
            </li>

            <li>
              <Link to="/vegetarian">
                <a
                  onClick={closeMobileMenu}
                  className="block py-2 px-3 text-cyan-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-900 md:p-0 md:dark:hover:text-cyan-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Vegetarian
                </a>
              </Link>
            </li>
            <li>
              <Link to="/cuisines">
                <a
                  onClick={closeMobileMenu}
                  className="block py-2 px-3 text-cyan-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-cyan-900 md:p-0 md:dark:hover:text-cyan-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Explore
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    // <div className='mb-20'>
    // </div>
  );
}

export default NavBar;
