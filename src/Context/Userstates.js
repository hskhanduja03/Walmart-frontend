import { useEffect, useState } from "react";
import Usercontext from "./Usercontext";
import axios from "axios";

const Userstate = (props) => {
  const [userloggedin, setUserloggedin] = useState(null);

  const validuser = () => {
    const token = localStorage.getItem("token");

    const validateQuery = `
      query ValidateToken($token: String!) {
        validateToken(token: $token) {
          valid
          user {
            customerId
            gender
            name
            email
          }
          message
        }
      }`;

    if (token) {
      // Validate token
      axios
        .post("https://walmart-backend-7fgd.onrender.com/graphql", {
          query: validateQuery,
          variables: { token },
        })
        .then((response) => {
          const { data } = response;
          if (data.errors || !data.data.validateToken.valid) {
            // Token is invalid, clear user context
            localStorage.removeItem("token");
            console.log("Invalid token, removed token from localStorage");
            setUserloggedin(null);
          } else {
            // Token is valid, set user context
            const user = data.data.validateToken.user;
            // console.log("Valid user found:", user);
            setUserloggedin(user);
          }
        })
        .catch((error) => {
          console.log("Error validating token:", error);
          localStorage.removeItem("token");
          setUserloggedin(null); // Clear user context
        });
    } else {
      // No token found, user is not logged in
      console.log("No token found, user not logged in");
      setUserloggedin(null);
    }
  };

  useEffect(() => {
    validuser(); // Check user validity on component mount
  }, []);

  return (
    <Usercontext.Provider value={{ userloggedin, validuser, setUserloggedin }}>
      {props.children}
    </Usercontext.Provider>
  );
};

export default Userstate;
