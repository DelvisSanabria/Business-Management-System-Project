/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import EmpresasPolar from "../assets/EmpresasPolar2010.webp";
export default function Layout () {
  return (
    <>
      <div className="grid grid-rows-[73px_1fr] justify-center">
        <header>
          <div className="fixed w-full h-[73px] top-0 left-0 bg-[#f1f6f9]">
            <img
              className="absolute w-[141px] h-[47px] top-[13px] left-[28px] object-cover"
              alt="Empresaspolar"
              src={EmpresasPolar}
            />
          </div>
        </header>
        <Outlet />
      </div>
      
    </>
  )
}