import Link from 'next/link'
import { api } from '~/utils/api'

interface Props {
    id: string
}
const PlansNav = ({id} : Props) => {
    const user = api.user.getById.useQuery({id: id})
        if(user.data?.plan !== 'Premium'){
            return (<>
                <Link href='https://eatfix.lemonsqueezy.com/checkout/buy/f40a9852-e2dc-4aa7-b2b5-385385109021'>
                <button id='diet' className='hidden md:flex gap-2 items-center justify-center text-[#52878a] font-semibold border-[#10b981] border-2 rounded-md px-4 py-2 hover:bg-[#10b98123]'>
                    <label htmlFor='diet'>Upgrade to premium</label>
                    <svg className='w-6 h-6' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#10b981" d="M3.75 2a.75.75 0 0 0-.662.397l-2 3.75a.75.75 0 0 0 .071.815l6.25 8a.75.75 0 0 0 1.182 0l6.25-8a.75.75 0 0 0 .07-.815l-2-3.75A.75.75 0 0 0 12.25 2h-8.5Zm-.883 4L4.2 3.5h1.277L4.852 6H2.867Zm.616 1.5h1.544l1.029 3.293L3.483 7.5Zm3.115 0h2.804L8 11.986L6.598 7.5Zm4.375 0h1.544l-2.573 3.293l1.03-3.293Zm2.16-1.5h-1.985l-.625-2.5H11.8L13.133 6ZM9.602 6H6.398l.625-2.5h1.954L9.602 6Z"/>
                    </svg>
                </button>
                </Link>
            </>)
        } else {
            return <div></div>
        }
}

export default PlansNav