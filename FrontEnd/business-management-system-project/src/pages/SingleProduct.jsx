import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from "axios"
import HarinaAvena from "./../images/products/harina de avena.png"

export default function SingleProduct (){
  const paraAcceder = "http://localhost:5173/products/singleProduct/659306324c51849b20ef3987"
  const [quanty, setQuanty] = useState(0);
  const [productDates, setProductDates] = useState({})
  const { id } = useParams();
  const getProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        const data = response.data;
        setProductDates(data);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

   useEffect(() => {
     getProduct(id)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

  const incrementQt = ()=>{
    setQuanty(quanty + 1)
  }
  const decrementQt = ()=>{
    if(quanty > 0){
      setQuanty(quanty - 1)
    }
  }
  const producto = {
    id: 1,
    titulo: 'Camiseta',
    imagen: 'https://ejemplo.com/camiseta.jpg',
    descripcion: '¡Una camiseta de alta calidad!'
  };

  return (
    <>
      <div className="ml-3 mr-3 md:hidden">
        <div className="grid grid-rows-[80px_1fr]">
          <div className="grid grid-cols-2 gap-2">
            <button>carrito</button>
            <button>busqueda producto</button>
          </div>
          <div className="grid grid-rows-[60px_80px_1fr] bg-[#d9d9d9] w-[92vw] h-fit rounded-xl py-2 px-3 mb-3">
            <div>
              <h2 className="text-xl text-[#212b36] font-bold m-2">
                Harina de Avena - Quaker
              </h2>
              <div className="bg-[#eef2f5] w-[100%] h-[1px] my-4 mx-0"></div>
            </div>
            <div className="h-[70px]">
              <div className="grid grid-cols-2 h-[70px]">
                <div className="mr-16">
                  <div className="mb-1 text-[#3d464f]">
                    <label htmlFor="quanty">Cantidad</label>
                  </div>
                  <div className="grid grid-cols-[17px_60px_17px] items-center justify-items-center w-[100px] h-[25px] bg-white rounded-full">
                    <div
                      onClick={decrementQt}
                      className="cursor-pointer h-[20px] w-[20px] ml-2 rounded-full bg-[#14274e] hover:bg-[#173267] text-white"
                    >
                      <div className="px-1.5 my-[-3px]">
                        <span>-</span>
                      </div>
                    </div>
                    <div className="w-12 ml-5 flex text-center justify-center">
                      <input
                        className="w-6"
                        type="number"
                        min="0"
                        max="999"
                        value={quanty}
                        readOnly
                        id="quanty"
                      />
                    </div>
                    <div
                      onClick={incrementQt}
                      className="cursor-pointer h-[20px] w-[20px] ml-2 rounded-full bg-[#14274e] hover:bg-[#173267] text-white"
                    >
                      <div className="px-1 my-[-3px]">
                        <span>+</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-rows-[30px_50px] justify-items-end ml-16 pl-10">
                  <div className="text-[#3d464f]">
                    <span>I.V.A (16%)</span>
                  </div>
                  <div className="font-bold">
                    <span>$3.50</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#eef2f5] w-[100%] h-[1px] mx-0"></div>
            </div>
            <div>
              <div className="grid grid-cols-[1fr_180px] items-center justify-items-center justify-around h-[370px]">
                <div>
                  <div className="bg-[#b3b9c5] w-[250px] my-3 py-2 h-[360px] rounded-[20px] p-2">
                    <img className="w-[230px]" src={HarinaAvena} alt="harina" />
                  </div>
                </div>
                <div className="grid grid-cols-[5px_1fr] gap-3">
                  <div className="bg-[#eef2f5] w-[1px] h-[370px] my-2 mx-0"></div>
                  <div className="grid grid-rows-[128px_128px_128px] h-[300px] items-center justify-items-center">
                    <div className="bg-[#b3b9c5] w-[110px] h-[117px] rounded-[20px] p-2">
                      <img
                        className="w-[150px] h-[100%]"
                        src={HarinaAvena}
                        alt="harina"
                      />
                    </div>
                    <div className="bg-[#b3b9c5] w-[110px] h-[117px] rounded-[20px] p-2">
                      <img
                        className="w-[150px] h-[100%]"
                        src={HarinaAvena}
                        alt="harina"
                      />
                    </div>
                    <div className="bg-[#b3b9c5] w-[110px] h-[117px] rounded-[20px] p-2">
                      <img
                        className="w-[150px] h-[100%]"
                        src={HarinaAvena}
                        alt="harina"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#eef2f5] w-[100%] h-[1px] my-4 mx-0"></div>
            </div>
            <div>
              <div>
                <div className="px-3">
                  <button
                    className="btn bg-[#3056D3] text-[#FFFFFF] w-full rounded-[6px] h-[50px]"
                    id="submit"
                    type="button"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
              <div className="bg-[#eef2f5] w-[100%] h-[1px] my-4 mx-0"></div>
            </div>
            <div>
              <div>
                <div>
                  <h3 className="text-xl text-[#212b36] font-bold m-2">
                    Descipcion del producto
                  </h3>
                </div>
              </div>
              <div>
                <p className="m-2">{producto.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:mx-5 md:py-4">
        <div className="grid grid-cols-2 bg-[#d9d9d9] w-[70vw] h-[90vh] my-4 rounded-xl shadow-lg">
          <div>
            <div className="grid grid-rows-[1fr_140px] items-center justify-items-center justify-around h-[370px] my-5">
              <div>
                <div className="bg-[#b3b9c5] flex justify-center w-[400px] my-3 py-2 h-[400px] rounded-[20px] p-2">
                  <img className="w-[230px]" src={HarinaAvena} alt="harina" />
                </div>
              </div>
              <div>
                <div className="grid grid-cols-[128px_128px_128px] h-[300px] items-center justify-items-center">
                  <div className="bg-[#b3b9c5] w-[110px] h-[117px] rounded-[20px] p-2">
                    <img
                      className="w-[150px] h-[100%]"
                      src={HarinaAvena}
                      alt="harina"
                    />
                  </div>
                  <div className="bg-[#b3b9c5] w-[110px] h-[117px] rounded-[20px] p-2">
                    <img
                      className="w-[150px] h-[100%]"
                      src={HarinaAvena}
                      alt="harina"
                    />
                  </div>
                  <div className="bg-[#b3b9c5] w-[110px] h-[117px] rounded-[20px] p-2">
                    <img
                      className="w-[150px] h-[100%]"
                      src={HarinaAvena}
                      alt="harina"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-[60px_50px_80px_100px] my-5">
            <div>
              <h2 className="text-xl text-[#212b36] font-bold m-2">
                Harina de Avena - Quaker
              </h2>
              <div className="bg-[#eef2f5] w-[96%] h-[1px] my-4 mx-0"></div>
            </div>
            <div>
              <div className='grid grid-cols-2 gap-52'>
                <div><span className='text-[#3d464f]'>Categoria</span></div>
                <div className='ml-10'><span className='font-bold'>Categoria</span></div>
              </div>
              <div className="bg-[#eef2f5] w-[96%] h-[1px] my-4 mx-0"></div>
            </div>
            <div className="h-[70px]">
              <div className="grid grid-cols-2 h-[70px] my-5">
                <div className="grid grid-rows-[25px_20px] mr-36 justify-items-center">
                  <div className="mb-1 text-[#3d464f] font-bold">
                    <label htmlFor="quanty">Cantidad</label>
                  </div>
                  <div className="grid grid-cols-[17px_60px_17px] items-center justify-items-center w-[100px] h-[25px] bg-white rounded-full">
                    <div
                      onClick={decrementQt}
                      className="cursor-pointer h-[20px] w-[20px] ml-2 rounded-full bg-[#14274e] hover:bg-[#173267] text-white"
                    >
                      <div className="px-1.5 my-[-3px]">
                        <span>-</span>
                      </div>
                    </div>
                    <div className="w-12 ml-5 flex text-center justify-center">
                      <input
                        className="w-6"
                        type="number"
                        min="0"
                        max="999"
                        value={quanty}
                        readOnly
                        id="quanty"
                      />
                    </div>
                    <div
                      onClick={incrementQt}
                      className="cursor-pointer h-[20px] w-[20px] ml-2 rounded-full bg-[#14274e] hover:bg-[#173267] text-white"
                    >
                      <div className="px-1 my-[-3px]">
                        <span>+</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-rows-[30px_50px] justify-items-end mr-5">
                  <div className="font-bold text-xl">
                    <span>$3.50</span>
                  </div>
                  <div className="text-[#3d464f] text-sm">
                    <span>I.V.A (16%)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='my-3'>
              <div>
                <div className="px-3">
                  <button
                    className="btn bg-[#3056D3] text-[#FFFFFF] w-full rounded-[6px] h-[50px]"
                    id="submit"
                    type="button"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <h3 className="text-xl text-[#212b36] font-bold">
                    Descipcion del producto
                  </h3>
                </div>
              </div>
              <div>
                <p className="my-2 text-[#3d464f]">{producto.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}