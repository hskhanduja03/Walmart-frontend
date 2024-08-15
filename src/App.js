import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landingpage from "./pages/Landingpage";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Dashboard from "./pages/Dashboard";
import Navebar from "./components/Navbar";
import Footer from "./components/Footer";
import Userstate from "./Context/Userstates";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Newproduct from "./pages/Newproduct";
import Product from "./pages/Product";
import EmailForm from "./pages/EmailForm";
// import Newproduct from "./pages/Newproduct";

function App() {
  // const [inventory, setInventory] = useState(true);
  // const [products, setProducts] = useState(false);
  // const [sales, setSales] = useState(false);
  // const [add, setAdd] = useState(false);
  return (
    <Userstate>
      <Router>
        <div>
          <Navebar />
          <Routes>
            <Route exact path="/" element={<Landingpage />} />
            <Route exact path="/email" element={<EmailForm />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/sign" element={<Sign />} />
            <Route exact path="/products/:productId" element={<Product />} />
            <Route exact path="/inventory" element={<Inventory />} />
            <Route exact path="/sales" element={<Sales />} />
            <Route exact path="/purchases" element={<Purchases />} />
            <Route exact path="/add-products" element={<Newproduct />} />
            
          </Routes>
          <Footer />
        </div>
      </Router>
    </Userstate>
  );
}

export default App;
