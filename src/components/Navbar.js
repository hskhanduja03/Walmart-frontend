import React, { useRef, useContext, useState, useEffect } from "react";
import "../index.css";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import Usercontext from "../Context/Usercontext";
import TopLoader from 'react-top-loading-bar'
// import { ToastContainer, Bounce, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const { userloggedin } = useContext(Usercontext);
  const [logincheck, setLogincheck] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    if (userloggedin !== null) {
      setLogincheck(false);
    } else {
      setLogincheck(true);
    }
  }, [userloggedin]);

  const handlelogout = () => {
    localStorage.removeItem("token");
    setLoading(true);
      setProgress(90);

    setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace("http://localhost:3000/");
    }, 100);
    setProgress(100); // Complete the progress bar
    setLoading(false);
  };
  const ref = useRef();

  const toggle = () => {
    setIsOpen(!isOpen)
    if (ref.current.classList.contains("block")) {
      ref.current.classList.remove("block");
      ref.current.classList.add("hidden");
    } else if (!ref.current.classList.contains("block")) {
      ref.current.classList.remove("hidden");
      ref.current.classList.add("block");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // console.log(userloggedin)
  return (
    <>

      <div className="bg-white sticky top-0 w-full z-20 shadow-md overflow-x-hidden">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3">
            <img src="logo512.png" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Walmart
            </span>
          </Link>
          {userloggedin && (
            <div className="block md:hidden py-2 ml-auto text-gray-900 rounded font-semibold mt-1">
              {userloggedin.name}
            </div>
          )}
          <button
            onClick={toggle}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                  <Link
                    to="/inventory"
                    
                    className="  block py-2 px-3  rounded  md:border-0  md:p-0 mt-1 "
                  >
                <button disabled={logincheck} className="disabled:text-gray-400 text-gray-900" >
                    Dashboard
                </button>
                  </Link>
              </li>
              <li>
                {!userloggedin && (
                  <button className="inline-flex text-white items-center bg-cyan-500 border-0 py-1 px-3 focus:outline-none hover:bg-fuchsia-500 transition-all duration-700 rounded text-base mt-4 md:mt-0">
                    <Link to="/login">Login</Link>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                )}
              </li>
              {userloggedin && (
                <li>
                  <div className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 mt-1">
                    {userloggedin.name}
                  </div>
                </li>
              )}
              {userloggedin && (
                <button
                  onClick={handlelogout}
                  className="inline-flex text-white items-center bg-cyan-500 border-0 py-1 px-3 focus:outline-none hover:bg-fuchsia-500 transition-all duration-700 rounded text-base mt-4 md:mt-0"
                >
                  Logout
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className={`absolute bg-white w-40 top-2 right-0 transition ${!isOpen?'hidden' : "block"} z-30 `}
        id="navbar-default"
      >
        <span
          className="absolute top-1 right-2 cursor-pointer text-xl text-pink-500"
          onClick={toggle}
        >
          <IoCloseCircle />
        </span>
        <ul className="font-medium p-2 rounded-lg">
          <li>
            <Link
              to="/inventory"
              className="block py-2 px-2 text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 mt-1"
            >
              <button
               disabled={logincheck} 
               className="disabled:text-gray-400"
              >

              Dashboard
              </button>
            </Link>
          </li>
          {!userloggedin && (
            <button className="inline-flex text-white items-center bg-cyan-500 border-0 py-1 px-3 focus:outline-none hover:bg-fuchsia-500 transition-all duration-700 rounded text-base mt-4 md:mt-0">
              <Link to="/login">Login</Link>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          )}
          {userloggedin && (
            <button
              onClick={handlelogout}
              className="inline-flex text-white items-center bg-cyan-500 border-0 py-1 px-3 focus:outline-none hover:bg-fuchsia-500 transition-all duration-700 rounded text-base mt-4 md:mt-0"
            >
              Logout
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
