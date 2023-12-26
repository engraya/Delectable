import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RecipeCard from '../components/RecipeCard'
import RecipeCategory from '../components/RecipeCategory'
import SearchRecipe from '../components/SearchRecipe'

function Cuisine() {
    const [cuisine, setCuisine] = useState([])
    let { type } = useParams();

    const getCuisine = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b414562bf6704b13ac3272e5e9ddadaf&cuisine=${name}&number=20`)
        const recipes = await data.json();
        setCuisine(recipes.results)
    }

    useEffect(() => {
        getCuisine(type);
    }, [type])
  return (
    <div>
    <SearchRecipe/>
      <RecipeCategory/>
      <h2 className="text-md font-bold tracking-tight sm:text-2xl text-center text-cyan-600 mt-5">{type} Cuisines</h2>
      <div className='group relative isolate px-28  mt-8 inline-flex flex-wrap content-center justify-center items-center gap-3 sm:inline-flex sm:flex-wrap sm:items-center sm:gap-3'>
          {cuisine?.map((recipe) => {
            return (
              <RecipeCard key={recipe.id} recipe={recipe}/>
            )
    })}
    </div>
    </div>
  )
}

export default Cuisine
