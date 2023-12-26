import { createContext, useState, useEffect } from "react";


const contextObject = {
    favouriteRecipes : [],
    totalFavouriteRecipes :  0,
    addFavourite : (favouriteRecipe) => {},
    removeFavourite : (recipeId) => {},
    recipeIsFavourite : (recipeId) => {}

}


const FavouriteContext = createContext(contextObject);


export function FavouriteContextProvider(props) {
    const LOCAL_STORAGE_KEY = "userFavourites"
    const [userFavourites, setUserFavourites] = useState([])


    const addFavouriteHandler = (favouriteRecipe) => {
        setUserFavourites((prevUserFavourites) => {
            return prevUserFavourites.concat(favouriteRecipe)
        });
    }

    useEffect(() => {
        const retrievedFavourites = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (retrievedFavourites) {
            setUserFavourites(retrievedFavourites)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userFavourites))
    }, [userFavourites])


    const removeFavouriteHandler = (recipeId) => {
        setUserFavourites(prevUserFavourites => {
            return prevUserFavourites.filter(recipe => recipe.id !== recipeId)
        })
    }


    const recipeIsFavouriteHandler = (recipeId) => {
        return userFavourites.some(recipe => recipe === recipeId)
    }

    const recipeContext = {
        favouriteRecipes : userFavourites,
        totalFavouriteRecipes : userFavourites.length,
        addFavourite : addFavouriteHandler,
        removeFavourite : removeFavouriteHandler,
        recipeIsFavourite : recipeIsFavouriteHandler,
    }

    return <FavouriteContext.Provider value={recipeContext}>
        {props.children}
    </FavouriteContext.Provider>

}


export default FavouriteContext;


