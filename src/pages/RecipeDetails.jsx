import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function RecipeDetails() {

    const [recipeDetails, setRecipeDetails] = useState({});
    const [activeRecipeTabSwitch, setActiveRecipeTabSwitch] = useState("instructions")

    const { name } = useParams();

    const fetchRecipeDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/recipes/${name}/information?apiKey=ea225680f3474e89829b6e239e703c8d`)
        const recipeDetailData = await data.json();
        setRecipeDetails(recipeDetailData)
    }

    useEffect(() => {
        fetchRecipeDetails();
    }, [name])


    const insructionsActiveHandler = () => {
        setActiveRecipeTabSwitch("instructions")
    }

    const ingredientsSctiveHandler = () => {
        setActiveRecipeTabSwitch("ingredients")
    }

  return (
    <div>
      <h1>Recipe Details</h1>
      {name}
      <p>{recipeDetails.title}</p>

      <button type="button" onClick={insructionsActiveHandler} class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cooking Instructions</button>
      <button type="button" onClick={ingredientsSctiveHandler} class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Ingredients</button>
    </div>
  )
}

export default RecipeDetails
