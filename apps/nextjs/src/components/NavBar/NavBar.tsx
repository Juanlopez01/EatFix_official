import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { Button,  ButtonVariant } from 'side-ui'
import { Avatar } from '../Avatar/Avatar'

const NavBar= () => {
    const {data: session} = useSession()
  return (
    <header className="absolute inset-x-0 top-0 z-10 w-full">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <div className='flex-shrink-0'>
                      <p className='text-white text-3xl mr-6 font-bold'><span className='text-green-300'>E</span>at <span className='text-green-300'>F</span>ix</p>
                    </div>

                    <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                        <Link href="/pricing" title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80"> Pricing </Link>

                        {!session && <Link href='/' title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80"><Button variant={ButtonVariant.ghost} onClick={() => signIn('auth0')}> Try now! </Button></Link>}
                        {session && <Link href='/diet' title="" className="text-base text-white transition-all duration-200 hover:text-opacity-80"> Get diet! </Link>}
                    </div>

                    <div className="lg:flex lg:items-center lg:justify-end lg:space-x-6 sm:ml-auto">
                        {session && <p className="hidden text-base text-white transition-all duration-200 lg:inline-flex hover:text-opacity-80"> {session.user.name} </p>}

                        {!session && <Button className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 text-white bg-white/20 hover:bg-white/40 focus:bg-white/40 rounded-lg" role="button"> Sign In </Button>}
                        {session && <Avatar altText={session.user.name?? ''} imgUrl={session.user.image ?? ''}/>}
                    </div>
                </div>
            </div>
        </header>
  )
}

export default NavBar