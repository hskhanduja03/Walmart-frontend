import React, { useEffect, useState } from "react";
import Dashboardcartup from "../components/Dashboardcartup";
import Dashboardcarddown from "../components/Dashboardcarddown";
import SIdebar from "../components/SIdebar";
import { Link } from "react-router-dom";

function Inventory() {
  const [dashboardData, setDashboardData] = useState(null);
  const [salesLength, setSalesLength] = useState(null);

  useEffect(() => {
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

      const querySalesLength = `query Query($customerId: String!) {
        salesLength(customerId: $customerId)
      }`;

      try {
        const [productsResponse, salesResponse] = await Promise.all([
          fetch("https://walmart-backend-7fgd.onrender.com/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ query: queryProducts }),
          }),
          fetch("https://walmart-backend-7fgd.onrender.com/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              query: querySalesLength,
              variables: { customerId: "your-customer-id" }, // Replace with actual customerId
            }),
          }),
        ]);

        if (!productsResponse.ok || !salesResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const productsResult = await productsResponse.json();
        const salesResult = await salesResponse.json();

        setDashboardData(productsResult.data.products);
        setSalesLength(salesResult.data.salesLength);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SIdebar />

      <h1 className="flex justify-center text-2xl font-semibold py-5">
        Hey!, Name
      </h1>
      <section className="topdasboard body-font">
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

      <section className="body-font ">
        <div className="lg:container px-3 py-10 lg:mx-auto bg-white border-2 rounded-xl">
          <div className="flex flex-wrap justify-center ">
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
