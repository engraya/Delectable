import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard'
import SearchRecipe from '../components/SearchRecipe'
function SeachedRecipe() {

    const [searchedRecipe, setSearchRecipe] = useState([]);
  

    let { search } = useParams();

    const getSearchedRecipe = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ea225680f3474e89829b6e239e703c8d&query=${name}&number=16`)
        const recipes = await data.json();
        setSearchRecipe(recipes.results)
    }
    
    useEffect(() => {
        getSearchedRecipe(search);
    }, [search])

  return (
    <div>
    <SearchRecipe/>
      <h2 className="text-md font-bold tracking-tight sm:text-2xl text-center">{search}</h2>
      <div className='group relative isolate px-28  mt-8 inline-flex flex-wrap items-center gap-3 sm:inline-flex sm:flex-wrap sm:items-center sm:gap-3'>
    
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
