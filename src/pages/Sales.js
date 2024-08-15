import React, { useContext, useEffect, useState } from "react";
import SIdebar from "../components/SIdebar";
import Usercontext from "../Context/Usercontext";
// import LoadingBar from 'react-top-loading-bar'

function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState();
  const { userloggedin } = useContext(Usercontext);

  // console.log(userId)

  useEffect(() => {
    // setUserId(userloggedin.customerId);
    const fetchSalesDetails = async () => {
      setLoading(true);

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
      saleId
      }
    }
  }
`;

      // const variables = { userId };

      try {
        const response = await fetch("https://walmart-backend-7fgd.onrender.com/graphql", {
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
        console.log(result);

        if (result.errors) {
          setError(result.errors[0].message);
        } else {
          setSales(result.data.sales);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (sales.length === 0) return <p>No sales found for this user</p>;

  console.log(sales);

  return (
    <>
      <SIdebar />
      <section className="text-gray-600 body-font h-screen">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full">
            {/* <header className="text-gray-600 body-font mx-auto">
  <div className=" mx-auto flex flex-wrap p-5 flex-col md:flex-row mt-20 justify-center">
    <nav className="mr-auto flex flex-wrap  text-base justify-start">
	@@ -20,70 +92,60 @@ function Sales() {
  </div>
</header> */}

            {/* <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p> */}
          </div>
          <div className=" w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Amount
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    cumulativeDiscount
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    freightPrice
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    paymentType
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    saleDate
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    storeId
                  </th>
                  <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
              </thead>
              <tbody>
                {sales
                  ? sales.map((item) => {
                      // Convert the timestamp to a Date object
                      const date = new Date(parseInt(item.saleDate));

                      // Check if the date is valid
                      if (isNaN(date.getTime())) {
                        console.error(
                          "Invalid date for sale ID:",
                          item.storeId,
                          "with timestamp:",
                          item.saleDate
                        );
                        return null;
                      }

                      // Format the date to dd/mm/yyyy
                      const day = String(date.getDate()).padStart(2, "0");
                      const month = String(date.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const year = date.getFullYear();
                      const formattedDate = `${day}/${month}/${year}`;

                      return (
                        <tr key={item.storeId}>
                          <td className="px-4 py-3">₹{item.totalAmount}</td>
                          <td className="px-4 py-3">{item.cumulativeDiscount} %</td>
                          <td className="px-4 py-3">{item.freightPrice}</td>
                          <td className="px-4 py-3 text-lg text-gray-900">
                            {item.paymentType}
                          </td>
                          <td className="px-4 py-3 text-lg text-gray-900">
                            {formattedDate}
                          </td>
                          <td className="px-4 py-3 text-lg text-gray-900">
                            {item.storeId}
                          </td>
                        </tr>
                      );
                    })
                  : "Loading..."}
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
