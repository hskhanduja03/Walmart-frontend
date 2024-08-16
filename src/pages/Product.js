import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import TopLoader from "react-top-loading-bar";

function Product() {
  const { productId } = useParams(); // Destructure to get the product ID
  const [product, setProduct] = useState(null); // Use state to store the fetched product data
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // To manage error state
  const [prediction, setPrediction] = useState(null); // To manage error state

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

            // Extract relevant features for the prediction request
            const features = [
              data.product.quantity||0,
              data.product.costPrice||0,
              data.product.images.length||0,
              data.product.customerRating||0,
              date.getMonth() + 1, // Convert to 1-based month
              date.getFullYear(), // Get the year
            ];

            // Send features to your prediction endpoint here

            // Send features to the Flask API for prediction
            const response2 = await fetch(
              "https://flask-walmart-model.onrender.com/predict",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  features: [features], // Ensure it's an array of arrays
                }),
              }
            );

            if (!response2.ok) {
              throw new Error("Could not fetch prediction");
            }

            const predictionResult = await response2.json();
            setPrediction(Math.round(predictionResult.predictions[0]))
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
      </p>
    );

  if (!product) return <p>No product found.</p>; // Handle case where no product is found

  return (
    <section className="text-gray-600 body-font">
      <TopLoader
        progress={progress}
        color="#00bcd4"
        height={4}
        className="absolute top-16 left-0 right-0 z-50"
      />
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={product.images[0]}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest ">
              {product.categoryName}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 flex justify-between">
              {product.productName}
              <div className="flex items-center justify-center">
                <p className="text-sm">Qty to order: </p>
              <span className="text-red-600">{prediction}</span>
              </div>
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
