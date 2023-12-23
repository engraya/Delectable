import NavBar from './layouts/NavBar';
import AppPages from './pages/AppPages';
import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Popular from './components/Popular';
import Favourites from './components/Favourites';

function App() {
  return (
    <div className="App">
    <NavBar/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/popular' element={<Popular/>}/>
      <Route path='/favourites' element={<Favourites/>}/>
    </Routes>
    </div>
  );
}

export default App;
