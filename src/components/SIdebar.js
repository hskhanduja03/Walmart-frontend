import React, { useRef, useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";

function SIdebar({ setinv, setSales, setpro, newpro, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const sideref = useRef(null);
  const buttonRef = useRef(null);

  const togglesidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sideref.current &&
      !sideref.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Button to toggle sidebar */}
      <div className="fixed left-5 sm:top-[5.5rem] top-[6rem] bg-white rounded-md border-2 z-50">
        <button
          onClick={togglesidebar}
          className="top-2 h-6 w-6 p-[6px] cursor-pointer flex items-center justify-center rounded-full"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sideref}
        className={`bg-[#f7f7f8] h-screen w-[250px]  px-4 font-[sans-serif] transition-transform duration-300 ease-in-out  top-16 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-10 `}
      >
        <div className="lg:left-48 z-20">
          <button
            onClick={togglesidebar}
            className="py-10 h-6 w-6 cursor-pointer flex items-center justify-center rounded-full"
          >
            <IoIosClose className="text-4xl" />
          </button>
        </div>

        <div className="overflow-auto py-6 h-full \">
          <ul className="space-y-1">
            <li>
              <button className={`${isActive === "/inventory"?'bg-gray-300':''} text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all cursor-pointer w-full`}>
                <Link className="flex " to={"/inventory"}>
                  <svg
                    className="w-[36px] h-[24px] "
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 7v11.6c0 1.33-1.07 2.4-2.4 2.4H5.4C4.07 21 3 19.93 3 18.6V7"
                      fill="#000000"
                      fillOpacity=".16"
                    />
                    <path
                      d="M21 7v11.6c0 1.33-1.07 2.4-2.4 2.4H5.4C4.07 21 3 19.93 3 18.6V7"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M21.4 3H2.6A1.6 1.6 0 0 0 1 4.6v.8A1.6 1.6 0 0 0 2.6 7h18.8A1.6 1.6 0 0 0 23 5.4v-.8A1.6 1.6 0 0 0 21.4 3Z"
                      fill="#ffffff"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M8 11h8"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className={
                      isActive === "/inventory"
                        ? "text-gray-900 font-semibold"
                        : ""
                    }
                  >
                    Inventory
                  </span>
                </Link>
              </button>
            </li>

            <li>
              <button className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all w-full ${isActive === "/purchases"?'bg-gray-300':''}`}>
                <Link className="flex" to={"/purchases"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 511.877 511.877"
                  >
                    <path
                      d="M442.706 340.677c-11-68.6-93.8-175.7-120.1-208.2 4.2-3.5 6.9-8.7 6.9-14.6 0-4.2-1.4-8-3.7-11.1 2.3-3.1 3.7-7 3.7-11.1 0-6.6-3.4-12.4-8.5-15.7 8.1-33.1 31.3-59.5 32.4-60.7.8-.9 1.3-1.9 1.6-3 .7-2.4.1-5.1-1.5-7.1-1-1.2-2.3-2.1-3.8-2.5-63.1-17.5-114.9 4.1-129.7 11.4-12.3-7.5-24.5-14-39.9-16.2-5-.7-10.1-1-15.7-1a7.719 7.719 0 0 0-6.9 11.2s.6 1.1 1 1.6c.3.3 26.7 31.7 35.2 66.2-5.1 3.4-8.5 9.2-8.5 15.7 0 4.2 1.4 8 3.7 11.1-2.3 3.1-3.7 7-3.7 11.1 0 5.1 2 9.7 5.3 13.1-25.1 31-110.2 140-121.3 209.8-1.2 5.8-17.4 86.9 23.1 135.8 19.4 23.5 48.5 35.4 86.4 35.4 1.5 0 2.9 0 4.4-.1h145.7c1.5 0 3 .1 4.4.1 37.9 0 66.9-11.9 86.4-35.4 40.4-48.9 24.3-130 23.1-135.8zm-239.2-219.5h-.1c-1.6-.3-2.7-1.7-2.7-3.3 0-1.9 1.5-3.4 3.4-3.4h106.6c1.9 0 3.4 1.5 3.4 3.4s-1.5 3.4-3.4 3.4h-106.7c-.2-.1-.3-.1-.5-.1zm-2.9-25.6c0-1.8 1.5-3.3 3.3-3.4h106.7c1.8 0 3.3 1.5 3.3 3.4s-1.5 3.4-3.4 3.4h-106.5c-1.9 0-3.4-1.5-3.4-3.4zm124.3-78.4c-1.1.7-2.2 1.4-3.2 2.1 0 0-.1.1-.2.1-2.3 1.5-4.5 2.9-6.8 4.3-9.5 5.8-19.2 9.3-29.5 10.9-11.2 1.7-22.9 1.1-33.9-1.5-4.8-1.2-9.4-2.8-14.2-5.1-.2-.1-.3-.2-.5-.2 17.1-6.9 49.6-16.2 88.3-10.6zm-106.8 17.9 1.3.8c9.7 6 18.7 9.9 28.2 12.2 12.9 3.1 26.7 3.7 39.8 1.8 12-1.8 23.1-5.8 34.1-12.2-6.2 11-12.3 24.4-15.9 39.1h-96.9c-5.7-23.4-18.7-45.4-28.1-59 13.7 2.5 24.8 9.4 37.5 17.3zm189.5 431.5c-17 20.6-43.5 30.6-78.5 29.7h-146.3c-35.1.8-61.5-9.1-78.5-29.7-36.3-43.7-20.1-122.1-19.9-122.9 0-.1.1-.3.1-.4 10.9-69.1 104.5-186 121.3-206.6h100.3c16.5 20.1 110.4 137.4 121.3 206.6 0 .1 0 .3.1.4.1.8 16.4 79-19.9 122.9zm-151.7-233.7c-46.1 0-83.6 37.5-83.6 83.6s37.5 83.6 83.6 83.6 83.6-37.5 83.6-83.6c.1-46.1-37.5-83.6-83.6-83.6zm0 151.7c-37.6 0-68.1-30.6-68.1-68.1s30.6-68.1 68.1-68.1 68.1 30.5 68.1 68.1-30.5 68.1-68.1 68.1zm28.1-53.6c0 11.6-9 21.2-20.3 22.1v4c0 4.3-3.5 7.8-7.8 7.8s-7.8-3.5-7.8-7.8v-3.9h-5.5c-4.3 0-7.8-3.5-7.8-7.8s3.5-7.8 7.8-7.8h19.1a6.7 6.7 0 0 0 0-13.4h-11.7c-12.3 0-22.2-10-22.2-22.2 0-11.6 9-21.2 20.3-22.1v-4c0-4.3 3.5-7.8 7.8-7.8s7.8 3.5 7.8 7.8v3.9h5.5c4.3 0 7.8 3.5 7.8 7.8s-3.5 7.8-7.8 7.8h-19.1a6.7 6.7 0 0 0 0 13.4h11.7c12.2-.1 22.2 9.9 22.2 22.2z"
                      data-original="#000000"
                    />
                  </svg>
                  <span
                    className={
                      isActive === "/purchases"
                        ? "text-gray-900 font-semibold"
                        : ""
                    }
                  >
                    Purchases
                  </span>
                </Link>
              </button>
            </li>

            <li>
              <button className={`text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all w-full ${isActive === "/sales"?'bg-gray-300':''}`}>
                <Link className="flex" to={"/sales"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 193.769 193.769"
                  >
                    <path
                      d="m149.203 41.104-9.348 12.009c20.15 15.679 30.201 41.063 26.234 66.253-2.906 18.484-12.838 34.73-27.964 45.748-15.131 11.012-33.64 15.488-52.124 12.567-38.157-6.008-64.32-41.938-58.322-80.098C30.585 79.097 40.52 62.85 55.648 51.835c13.208-9.615 28.991-14.233 45.086-13.317L87.579 52.319l9.759 9.313 20.766-21.801.005.008 9.303-9.769-9.752-9.303-.005.003L95.862 0l-9.31 9.769 14.2 13.525c-19.303-.913-38.21 4.702-54.059 16.242C28.28 52.943 16.19 72.717 12.65 95.221c-7.302 46.445 24.54 90.184 70.985 97.493a86.181 86.181 0 0 0 13.434 1.055c17.89 0 35.273-5.623 50.011-16.356 18.415-13.409 30.503-33.183 34.043-55.682 4.829-30.654-7.403-61.55-31.92-80.627z"
                      data-original="#000000"
                    />
                    <path
                      d="M105.24 151.971v-.003h.001v-8.757c10.383-1.159 20.485-7.718 20.485-20.17 0-16.919-15.732-18.859-27.223-20.274-7.347-.878-12.97-1.897-12.97-6.348 0-6.188 8.722-6.855 12.473-6.855 5.567 0 11.507 2.617 13.525 5.957l.586.971 11.542-5.341-.571-1.164c-4.301-8.793-12.009-11.337-17.85-12.364v-7.71H91.723v7.677c-12.582 1.856-20.054 8.839-20.054 18.829 0 16.29 14.791 17.943 25.582 19.153 9.617 1.134 14.094 3.51 14.094 7.469 0 7.563-10.474 8.154-13.685 8.154-7.147 0-14.038-3.566-16.031-8.301l-.495-1.169-12.539 5.316.5 1.169c3.713 8.691 11.725 14.137 22.63 15.425v8.336h13.515z"
                      data-original="#000000"
                    />
                  </svg>
                  <span
                    className={
                      isActive === "/sales" ? "text-gray-900 font-semibold" : ""
                    }
                  >
                    Sales
                  </span>
                </Link>
              </button>
            </li>

            <li>
              <button className={` ${isActive === "/add-products"?'bg-gray-300':''} text-black hover:text-blue-600 text-[15px] flex items-center hover:bg-white rounded px-4 py-3 transition-all cursor-pointer w-full`}>
                <Link className="flex" to={"/add-products"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z"
                      data-original="#000000"
                    />
                    <path
                      d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z"
                      data-original="#000000"
                    />
                    <path
                      d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z"
                      data-original="#000000"
                    />
                  </svg>
                  <span
                    className={
                      isActive === "/add-products"
                        ? "text-gray-900 font-semibold"
                        : ""
                    }
                  >
                    Add Products
                  </span>
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SIdebar;
