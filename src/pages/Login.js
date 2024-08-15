import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Usercontext from "../Context/Usercontext";
import TopLoader from "react-top-loading-bar";

function Login() {
  const user = useContext(Usercontext);
  const [redirect, setRedirect] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  // console.log(user)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState('');

  const handlechange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);

    if (e.target.name === "password") setPassword(e.target.value);
  };

  if (redirect) return <Navigate to={"/"}></Navigate>;

  const handlesubmit = async (e) => {
    e.preventDefault();
    const query = `
      mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    message
    token
    user {
      customerId
      gender
      name
      email
    }
  }
}
    `;
    //   const getCookie = (name) => {
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop().split(";").shift();
    //     return null;
    // };

    const variables = { email, password };

    try {
      setLoading(true);
      setProgress(70);
      const response = await fetch(
        "https://walmart-backend-7fgd.onrender.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        }
      );

      const result = await response.json();
      const { data } = result;
      // console.log(user.userloggedin)

      if (result.errors) {
        // setMessage(`Error: ${result.errors[0].message}`);
        toast.error(`Error: ${result.errors[0].message}`, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        // setMessage(result.data.login.message);

        user.setUserloggedin(data.login.user);
        const { token } = data.login;
        localStorage.setItem("token", token);
        // user.setUserloggedin(true)

        toast.success(result.data.login.message, {
          position: "top-left",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          setRedirect(true);
        }, 1500);

        // Handle successful login, e.g., save token to localStorage or context
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // setMessage(`Error: ${error.message}`);
    } finally {
      setProgress(100); // Complete the progress bar
      setLoading(false);
    }
  };
  return (
    <div className="font-[sans-serif]">
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce} 
        className={'z-50 top-14'}// Corrected prop syntax
      />
       <TopLoader
        progress={progress}
        color="#00bcd4"
        height={4}
        className="absolute top-16 left-0 right-0 z-0"
      />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Login to your Account
                </h3>
                <p className="text-sm mt-4 text-gray-800">
                  Don't have an account{" "}
                  <Link
                    to="/Sign"
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Sign up{" "}
                  </Link>
                </p>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    value={email}
                    onChange={handlechange}
                    name="email"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="mt-8">
                <label className="text-gray-800 text-xs block mb-2">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    onChange={handlechange}
                    value={password}
                    name="password"
                    type="password"
                    required
                    className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="button"
                  onClick={handlesubmit}
                  className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white transition-all hover:bg-fuchsia-500 bg-cyan-500 duration-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className="md:h-full  rounded-xl ">
            <img
              src="login.png"
              className="w-full h-full object-contain"
              alt="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
