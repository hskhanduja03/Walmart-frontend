import {React, useState, useEffect} from 'react'
import Dashboardcartup from '../components/Dashboardcartup'
import TopLoader from 'react-top-loading-bar'

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [salesLength, setSalesLength] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        setLoading(true);
          setProgress(70);
        const fetchData = async () => {

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
    
          const querySalesLength = `query Query {
            salesLength
          }`
    
          try {
            const [productsResponse, salesResponse] = await Promise.all([
              fetch(process.env.REACT_APP_BACKEND_LINK, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ query: queryProducts }),
              }),
              fetch(process.env.REACT_APP_BACKEND_LINK, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  query: querySalesLength, // Replace with actual customerId
                }),
              }),
            ])
    
            if (!productsResponse.ok) {
              throw new Error("Network response was not ok");
            }
            
            const productsResult = await productsResponse.json();
            const salesResult = await salesResponse.json();
            
            // console.log(salesResult)
            setDashboardData(productsResult.data.products);
            setSalesLength(salesResult.data.salesLength);
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
      <section className="topdasboard body-font">
      <TopLoader
        progress={progress}
        color="#00bcd4"
        height={4}
        className="absolute top-16 left-0 right-0 z-50"
      />
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {dashboardData && (
              <Dashboardcartup
                num={dashboardData.length}
                title={"Total listed products"}
              />
            )}
            {salesLength !== null && (
              <Dashboardcartup num={salesLength} title={"Total Sales"} />
            )}
          </div>
        </div>
      </section>

      <section>
        <div className=" grid grid-rows-2 md:grid-cols-2 m-5 gap-5">
            <div className="h-screen flex justify-center items-center border-2 " >
                graph1
            </div>
            <div className="h-screen flex justify-center items-center border-2 ">
                graph2
            </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard