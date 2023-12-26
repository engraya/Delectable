import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard'
import SearchRecipe from '../components/SearchRecipe'
function SeachedRecipe() {

    const [searchedRecipe, setSearchRecipe] = useState([]);
  

    let { search } = useParams();

    const getSearchedRecipe = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b414562bf6704b13ac3272e5e9ddadaf&query=${name}&number=16`)
        const recipes = await data.json();
        setSearchRecipe(recipes.results)
    }
    
    useEffect(() => {
        getSearchedRecipe(search);
    }, [search])

  return (
          <div>
          <div className="max-w-screen-xl mx-auto text-center mt-12">
            <h3 className="text-3xl md:text-4xl font-extrabold dark:text-white mb-4 mt-24 text-cyan-600">{search}</h3>
          </div>
          <div className='group relative isolate px-28  mt-2 inline-flex flex-wrap items-center justify-center content-center gap-3 sm:inline-flex sm:flex-wrap sm:items-center sm:gap-3'>

          {searchedRecipe?.map((recipe) => {
          return (
            <RecipeCard key={recipe.id} recipe={recipe}/>

          )
          })}
          </div>
          </div>

  )
}

export default SeachedRecipe




