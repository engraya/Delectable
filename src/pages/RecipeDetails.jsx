import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GrFormPreviousLink } from "react-icons/gr";
import { Link } from 'react-router-dom';
import ImageDownloader from '../components/ImageDownloader'
import jsPDF from 'jspdf';

function RecipeDetails() {

    const [recipeDetails, setRecipeDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { name } = useParams();

    const fetchRecipeDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const recipeDetailData = await data.json();
        setIsLoading(false);
        setRecipeDetails(recipeDetailData)
        console.log(recipeDetailData)
    } 

    useEffect(() => {
        fetchRecipeDetails();
        setIsLoading(false);
    }, []);

    // GENERATE PDF FUNCTION

    const generateRecipeDetailsPdf = () => {
      const pdf = new jsPDF("portrait");
      pdf.setFontSize(22);

      // PDF DETAILS
      pdf.addImage(`${recipeDetails.image}`, "JPEG", 20, 10, 100, 100, null, null, "right");
      pdf.setTextColor("green");
      pdf.text(`Name : ${recipeDetails.title}`, 20, 130,);
      pdf.setFontSize(16);
      pdf.setTextColor(100);
      pdf.text(`Health Score : ${recipeDetails.healthScore}`,20, 140,);
     
      pdf.text(`Diary Free? : ${recipeDetails.dairyFree ? "Yes" : "No"}`, 20, 150);
      pdf.text(`Gluten Free? : ${recipeDetails.glutenFree  ? "Yes" : "No"}`, 20, 160);
      pdf.text(`For Vegetarians ?: ${recipeDetails.vegetarian  ? "Yes" : "No"}`, 20, 170);
      pdf.text(`Is Very Healthy? : ${recipeDetails.veryHealthy  ? "Yes" : "No"}`, 20, 180);
      pdf.text(`Ready In Minutes/Cooking Time : ${recipeDetails.readyInMinutes}`, 20, 190);
      pdf.text(`INGREDIENTS`, 20, 200);
      const ingredientsText = recipeDetails.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join('\n');
      pdf.text(ingredientsText, 20, 210);
      // pdf.setTextColor(100);
      // pdf.text(`Summary : ${recipeDetails.summary}`, 100, 120);
      // pdf.text(`Cooking Instructions : ${recipeDetails.instructions}`, 20, 100);
    




      pdf.save('Recipe-Details.pdf');

    };




  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
      <section className="dark:bg-gray-900">
        <div className="px-4 max-w-screen-xl text-center">
          <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </section>
    </div>
    )
  }  


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
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{recipeDetails.title}</h1>
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
                onClick={generateRecipeDetailsPdf}
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


