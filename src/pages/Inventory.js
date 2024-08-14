import React, { useEffect, useState } from "react";
import Dashboardcartup from "../components/Dashboardcartup";
import Dashboardcarddown from "../components/Dashboardcarddown";
import SIdebar from "../components/SIdebar";
import { Link } from "react-router-dom";

function Inventory() {
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const query = `query Products {
        products {
          productName
          offerPercentage
          images
          sellingPrice
          weight
          productId
        }
      }`;

      try {
        const response = await fetch(
          "https://walmart-backend-7fgd.onrender.com/graphql",
          {
            method: "POST", // GraphQL queries typically use POST
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              query,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const { data } = result;

        setDashboardData(data.products);
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
      <section className=" topdasboard body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            <Dashboardcartup num={123456} title={"Total"} />
            <Dashboardcartup num={123456} title={"Active products"} />
            <Dashboardcartup num={123456} title={"Inactive products"} />
          </div>
        </div>
      </section>

      <section className="body-font ">
        <div className="lg:container px-3 py-10 lg:mx-auto bg-white border-2 rounded-xl">
          <div className="flex flex-wrap justify-center ">
            {dashboardData
              ? dashboardData.map((prod) => (
                  <Link to={`/products/${prod.productId}`} >
                    <Dashboardcarddown
                      key={prod.productId}
                      price={prod.sellingPrice}
                      name={prod.productName}
                      sales={prod.weight + " kg"}
                      image={"tshirt.png"}
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
