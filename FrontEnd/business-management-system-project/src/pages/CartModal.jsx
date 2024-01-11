import { useState, useEffect, useContext, useRef } from "react";
import Session from "../Session/session";
import axios from "axios";
import { more, less } from "../components/exportsImports";

function CartModal({products}) {
   const {user} = useContext(Session);
   const {cartProducts, setCartProducts} = useContext(shoppingCart);
   const navigate = useNavigate();
   const [product, setProduct] = useState([]);
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
                     productsQuantity = {...productsQuantity, [doc._id]: input.quantity[doc._id] || 1};
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
      <form id="orderForm" className="flex flex-col bg-[#f1f6f9] items-start rounded-[15px] gap-[15px] pb-[15px] px-[15px]">
         <div className="flex flex-col w-full max-h-[276px] overflow-y-auto">
            {product.map((product) => (
               <div className="flex justify-between max-h-[150px] py-[15px] border-[#EBF0FF] border-b-[1px]" key={product._id}>
                  <div className="flex flex-col justify-center items-center">
                     <img className="w-[70px] max-h-[100px] " src={server + product.imageURL} alt={product.name} />
                  </div>
                  <div className="flex flex-col gap-[7px] items-end w-fit max-w-[110px] ">
                     <p className="max-h-[2lh] overflow-y-auto">{product.name}</p>
                     <p className="text-right text-[#3056D3] ">${product.price.toFixed(2)}</p>
                     <div className="bg-white gap-[5px] w-fit flex h-fit rounded-full min-[1440px]:gap-[10px]">
                        <div className="bg-[#14274E] w-[30px] h-[30px] rounded-full flex justify-center items-center" onClick={() => decrementQuantity(product._id)}>
                           <img className="w-[15px]" type="image" src={less} alt="Reducir" />
                        </div>
                        <p className="w-[25px] flex items-center justify-center">{input.quantity[product._id] || 0}</p>
                        <div className="bg-[#14274E] w-[30px] h-[30px] rounded-full flex justify-center items-center" onClick={() => incrementQuantity(product._id, product.stock)}>
                           <img className="w-[15px]" type="image" src={more} alt="Aumentar" />
                        </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <div className="flex flex-col gap-[15px] pb-[15px] w-full border-[#EBF0FF] border-b-[1px]">
            <div className="flex justify-between items-end h-[20px]">
               <p className="text-[#9098B1] text-[0.8em]">Subtotal:</p><p className="text-[#223263] ">{order.subtotal ? "$" + order.subtotal.toFixed(2) : ""}</p>
            </div>
            <div className="flex justify-between items-end h-[20px]">
               <p className="text-[#9098B1] text-[0.8em]">IVA 16%:</p><p className="text-[#223263] ">{order.tax ? "$" + order.tax.toFixed(2) : ""}</p>
            </div>
            <div className="flex justify-between items-end h-[20px]">
               <p className="text-[#9098B1] text-[0.8em]">Total:</p><p className="text-[#223263] ">{order.total ? "$" + order.total.toFixed(2) : ""}</p>
            </div>
         </div>
         <button ref={button} className={`h-[40px] text-[#FFFFFF] btn text-[20px] bg-[#3056D3] w-full rounded-[6px] ${button.current && button.current.disabled && "opacity-50"}`}
            type="button"
            onClick={checkOut}>Ir a la compra
         </button>
      </form>
   );
};

export default CartModal;