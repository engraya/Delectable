import NavBar from './layouts/NavBar';
// import AppPages from './pages/AppPages';
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Trending from './components/Trending'
import Recipes from './pages/Recipes';
import Cuisine from './pages/Cuisine';
import Vegetarian from './components/Vegetarian';
import SeachedRecipe from './pages/SeachedRecipe';
import RecipeDetails from './pages/RecipeDetails';
import Footer from './layouts/Footer';
import NotFoundPage from './pages/NotFoundPage';
import React from 'react'

function App() {
  return (
    <div className="App ">
    {/**
     * Design or type styles for mobile first this way you make it easier to adapt to other devices than doing it the other way around
     * remember that the 'sm' helper in tailwind starts from fairly big devices (i.g. Big Phones) so reserve it for that purpose
     */}
    <NavBar/>
    <Routes className='' >
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/recipes' element={<Recipes/>}/>
      <Route path='/trending' element={<Trending/>}/>
      <Route path='/cuisines' element={<Cuisine/>}/>
      <Route path='/cuisines/:type' element={<Cuisine/>}/>
      <Route path='/vegetarian' element={<Vegetarian/>}/>
      <Route path='/searched/:search' element={<SeachedRecipe/>}/>
      <Route path='/recipe/:name' element={<RecipeDetails/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
    <Footer/>
    </div>
  );
}

export default App;


