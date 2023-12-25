import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Session from "../Session/session";
import { polar, menu, home, box, login, signup } from "./exports";

function Layout() {
   const {user, setUser} = useContext(Session);
   const [open, setOpen] = useState(false);
   const logout = () => {
      setUser(null);
      navigate("/");
   }
   const navigate = useNavigate();
   return(
      <>
         <header className="fixed z-10 flex justify-between p-[25px] items-center w-[375px] h-[73px] bg-[#f1f6f9]">
            <img
            className="w-[141px] h-[47px] top-[13px] left-[28px] object-cover"
            alt="Empresaspolar" src={polar}/>
            <input 
            className="w-[30px] h-[30px] relative right-[35px]"
            type="image" src={menu} alt="menu"
            onClick={() => setOpen(!open)}/>
            {open && (
               <nav className="absolute flex flex-col right-0 top-[73px] w-[170px] bg-white [border-bottom-left-radius:25px]">
                  <Link to="/" className="navbutton">
                     <img className="w-[22px]" src={home} alt="home" />
                     <p>Inicio</p>
                  </Link>
                  <Link to="/products" className="navbutton">
                     <img className="w-[22px]" src={box} alt="products" />
                     <p>Productos</p>
                  </Link>
                  <Link to="/login" className="navbutton">
                     <img className="w-[22px]" src={login} alt="login" />
                     <p>Iniciar Sesión</p>
                  </Link>
                  <Link to="/signup" className="navbutton [border-bottom-left-radius:25px]">
                     <img className="w-[22px]" src={signup} alt="signup" />
                     <p>Registrarse</p>
                  </Link>
               </nav>
            )}
         </header>
         <section className="pt-[50px] flex flex-col w-full h-screen relative top-[50px] items-center">
               <Outlet />
         </section>
      </>
   )
}

export default Layout;