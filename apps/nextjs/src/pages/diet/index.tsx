import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, ButtonVariant } from 'side-ui'
import DietCounter from '~/components/DietCounter/DietCounter'
import Footer from '~/components/Footer/Footer'
import Modal from '~/components/Modal/Modal'
import NavBar from '~/components/NavBar/NavBar'
import PdfComponent from '~/components/PDF/PdfComponent'
import { api } from '~/utils/api'
import { countries, goalsForm, pricesForm, sizesForm, typeDescriptions, typeOfDiets } from '~/utils/formUtils'
import {PDFDownloadLink} from '@react-pdf/renderer'
const weeklyDietExample = {
  Monday: {
    breakfast: "Croissant with butter",
    lunch: "Steak frites",
    snack: "Camembert cheese",
    dinner: "Ratatouille"
  },
  Tuesday: {
    breakfast: "Pain au chocolat",
    lunch: "Nicoise salad",
    snack: "Baguette with brie",
    dinner: "Coq au vin"
  },
  Wednesday: {
    breakfast: "Omelette with mushrooms",
    lunch: "Quiche Lorraine",
    snack: "Goat cheese tart",
    dinner: "Bouillabaisse"
  },
  Thursday: {
    breakfast: "Yogurt with honey",
    lunch: "Cassoulet",
    snack: "Croque-monsieur",
    dinner: "Duck confit"
  },
  Friday: {
    breakfast: "Fruit salad",
    lunch: "Salade Lyonnaise",
    snack: "Escargots",
    dinner: "Moules marinière"
  },
  Saturday: {
    breakfast: "Croissant with ham and cheese",
    lunch: "Bouillabaisse",
    snack: "Foie gras",
    dinner: "Beef bourguignon"
  },
  Sunday: {
    breakfast: "French toast",
    lunch: "Pot-au-feu",
    snack: "Tarte Tatin",
    dinner: "Cassoulet"
  }
}

