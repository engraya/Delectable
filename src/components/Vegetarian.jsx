import React from 'react'
import { useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useState } from 'react';
import RecipeCard from './RecipeCard';
import { Link } from 'react-router-dom';
function Vegetarian() {

  const [vegetarianRecipes, setVegetarianRecipes] = useState([])

  useEffect(() => {
    getVegetarianRecipes();
  }, [])

  const getVegetarianRecipes = async () => {

    const checkLocalStorage = localStorage.getItem('vegetarianRecipes');

    if(checkLocalStorage) {
      setVegetarianRecipes(JSON.parse(checkLocalStorage))
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=b414562bf6704b13ac3272e5e9ddadaf&number=50&tags=vegetarian`)
    const data = await api.json();

    localStorage.setItem('vegetarianRecipes', JSON.stringify(data.recipes))
    setVegetarianRecipes(data.recipes);
    console.log(data);
}
    }

  return (
    <div>
      <div className="max-w-screen-xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold dark:text-white mb-4 mt-32 text-cyan-600">Vegetarian Recipes</h3>
      </div>
      <div className='group relative isolate px-28  mt-2 inline-flex flex-wrap items-center justify-center content-center gap-3 sm:inline-flex sm:flex-wrap sm:items-center sm:gap-3'>
    
    {vegetarianRecipes.map((recipe) => {
      return (
        <RecipeCard key={recipe.id} recipe={recipe}/>

      )
    })}
    </div>
    </div>
  )
}

export default Vegetarian
