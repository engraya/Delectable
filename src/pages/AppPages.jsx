import React from 'react'
import Popular from '../components/Popular'
import Veggie from '../components/Vegetarian'
import {Routes, Route} from 'react-router-dom'
import Cuisine from './Cuisine'
function AppPages() {
  return (
    <div>
    <Routes>
      <Route to={'/cuisine'} element={<Cuisine/>} />
    </Routes>

    </div>
  )
}

export default AppPages
