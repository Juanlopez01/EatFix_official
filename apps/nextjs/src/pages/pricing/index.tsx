import React from 'react'
import Footer from '~/components/Footer/Footer'
import NavBar from '~/components/NavBar/NavBar'
import Pricing from '~/components/Pricing/Pricing'


const index = () => {
  return (
    <div className='bg-gradient-to-b flex flex-col justify-center items-center from-gray-200 relative to-[#558F92] md:min-h-screen md:justify-between'>
        <NavBar />
        <Pricing />
        <Footer />
    </div>
  )
}

export default index