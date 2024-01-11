import { useState,useEffect } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Page from './pages/Pages';
import Session from './Session/session';


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <BrowserRouter>
      <Session.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Page.Layout />}>
            <Route path='/' element={<Page.Home />} />
            <Route path="products" element={<Page.Products />}>
              <Route path="cart" element={<Page.Cart />} />
            </Route>
            <Route path='products/singleProduct/:id' element={<Page.SingleProduct/>}/>
            <Route path="users" element={<Page.Users />}/>
            <Route path="customers" element={<Page.Customers />}/>
            <Route path="vendors" element={<Page.Vendors />}/>
            <Route path="sales" element={<Page.SalesDashboard />}/>
            <Route path="makeSale" element={<Page.MakeSale />} />
            <Route path="settings" element={<Page.Settings />} />
            <Route path="login" element={<Page.LogIn />} />
            <Route path="signup" element={<Page.SignUp />} />
            <Route path="profile" element={<Page.Profile />} />
            <Route path="contactUs" element={<Page.Contact />} />
            <Route path="reports" element={<Page.Reports />} />
            <Route path="*" element={<Page.NoPage />} />
          </Route>
        </Routes>
      </Session.Provider>
    </BrowserRouter>
  );
}

export default App
