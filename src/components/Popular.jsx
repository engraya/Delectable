import React from 'react'
import axios from 'axios'
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
function Popular() {

  const [popularRecipes, setPopularRecipes] = useState([])

    useEffect(() => {
        getPopularRecipes();
    }, [])

    const getPopularRecipes = async () => {

      const checkLocalStorage = localStorage.getItem('popularRecipes');

      if(checkLocalStorage) {
        setPopularRecipes(JSON.parse(checkLocalStorage))
      } else {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=ea225680f3474e89829b6e239e703c8d&number=20`)
      const data = await api.json();

      localStorage.setItem('popularRecipes', JSON.stringify(data.recipes))
      setPopularRecipes(data.recipes);
      console.log(data);
  }
      }

  return (
    <div>
      <div className="max-w-screen-xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold dark:text-white mb-4 mt-36">Popular Recipes</h3>
      </div>
    <div className='group relative isolate px-28  mt-8 inline-flex flex-wrap items-center gap-3 sm:inline-flex sm:flex-wrap sm:items-center sm:gap-3'>
    
    {popularRecipes.map((recipe) => {
      return (
      
        <RecipeCard key={recipe.id} recipe={recipe}/>
      )
    })}
    </div>
    </div>

  )
}

export default Popular
