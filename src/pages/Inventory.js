import React, {useEffect, useState } from "react";
// import Dashboardcartup from "../components/Dashboardcartup";
import Dashboardcarddown from "../components/Dashboardcarddown";
import SIdebar from "../components/SIdebar";
import { Link, useLocation } from "react-router-dom";
import TopLoader from 'react-top-loading-bar'

// import Usercontext from "../Context/Usercontext";

function Inventory() {
  
  const [dashboardData, setDashboardData] = useState(null);
  // const [salesLength, setSalesLength] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const {pathname} = useLocation()
  const [isActive, setIsActive] = useState(false)

  // const [costomerid, setCostomerid] = useState();
  // const {userloggedin} = useContext(Usercontext)

  // console.log(userloggedin)
  useEffect(() => {
    setLoading(true);
    setIsActive(pathname)
    // console.log(process.env.REACT_APP_BACKEND_LINK)
      setProgress(70);
    const fetchData = async () => {
      // setCostomerid(userloggedin.customerId)
      const queryProducts = `query Products { 
        products {
          productName
          offerPercentage
          images
          sellingPrice
          weight
          productId
        }
      }`;

      // const querySalesLength = `query Query {
      //   salesLength
      // }`

      try {
        const [productsResponse] = await Promise.all([
          fetch(process.env.REACT_APP_BACKEND_LINK, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ query: queryProducts }),
          }),
          // fetch(process.env.REACT_APP_BACKEND_LINK, {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: `Bearer ${localStorage.getItem("token")}`,
          //   },
          //   body: JSON.stringify({
          //     query: querySalesLength, // Replace with actual customerId
          //   }),
          // }),
        ])

        if (!productsResponse.ok) {
          throw new Error("Network response was not ok");
        }
        
        const productsResult = await productsResponse.json();
        // const salesResult = await salesResponse.json();
        
        // console.log(salesResult)
        setDashboardData(productsResult.data.products);
        // setSalesLength(salesResult.data.salesLength);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally{
        setLoading(false);
      setProgress(100);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <>

      <SIdebar isActive={isActive}/>
      
      <h1 className="flex justify-center text-2xl font-semibold py-5">
      <TopLoader
        progress={progress}
        color="#00bcd4"
        height={4}
        className="absolute top-16 left-0 right-0 z-50"
      />
      
        Hey!, Name
      </h1>
      <section className="body-font ">
        <div className="lg:container md:px-3 py-10 lg:mx-auto bg-white border-2 rounded-xl">

          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:justify-center mx-4 ">
            {dashboardData
              ? dashboardData.map((prod) => (
                  <Link to={`/products/${prod.productId}`} key={prod.productId}>
                    <Dashboardcarddown
                      price={prod.sellingPrice}
                      name={prod.productName}
                      sales={prod.weight + " kg"}
                      image={prod.images || "tshirt.png"} // Use the image from product data
                    />
                  </Link>
                ))
              : "Loading..."}
          </div>
        </div>
      </section>
    </>
  );
}

export default Inventory;