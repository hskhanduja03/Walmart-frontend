import React, { useEffect, useState } from "react";
import SIdebar from "../components/SIdebar";
import TopLoader from "react-top-loading-bar";
import { FaArrowRight } from "react-icons/fa";
import Salestable2 from "../components/Salestable2";
import { useLocation } from "react-router";

function Sales() {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tablestate, setTablestate] = useState([]);
  const [blurstate, setBlurstate] = useState(false);
  const {pathname} = useLocation()
  const [isActive, setIsActive] = useState(false)
  // console.log(userId)

  const table2close = (value) => {
    if (value) setBlurstate(false);
  };

  useEffect(() => {
    setIsActive(pathname)
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
          salesDetails {
            productId
            sellingPrice
            quantitySold
            }
            }
            }
            
            `;

      // const variables = { userId };

      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_LINK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            query,
          }),
        });

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

  const salesmoreInfo = (details) => {
    setTablestate(details);
    setBlurstate(true);
  };
  // console.log(tablestate);

  return (
    <>
      <SIdebar isActive={isActive} />
      <section className="text-gray-600 body-font h-screen ">
        <TopLoader
          progress={progress}
          color="#00bcd4"
          height={4}
          className="absolute top-16 left-0 right-0 z-50"
        />
        <div
          className={`container px-5 py-24 mx-auto ${
            blurstate ? "blur-sm" : "blur-0"
          }`}
        >
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
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 text-center">
                    More Info
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br text-center"></th>
                </tr>
              </thead>
              <tbody>
                {sales
                  ? sales
                      .filter((item) => item.saleType === "SALE")
                      .map((item) => (
                        <tr key={item.storeId}>
                          <td className="px-4 py-3 text-center">
                            ₹{item.totalAmount}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {item.cumulativeDiscount}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {item.freightPrice}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-900">
                            {item.paymentType}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-900">
                            {item.saleDate}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-900">
                            {item.storeId}
                          </td>
                          <td className=" flex px-4 py-3 justify-center text-center text-gray-900">
                            <button
                              disabled={blurstate}
                              onClick={() => salesmoreInfo(item.salesDetails)}
                              className="cursor-pointer hover:text-cyan-600 disabled:hover:text-black disabled:cursor-default"
                            >
                              <FaArrowRight />
                            </button>
                          </td>
                        </tr>
                      ))
                  : "Loading..."}
              </tbody>
            </table>
          </div>
        </div>

        {blurstate && (<div
          
          className='flex justify-center'>

          <Salestable2 
          tablestate={tablestate} 
          table2close={table2close}
          />
          </div>
        )} 
      </section>
    </>
  );
}

export default Sales;