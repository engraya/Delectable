import NavBar from './layouts/NavBar';
import AppPages from './pages/AppPages';
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
function App() {
  return (
    <div className="App">
    <NavBar/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
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
