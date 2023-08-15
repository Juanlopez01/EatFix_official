import React from 'react'
import { api } from '~/utils/api'

type Props = {
    number: number | undefined,
    id: string,
    setCounter: React.Dispatch<React.SetStateAction<number>>
}

const DietCounter = (props: Props) => {
  const {data} = api.user.getById.useQuery({id: props.id})
  if(data){
    props.setCounter(data.dietQuota)
    return (
      <div className='flex gap-2 items-center justify-center text-[#52878a] font-semibold border-[#10b981] border-2 rounded-md px-4 py-2'>
          <span>Diets left: {props.number}</span>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default DietCounter