import React from 'react'

function Submain({contactref}) {

    const handlecontact = ()=>{
        contactref.current?.scrollIntoView({behavior: 'smooth'});
    }
    return (
        <>
            <div className=' bg-gradient-to-r from-violet-200 to-pink-200'>
                <div className='md:grid md:grid-cols-2 container md:p-20 p-4 mx-auto' >
                    <div className='flex-row justify-center align-middle text-center md:w-3/5'>
                        <h1 className='text-4xl text-dr font-bold p-2 text-left mb-5  ' >AI-Powered Inventory Management for Sellers.</h1>
                        <p className='text-left p-2 mb-2 md:mb-0' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laboriosam, reiciendis enim nam quae excepturi dicta necessitatibus, nisi magnam vel nostrum labore. At adipisci minima mollitia labore molestias odit!</p>
                        <div className='grid grid-cols-2 gap-3 p-2'>

                        <button onClick={handlecontact} className="text-white items-center bg-gradient-to-r from-amber-500 to-pink-500 border-0 py-1  focus:outline-none hover:bg-yellow-600 rounded text-base mt-4 md:mt-0 "> Contact Us
                        </button>
                        <button className="text-white items-center bg-gradient-to-r from-amber-500 to-pink-500 border-0 py-1 focus:outline-none hover:bg-yellow-600 rounded text-base mt-4 md:mt-0"> <a href='/Dashboard' >Dashboard</a>
                        </button>
                        </div>
                    </div>
                    <div className='flex items-center md:w-4/5 rounded-3xl '>
                        <img className=' hover:scale-110 transition ease-in-out rounded shadow-big-r' src="ai.png" alt="ai" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Submain