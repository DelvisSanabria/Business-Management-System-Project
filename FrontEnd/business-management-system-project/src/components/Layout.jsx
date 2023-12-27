/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import Menu from "./Menu";
import { Outlet } from "react-router-dom";

export default function Layout () {
  
  return (
    <>
    <div className="grid grid-rows-[100px_1fr] md:grid md:grid-cols-[250px_1fr]">
      <div>
        <Menu />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
      
    </>
  );
}