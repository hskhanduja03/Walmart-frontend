import React from 'react';
import { SiGooglegemini } from "react-icons/si";

function Aisuggetions({ isExpanded, prediction, predictionRF }) {
  return (
    <>
      <div
        className={`w-3/4 ${isExpanded ? 'h-24' : 'h-12'}  transition-all duration-300 ease-in-out login-form flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-300 to-sky-500 w-full px-4`}
      >
        {!isExpanded && (<> <SiGooglegemini className="text-lg text-white animate-pulse" />
            <p className="font-bold text-lg text-white"> AI recommendations</p>
            </>)

        }
      
        {isExpanded && (
          <div className="mt-2">
            <p className="text-white text-lg ">Units more to order : <span className='text-xl text-yellow-300'> {predictionRF} </span></p>

            <p className="text-white text-lg "> Suggested selling price: <span className='text-xl text-yellow-300'> {prediction} </span></p>
            
          </div>
        )}

      </div>

    </>
  );
}

export default Aisuggetions;