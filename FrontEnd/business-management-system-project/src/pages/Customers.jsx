import EditSvg from "../components/Svgs/Edit";
import DeleteSvg from "../components/Svgs/Delete";
import { AccountSvg } from "../components/exports";


export default function Customers () {
  return (
    <>
      <div className="grid grid-rows-[100px_80px_1fr_80px] md:hidden">
        <header className="flex flex-col items-start w-[88vw] my-10 mx-5">
          <div className="grid grid-rows-2 justify-items-start">
            <div className="flex w-[327px] items-center gap-[8px]">
              <div className="w-fit mt-[-1.00px] font-medium text-gray-900 text-[18px] tracking-[0] leading-[28px] whitespace-nowrap">
                <span>Tabla de clientes</span>
              </div>
              <div className="inline-flex items-start flex-[0_0_auto]">
                <div className=" text-[#3056d3] rounded-full bg-[#F9F5FF] p-1 text-[12px] text-center leading-[18px] w-[80px] mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                  <span>10 clientes</span>
                </div>
              </div>
            </div>
            <div>
              <p className="w-[327px] font-normal text-gray-500 text-[14px] tracking-[0] leading-[20px]">
                Lista de todos los clientes en la base de datos
              </p>
            </div>
          </div>
        </header>
        <div>
          <div className="flex justify-end mr-3">
            <div className="flex items-center justify-center rounded-full bg-[#3056d3] hover:bg-[#2f4ba8] w-[60px] h-[60px]">
              <button className="text-[50px] mb-3 text-white">+</button>
            </div>
          </div>
        </div>
        <div className="w-[97%] h-[70vh] mx-3 rounded-[20px_20px_0px_0px] overflow-auto ">
          <div className="grid grid-cols-[100px_1fr_70px] bg-[#f0f5f8] w-[100%] h-[144px] rounded-[20px_20px_0px_0px] overflow-hidden border-t-2 [border-top-style:solid] border-b-2 [border-bottom-style:solid] border-[#eaecf0]">
            <div className="w-[88px] m-5 h-[88px] bg-[#d9d9d9] rounded-[44px] shadow-[0px_4px_4px_#00000040]"></div>
            <div className="grid grid-rows-5  w-[200px] h-[142px]">
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Nombre:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorenzo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Apellido:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Mendoza
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Correo:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  admin@polar.com
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Telefono:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  +584123544232
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Direccion:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorem Ipsum...
                </span>
              </div>
            </div>
            <div className="h-[144px] p-6 grid grid-rows-2 items-center">
              <div>
                <EditSvg />
              </div>
              <div>
                <DeleteSvg />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[100px_1fr_70px] bg-[#f0f5f8] w-[100%] h-[144px] rounded-[20px_20px_0px_0px] overflow-hidden border-t-2 [border-top-style:solid] border-b-2 [border-bottom-style:solid] border-[#eaecf0]">
            <div className="w-[88px] m-5 h-[88px] bg-[#d9d9d9] rounded-[44px] shadow-[0px_4px_4px_#00000040]"></div>
            <div className="grid grid-rows-5  w-[200px] h-[142px]">
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Nombre:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorenzo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Apellido:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Mendoza
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Correo:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  admin@polar.com
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Telefono:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  +584123544232
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Direccion:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorem Ipsum...
                </span>
              </div>
            </div>
            <div className="h-[144px] p-6 grid grid-rows-2 items-center">
              <div>
                <EditSvg />
              </div>
              <div>
                <DeleteSvg />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[100px_1fr_70px] bg-[#f0f5f8] w-[100%] h-[144px] rounded-[20px_20px_0px_0px] overflow-hidden border-t-2 [border-top-style:solid] border-b-2 [border-bottom-style:solid] border-[#eaecf0]">
            <div className="w-[88px] m-5 h-[88px] bg-[#d9d9d9] rounded-[44px] shadow-[0px_4px_4px_#00000040]"></div>
            <div className="grid grid-rows-5  w-[200px] h-[142px]">
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Nombre:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorenzo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Apellido:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Mendoza
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Correo:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  admin@polar.com
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Telefono:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  +584123544232
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Direccion:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorem Ipsum...
                </span>
              </div>
            </div>
            <div className="h-[144px] p-6 grid grid-rows-2 items-center">
              <div>
                <EditSvg />
              </div>
              <div>
                <DeleteSvg />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[100px_1fr_70px] bg-[#f0f5f8] w-[100%] h-[144px] rounded-[20px_20px_0px_0px] overflow-hidden border-t-2 [border-top-style:solid] border-b-2 [border-bottom-style:solid] border-[#eaecf0]">
            <div className="w-[88px] m-5 h-[88px] bg-[#d9d9d9] rounded-[44px] shadow-[0px_4px_4px_#00000040]"></div>
            <div className="grid grid-rows-5  w-[200px] h-[142px]">
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Nombre:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorenzo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Apellido:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Mendoza
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Correo:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  admin@polar.com
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Telefono:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  +584123544232
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Direccion:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorem Ipsum...
                </span>
              </div>
            </div>
            <div className="h-[144px] p-6 grid grid-rows-2 items-center">
              <div>
                <EditSvg />
              </div>
              <div>
                <DeleteSvg />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[100px_1fr_70px] bg-[#f0f5f8] w-[100%] h-[144px] rounded-[20px_20px_0px_0px] overflow-hidden border-t-2 [border-top-style:solid] border-b-2 [border-bottom-style:solid] border-[#eaecf0]">
            <div className="w-[88px] m-5 h-[88px] bg-[#d9d9d9] rounded-[44px] shadow-[0px_4px_4px_#00000040]"></div>
            <div className="grid grid-rows-5  w-[200px] h-[142px]">
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Nombre:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorenzo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Apellido:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Mendoza
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Correo:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  admin@polar.com
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Telefono:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  +584123544232
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Direccion:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorem Ipsum...
                </span>
              </div>
            </div>
            <div className="h-[144px] p-6 grid grid-rows-2 items-center">
              <div>
                <EditSvg />
              </div>
              <div>
                <DeleteSvg />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[100px_1fr_70px] bg-[#f0f5f8] w-[100%] h-[144px] rounded-[20px_20px_0px_0px] overflow-hidden border-t-2 [border-top-style:solid] border-b-2 [border-bottom-style:solid] border-[#eaecf0]">
            <div className="w-[88px] m-5 h-[88px] bg-[#d9d9d9] rounded-[44px] shadow-[0px_4px_4px_#00000040]"></div>
            <div className="grid grid-rows-5  w-[200px] h-[142px]">
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Nombre:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorenzo
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Apellido:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Mendoza
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Correo:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  admin@polar.com
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Telefono:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  +584123544232
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                  Direccion:
                </label>
                <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                  Lorem Ipsum...
                </span>
              </div>
            </div>
            <div className="h-[144px] p-6 grid grid-rows-2 items-center">
              <div>
                <EditSvg />
              </div>
              <div>
                <DeleteSvg />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-5 items-center">
          <div className="w-[100px] h-[31px] py-3 font-semibold text-[#667085] text-[15px] text-center tracking-[0] leading-[15px]">
            <span>Página 1</span>
          </div>
          <div className="grid grid-cols-2 px-5">
            <button className="inline-flex items-start rounded-[8px] all-[unset] box-border">
              <div className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[8px] flex-[0_0_auto] hover:text-white hover:bg-[#3056d3] rounded-[8px] overflow-hidden border border-solid border-gray-300 shadow-shadow-xs">
                <div className="  text-[14px] leading-[20px] relative w-fit mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                  Anterior
                </div>
              </div>
            </button>
            <button className="inline-flex items-start rounded-[8px] all-[unset] box-border">
              <div className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[8px] flex-[0_0_auto] hover:text-white hover:bg-[#3056d3] rounded-[8px] overflow-hidden border border-solid border-gray-300 shadow-shadow-xs">
                <div className=" text-[14px] leading-[20px] relative w-fit mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                  Siguiente
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="grid grid-rows-[100px_1fr_80px]">
          <header className="grid grid-cols-2 gap-2 my-10 mx-5">
            <div className="grid grid-rows-2 justify-items-start">
              <div className="flex w-[327px] items-center gap-[8px]">
                <div className="w-fit mt-[-1.00px] font-medium text-gray-900 text-[18px] tracking-[0] leading-[28px] whitespace-nowrap">
                  <span>Tabla de clientes</span>
                </div>
                <div className="inline-flex items-start flex-[0_0_auto]">
                  <div className=" text-[#3056d3] rounded-full bg-[#F9F5FF] p-1 text-[12px] text-center leading-[18px] w-[80px] mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                    <span>10 clientes</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="w-[327px] font-normal text-gray-500 text-[14px] tracking-[0] leading-[20px]">
                  Lista de todos los clientes en la base de datos
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-end mr-3">
                <div className="flex items-center justify-center rounded-[8px] bg-[#3056d3] hover:bg-[#2f4ba8] w-[150px] h-[35px] p-3">
                  <button className="text-[13px] mb-1 text-white">Agregar Cliente</button>
                </div>
              </div>
            </div>
          </header>
          <div>
            <table className="w-[80vw] border-b-2">
              <thead>
                <tr className="text-[#637381]">
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Avatar
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Nombre
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Apellido
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Correo Electronico
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Teléfono
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Direccion
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[#637381] text-center">
                  <td className="border-b p-2 px-5">{<AccountSvg/>}</td>
                  <td className="border-b p-2">Nombre del cliente</td>
                  <td className="border-b p-2">Apellido del cliente</td>
                  <td className="border-b p-2">email@cliente.com</td>
                  <td className="border-b p-2">1234567890</td>
                  <td className="border-b p-2 text-ellipsis text-sm">Direccion...</td>
                  <td className="border-b p-2">
                    <div className=" ml-5 grid grid-cols-[35px_35px]">
                      <div>
                        <EditSvg/>
                      </div>
                      <div>
                        <DeleteSvg/>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 mt-5 items-between">
            <div className="w-[100px] h-[31px] py-3 font-semibold text-[#667085] text-[15px] text-center tracking-[0] leading-[15px]">
              <span>Página 1</span>
            </div>
            <div className="grid grid-cols-[100px_100px] mx-10 px-10 lg:mx-36 lg:px-36">
              <button className="inline-flex items-start rounded-[8px] all-[unset] box-border">
                <div className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[8px] flex-[0_0_auto] hover:text-white hover:bg-[#3056d3] rounded-[8px] overflow-hidden border border-solid border-gray-300 shadow-shadow-xs">
                  <div className="  text-[14px] leading-[20px] relative w-fit mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                    Anterior
                  </div>
                </div>
              </button>
              <button className="inline-flex items-start rounded-[8px] all-[unset] box-border">
                <div className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[8px] flex-[0_0_auto] hover:text-white hover:bg-[#3056d3] rounded-[8px] overflow-hidden border border-solid border-gray-300 shadow-shadow-xs">
                  <div className=" text-[14px] leading-[20px] relative w-fit mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                    Siguiente
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

