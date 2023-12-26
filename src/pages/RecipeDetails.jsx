import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GrFormPreviousLink } from "react-icons/gr";
import { Link } from 'react-router-dom';
import ImageDownloader from '../components/ImageDownloader'

function RecipeDetails() {

    const [recipeDetails, setRecipeDetails] = useState({});

    const { name } = useParams();

    const fetchRecipeDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=b414562bf6704b13ac3272e5e9ddadaf`)
        const recipeDetailData = await data.json();
        setRecipeDetails(recipeDetailData)
        console.log(recipeDetailData)
    } 

    useEffect(() => {
        fetchRecipeDetails();
    }, [name])

  return (
    <div>
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <Link to='/'>
            <button type="button" class="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
            <GrFormPreviousLink />
            </button>
          </Link>
 
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={recipeDetails.image}
              alt="Recipe Image"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        {/* Product info */}
        {/* Product info */}

          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{recipeDetails.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-2xl tracking-tight text-cyan-600 ">Other Information</p>
            <hr />
   
              {/* Sizes */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-cyan-600 ">Health Score</h3>
                  <a className="text-sm font-medium text-gray-400">
                  {recipeDetails.healthScore}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-cyan-600 ">Dairy Free</h3>
                  {recipeDetails.dairyFree ? <a className="text-sm font-medium  text-gray-400">
                    Yes
                  </a> : <a className="text-sm font-medium  text-gray-400">
                    No
                    </a>}
        
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-cyan-600 ">Gluten Free</h3>
                  {recipeDetails.glutenFree ? <a  className="text-sm font-medium  text-gray-400">
                    Yes
                  </a> : <a  className="text-sm font-medium  text-gray-400">
                    No
                  </a>}
       
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-cyan-600 ">Vegetarian</h3>
                  {recipeDetails.vegetarian ? <a className="text-sm font-medium  text-gray-400">
                    Yes
                  </a> : <a className="text-sm font-medium text-gray-400">
                    No
                  </a> }
           
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-cyan-600 ">Very Healthy</h3>
                  {recipeDetails.veryHealthy ?<a href="#" className="text-sm font-medium  text-gray-400">
                    Yes
                  </a> : <a className="text-sm font-medium  text-gray-400">
                    No
                  </a>}
            
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-cyan-600 ">Ready In Minutes</h3>
                  <a className="text-sm font-medium  text-gray-400">
                  {recipeDetails.readyInMinutes}
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 px-8 py-3 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                Download PDF
              </button>
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 px-8 py-3 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                <span className='mb-3 mx-3'> Download Image</span>
                <ImageDownloader imageUrl={recipeDetails.image} filename={recipeDetails.title}/>
              </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div className='mb-12 mt-3'>
              <hr />
              <h3 className="font-serif font-bold mt-4 text-cyan-600 underline">SUMMARY</h3>
                <p className="text-gray-400"  dangerouslySetInnerHTML={{__html : recipeDetails.summary}}></p>
            </div>
              <hr />
            <div>
             
              <h3 className="font-serif font-bold mt-4  text-cyan-600 underline">COOKING INSTRUCTIONS</h3>
                <p className="text-gray-400"  dangerouslySetInnerHTML={{__html : recipeDetails.instructions}}></p>
            </div>

            <div className="mt-10">
            <hr />
              <h3 className="font-serif font-bold mt-4 text-cyan-600 underline">INGREDIENTS</h3>
              <div className="mt-2">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {recipeDetails.extendedIngredients?.map((ingredient) => (
                    <li key={ingredient.id} className="text-gray-400">
                      <span className="">{ingredient.original}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails


