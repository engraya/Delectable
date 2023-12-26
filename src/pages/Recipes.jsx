import React from 'react'
import Popular from '../components/Popular'
import Vegetarian from '../components/Vegetarian'


function Recipes() {
  return (
    <div className='lg:grid-cols-4 sm:px-6 lg:px-24 mb-24'>
    <Popular/>
    <Vegetarian/>
    </div>
  )
}

export default Recipes
