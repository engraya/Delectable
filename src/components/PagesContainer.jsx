import React from 'react'

function PagesContainer({ children }) {
  return (
    <div className='mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-6'>
      {children}
    </div>
  )
}

export default PagesContainer
