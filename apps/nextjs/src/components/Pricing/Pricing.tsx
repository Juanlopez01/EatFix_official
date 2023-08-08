import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'


const Pricing = () => {
  return (
    <div>
        <section className="py-10 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-[#3a6062] sm:text-4xl lg:text-5xl">Pricing & plans</h2>
                    {/* <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-400">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p> */}
                </div>

                <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto mt-8 sm:mt-16 sm:grid-cols-3">
                    <div className="bg-white bg-opacity-20 border-4 border-transparent rounded-md">
                        <div className="p-6 md:py-10 md:px-9">
                            <div className="inline-block px-4 py-2 bg-gray-100 bg-opacity-25 rounded-full">
                                <h3 className="text-sm font-semibold text-[#3a6062]">Free</h3>
                            </div>
                            <p className="mt-5 text-5xl font-bold text-[#3a6062]">Free</p>
                            <p className="mt-2 text-base text-gray-800">Per month</p>

                            <ul className="flex flex-col mt-8 space-y-4">
                                <li className="inline-flex items-center space-x-2">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium text-[#3a6062]"> One diets per month </span>
                                </li>

                                <li className="inline-flex items-center space-x-2">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium text-[#3a6062]"> Requests diets manually </span>
                                </li>

                                <li className="inline-flex items-center space-x-2">
                                <svg className='flex-shrink-0 h-5 w-5' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#ef4444" d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"/>
                                </svg>
                                    <span className="text-base font-medium text-[#3a6062]"> Early access to new features </span>
                                </li>

                                <li className="inline-flex items-center space-x-2">
                                <svg className='flex-shrink-0 h-5 w-5' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#ef4444" d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"/>
                                </svg>
                                    <span className="text-base font-medium text-[#3a6062]"> Support 24hs </span>
                                </li>
                            </ul>

                            <button onClick={() => signIn('auth0')} title="" className="inline-flex items-center justify-center w-full px-4 py-4 mt-8 font-semibold text-[#3a6062] transition-all duration-200 bg-green-800 bg-opacity-30 rounded-md hover:bg-green-900 focus:bg-green-900" role="button"> Get plan </button>
                        </div>
                    </div>
                    <div className="bg-white bg-opacity-20 border-4 border-transparent rounded-md">
                        <div className="p-6 md:py-10 md:px-9">
                            <div className="inline-block px-4 py-2 bg-gray-100 bg-opacity-25 rounded-full">
                                <h3 className="text-sm font-semibold text-[#3a6062]">Standard</h3>
                            </div>
                            <p className="mt-5 text-5xl font-bold text-[#3a6062]">$4.99</p>
                            <p className="mt-2 text-base text-gray-800">Per month</p>

                            <ul className="flex flex-col mt-8 space-y-4">
                                <li className="inline-flex items-center space-x-2">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium text-[#3a6062]"> Three diets per month </span>
                                </li>

                                <li className="inline-flex items-center space-x-2">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium text-[#3a6062]"> Requests diets manually </span>
                                </li>

                                <li className="inline-flex items-center space-x-2">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium text-[#3a6062]"> Early access to new features </span>
                                </li>

                                <li className="inline-flex items-center space-x-2">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium text-[#3a6062]"> Support 24hs </span>
                                </li>
                            </ul>

                            <Link href="/" title="" className="inline-flex items-center justify-center w-full px-4 py-4 mt-8 font-semibold text-[#3a6062] transition-all duration-200 bg-green-800 bg-opacity-30 rounded-md hover:bg-green-900 focus:bg-green-900" role="button"> Get plan </Link>
                        </div>
                    </div>

                    <div className="bg-[#443e6e] bg-opacity-80 border-4 border-[#2e2572] rounded-md">
                        <div className="p-6 md:py-10 md:px-9">
                            <div className="inline-block px-4 py-2 bg-[#2e2572] rounded-full">
                                <h3 className="text-sm font-bold text-white">Premium</h3>
                            </div>
                            <p className="mt-5 text-5xl font-bold text-white">$6.99</p>
                            <p className="mt-2 text-base text-gray-400">Per month</p>

                            <ul className="flex flex-col mt-8 space-y-4">
                                <li className="inline-flex items-center space-x-2">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium text-gray-300"> Unlimited diets </span>
                                </li>

                                <li className="inline-flex items-center space-x-2">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium text-gray-300"> Send to your email weekly </span>
                                </li>

                                <li className="inline-flex items-center space-x-2">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium text-gray-300"> Early access to new features </span>
                                </li>

                                <li className="inline-flex items-center space-x-2">
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium text-gray-300"> Support 24hs </span>
                                </li>
                            </ul>

                            <a href="/" title="" className="inline-flex items-center justify-center w-full px-4 py-4 mt-8 font-semibold text-white transition-all duration-200 rounded-md bg-gradient-to-l from-[#2e2572] to-blue-400 hover:opacity-80 focus:opacity-80" role="button"> Get plan </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Pricing