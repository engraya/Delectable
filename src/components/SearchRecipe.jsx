import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import RecipeCategory from '../components/RecipeCategory'
function SearchRecipe() {

    const [inputQuery, setInputQuery] = useState("");
    let { type } = useParams();
    const navigate = useNavigate();
    const handleSearchFormChange = (e) => {
        setInputQuery(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        navigate("/searched/" + inputQuery)

    }
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-6 text-center sm:shadow-sm">
    <p className="mx-auto max-w-2xl text-gray-900 sm:text-4xl text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
      Search for your Favourite Recipe
    </p>
    <form onSubmit={handleSubmitForm}>
      <label className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300" htmlFor="search-bar">
        <input 
       type="text"
       value={inputQuery}
       placeholder='Search For Recipes'
       onChange={handleSearchFormChange}
        className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" 
        required />
        <button type="submit" className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all">
          <div className="flex items-center transition-all opacity-1">
            <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
              Search
            </span>
          </div>
        </button>
      </label>
    </form>
    <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
      <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7">
      </circle>
      <defs>
        <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
          <stop stopColor="#3b82f6" />
          <stop offset={1} stopColor="#1d4ed8" />
        </radialGradient>
      </defs>
    </svg>
    <RecipeCategory/>
    <h2 className="text-md font-bold tracking-tight sm:text-2xl text-center text-cyan-600 mt-5">{type} Cuisines</h2>
  </div>
  )
}

export default SearchRecipe
