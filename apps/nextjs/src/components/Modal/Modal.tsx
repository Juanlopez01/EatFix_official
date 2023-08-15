import React from 'react'

type Props = {
    children : React.ReactElement
    showModal: boolean
    setShowModal : React.Dispatch<React.SetStateAction<boolean>>
    title: string
}

const Modal = ({children, showModal, setShowModal, title} : Props) => {

  return (
    <>
    
    {showModal ? (
        <>
          <div
            className=" justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none md:items-center"
          >
            <div className="relative w-full px-6 my-6 mx-auto min-w-2xl md:px-24">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {title}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-90 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <svg className='w-6 h-6' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#10b981" d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm-26.34 138.34a8 8 0 0 1-11.32 11.32L128 139.31l-42.34 42.35a8 8 0 0 1-11.32-11.32L116.69 128L74.34 85.66a8 8 0 0 1 11.32-11.32L128 116.69l42.34-42.35a8 8 0 0 1 11.32 11.32L139.31 128Z"/>
                    </svg>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      </>
  )
}

export default Modal