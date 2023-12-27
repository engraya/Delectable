import React from 'react'
import { IconButton } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

function RecipeCategory() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
      <Link to={'/cuisines/African'}>
      <span className="inline-flex items-center rounded-md text-xs font-medium text-gray-600 ring-gray-500/10">
      <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">African</button>
      </span>
      </Link>
        <Link to={'/cuisines/American'}>
            <span className="inline-flex items-center rounded-md text-xs font-medium text-gray-600 ring-gray-500/10">
            <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">American</button>
            </span>
        </Link>
        <Link to={'/cuisines/European'}>
        <span className="inline-flex items-center rounded-md text-xs font-medium text-gray-600  ring-gray-500/10">
        <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">European</button>
        </span>
        </Link>
        <Link to={'/cuisines/Indian'}>
            <span className="inline-flex items-center rounded-md text-xs font-medium text-gray-600  ring-gray-500/10">
            <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Indian</button>
            </span>
        </Link>   
        <Link to={'/cuisines/Mediterranean'}>
            <span className="inline-flex items-center rounded-md text-xs font-medium text-gray-600  ring-gray-500/10">
            <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Mediterranean</button>
            </span>
        </Link>
        <Link to={'/cuisines/Asian'}>
            <span className="inline-flex items-center rounded-md text-xs font-medium text-gray-600  ring-gray-500/10">
            <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Asian</button>
            </span>
        </Link>

      </div>

    </div>
  )
}

export default RecipeCategory
