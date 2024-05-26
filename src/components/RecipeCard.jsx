import React from 'react'
import { Link } from 'react-router-dom';


function RecipeCard(props) {

  return (
    <>
      <Link to={'/recipe/' + props.recipe.id}>
          <div className="rounded overflow-hidden shadow-lg flex flex-col">
      <a href="#" />
      <div className="relative">
          <img className="w-full" src={props.recipe.image} alt="Recipe" />
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
          </div>
          {/* <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            Cooking
          </div> */}
      </div>
      <div className="px-6 py-4 mb-auto">
        <div className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">Simplest
        {props.recipe.title}
          </div>
        {/* <p className="text-gray-500 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p> */}
      </div>
    </div>
    </Link>
    </>

  )
}

export default RecipeCard
