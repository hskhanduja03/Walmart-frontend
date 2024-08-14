import React from 'react'

function Dashboardcartup({num,title}) {
  return (
   <>
   <div className="p-4 w-4/5 md:w-2/5 lg:w-[27.333333%] ">
        <div className=" border-2 border-gray-200 bg-white border-opacity-60 rounded-lg overflow-hidden p-8 shadow-lg">
          <div className=" md:h-16 h-18 p-2 w-full object-cover object-center" >
            <h1 className=' flex h-full justify-center text-xl font-semibold'>{title}</h1>
          </div>
          <div className="w-full flex justify-center">
           
            <div className="mb-3 text- flex justify-center items-center px-8 md:px-0  text-4xl md:w-1/2 font-semibold text-dblue ">{num}</div>

          </div>
        </div>
      </div>
   </>
  )
}

export default Dashboardcartup