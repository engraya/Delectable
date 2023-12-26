import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FcSearch } from "react-icons/fc";

function SearchRecipe() {

    const [inputQuery, setInputQuery] = useState("");

    const navigate = useNavigate();


    const handleSearchFormChange = (e) => {
        setInputQuery(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        navigate("/searched/" + inputQuery)

    }
  return (
    <div>
        <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 sm:p-12">
                <div className="sm:col-span-2">
                    <div className="mt-2.5">
                    <input
                        type="text"
                        value={inputQuery}
                        placeholder='Search For Recipes'
                        onChange={handleSearchFormChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className='align-items-center justify-center content-center flex'>
                    <button type="submit" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-1"><FcSearch /></button>
                    </div>
                    </div>
              
                </div>
            </div>
        </form>
    </div>
  )
}

export default SearchRecipe
