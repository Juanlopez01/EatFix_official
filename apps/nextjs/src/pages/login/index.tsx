import type { NextPage } from 'next'
import React, { useState } from 'react'
import Login from '~/components/Login/Login'
import Register from '~/components/Login/Register'



const SignIn : NextPage = () => {
    const [SignInType, setSignInType] = useState('login')

  return (
        <section className=" h-screen py-10 bg-gradient-to-b from-gray-200 relative to-[#558F92] sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Welcome to Eat Fix!</h2>
                {SignInType === 'register' ? 
                <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Register for free</p>
                :<p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Login to your account</p>}
            </div>

            {SignInType === 'register' ? <Register setSignInType={setSignInType}/>
            : <Login setSignInType={setSignInType} />}
        </div>
    </section>

  )
}

export default SignIn