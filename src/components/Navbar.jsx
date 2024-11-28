import React from 'react'
import searceLogo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <div className='px-8 py-4 flex items-center justify-center sticky top-0 bg-black z-10'>
      <img src={searceLogo} alt="Searce" className='h-6 sm:h-7 md:h-8 lg:h-10 mb-2' />
    </div>
  )
}

export default Navbar
