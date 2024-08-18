import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TopLoader from "react-top-loading-bar";
import Aisuggetions from "../components/Aisuggetions";
import useDocumentTitle from "../Hooks/useDocumentTitle";
// import { TbLoader3 } from "react-icons/tb";

function Product() {
  useDocumentTitle("Product");
  const { productId } = useParams(); // Destructure to get the product ID
  const [product, setProduct] = useState(null); // Use state to store the fetched product data
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To manage error state
  const [isExpanded, setIsExpanded] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [predictionRF, setPredictionRF] = useState(null); // Prediction from /predict_rf
  const handleAi = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchProdData = async () => {
      const variables = { productId: productId }; // Correctly set the variables

      const query = `query Product($productId: String!) {
        product(productId: $productId) {
          productId
          productName
          description
          costPrice
          sellingPrice
          expiry
          batchId
          manufactureDate
          categoryName
          weight
          images
          customerRating
          offerPercentage
          customerId
          quantity
        }
      }`;

      try {
        setLoading(true);
        setProgress(70);
        const response = await fetch(process.env.REACT_APP_BACKEND_LINK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });

        if (!response.ok) {
          throw new Error("Could not fetch Product");
        }

        const result = await response.json();
        const { data } = result;

        if (data && data.product) {
          setProduct(data.product); // Update the state with the fetched product data

          const timestamp = Number(data.product.manufactureDate); // Convert the string or number to a number

          if (isNaN(timestamp)) {
            console.error("Invalid date format:", data.product.manufactureDate);
          } else {
            const date = new Date(timestamp);

            // Features for the /predict endpoint (6 features)
            const featuresForPredict = [
              data.product.quantity || 0,
              data.product.costPrice || 0,
              data.product.images.length || 0,
              data.product.customerRating || 0,
              date.getMonth() + 1, // Convert to 1-based month
              date.getFullYear(), // Get the year
            ];

            // Send features to the /predict API for prediction
            const response1 = await fetch(
              "https://flask-walmart-model.onrender.com/predict",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  features: [featuresForPredict], // Ensure it's an array of arrays
                }),
              }
            );

            if (!response1.ok) {
              throw new Error("Could not fetch prediction from /predict");
            }

            const predictionResult1 = await response1.json();
            setPrediction(Math.round(predictionResult1.predictions[0]));

            // Features for the /predict_rf endpoint (10 features)
            const featuresForPredictRF = [
              data.product.sellingPrice - data.product.costPrice, // Profit
              data.product.costPrice || 0, // ProductStandardCost
              data.product.sellingPrice || 0, // ProductListPrice
              5000, // CustomerCreditLimit (Placeholder)
              data.product.quantity || 0, // OrderItemQuantity
              data.product.sellingPrice / (data.product.quantity || 1), // PerUnitPrice
              3, // RegionName (Placeholder)
              5, // State (Placeholder)
              5, // City (Placeholder)
              6, // PostalCode (Placeholder)
            ];

            // Send features to the /predict_rf API for prediction
            const response2 = await fetch(
              "https://flask-walmart-model.onrender.com/predict_rf",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  features: [featuresForPredictRF], // Ensure it's an array of arrays
                }),
              }
            );

            if (!response2.ok) {
              throw new Error("Could not fetch prediction from /predict_rf");
            }

            const predictionResult2 = await response2.json();
            setPredictionRF(Math.round(predictionResult2.predictions[0]));
          }
        } else {
          throw new Error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Update the error state
      } finally {
        setProgress(100); // Complete the progress bar
        setLoading(false);
      }
    };

    fetchProdData();
  }, [productId]);

  if (loading)
    return (
      <p className="text-center h-screen">
        <TopLoader
          progress={progress}
          color="#00bcd4"
          height={4}
          className="absolute top-16 left-0 right-0"
        />
        Loading...
        <span className="flex flex-col border-blue-400 border text-blue-600 font-semibold p-2 text-xs items-center max-w-xl mx-auto mt-[40vh]">
          <p>While we load data from ML model</p>
          <p>Please reload it a few times</p>
        </span>
      </p>
    ); // Show loading state
  // if (error) return <p>Error: {error}</p>; // Show error state

  if (!product) return <p>No product found.</p>; // Handle case where no product is found

  return (
    <section className="text-gray-600 body-font ">
      <TopLoader
        progress={progress}
        color="#00bcd4"
        height={4}
        className="absolute top-16 left-0 right-0 z-50"
      />
      <div className="flex justify-center mx-auto mt-12 rounded-md  w-full h-full ">
        <button
          className="items-center justify-center h-4 object-contain flex text-white"
          id="ai"
          onClick={handleAi}
        >
          <Aisuggetions
            isExpanded={isExpanded}
            prediction={prediction}
            predictionRF={predictionRF}
          />
        </button>
      </div>
      <div className="container px-5 py-24 mx-auto ">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={product.images[0]}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.categoryName}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.productName}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="text-gray-600 mr-2">
                  Customer Rating: {product.customerRating}
                </span>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 text-indigo-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </span>
            </div>
            <p className="leading-relaxed mb-4">{product.description}</p>

            <div className="flex flex-col space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Cost Price:</span>{" "}
                {product.costPrice}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Selling Price:</span>{" "}
                {product.sellingPrice}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Expiry Date:</span>{" "}
                {product.expiry}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Manufacture Date:</span>{" "}
                {product.manufactureDate}
              </div>

              <div className="text-sm">
                <span className="font-semibold">Weight:</span> {product.weight}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Offer Percentage:</span>{" "}
                {product.offerPercentage}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Quantity:</span>{" "}
                {product.quantity}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
