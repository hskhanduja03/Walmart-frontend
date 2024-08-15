import React, { useEffect, useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SIdebar from "../components/SIdebar";
import TopLoader from "react-top-loading-bar";
import { useLocation } from "react-router";
// images: [String!]!

function Newproduct() {
  const [image, setImage] = useState("");
  const [batchId, setBatchId] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [customerRating, setCustomerRating] = useState("");
  const [offerPercentage, setOfferPercentage] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [manufactured, setManufactured] = useState("");
  const {pathname} = useLocation()
  const [isActive, setIsActive] = useState(false)


  const [expiry, setExpiry] = useState("");
  const [productname, setProductname] = useState("");
  const [category, setCategory] = useState("");
  const [productdetails, setProductdetails] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setIsActive(pathname)
  }, [])
  const handlechange = (e) => {
    if (e.target.name === "image") setImage(e.target.value);
    if (e.target.name === "batchId") setBatchId(e.target.value);
    if (e.target.name === "costPrice") setCostPrice(e.target.value);
    if (e.target.name === "sellingPrice") setSellingPrice(e.target.value);
    if (e.target.name === "customerRating") setCustomerRating(e.target.value);
    if (e.target.name === "offerPercentage") setOfferPercentage(e.target.value);
    if (e.target.name === "weight") setWeight(e.target.value);
    if (e.target.name === "quantity") setQuantity(e.target.value);
    if (e.target.name === "manufactured") setManufactured(e.target.value);
    if (e.target.name === "expiry") setExpiry(e.target.value);
    if (e.target.name === "productname") setProductname(e.target.value);
    if (e.target.name === "category") setCategory(e.target.value);
    if (e.target.name === "productDetails") setProductdetails(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    

    const images = image.split(",").map((img) => img.trim());
    // console.log(images)
    const query = `
      mutation CreateProduct($productName: String!, $description: String!, $costPrice: Float!, $expiry: String!, $manufactureDate: String!, $sellingPrice: Float!, $batchId: String!, $categoryName: String!, $weight: Float!, $images: [String!]!, $customerRating: Float!, $offerPercentage: Float!, $quantity: Int!) {
        createProduct(
          productName: $productName,
          description: $description,
          costPrice: $costPrice,
          expiry: $expiry,
          manufactureDate: $manufactureDate,
          sellingPrice: $sellingPrice,
          batchId: $batchId,
          categoryName: $categoryName,
          weight: $weight,
          images: $images,
          customerRating: $customerRating,
          offerPercentage: $offerPercentage,
          quantity: $quantity
        ) {
         
          productId
          customerId
        }
      }
    `;

    const variables = {
      productName: productname,
      description: productdetails,
      costPrice: parseFloat(costPrice),
      expiry,
      manufactureDate: manufactured,
      sellingPrice: parseFloat(sellingPrice),
      batchId,
      categoryName: category,
      weight: parseFloat(weight),
      images,
      customerRating: parseFloat(customerRating),
      offerPercentage: parseFloat(offerPercentage),
      quantity: parseInt(quantity),
    };

    try {
      setLoading(true);
      setProgress(70);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_LINK,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },

          body: JSON.stringify({ query, variables }),
        }
      );

      const result = await response.json();

      if (result.errors) {
        console.error("Error creating product:", result.errors);
      } else {
        console.log("Product created successfully:", result.data.createProduct);
        toast.success("Product created successfully!", {
          position: "top-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setBatchId("");
        setCategory("");
        setCostPrice("");
        setCustomerRating("");
        setExpiry("");
        setImage("");
        setManufactured("");
        setOfferPercentage("");
        setProductdetails("");
        setProductname("");
        setQuantity("");
        setSellingPrice("");
        setWeight("");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setProgress(100); // Complete the progress bar
      setLoading(false);
    }
  };

  return (
    <>
      <SIdebar isActive={isActive} />
      <section className="">
        <TopLoader
          progress={progress}
          color="#00bcd4"
          height={4}
          className="absolute top-16 left-0 right-0 z-50"
        />
        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce} // Corrected prop syntax
          className={'z-50 top-14'}
        />
        <div className="bg-white md:border-4 rounded-lg shadow  m-10 md:m-20">
          {/* <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Edit product</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="product-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div> */}

          <div className="p-6 space-y-6">
            <form action="#">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="image"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Image
                  </label>
                  <input
                    onChange={handlechange}
                    value={image}
                    type="text"
                    name="image"
                    id="image"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="comma seperate URL's"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="batchId"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    BatchID
                  </label>
                  <input
                    onChange={handlechange}
                    value={batchId}
                    type="text"
                    name="batchId"
                    id="batchId"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Apple Imac 27”"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="productname"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Product Name
                  </label>
                  <input
                    onChange={handlechange}
                    value={productname}
                    type="text"
                    name="productname"
                    id="productname"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Apple Imac 27”"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Category
                  </label>
                  <input
                    onChange={handlechange}
                    value={category}
                    type="text"
                    name="category"
                    id="category"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Electronics"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="costPrice"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    CostPrice
                  </label>
                  <input
                    onChange={handlechange}
                    value={costPrice}
                    type="number"
                    name="costPrice"
                    id="costPrice"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="$2300"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="customerRating"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    CustomerRating
                  </label>
                  <input
                    onChange={handlechange}
                    value={customerRating}
                    type="number"
                    name="customerRating"
                    id="customerRating"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Out of 5"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="offerPercentage"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    OfferPercentage
                  </label>
                  <input
                    onChange={handlechange}
                    value={offerPercentage}
                    type="number"
                    name="offerPercentage"
                    id="offerPercentage"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="$2300"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="weight"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Weight
                  </label>
                  <input
                    onChange={handlechange}
                    value={weight}
                    type="number"
                    name="weight"
                    id="weight"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="$2300"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Quantity
                  </label>
                  <input
                    onChange={handlechange}
                    value={quantity}
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="$2300"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="sellingPrice"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    SellingPrice
                  </label>
                  <input
                    onChange={handlechange}
                    value={sellingPrice}
                    type="number"
                    name="sellingPrice"
                    id="sellingPrice"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="$2300"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="manufactured"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Manufactured
                  </label>
                  <input
                    onChange={handlechange}
                    value={manufactured}
                    type="date"
                    name="manufactured"
                    id="manufactured"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Apple"
                    required=""
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="expiry"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Expiry
                  </label>
                  <input
                    onChange={handlechange}
                    value={expiry}
                    type="date"
                    name="expiry"
                    id="expiry"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                    placeholder="Apple"
                    required=""
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="productDetails"
                    className="text-sm font-medium text-gray-900 block mb-2"
                  >
                    Product Details
                  </label>
                  <textarea
                    onChange={handlechange}
                    value={productdetails}
                    id="productDetails"
                    name="productDetails"
                    rows="6"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                    placeholder="Details"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>

          <div className="flex p-6 border-t border-gray-200 rounded-b">
            <button
              onClick={handlesubmit}
              className=" mx-auto text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              Save all
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Newproduct;
