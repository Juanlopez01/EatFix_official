import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import PlansNav from '../PlansNav/PlansNav'

const NavBar= () => {
    const {data: session} = useSession()
    const router = useRouter()
    
  return (
    <header className="absolute inset-x-0 top-0 z-10 w-full">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <div className='flex-shrink-0'>
                      <Link href='/'>
                        <Image src='https://res.cloudinary.com/dg0okhqyc/image/upload/v1691181482/eat_fix_pezrn1.png' alt='logo' width={70} height={70}/>
                      </Link>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                        {router.pathname !== '/' && router.pathname !== '/diet'? <Link href="/" title="" className="text-base text-[#52878a] transition-all duration-200 hover:text-opacity-80"> Home </Link> : <Link href="/pricing" title="" className="text-base text-[#52878a] transition-all duration-200 hover:text-opacity-80"> Pricing </Link>}

                        {!session  && <Link href='/' title="" className="text-base text-[#52878a] transition-all duration-200 hover:text-opacity-80"><button onClick={() => signIn('auth0')}> Try now! </button></Link>}
                        {session?.user && (router.pathname === '/' || router.pathname === '/pricing') ? <Link href='/diet' title="" className="text-base text-[#52878a] transition-all duration-200 hover:text-opacity-80"> Get diet! </Link> : !session ? ''  : <Link href="/" title="" className="text-base text-[#52878a] transition-all duration-200 hover:text-opacity-80"> Home </Link>}
                    </div>

                    <div className="md:flex md:items-center md:justify-end md:space-x-6 sm:ml-auto">
                        {session && <PlansNav id={session.user.id}/>}
                        {session && <p className="hidden text-base text-[#52878a] transition-all duration-200 lg:inline-flex hover:text-opacity-80"> {session.user.name?? session.user.email} </p>}

                        {!session && <button onClick={() => signIn('auth0')}  className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold rounded-md transition-all bg-[#3a3370] text-white hover:bg-[#6459b3] focus:bg-[#6459b3]"> Sign In </button>}
                        {session && <button onClick={() => signOut()}  className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold rounded-md transition-all bg-[#3a3370] text-white hover:bg-[#6459b3] focus:bg-[#6459b3]" > Log out </button>}
                    </div>
                </div>
            </div>
        </header>
  )
}

export default NavBar