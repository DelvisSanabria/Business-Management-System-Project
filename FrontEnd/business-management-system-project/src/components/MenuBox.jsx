/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect,useContext } from "react"
import { useState } from "react"
import {Session} from "./../Session/session"
import { Link,useNavigate } from "react-router-dom"
import {  HomeSvg, LoginSvg, ProductSvg, ReportsSvg, SalesSvg, SettingsSvg, UserSvg, LogoutSvg, Cart, ContactUsSvg } from "./exportsImports";

export default function MenuBox(){
  const [isLogged, setIsLogged] = useState(false)
  const [activeTab, setIsActiveTab] = useState("Home")
  const [sessionItem, setSessionItem] = useState("Iniciar Sesion")
  const [sessionName, setSessionName] = useState("Login")
  const { user, setUser } = useContext(Session);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/");
  }

  const activeColor = "#3056d3"
  const defaultColor = "#637381"
  const svgs = {
    Home: <HomeSvg currentColor={activeTab === "Home" ? activeColor : (defaultColor)}/>,
    User: <UserSvg currentColor={activeTab === "User" ? activeColor : (defaultColor)}/>,
    Customers: <UserSvg currentColor={activeTab === "Customers" ? activeColor : (defaultColor)}/>,
    Vendors: <UserSvg currentColor={activeTab === "Vendors" ? activeColor : (defaultColor)}/>,
    Inventory: <ProductSvg currentColor={activeTab === "Inventory" ? activeColor : (defaultColor)}/>,
    Sales: <SalesSvg currentColor={activeTab === "Sales" ? activeColor : (defaultColor)}/>,
    Reports: <ReportsSvg currentColor={activeTab === "Reports" ? activeColor : (defaultColor)}/>,
    Settings: <SettingsSvg currentColor={activeTab === "Settings" ? activeColor : (defaultColor)}/>,
    MakeSale: <Cart currentColor={activeTab === "MakeSale" ? activeColor : (defaultColor)}/>,
    SessionColor: <LoginSvg currentColor={activeTab === "SessionColor" ? activeColor : (defaultColor)}/>,
    Contact: <ContactUsSvg currentColor={activeTab === "Contact" ? activeColor : (defaultColor)}/>,
    Logout: <LogoutSvg currentColor={activeTab === "Logout" ? activeColor : (defaultColor)}/>,
    Login: <LoginSvg currentColor={activeTab === "Login" ? activeColor : (defaultColor)}/>,
    SignUp: <UserSvg currentColor={activeTab === "SignUp" ? activeColor : (defaultColor)}/>,
  }

  const adminPages = [
    { name: "Home", title: "Inicio", path: "/" },
    { name: "Users", title: "Usuarios", path: "/users" },
    { name: "Customers", title: "Clientes", path: "/customers" },
    { name: "Vendors", title: "Vendedores", path: "/vendors" },
    { name: "Inventory", title: "Inventario", path: "/products" },
    { name: "Sales", title: "Ventas", path: "/sales" },
    { name: "MakeSale", title: "Realizar una Venta", path: "/makeSale" },
    { name: "Reports", title: "Reportes", path: "/reports" },
    { name: "Settings", title: "Ajustes", path: "/settings" },
    { name: sessionName, title: sessionItem, path: "/login" },
  ];

  const vendorsPages = [
    { name: "Home", title: "Inicio", path: "/" },
    { name: "Customers", title: "Clientes", path: "/customers" },
    { name: "Inventory", title: "Inventario", path: "/products" },
    { name: "Sales", title: "Ventas", path: "/sales" },
    { name: "MakeSale", title: "Realizar una Venta", path: "/makeSale" },
    { name: "Settings", title: "Ajustes", path: "/settings" },
    { name: sessionName, title: sessionItem, path: "/login" },
  ];

  const clientsPages = [
    { name: "Home", title: "Inicio", path: "/" },
    { name: "Inventory", title: "Productos", path: "/products" },
    { name: "Sales", title: "Carrito", path: "/cart" },
    { name: "Settings", title: "Ajustes", path: "/settings" },
    { name: "Customers", title: "Contactanos", path: "/contacUs" },
    { name: sessionName, title: sessionItem, path: "/login" },
  ];

  const generalMenu = [
    { name: "Home", title: "Inicio", path: "/" },
    { name: "Inventory", title: "Productos", path: "/products" },
    { name: "Customers", title: "Contactanos", path: "/contacUs" },
    { name: sessionName, title: "Iniciar Sesion", path: "/login" },
    { name: "SignUp", title: "Registrarse", path: "/SignUp" },
  ];
     
  const [MenuItems, setMenuItems] = useState(generalMenu)
  useEffect(()=>{
    let userRole = "";
    if(user && user.length > 0){
      setIsLogged(true)
      try {
        const parsedUser = JSON.parse(user);
        userRole = parsedUser.role;
      } catch (error) {
        console.error("an error occurred while parsing the user", error);
      } 
    }

    if (userRole === "admin") {
      setMenuItems(adminPages)
    } else if (userRole === "vendor") {
      setMenuItems(vendorsPages)
    } else if (userRole === "client") {
      setMenuItems(clientsPages)
    }

    if (isLogged === true) {
      setSessionItem("Cerrar Sesion");
      setSessionName("Logout");
    } else {
      setSessionItem("Iniciar Sesion");
      setSessionName("Login");
    }

  }, [isLogged])

  const handleActive = (tab) => {
    setIsActiveTab(tab.name);
  };
  return (
    <>
      <div className="h-fit w-[183px] left-0 bg-[#f1f6f9] shadow-md rounded-[0px_0px_0px_25px] overflow-hidden border-b [border-bottom-style:solid] border-[#9ba4b4]">
        {MenuItems.map((page, index) => (
    <Link
      key={page.name}
      to={page.path}
      onClick={() => {
        if (page.title === "Cerrar Sesion") {
          logout();
        } else {
          handleActive(page);
        }
      }}
      className={`grid grid-cols-[29px_1fr] gap-2 justify-items-start content-center h-[48px] top-0 border-b [border-bottom-style:solid] border-[#9ba4b4] w-[183px] left-0 ${
        activeTab === page.name ? "bg-[#d6dfff]" : "bg-[#f1f6f9]"
      } ${index === MenuItems.length - 1 ? "rounded-[0px_0px_0px_25px] overflow-hidden border-b [border-bottom-style:solid] border-[#9ba4b4]" : ""}`}
    >
      <div
        className={`w-[22px] h-[20px] px-2 ${
          activeTab === page.name ? "text-[#3056d3] stroke-[#3056d3]"  : "text-[#637381] stroke-[#637381]"
        }`}
        >
        {svgs[page.name]}
      </div>
      <div
        className={`font-normal text-[18px] text-center tracking-[0] leading-[normal] ${
          activeTab === page.name ? "text-[#3056d3]" : "text-[#637381]"
        }`}
      >
        {page.title}
      </div>
    </Link>
    ))}
      </div>
    </>
  );
}