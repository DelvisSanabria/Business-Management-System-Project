/* eslint-disable react/prop-types */
/* import { useLocation } from 'react-router-dom' */
import Layout from './components/Layout'
import Home from './pages/Home.jsx'
/* import Products from './pages/Products'
import Customers from './pages/Customers'
import Vendors from './pages/Vendors'
import Sales from './pages/Sales'
import Settings from './pages/Settings'
import Login from './pages/Login' */
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './pages/Products.jsx'
/* import AddProduct from './pages/AddProduct.jsx'
import EditProduct from './pages/EditProduct.jsx' */
/* import ViewProduct from './pages/ViewProduct.jsx' */
import Users from './pages/Users.jsx'
/* import AddUser from './pages/AddUser.jsx'
import EditUser from './pages/EditUser.jsx' */
import Customers from './pages/Customers.jsx'
/* import AddCustomer from './pages/AddCustomer.jsx'
import EditCustomer from './pages/EditCustomer.jsx' */
import Vendors from './pages/Vendors.jsx'
/* import AddVendor from './pages/AddVendor.jsx'
import EditVendor from './pages/EditVendor.jsx' */
import Sales from './pages/Sales.jsx'
/* import AddSale from './pages/AddSale.jsx'
import EditSale from './pages/EditSale.jsx' */
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import Contact from './pages/ContactUs.jsx'
import Reports from './pages/Reports.jsx'
import Cart from './pages/Cart.jsx'
import NoPage from './pages/NoPage.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import MakeSale from './pages/MakeSale.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path="products" element={<Products />}>
            {/* <Route path="addProduct" element={<AddProduct />} />
            <Route path="editProduct/:id" element={<EditProduct />} />
            <Route path="viewProduct/:id" element={<ViewProduct />} /> */}
            <Route path="Cart" element={<Cart />} />
          </Route>
          <Route path="users" element={<Users />}>
            {/* <Route path="addUser" element={<AddUser />} />
            <Route path="editUser/:id" element={<EditUser />} /> */}
          </Route>
          <Route path="customers" element={<Customers />}>
            {/* <Route path="addCustomer" element={<AddCustomer />} />
            <Route path="editCustomer/:id" element={<EditCustomer />} /> */}
          </Route>
          <Route path="vendors" element={<Vendors />}>
            {/* <Route path="addVendor" element={<AddVendor />} />
            <Route path="editVendor/:id" element={<EditVendor />} /> */}
          </Route>
          <Route path="sales" element={<Sales />}>
            {/* <Route path="addSale" element={<AddSale />} />
            <Route path="editSale/:id" element={<EditSale />} /> */}
          </Route>
          <Route path="makeSale" element={<MakeSale />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="contactUs" element={<Contact />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
