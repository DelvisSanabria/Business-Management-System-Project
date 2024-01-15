import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { shoppingCart } from "../Session/session";
import axios from "axios";
import { lens, lens2, cart_black, cart_white, cart_green, cancel, CartModal } from "../components/exportsImports";

function Products() {
   const server = "http://localhost:3001/";
   const [products, setProducts] = useState([]);
   const { cartProducts } = useContext(shoppingCart);
   const limit = 6;
   const [productsRefs, setProductsRefs] = useState([]);
   const cart = useRef();
   const [src, setSrc] = useState({ lens: lens, cart: cart_white });
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
            setSrc({ lens: lens2, cart: cart_black });
         } else {
            setSrc({ lens: lens, cart: cart_white });
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
      const { id, checked } = event.target;
      if (checked) {
         setInput((input) => ({
            ...input,
            products: [...input.products, id],
            checked: { ...input.checked, [id]: checked },
         }
         ));
      } else {
         setInput((input) => {
            return {
               ...input,
               products: input.products.filter((Id) => Id !== id),
               checked: { ...input.checked, [id]: checked },
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
            setPagination({ pages: pagesCount, currentPage: page });
         }
      } catch ({ name, message }) {
         console.error(`${name}: ${message}`);
      }
   }

   useEffect(() => {
      if (cartProducts) {
         let productsChecked = {};
         cartProducts.products.forEach((id) => {
            productsChecked[id] = true;
         })
         setInput(prevInput => ({
            ...prevInput,
            products: cartProducts.products,
            checked: productsChecked
         }));
      }
   }, [cartProducts]);


   const validateSearch = () => {
      const regexValue = /^[\w ]+$/;
      if (!search.value) {
         setSearch((prev) => ({ ...prev, error: "" }));
      } else if (!regexValue.test(search.value)) {
         setSearch((prev) => ({ ...prev, error: "Búsqueda inválida" }));
      } else {
         setSearch((prev) => ({ ...prev, error: "" }));
         fetchProducts();
      }
   }

   return (
      <section className="pt-[50px] gap-[25px] lg:gap-[50px] bg-white px-[25px] flex flex-col w-full box-border relative pb-10 lg:px-[45px] lg:justify-center">
         <div className="flex relative gap-[10px] lg:justify-center lg:w-full">
            <div className="flex justify-center relative lg:border-[#E7E7E7] lg:border-[1px] bg-[#F1F6F9] w-fit h-[45px] rounded-[35px] lg:bg-[#F8FAFC] lg:rounded-[8px]">
               <div className="flex flex-col justify-center items-center lg:w-[350px]">
                  <input
                     className="w-full"
                     type="text"
                     placeholder="¿Qué necesitas?"
                     id="search"
                     onChange={(event) => setSearch((prev) => ({ ...prev, value: event.target.value }))}
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
                  className="flex z-10 justify-center items-center max-lg:bg-[#14274E] max-lg:rounded-[35px] w-[45px] h-[45px] cursor-pointer"
                  onClick={validateSearch}>
                  <input
                     type="image"
                     alt="buscar"
                     src={src.lens}
                     className="w-[25px]"
                  />
               </figure>
            </div>
            <figure className={`flex fixed max-lg:right-[25px] lg:relative lg:border-[1px] lg:border-[#E7E7E7] max-lg:z-30 justify-center items-center bg-[#14274E] lg:bg-white lg:rounded-[8px] rounded-[35px] w-[45px] h-[45px] cursor-pointer`} onClick={() => cart.current.open ? cart.current.close() : cart.current.show()}>
               <input
                  src={src.cart}
                  type="image"
               />
               {input.products.length > 0 && <p className="rounded-full w-[18px] h-[18px] bg-[#9BA4B4] lg:bg-[#3056D3] text-white text-[14px] flex justify-center items-center absolute top-0 lg:-top-[5px] right-0 lg:-right-[5px] ">{input.products.length}</p>}
            </figure>
            <dialog className="dialog w-[70%] lg:w-[30%] fixed lg:absolute lg:mr-[45px] z-20 top-[145px] lg:top-[45px] " ref={cart}>
               <CartModal products={input.products} />
            </dialog>
         </div>
         <h4 className="text-[20px] font-bold text-[#14274E]">Productos Populares</h4>
         <div id="Products" className="flex flex-col w-full items-start text-[14px] lg:text-[16px] ">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px] lg:gap-[50px] lg:w-full ">
               {products && products.map((product, index) => (
                  <div className="flex lg:justify-center relative" key={product._id}>
                     <div className={`absolute z-10 flex justify-center items-center top-[10px] left-[30px] rounded-full w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] ${input.checked && input.checked[product._id] ? "bg-[#edfff8] border-[1px] border-[#429c5e]" : "bg-white"}`} onClick={() => productsRefs[index].current.click()}>
                        <img className="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]" type="image" src={input.checked && input.checked[product._id] ? cart_green : cart_black} alt="Carrito" />
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
                     <Link to={`/products/${product._id}`} className="bg-[#D9D9D9] rounded-[20px] pb-[10px] w-[230px] z-0">
                        <div className="relative flex justify-center items-center">
                           <img className="h-[220px] lg:max-h-[230px]" src={server + product.imageURL} alt={product.name} />
                        </div>
                        <div className="flex flex-col gap-[10px] px-[10px] font-semibold ">
                           <p className="h-[30px]">{product.name}</p>
                           <div className="flex justify-between items-center">
                              <p className="text-[20px] ">${product.price.toFixed(2)}</p>
                              <p className={`h-[20px] lg:h-[25px] flex items-center justify-center w-[80px] text-[11px] lg:text-[14px] rounded-[4px] ${product.stock > 0 ? "text-[#064E3B] bg-[#ECFDF5]" : "text-[#991B1B] bg-[#FEF2F2]"}`}>{product.stock > 0 ? "Disponible" : "Agotado"}</p>
                           </div>
                        </div>
                     </Link>
                  </div>
               ))}
            </div>
         </div>
         <div className="flex justify-center">
            <div className="flex h-[52px] justify-center items-center lg:gap-[7px] shadow-md border-[#EDEFF1] border-[1px] w-[310px] rounded-[25px] ">
               {pagination.pages && pagination.pages.map((page, index) => (
                  <input
                     className={`border-[1px] rounded-[25px] w-[35px] h-[35px] cursor-pointer ${page === pagination.currentPage ? "bg-[#3056D3] text-white border-[#3056D3] " : "text-[#637381] border-[#EDEFF1]"}`}
                     type="button"
                     value={page}
                     key={index}
                     onClick={() => { fetchProducts(page); }}
                  />
               ))}
            </div>
         </div>
      </section>
   );
};

export default Products;