import React from 'react'

const Footer = () => {

    const today = new Date();
    const year = today.getFullYear();

    return (
        <div className='w-screen text-xs sm:text-sm md:text-base lg:text-lg p-4 flex items-center justify-center absolute bottom-0 bg-black z-10'>
            <p className='text-center text-gray-400'>Copyright © {year} - All rights reserved</p>
        </div>

    )
}

export default Footer
