import { useState, useEffect, useContext } from "react";
import Session from "../Session/session";
import axios from "axios";
import { more, less } from "../components/exportsImports";

function CartModal({products}) {
   const {user} = useContext(Session);
   const [product, setProduct] = useState([]);
   const [order, setOrder] = useState({
      client: (user && user._id) || "",
      subtotal: 0,
      tax: 0,
      total: 0
   });
   const [input, setInput] = useState({
      price: {},
      quantity: {}
   });
   const server = "http://localhost:3001/";
   console.log(input);

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
                     productsQuantity = {...productsQuantity, [doc._id]: 1};
                  }
                  setInput({price: productsPrice, quantity: productsQuantity});
               }
            } catch ({name, message}) {
               console.error(`${name}: ${message}`);
            }
         };
         bringProducts();
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

   const handleSubmit = async (event) => {
      event.preventDefault();
      const sale = {...order, products: input.products};
      try {
         const response = await axios.post(`${server}/sales`, sale, {
            headers: {
               'Content-Type': 'application/json'
            }
         });
         if (response.status === 201) {
            alert("Comprado con éxito");
         }
      } catch ({name, message}) {
         console.error(`${name}: ${message}`);
      }
   };
   console.log(product);
   return (
      <>
         <form id="orderForm" className="flex w-[90%] items-start gap-[50px]">
            <div className="flex gap-[50px] w-full">
               {product.map((product) => (
                  <div key={product._id}>
                     <img className="" src={product.imageURL} alt={product.name} />
                     <p>Producto: {product.name}</p>
                     <p>Precio: {product.price}$</p>
                     <p>Disponible: {product.stock}</p>
                     <p>Categoría: {product.category}</p>
                     <div className="bg-[#F1F6F9] gap-[5px] flex h-fit rounded-full min-[1440px]:gap-[10px]">
                        <div className="bg-[#14274E] w-[30px] h-[30px] rounded-full flex justify-center items-center" onClick={() => decrementQuantity(product._id)}>
                           <img className="w-[15px]" type="image" src={less} alt="Reducir" />
                        </div>
                        <p className="w-[15px] flex items-center justify-center">{input.quantity[product._id] || 0}</p>
                        <div className="bg-[#14274E] w-[30px] h-[30px] rounded-full flex justify-center items-center" onClick={() => incrementQuantity(product._id, product.stock)}>
                           <img className="w-[15px]" type="image" src={more} alt="Aumentar" />
                        </div>
                     </div>
                  </div>
                  
               ))}
            </div>
            <div className="flex flex-col gap-[15px] w-[140px]">
               <div className="flex justify-between items-end h-[20px]">
                  <p className="text-[#9098B1] text-[0.8em]">Subtotal:</p><p>{order.subtotal ? "$" + order.subtotal.toFixed(2) : ""}</p>
               </div>
               <div className="flex justify-between items-end h-[20px]">
                  <p className="text-[#9098B1] text-[0.8em]">IVA 16%:</p><p>{order.tax ? "$" + order.tax.toFixed(2) : ""}</p>
               </div>
               <div className="flex justify-between items-end h-[20px]">
                  <p className="text-[#9098B1] text-[0.8em]">Total:</p><p>{order.total ? "$" + order.total.toFixed(2) : ""}</p>
               </div>
            </div>
            <button className="btn bg-[#000000] border-x-indigo-700 border-y-indigo-500 border-2 border-solid"
               type="submit"
               onClick={handleSubmit}>Comprar
            </button>
         </form>
      </>
   );
};

export default CartModal;