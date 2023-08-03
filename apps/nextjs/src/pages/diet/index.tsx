import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Button, ButtonVariant } from 'side-ui'
import NavBar from '~/components/NavBar/NavBar'
import { api } from '~/utils/api'
import { pricesForm, typeOfDiets } from '~/utils/formUtils'

type Props = {}


const index = (props: Props) => {
  const {data: session} = useSession()
  const initialState = {
    type: 'Normal',
    age: 0,
    weight:0,
    height:0,
    country: '',
    price:'Normal',
    dontuse: '',
    preferences:'',
    userId: '', 
  }
    const {mutate: createDietApi} = api.diet.createDiet.useMutation({
      onSuccess: () => setForm({...initialState, userId: form.userId}),
      onError: () => console.log('estoy aca')
    })
    const [form, setForm ] = useState(initialState)
    useEffect(() => {
      if(session && session.user.id) setForm({...form, userId: session.user.id});

    }, [session])
    const {data} = api.diet.getDiets.useQuery()
    const handleChange = (event: any) => {
      event.preventDefault();
      event.target.id === 'age' || event.target.id === 'height' || event.target.id === 'weight' ?
      setForm({...form, [event.target.id]: parseInt(event.target.value)}) :
      setForm({...form, [event.target.id]: event.target.value}) ;
    }
    
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      if(session?.user.id !== ''){
        if(form.userId !== '') createDietApi(form);
      }else {
        signIn('auth0')
      }
    }

  return (
    <div className='bg-gradient-to-b from-[#101212] relative to-[#08201D] h-min'>
    <NavBar />
    <div className=' flex flex-col items-center justify-center pt-20 gap-6'>
      <h2 className='text-transparent bg-clip-text bg-gradient-to-b from-green-300 to-white font-bold text-3xl'>Diet form</h2>
      <form className='flex flex-col w-3/4 items-center justify-center' onSubmit={handleSubmit}>
        <div className='w-full'>
          <label htmlFor="" className="text-base font-medium text-green-300 pt-4"> Type of diet </label>
          <div className="mt-2">
              <select
                  onChange={handleChange}
                  value={form.type}
                  id="type"
                  placeholder="Enter email to get started"
                  className="block w-full p-4 text-green-300 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
              >
                {typeOfDiets.map((diet :string) => {
                  return <option className='bg-[#101212]' value={diet}>{diet}</option>;
                })}
              </select>
          </div>
          <label htmlFor="" className="text-base font-medium text-green-300 pt-4"> Age </label>
          <div className="mt-2.5">
              <input
                  type="number"
                  onChange={handleChange}
                  value={form.age.valueOf()}
                  id="age"
                  placeholder="Enter email to get started"
                  className="block w-full p-4 text-green-300 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
              />
          </div>
          <label htmlFor="" className="text-base font-medium text-green-300 pt-4"> Weight (kg) </label>
          <div className="mt-2.5">
              <input
                  type="number"
                  onChange={handleChange}
                  value={form.weight}
                  id="weight"
                  placeholder="Enter email to get started"
                  className="block w-full p-4 text-green-300 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
              />
          </div>
          <label htmlFor="" className="text-base font-medium text-green-300 pt-4"> Height (cm) </label>
          <div className="mt-2.5">
              <input
                  type="number"
                  onChange={handleChange}
                  value={form.height}
                  id="height"
                  placeholder="Enter email to get started"
                  className="block w-full p-4 text-green-300 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
              />
          </div>
        </div>

        <div className='w-full'>
          <label htmlFor="" className="text-base font-medium text-green-300 pt-4"> Country </label>
          <div className="mt-2.5">
              <input
                  type="text"
                  onChange={handleChange}
                  value={form.country}
                  id="country"
                  placeholder="Enter email to get started"
                  className="block w-full p-4 text-green-300 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
              />
          </div>
          <label htmlFor="" className="text-base font-medium text-green-300 pt-4"> Price </label>
          <div className="mt-2.5">
              <select
                  onChange={handleChange}
                  value={form.price}
                  id="price"
                  placeholder="Enter email to get started"
                  className="block w-full p-4 text-green-300 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
              >
                {pricesForm.map((price: string) => {
                  return <option className='bg-[#101212]' value={price}>{price}</option>
                })}
              </select>
          </div>
          <label htmlFor="" className="text-base font-medium text-green-300 pt-4"> Foods to avoid </label>
          <div className="mt-2.5">
              <input
                  type="text"
                  onChange={handleChange}
                  value={form.dontuse}
                  id="dontuse"
                  placeholder="Enter email to get started"
                  className="block w-full p-4 text-green-300 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
              />
          </div>
          <label htmlFor="" className="text-base font-medium text-green-300 pt-4"> Preferences </label>
          <div className="mt-2.5">
              <input
                  type="text"
                  onChange={handleChange}
                  value={form.preferences}
                  id="preferences"
                  placeholder="Enter email to get started"
                  className="block w-full p-4 text-green-300 placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
              />
          </div>
        </div>
        <Button variant={ButtonVariant.discord} type='submit'>Generate diet</Button>
      </form>
    </div>
    </div>
  )
}

export default index