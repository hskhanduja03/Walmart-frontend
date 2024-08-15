import React, { useEffect, useRef, useState } from "react";
import Submain2 from "./Submain2";
import Contactus from "./Contactus";
import ScrollAnimation from "./scrollAnimation";
import Submain3 from "./Submain3";

function Main2() {
  const contactref = useRef(null);

  return (
    <div>
      <ScrollAnimation triggerOnce={true}>
        <Submain2 contactref={contactref} />
      </ScrollAnimation>
      <div className="flex justify-center mt-20">
        <ScrollAnimation triggerOnce={true}>
          <img
            src="/window.png"
            alt="window"
            width={1200}
            className="border-zinc-200 border-2 rounded-xl shadow-slate-400 shadow-xl z-20"
          />
        </ScrollAnimation>
      </div>

      {/* <ScrollAnimation triggerOnce={true}> */}
        <div className="mt-60 flex flex-col items-center w-full">
          <div className="font-semibold text-3xl text-slate-800 font-poppins border-b-4 border-cyan-500 text-center w-[200px]">
            Our Features
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-36 mt-8 w-full max-w-7xl">
            <div className="bg-rose-100 text-white text-center flex flex-col items-baseline rounded-xl p-10 hover:shadow-lg transition-shadow duration-300">
              <img
                src="/feature3.png"
                width={90}
                alt="AI-Powered Forecasting"
                className="mb-4 bg-transparent shadow-feature1 rounded-full"
              />
              <div className="font-semibold font-poppins text-3xl text-slate-800 border-b-4 border-rose-300 pb-2 w-48 text-left">
                AI-Powered Forecasting
              </div>
              <div className="text-slate-500 text-left mt-6 font-medium text-lg">
                Accurately predict future demand with our advanced AI
                algorithms, helping you stay ahead of market trends and optimize
                inventory levels.
              </div>
            </div>
            <div className="bg-sky-100 text-white text-center flex flex-col items-baseline rounded-xl p-10 hover:shadow-lg transition-shadow duration-300">
              <img
                src="/feature2.png"
                width={90}
                alt="AI-Powered Forecasting"
                className="mb-4 bg-transparent shadow-feature2 rounded-full"
              />
              <div className="font-semibold font-poppins text-3xl text-slate-800 border-b-4 border-blue-300 pb-2 w-48 text-left">
                Invoicing System
              </div>
              <div className="text-slate-500 text-left mt-6 font-medium text-lg">
                Streamline your billing process with automated, error-free
                invoices generated for every purchase and sale and transparent
                transactions.
              </div>
            </div>
            <div className="bg-green-100 text-white text-center flex flex-col items-baseline rounded-xl p-10 hover:shadow-lg transition-shadow duration-300">
              <img
                src="/feature1.png"
                width={90}
                alt="AI-Powered Forecasting"
                className="mb-4 bg-transparent shadow-feature3 rounded-full"
              />
              <div className="font-semibold font-poppins text-3xl text-slate-800 border-b-4 border-green-300 pb-2 w-48 text-left">
                Real-Time Stock Alert
              </div>
              <div className="text-slate-500 text-left mt-6 font-medium text-lg">
                Never run out of stock again with real-time alerts for low
                inventory levels, ensuring you can reorder products before it's
                too late.
              </div>
            </div>
          </div>
        </div>
      {/* </ScrollAnimation> */}
            <ScrollAnimation triggerOnce={true}>
        <div className={`mt-60`}>
               <Submain3/>
        </div>
            </ScrollAnimation>

        {/* <hr className="w-[80%] mx-auto mt-40 "/> */}
      <div ref={contactref} className="mt-60">
        <Contactus />
      </div>
    </div>
  );
}

export default Main2;