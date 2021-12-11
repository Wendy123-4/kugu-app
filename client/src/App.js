import React, { lazy, Suspense } from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Spinner from "./components/spinner";

// chunck application
const ItemDetails = lazy(() => import('./pages/item-details'));
const Home = lazy(() => import('./pages/landing-page'));
const Sell = lazy(() => import('./pages/sell'));
const Cart = lazy(() => import('./pages/cart'));
const ProfilePage = lazy(() => import('./pages/profile-page'));
const Checkout = lazy(() => import('./pages/checkout'));


const App = () => {
  return (
    <div>
        <Navbar />
          { /* display spinner when page is loading */ }
          <Suspense fallback={<Spinner />}>
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/item-details" element={<ItemDetails />}></Route>
                <Route exact path="/sell" element={<Sell />}></Route>
                <Route exact path="/cart" element={<Cart />}></Route>
                <Route exact path="/cart/checkout" element={<Checkout />} />
                <Route exact path="/user/profil" element={<ProfilePage />} />
              </Routes>
            </Suspense>
        <Footer />
    </div>
  );
};

export default App;