const Diet : NextPage = () => {
  const {data: session} = useSession()
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [counter, setCounter] = useState(0)
  const initialState = {
    type: 'Normal',
    age: 0,
    size: 'Average',
    goal: 'Any',
    country: 'Other',
    price:'Normal',
    dontuse: '',
    preferences:'',
    userId: '',
    dietQuota:counter,
  }
  const [responseStatus, setResponseStatus] = useState(false)
  const [weeklyDiet, setWeeklyDiet] = useState(weeklyDietExample)
  const [form, setForm ] = useState(initialState)
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    if(session && session.user.id) setForm({...form, userId: session.user.id, dietQuota: counter});
  }, [session, counter])
  const {mutate: createDietApi, isLoading} = api.diet.createDiet.useMutation({
    onSuccess: (data) => {
      setWeeklyDiet(data?.data.dietResponse)
      setResponseStatus(true)
      setForm({...initialState, userId: form.userId})
      setCounter(counter - 1)
    },
    onError: () => setShowErrorModal(true),
  })
  
  if(session){
      
      const handleChange = (event : {target: {id: string, value : string }}) => {
        event.target.id === 'age' ?
        setForm({...form, [event.target.id]: parseInt(event.target.value)}) :
        setForm({...form, [event.target.id]: event.target.value.toString()}) ;
      }
      
      const handleSubmit = (e: any) => {
        e.preventDefault();
        if(session?.user.id !== ''){
          if(form.userId !== '') createDietApi(form);
        }else {
          void(signIn('auth0'))
        }
      }
      
    return (
      <div className='flex flex-col items-center bg-gradient-to-b from-gray-200 relative to-[#558F92] h-min md:min-h-screen md:justify-between'>
      <NavBar />
      <div className='w-3/4  flex flex-col items-center justify-center pt-20 gap-4 '>
        <h2 className='text-[#3a6062] font-bold text-3xl md:text-5xl'>Diet form</h2>
        <span> Want to know more about diets? <button onClick={() => setShowModal(true)} className='text-blue-800 underline'>Click here</button></span>
        <DietCounter number={counter} setCounter={setCounter} id={session.user.id}/>
        <form className='flex flex-col w-[95%] items-center justify-center' onSubmit={handleSubmit}>
          <div className='w-full md:flex md:gap-8'>
            <div className='w-full'>
              <label htmlFor='type' className="text-base font-medium text-[#3a6062] pt-4"> Type of diet </label>
              <div className="mb-2">
                  <select
                      onChange={handleChange}
                      value={form.type}
                      id="type"
                      placeholder="Select a type"
                      className="block w-full p-4 text-[#3a6062] placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
                  >
                    {typeOfDiets.map((diet :string) => {
                      return <option value={diet} key={diet}>{diet}</option>;
                    })}
                  </select>
                  <Modal showModal={showModal} setShowModal={setShowModal} title='Diet`s types'>
                    <div className=''>
                      <ul>
                        {typeOfDiets.map((type, index) => {
                          return <li key={type} className='py-1'><span className='font-semibold'>{`${type}`}</span> {`: ${typeDescriptions[index]}`}</li>
                        })}
                      </ul>
                    </div>
                  </Modal>
                  <Modal showModal={showErrorModal} setShowModal={setShowErrorModal} title='Error'>
                        <div>
                          <span>You have no remaining diets</span>
                        </div>
                  </Modal>
              </div>
              <label htmlFor='age'  className="text-base font-medium text-[#3a6062] pt-4"> Age </label>
              <div className="mb-2.5">
                  <input
                      type="number"
                      onChange={handleChange}
                      value={form.age.valueOf()}
                      id="age"
                      placeholder="Enter your age"
                      className="block w-full p-4 text-[#3a6062] placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
                  />
              </div>
              <label htmlFor='weight' className="text-base font-medium text-[#3a6062] pt-4"> Size </label>
              <div className="mb-2.5">
                  <select
                      onChange={handleChange}
                      value={form.size}
                      id="size"
                      placeholder="Enter your weight"
                      className="block w-full p-4 text-[#3a6062] placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
                  >
                    {sizesForm.map((size : string) => {
                      return <option value={size} key={size}>{size}</option>
                    })}
                  </select>
              </div>
              <label htmlFor='height' className="text-base font-medium text-[#3a6062]"> Goal </label>
              <div className="">
                  <select
                      onChange={handleChange}
                      value={form.goal}
                      id="goal"
                      placeholder="Enter your goal"
                      className="block w-full p-4 text-[#3a6062] placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
                  >
                    {goalsForm.map((goal: string) => {
                      return <option value={goal} key={goal}>{goal}</option>
                    })}
                  </select>
              </div>
            </div>
  
            <div className='w-full pt-2 md:pt-0'>
              <label htmlFor='country' className="text-base font-medium text-[#3a6062] pt-4"> Country </label>
              <div className="mb-2.5">
                  <select
                      onChange={handleChange}
                      value={form.country}
                      id="country"
                      placeholder="Enter email to get started"
                      className="block w-full p-4 text-[#3a6062] placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
                  >
                    {countries.map((country : string) => {
                      return <option value={country} key={country}>{country}</option>
                    })}
                  </select>
              </div>
              <label htmlFor='price' className="text-base font-medium text-[#3a6062] pt-4"> Cost </label>
              <div className="mb-2.5">
                  <select
                      onChange={handleChange}
                      value={form.price}
                      id="price"
                      placeholder="Enter email to get started"
                      className="block w-full p-4 text-[#3a6062] placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
                  >
                    {pricesForm.map((price: string) => {
                      return <option value={price} key={price}>{price}</option>
                    })}
                  </select>
              </div>
              <label htmlFor='dontuse' className="text-base font-medium text-[#3a6062] pt-4"> Foods to avoid </label>
              <div className="mb-2.5">
                  <input
                      type="text"
                      onChange={handleChange}
                      value={form.dontuse}
                      id="dontuse"
                      placeholder="Indicates the foods to avoid"
                      className="block w-full p-4 text-[#3a6062] placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
                  />
              </div>
              <label htmlFor='preferences' className="text-base font-medium text-[#3a6062] pt-4"> Preferences </label>
              <div className="mb-2.5">
                  <input
                      type="text"
                      onChange={handleChange}
                      value={form.preferences}
                      id="preferences"
                      placeholder="Indicate your preferences"
                      className="block w-full p-4 text-[#3a6062] placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-transparent focus:outline-none focus:border-green-300 focus:bg-transparent caret-green-300"
                  />
              </div>
            </div>
          </div>
          {responseStatus && <PDFDownloadLink document={<PdfComponent weeklyDiet={weeklyDiet} />}>
          <button className="mt-7 cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-[#3a3370] text-white hover:bg-[#6459b3] focus:bg-[#6459b3] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Download"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#f1f1f1" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" id="Vector"></path> </g> </g></svg>
            Download
          </button>
            </PDFDownloadLink>}
          {!responseStatus && <Button variant={ButtonVariant.secondary} isLoading={isLoading} className='mt-7 inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold rounded-md transition-all bg-[#3a3370] text-white hover:bg-[#6459b3] focus:bg-[#6459b3]' type='submit'>
            {isLoading ? 
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                  <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span>
              </div> 
              :'Generate diet'}
              </Button>}
        </form>
      </div>
      <Footer />
      </div>
    )

  } else {
    return(
    <div>
      <Link href='/'>Go to home page</Link>
    </div>)
  }
}

export default Diet