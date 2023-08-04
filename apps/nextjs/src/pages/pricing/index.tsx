import React from 'react'
import Footer from '~/components/Footer/Footer'
import NavBar from '~/components/NavBar/NavBar'
import Pricing from '~/components/Pricing/Pricing'

type Props = {}

const index = () => {
  return (
    <div className='flex flex-col items-center bg-gradient-to-b from-[#101212] relative to-[#08201D] h-min md:min-h-screen md:justify-between'>
        <NavBar />
        <Pricing />
        <Footer />
    </div>
  )
}

export default index