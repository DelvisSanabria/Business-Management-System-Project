/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {Session, shoppingCart} from "../Session/session";
import axios from "axios";
import { more, less } from "../components/exportsImports";

function Cart() {
   const {user} = useContext(Session);
   const {cartProducts, setCartProducts} = useContext(shoppingCart);
   const navigate = useNavigate();
   const [product, setProduct] = useState([]);
   const [products, setProducts] = useState([]);
   useEffect(() => {
    if(cartProducts) {
      setProducts(cartProducts.products);
    }
   },[])
   const [order, setOrder] = useState({
      client: (user && user.email) || "",
      vendor: "--",
      products: [],
      subtotal: 0,
      tax: 0,
      total: 0
   });
   const [input, setInput] = useState({
      price: {},
      quantity: {}
   });
   const button = useRef();
   const server = "http://localhost:3001/";

   useEffect(() => {
      if (products && products.length > 0) {
         const bringProducts = async () => {
            try {
               const response = await axios.post(`${server}products/cart`, { products }, {
                  headers: {
                     'Content-Type': 'application/json'
                  }
               });
               if (response.data) {
                  setProduct([...response.data]);
                  let productsPrice = {};
                  let productsQuantity = {};
                  for(let doc of response.data) {
                     productsPrice = {...productsPrice, [doc._id]: doc.price};
                     productsQuantity = {...productsQuantity, [doc._id]: cartProducts.quantity[doc._id] || 1};
                  }
                  setInput({price: productsPrice, quantity: productsQuantity});
               }
            } catch ({name, message}) {
               console.error(`${name}: ${message}`);
            }
         };
         bringProducts();
         setOrder((prev) => ({...prev, products: products}));
      }
   }, [products]);

   const decrementQuantity = (id) => {
      setInput((prev) => ({...prev, quantity: {...prev.quantity, [id]: Math.max((prev.quantity[id] || 0) - 1, 1) }}));
   };

   const incrementQuantity = (id, stock) => {
      setInput((prev) => ({...prev, quantity: {...prev.quantity, [id]: (prev.quantity[id] || 0) < stock ? (prev.quantity[id] || 0) + 1 : stock }}));
   };

   useEffect(() => {
      const calculateTotal = () => {
         let addition = 0;
         for (let id in input.price) {
            addition += Number(input.price[id]) * Number(input.quantity[id]);
         }
         let tribute = addition * 0.16;
         setOrder((prev) => ({...prev, subtotal: addition, tax: tribute, total: addition + tribute}));
      }
      calculateTotal();
   }, [input]);

   const checkOut = () => {
      /* navigate("/checkout"); */
   };

   useEffect(() => {
      console.log(cartProducts);
   }, [cartProducts]);

   useEffect(() => {
      if (order.products && order.products.length > 0) {
         setCartProducts({...order, quantity: input.quantity});
      }
   }, [order])

   return (
     <>
       <div className="container mx-auto max-w-[1100px] px-4 lg:hidden">
         <h2 className="text-2xl font-bold m-4">Tu carrito:</h2>
         <form
           id="orderForm"
           className="flex flex-col bg-[#f1f6f9] border-[1px] border-[#cdd1d3] items-start rounded-[8px] gap-[15px] pb-[15px] px-[15px]"
         >
           <div className="flex flex-col w-full max-h-[50vh] overflow-y-auto">
             {product.map((product) => (
               <div
                 className="flex justify-between w-full max-h-[150px] py-[15px] border-[#EBF0FF] border-b-[1px]"
                 key={product._id}
               >
                 <div className="flex flex-col justify-center items-center">
                   <img
                     className="w-[70px] max-h-[100px]"
                     src={server + product.imageURL}
                     alt={product.name}
                   />
                 </div>
                 <div className="flex flex-col gap-[7px] items-end w-fit max-w-[110px] lg:w-[50%] ">
                   <p className="max-h-[2lh] overflow-y-auto">{product.name}</p>
                   <p className="text-right text-[#3056D3] ">
                     ${product.price.toFixed(2)}
                   </p>
                   <div className="bg-white gap-[5px] w-fit flex h-fit rounded-full lg:gap-[10px]">
                     <div
                       className="bg-[#14274E] w-[30px] h-[30px] rounded-full flex justify-center items-center"
                       onClick={() => decrementQuantity(product._id)}
                     >
                       <img
                         className="w-[50%] h-[50%]"
                         type="image"
                         src={less}
                         alt="Reducir"
                       />
                     </div>
                     <p className="w-[25px] lg:w-[15px] flex items-center justify-center">
                       {input.quantity[product._id] || 0}
                     </p>
                     <div
                       className="bg-[#14274E] w-[30px] h-[30px] rounded-full flex justify-center items-center"
                       onClick={() =>
                         incrementQuantity(product._id, product.stock)
                       }
                     >
                       <img
                         className="w-[50%] h-[50%]"
                         type="image"
                         src={more}
                         alt="Aumentar"
                       />
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
           <div className="flex flex-col gap-[15px] pb-[15px] w-full border-[#EBF0FF] border-b-[1px]">
             <div className="flex justify-between items-end h-[20px]">
               <p className="text-[#9098B1] text-[0.8em]">Subtotal:</p>
               <p className="text-[#223263] ">
                 {order.subtotal ? "$" + order.subtotal.toFixed(2) : ""}
               </p>
             </div>
             <div className="flex justify-between items-end h-[20px]">
               <p className="text-[#9098B1] text-[0.8em]">IVA 16%:</p>
               <p className="text-[#223263] ">
                 {order.tax ? "$" + order.tax.toFixed(2) : ""}
               </p>
             </div>
             <div className="flex justify-between items-end h-[20px]">
               <p className="text-[#9098B1] text-[0.8em]">Total:</p>
               <p className="text-[#223263] ">
                 {order.total ? "$" + order.total.toFixed(2) : ""}
               </p>
             </div>
           </div>
         </form>
         <button
             ref={button}
             className={`h-[40px] mt-5 text-[#FFFFFF] btn text-[20px] bg-[#3056D3] w-full rounded-[6px] ${
               button.current && button.current.disabled && "opacity-50"
             }`}
             type="button"
             onClick={checkOut}
           >
             Comprar
           </button>
       </div>
       <div className="hidden lg:block container mx-auto max-w-[900px] pt-10 px-2">
         <h2 className="text-2xl text-[#637381] font-bold m-4">Tu carrito:</h2>
         <form
           id="orderForm"
           className="flex flex-col bg-[#f1f6f9] border-[1px] border-[#cdd1d3] items-start rounded-[8px] gap-[15px] pb-[15px] px-[15px]"
         >
          <div className="grid grid-cols-[3.5fr_1.5fr_1fr] w-full max-h-[50vh] pt-5 p-3 border-[#EBF0FF] border-b-[1px] overflow-y-auto">
            <span className="text-lg font-bold">Producto</span>
            <span className="text-lg font-bold">Precio</span>
            <span className="text-lg font-bold">Cantidad</span>
          </div>
           <div className="flex flex-col w-full max-h-[50vh] overflow-y-auto px-3">
             {product.map((product) => (
               <div
                 className="flex justify-between w-full max-h-[150px] py-[15px] border-[#EBF0FF] border-b-[1px]"
                 key={product._id}
               >
                 <div className="flex flex-col justify-center items-center">
                   <img
                     className="w-[70px] max-h-[100px]"
                     src={server + product.imageURL}
                     alt={product.name}
                   />
                 </div>
                <p className="max-h-[2lh] overflow-y-auto">{product.name}</p>
                <p className="text-right text-[#3056D3] ">
                  ${product.price.toFixed(2)}
                </p>
                <div className="bg-white gap-[5px] w-fit flex h-fit rounded-full lg:gap-[10px]">
                  <div
                    className="bg-[#14274E] w-[30px] h-[30px] rounded-full flex justify-center items-center"
                    onClick={() => decrementQuantity(product._id)}
                  >
                    <img
                      className="w-[50%] h-[50%]"
                      type="image"
                      src={less}
                      alt="Reducir"
                    />
                  </div>
                  <p className="w-[25px] lg:w-[15px] flex items-center justify-center">
                    {input.quantity[product._id] || 0}
                  </p>
                  <div
                    className="bg-[#14274E] w-[30px] h-[30px] rounded-full flex justify-center items-center"
                    onClick={() =>
                      incrementQuantity(product._id, product.stock)
                    }
                  >
                    <img
                      className="w-[50%] h-[50%]"
                      type="image"
                      src={more}
                      alt="Aumentar"
                    />
                  </div>
                </div>
               </div>
             ))}
           </div>
           <div className="flex pb-[15px] pr-4 w-full justify-end">
            <div className="flex flex-col gap-[15px] pb-[15px] w-[250px] justify-end border-[#EBF0FF] border-b-[1px]">
              <div className="flex justify-between items-end h-[20px]">
                <p className="text-[#9098B1] text-[0.8em]">Subtotal:</p>
                <p className="text-[#223263] ">
                  {order.subtotal ? "$" + order.subtotal.toFixed(2) : ""}
                </p>
              </div>
              <div className="flex justify-between items-end h-[20px] border-[#EBF0FF] border-b-[1px]">
                <p className="text-[#9098B1] text-[0.8em]">IVA 16%:</p>
                <p className="text-[#223263] ">
                  {order.tax ? "$" + order.tax.toFixed(2) : ""}
                </p>
              </div>
              <div className="flex justify-between items-end h-[20px]">
                <p className="text-black text-lg tracking-wider">Total:</p>
                <p className="text-black ">
                  {order.total ? "$" + order.total.toFixed(2) : ""}
                </p>
              </div>
              <button
             ref={button}
             className={`h-[40px] text-[#FFFFFF] btn text-[20px] bg-[#3056D3] w-full rounded-[6px] ${
               button.current && button.current.disabled && "opacity-50"
             }`}
             type="button"
             onClick={checkOut}
           >
             Comprar
           </button>
            </div>
           </div>
         </form>
       </div>
     </>
   );
}

export default Cart;