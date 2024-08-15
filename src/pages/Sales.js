import React, { useEffect, useState } from "react";
import SIdebar from "../components/SIdebar";
import TopLoader from 'react-top-loading-bar'

function Sales() {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  // console.log(userId)

  useEffect(() => {
    // setUserId(userloggedin.customerId);
    const fetchSalesDetails = async () => {
      setLoading(true);
      setProgress(70);

      const query = `
     query GetAllSales {
        sales {
          totalAmount
          cumulativeDiscount
          freightPrice
          storeId
          address
          paymentType
          saleType
          saleDate
         
        }
      }

      `;

      // const variables = { userId };

      try {
        const response = await fetch(
          "https://walmart-backend-7fgd.onrender.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              query,
            }),
          }
        );

        const result = await response.json();
        // console.log(result);
        
        if (result.errors) {
          setError(result.errors[0].message);
        } else {
          setSales(result.data.sales);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setProgress(100); // Complete the progress bar
        setLoading(false);
      }
    };

    fetchSalesDetails();
  }, []);

  // console.log(sales);

  return (
    <>
      <SIdebar />
      <section className="text-gray-600 body-font h-screen">
      <TopLoader
        progress={progress}
        color="#00bcd4"
        height={4}
        className="absolute top-16 left-0 right-0 z-50"
      />
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full">
            {/* <header className="text-gray-600 body-font mx-auto">
  <div className=" mx-auto flex flex-wrap p-5 flex-col md:flex-row mt-20 justify-center">

    <nav className="mr-auto flex flex-wrap  text-base justify-start">
      <a href='/' className="mr-5 hover:text-gray-900">All Transactions</a>
      <a href='/' className="mr-5 hover:text-gray-900">Sales</a>
      <a href='/' className="mr-5 hover:text-gray-900">Purchases</a>
    </nav>
  </div>
</header> */}

            {/* <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p> */}
          </div>
          <div className="w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-center whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl text-center">
                    Amount
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
                    CumulativeDiscount
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
                    FreightPrice
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
                    PaymentType
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
                    SaleDate
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
                    StoreId
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br text-center"></th>
                </tr>
              </thead>
              <tbody>
                {sales ? sales
                .filter((item) => item.saleType === 'SALE') 
                .map((item) => (
                  
                  <tr key={item.storeId}>
                    <td className="px-4 py-3 text-center">₹{item.totalAmount}</td>
                    <td className="px-4 py-3 text-center">{item.cumulativeDiscount}</td>
                    <td className="px-4 py-3 text-center">{item.freightPrice}</td>
                    <td className="px-4 py-3 text-center text-gray-900">{item.paymentType}</td>
                    <td className="px-4 py-3 text-center text-gray-900">{item.saleDate}</td>
                    <td className="px-4 py-3 text-center text-gray-900">{item.storeId}</td>
                  </tr>
                )) : "Loading..."}
              </tbody>
            </table>
          </div>
          {/* <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
      <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </a>
      <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
    </div> */}
        </div>
      </section>
    </>
  );
}

export default Sales;