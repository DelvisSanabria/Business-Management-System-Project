import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {lens, lens2, cart_black, cart_white, cancel, CartModal} from "../components/exportsImports";

function Products() {
   const server = "http://localhost:3001/";
   const [products, setProducts] = useState([]);
   const limit = 6;
   const [productsRefs, setProductsRefs] = useState([]);
   const cart = useRef();
   const [lensSrc, setLensSrc] = useState(lens);
   const [search, setSearch] = useState({
      value: "",
      error: ""
   });
   const [pagination, setPagination] = useState({
      pages: [],
      currentPage: 1
   });
   const [input, setInput] = useState(JSON.parse(localStorage.getItem("input")) || {
      products: [],
      checked: {},
   });

   useEffect(() => {
      setProductsRefs((refs) => Array(products.length).fill().map((_, index) => refs[index] || React.createRef()));
   }, [products]);

   useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 1440px)');
      function handleResize() {
      if (mediaQuery.matches) {
         setLensSrc(lens2);
      } else {
         setLensSrc(lens);
      }
      }
      handleResize();
      mediaQuery.addEventListener("change", handleResize);
      return () => {
         mediaQuery.removeEventListener("change", handleResize);
      };
   }, []);

   useEffect(() => {
      if (!search.value) {
         fetchProducts();
      }
   }, [search.value]);

   const handleProducts = (event) => {
      const { id, checked, value } = event.target;
      if (checked) {
         setInput((input) => ({
            ...input,
            products: [...input.products, id],
            price: {...input.price, [id]: value},
            checked: {...input.checked, [id]: checked},
            quantity: {...input.quantity, [id]: 1}
         }
      ));
      } else {
         setInput((input) => {
            delete input.price[id];
            delete input.quantity[id];
            return {
               ...input,
               products: input.products.filter((Id) => Id !== id),
               price: {...input.price},
               checked: {...input.checked, [id]: checked},
               quantity: {...input.quantity}
            }
         })
      }
   }

   const fetchProducts = async (pageOn = 1) => {
      const searchParam = search.value ? `search=${search.value}&` : "";
      try {
         const response = await axios.get(`${server}products?${searchParam}page=${pageOn}&limit=${limit}`);
         if (response.status === 200) {
            const { docs, totalPages, page } = response.data;
            setProducts([...docs]);
            let pagesCount = [];
            for (let i = 1; i <= totalPages; i++) {
               pagesCount.push(i);
            }
            setPagination({pages: pagesCount, currentPage: page});
         }
      } catch ({name, message}) {
         console.error(`${name}: ${message}`);
      }
   }
   
   const validateSearch = () => {
      const regexValue = /^[\w ]+$/;
      if (!search.value) {
         setSearch((prev) => ({...prev, error: ""}));
      } else if (!regexValue.test(search.value)) {
         setSearch((prev) => ({...prev, error: "Búsqueda inválida"}));
      } else {
         setSearch((prev) => ({...prev, error: ""}));
         fetchProducts();
      }
   }

   return (
      <section className="pt-[50px] gap-[25px] bg-white px-[25px] flex flex-col w-full box-border relative top-[73px] pb-10 min-[1440px]:px-[45px] min-[1440px]:justify-center">
         <div className="flex gap-[10px]">
            <figure className={`flex z-10 justify-center items-center max-[1439px]:bg-[#14274E] max-[1439px]:rounded-[35px] w-[45px] h-[45px] cursor-pointer ${input.products.length === 0 && "opacity-80"}`} onClick={() => cart.current.showModal()}>
               <input
                  disabled={input.products.length === 0}
                  src={cart_white}
                  type="image"
               />
            </figure>
            <dialog ref={cart}>
               <CartModal {...input} />
               <input type="image" className="absolute right-[5px] top-[10px] cursor-pointer w-[35px]" src={cancel} alt="Cancelar" onClick={() => {cart.current.close()} } />
            </dialog>
            <div className="flex justify-center min-[1440px]:border-[#E7E7E7] min-[1440px]:border-[1px] bg-[#F1F6F9] w-fit h-[45px] rounded-[35px] min-[1440px]:bg-[#F8FAFC] min-[1440px]:rounded-[8px]">
               <div className="flex flex-col justify-center items-center min-[1440px]:w-[350px]">
                  <input
                     type="text"
                     placeholder="¿Qué necesitas?"
                     id="search"
                     onChange={(event) => setSearch((prev) => ({...prev, value: event.target.value}))}
                     onKeyDown={(event) => {
                        if (event.key === "Enter") {
                           validateSearch();
                        }
                     }}
                  />
                  <div className="relative w-full top-[13px]">
                     <span className="error">{search.error}</span>
                  </div>
               </div>
               <figure 
               className="flex z-10 justify-center items-center max-[1439px]:bg-[#14274E] max-[1439px]:rounded-[35px] w-[45px] h-[45px] cursor-pointer" 
               onClick={validateSearch}>
                  <input
                     type="image"
                     alt="buscar"
                     src={lensSrc}
                     className="w-[25px]"
                  />
               </figure>
            </div>
         </div>
         <h4 className="text-[20px] font-bold text-[#14274E]">Productos Populares</h4>
         <div id="Products" className="flex flex-col w-full items-start gap-[50px] text-[14px]">
            <div className="grid grid-cols-2 gap-[10px]">
               {products && products.map((product, index) => (
                  <div className="bg-[#D9D9D9] rounded-[20px] pb-[10px] " key={product._id}>
                     <div className="relative flex justify-center items-center">
                        <img className="h-[220px]" src={server + product.imageURL} alt={product.name} />
                        <div className="absolute flex justify-center items-center top-[10px] left-[10px] rounded-full w-[35px] h-[35px] bg-white" onClick={() => productsRefs[index].current.click()}>
                           <input className="w-[20px] h-[20px]" type="image" src={cart_black} alt="Carrito" />
                           <input className="hidden"
                              type="checkbox"
                              ref={productsRefs[index]}
                              title="Añadir al carrito"
                              checked={input.checked && (input.checked[product._id] || false)}
                              onChange={handleProducts}
                              id={product._id}
                              value={product.price}
                           />
                        </div>
                     </div>
                     <div className="flex flex-col gap-[10px] px-[10px] font-semibold ">
                        <p className="h-[30px]">{product.name}</p>
                        <div className="flex justify-between items-center">
                           <p className="text-[20px] ">${product.price}</p>
                           {product.stock > 0 ? <p className="text-[#064E3B] bg-[#ECFDF5] h-[20px] flex items-center justify-center w-[80px] text-[11px] rounded-[4px]">Disponible</p> : <p className="text-[#991B1B] bg-[#FEF2F2] h-[20px] flex items-center justify-center w-[80px] text-[11px] rounded-[4px]">Agotado</p>}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <div className="flex h-[52px] justify-center items-center shadow-md border-[#EDEFF1] border-[1px] w-[310px] rounded-[25px] ">
            {pagination.pages && pagination.pages.map((page, index) => (
               <input
                  className={`border-[1px] rounded-[25px] w-[35px] h-[35px] cursor-pointer ${page === pagination.currentPage ? "bg-[#3056D3] text-white border-[#3056D3] " : "text-[#637381] border-[#EDEFF1]"}`}
                  type="button"
                  value={page}
                  key={index}
                  onClick={() => {fetchProducts(page);}}
               />
            ))}
         </div>
      </section>
   );
};

export default Products;