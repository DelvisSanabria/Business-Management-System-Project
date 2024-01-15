import { useState, useEffect } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Page from './pages/Pages';
import { Session, shoppingCart } from './Session/session';


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("cart")) || null);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [user, cartProducts]);
  return (
    <BrowserRouter>
      <Session.Provider value={{ user, setUser }}>
        <shoppingCart.Provider value={{ cartProducts, setCartProducts }}>
          <Routes>
            <Route path="/" element={<Page.Layout />}>
              <Route index element={<Page.Home />} />
              <Route path="products" element={<Page.Products />} />
              <Route path="products/:id" element={<Page.SingleProduct />} />
              <Route path="/cart" element={<Page.Cart />} />
              <Route path="productsDashboard" element={<Page.ProductsDashboard />} />
              <Route path="users" element={<Page.Users />} />
              <Route path="customers" element={<Page.Customers />} />
              <Route path="vendors" element={<Page.Vendors />} />
              <Route path="sales" element={<Page.SalesDashboard />} />
              <Route path="settings" element={<Page.Settings />} />
              <Route path="login" element={<Page.LogIn />} />
              <Route path="signup" element={<Page.SignUp />} />
              <Route path="profile" element={<Page.Profile />} />
              <Route path="contactUs" element={<Page.Contact />} />
              <Route path="reports" element={<Page.Reports />} />
              <Route path="*" element={<Page.NoPage />} />
            </Route>
          </Routes>
        </shoppingCart.Provider>
      </Session.Provider>
    </BrowserRouter>
  );
}

export default App
