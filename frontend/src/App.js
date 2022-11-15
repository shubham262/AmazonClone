import React from "react";
import './App.css';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"

import Navbar from "./component/Navbar.js"
import data from "./data/data.json"
import PreNavbar from "./component/PreNavbar.js"
import Footer from "./component/Footer"
import Home from "./Pages/Home.js"
import ProductDetails from "./component/ProductDetails.js"
import ProductPage from "./Pages/productPage.js"
import LoginSignUp from "./component/LoginSignUp";
function handleclick(){

window.scroll({
  top: 0, 
  left: 0, 
  behavior: 'smooth' 
 });
}

function App() {
  return (
    <Router>
    <Navbar />
    <PreNavbar />
    <Routes>
    <Route exact path="/" element={<Home />}></Route>
    <Route exact path="/products/:_id" element={<ProductDetails clickfn={handleclick} />} ></Route>
    <Route exact path="/product" element={<ProductPage />}></Route>
    <Route path="/product/:keyword" element={<ProductPage />}></Route>
    <Route exact path="/login" element={<LoginSignUp />}></Route>

    </Routes>
   
    {/* <button onClick={handleclick} className="scolltotop" >Back to Top</button> */}
    <Footer footer={data.footer} />

    </Router>
    
  );
}
export default App;
