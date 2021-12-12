import React, { useState, useEffect } from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import axios from 'axios'
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ItemDetails from "./pages/item-details";
import Home from "./pages/landing-page";
import Sell from "./pages/sell";
import Cart from "./pages/cart";


const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const {data} = await axios.get('/items')
      setItems(data);
    }
    getItems();
  }, [items])

  return (
    <div>
      <h1>{items.stat}</h1>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home items={items} />}></Route>
        <Route exact path="/item-details" element={<ItemDetails />}></Route>
        <Route exact path="/sell" element={<Sell />}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
      </Routes>
      <Footer />

    </div>
  );
};

export default App;