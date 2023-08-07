
import Link from 'next/link'
import React from 'react'
import { Icon, IconCatalog } from 'side-ui'

const Footer = () => {
  return (
        <div className="flex flex-wrap items-center justify-center py-2 gap-x-1 gap-y-3 sm:gap-x-2 lg:justify-start">
          <Link
            className="group relative isolate flex flex-none items-center gap-x-3 rounded-lg px-2 py-0.5 font-medium text-white/30 transition-colors hover:text-primary-200"
            href="https://discord.com/invite/77guznJ8mZ"
            target="_blank"
          >
            <svg className='w-6 h-6' viewBox="0 0 256 209" xmlns="http://www.w3.org/2000/svg">
              <path fill="#55acee" d="M256 25.45a105.04 105.04 0 0 1-30.166 8.27c10.845-6.5 19.172-16.793 23.093-29.057a105.183 105.183 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52c0 4.117.465 8.125 1.36 11.97c-43.65-2.191-82.35-23.1-108.255-54.876c-4.52 7.757-7.11 16.78-7.11 26.404c0 18.222 9.273 34.297 23.365 43.716a52.312 52.312 0 0 1-23.79-6.57c-.003.22-.003.44-.003.661c0 25.447 18.104 46.675 42.13 51.5a52.592 52.592 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475c-17.975 14.086-40.622 22.483-65.228 22.483c-4.24 0-8.42-.249-12.529-.734c23.243 14.902 50.85 23.597 80.51 23.597c96.607 0 149.434-80.031 149.434-149.435c0-2.278-.05-4.543-.152-6.795A106.748 106.748 0 0 0 256 25.45"/>
            </svg>
            <span className="self-baseline text-white">Twitter</span>
          </Link>
          <Link
            className="group relative isolate flex flex-none items-center gap-x-3 rounded-lg px-2 py-0.5 font-medium text-white/30 transition-colors hover:text-primary-200"
            href="https://discord.com/invite/77guznJ8mZ"
            target="_blank"
          >
            <svg className='h-6 w-6' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#22c55e" d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7L4 8v10h16V8l-8 5Zm0-2l8-5H4l8 5ZM4 8V6v12V8Z"/>
            </svg>
            <span className="self-baseline text-white">Suggestions</span>
          </Link>
          <div className="mx-2 h-[30px] w-[0.5px] rotate-[20deg] transform bg-neutral-200"></div>
          <div className="flex items-center gap-x-1">
            <span className="text-white">Made with</span>
            <Icon icon={IconCatalog.heart} className="h-4 w-4 text-red-500" isSolid />
            <span className="text-white">by </span>
            <Link
              className="font-medium text-white underline decoration-dashed decoration-0 underline-offset-4 transition-colors hover:text-green-300"
              href="https://github.com/Indie-Creator-Community"
              target="_blank"
            >
              Juan Lopez
            </Link>
          </div>
        </div>
  )
}

export default Footer