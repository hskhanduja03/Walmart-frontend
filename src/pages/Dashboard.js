// // import React, { useContext, useState } from "react";
// import SIdebar from "../components/SIdebar";
// import Inventory from "./Inventory";
// import Purchases from "./Purchases";
// import Sales from "./Sales";
// import { CiCirclePlus } from "react-icons/ci";
// import Newproduct from "./Newproduct";
// // import Usercontext from "../Context/Usercontext";
// // import { Navigate } from "react-router-dom";

// function Dashboard({add,setAdd,products,setProducts,inventory,setInventory,sales,setSales,}) {
 

//   // const { userloggedin } = useContext(Usercontext);
//   // const [redirect, setRedirect] = useState(false);

//   // setTimeout(() => {
//   //   console.log(userloggedin)
//   //   if (userloggedin === null) {
//   //     setRedirect(true)
//   //   }
    
//   // }, 100);

//   //   if(redirect)
//   //     return <Navigate to={'/login'}/>
//   const handleaddpro = ()=>{ 
//     setAdd(true)
//     setInventory(false)
//     setProducts(false)
//     setSales(false)
//   }
//   return (
//     <>
//       <SIdebar setinv={setInventory} setpro={setProducts} setSales={setSales} newpro={setAdd} />

   
//       <section className="bg-gray-100">

//         {inventory && <Inventory />}
//         {products && <Purchases />}
//         {sales && <Sales />}
//         {add && <Newproduct/>}

//         <div className="fixed bottom-4 right-4 ">
//           <button onClick={handleaddpro} className="bg-white font-semibold py-3 px-6 rounded-full border-2 flex items-center justify-center text-xl">
//           <CiCirclePlus className="items-center justify-center mx-2 text-4xl"/> Add product
//           </button>
//         </div>
//       </section>
      
//     </>
//   );
// }

// export default Dashboard;
