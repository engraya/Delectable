import React from 'react'
import Popular from '../components/Popular'
import Veggie from '../components/Veggie'
import {Routes, Route} from 'react-router-dom'
function AppPages() {
  return (
    <div>
    {/* <Route>
      <Route path='/popular' element={<Popular/>}/>
      <Route path='/veggie' element={<Veggie/>}/>
    </Route> */}
    <Popular/>
    <Veggie/>
    </div>
  )
}

export default AppPages
