import React, { useRef, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";

function Salestable2({tablestate,table2close}) {
    const [value, setValue] = useState(false);

    const closetable = useRef()

    const handleref = ()=>{

        if(closetable.current.classList.contains('flex'))
        {
            setValue(true)
            closetable.current.classList.remove('flex')
            closetable.current.classList.add('hidden')
        }
        else
        {
            closetable.current.classList.remove('hidden')
            closetable.current.classList.add('flex')
        } 
    }

    table2close(value)
  return (
    <>
    <div ref={closetable}  className='flex justify-center items-center absolute top-16 w-fit h-fit border-2 rounded-lg  m-20 bg-white '>

{/* <div className="  "> */}
<div className="w-full mx-auto overflow-auto">
    <div onClick={handleref} className='absolute flex right-5 -top-5 cursor-pointer' >
    <IoCloseOutline className='text-lg ' />
    </div>
      <table className="table-auto w-full text-center whitespace-no-wrap">
        <thead>
          <tr>
            <th className="sm:px-14 p-4 py-3 title-font tracking-wider font-medium text-gray-900 sm:text-lg bg-gray-100 rounded-tl rounded-bl text-center">
            ProductId
            </th>
            <th className="sm:px-14 p-4 py-3 title-font tracking-wider font-medium text-gray-900 sm:text-lg bg-gray-100 text-center">
            QuantitySold
            </th>
            <th className="sm:px-14 p-4 py-3 title-font tracking-wider font-medium text-gray-900 sm:text-lg bg-gray-100 text-center">
            SellingPrice
            </th>
            <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-lg bg-gray-100 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {tablestate ? tablestate.map((item) => (
            
            <tr key={item.productId}>
              <td className="px-4 py-3 text-center sm:text-lg">{item.productId}</td>
              <td className="px-4 py-3 text-center sm:text-lg ">{item.sellingPrice}</td>
              <td className="px-4 py-3 text-center sm:text-lg ">{item.quantitySold}</td>
            </tr>
          )) : "Loading..."}
        </tbody>
      </table>
    </div>
{/* </div> */}
  </div>
    </>
  )
}

export default Salestable2