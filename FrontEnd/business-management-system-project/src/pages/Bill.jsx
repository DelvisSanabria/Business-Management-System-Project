import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Session } from "../Session/session";
import axios from "axios";

export default function Bill() {
   const { user } = useContext(Session);
   const location = useLocation();
   const [productData, setProductData] = useState();
   const saleData = location.state;
   const server = "http://localhost:3001/";
   console.log(saleData);

   useEffect(() => {    
      const productsInfo = async () => {
         try {
            const response = await axios.post(`${server}products/cart`, saleData.products, {
               headers: {
                  'Content-Type': 'application/json'
               }
            });
            if (response.status === 200) {
               setProductData([...response.data]);
            }
         } catch ({ name, message }) {
            console.error(`${name}: ${message}`);
         }
      }
      productsInfo();
   }, [saleData])
   
   useEffect(() => {    
      console.log(productData);
   }, [productData])

   const renderProducts = function(products, quantity) {
      let productsList = [];
      for(let doc of products) {
         for(let id in quantity) {
            if(doc._id === id) {
               productsList.push({name: doc.name, quantity: quantity[id]});
            }
         }
      }
      return productsList.map(({name, quantity}, index) => (
         <span key={index} className="flex w-full gap-[15px] lg:justify-between">
            <span>{name}</span>
            <span className="font-medium">x{quantity}</span>
         </span>
      ));
   }

   const renderTime = (time) => {
      const date = new Date(time);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`
   }

   return (
      <section className="bg-[#D9D9D9] w-full flex justify-center items-center">
      <h4 className="text-[#14274E] text-[20px]">Tu Factura</h4>
      <div className="flex flex-col p-[15px] w-[80%] lg:w-[50%]">
         <div className="flex justify-between">
            <p>Referencia:</p>
            <p>{saleData._id}</p>
         </div>
         <div className="flex justify-between">
            <p>Fecha:</p>
            <p>{renderTime(saleData.createdAt)}</p>
         </div>
         <div className="flex justify-between">
            <p>Cliente:</p>
            <p>{user.name}</p>
         </div>
         <div className="flex justify-between">
            <p>Productos:</p>
            <p>{productData && renderProducts(productData, saleData.quantity)}</p>
         </div>
         <div className="flex justify-between text-[#9098B1] text-[0.8em]">
            <p>Subtotal:</p>
            <p>{saleData.subtotal}</p>
         </div>
         <div className="flex justify-between text-[#9098B1] text-[0.8em]">
            <p>IVA 16%:</p>
            <p>{saleData.tax}</p>
         </div>
         <div className="flex justify-between text-[#223263] font-bold">
            <p>Total:</p>
            <p>{saleData.total}</p>
         </div>
      </div>
      </section>
  );
}
