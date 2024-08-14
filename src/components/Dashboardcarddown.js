import React from 'react'
import { Link } from 'react-router-dom'

function Dashboardcarddown({price, name, sales, image}) {
  return (
    <>
      <div className="lg:w-[95.333333%] md:w-[96.333333%] p-4 w-full bg-white m-4 shadow-lg hover:scale-105  transition-all ease-in-out border-2  rounded-xl mx-auto">
        <div className="flex  h-[20rem] overflow-hidden justify-center  rounded-xl ">
          <img alt="shoe" className="object-cover object-center w-2/3 h-full " src={image}/>
        </div>
        <div className="mt-4">
          <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>
          <p className="mt-1">Price: ₹{price}</p>
          <p className="mt-1">Sales: {sales} units</p>
        </div>
      </div>
    </>
  )
}

export default Dashboardcarddown