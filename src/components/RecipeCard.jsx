import React from 'react'
import { useEffect } from 'react'
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
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
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import FavouriteContext from '../contextStore/FavouriteContext';


function RecipeCard(props) {

  const favouriteRecipeContext = useContext(FavouriteContext);

  const recipeIsFavourite = favouriteRecipeContext.recipeIsFavourite(props.recipe.id);

  const toggleRecipeFavouriteHandler = () => {
    if (recipeIsFavourite) {
      favouriteRecipeContext.removeFavourite(props.recipe.id)
    } else {
      favouriteRecipeContext.addFavourite({
        id : props.recipe.id,
        title : props.recipe.title,
        image : props.recipe.image
      });
    }

  }

  return (
    <div>
          <Card className="w-full max-w-[20rem] shadow-lg">
          <Link to={'/recipe/' + props.recipe.id}>
      <CardHeader floated={false} color="blue-gray">
      <img
          src={props.recipe.image}
          alt="ui/ux review check"
        />


        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
          </Link>

      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h6" color="blue-gray" className="font-medium">
           {props.recipe.title}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
          { recipeIsFavourite ? <button onClick={toggleRecipeFavouriteHandler}>Remove</button> : <button onClick={toggleRecipeFavouriteHandler}>Add</button>}
       
          </Typography>
        </div>
        {/* <Typography color="gray">
          Enter a freshly updated and thoughtfully furnished peaceful home
          surrounded by ancient trees, stone walls, and open meadows.
        </Typography> */}
      </CardBody>
      {/* <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true}>
          Reserve
        </Button>
      </CardFooter> */}
    </Card>


    </div>
  )
}

export default RecipeCard
