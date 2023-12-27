/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import HomeSvg from "./Svgs/Home"
import Login from "./Svgs/Login"
import Products from "./Svgs/Products"
import ReportsSvg from "./Svgs/Reports"
import SalesSvg from "./Svgs/Sales"
import SettingsSvg from "./Svgs/Settings"
import UserSvg from "./Svgs/User"
import LogoutSvg from "./Svgs/Logout"
import Cart from "./Svgs/Cart"
import ContactUsSvg from "./Svgs/ContactUs"

export default function MenuBox(){
  const [isLogged, setIsLogged] = useState(false)
  const [activeTab, setIsActiveTab] = useState("Home")
  const [sessionItem, setSessionItem] = useState("Iniciar Sesion")
  const [Home, setHome] = useState("#3056d3")
  const [User, setUsers] = useState("#637381")
  const [Customers, setCustomers] = useState("#637381")
  const [Vendors, setVendors] = useState("#637381")
  const [Inventory, setInventory] = useState("#637381")
  const [Sales, setSales] = useState("#637381")
  const [Reports, setReports] = useState("#637381")
  const [Settings, setSettings] = useState("#637381")
  const [MakeSale, setMakeSale] = useState("#637381")
  const [Session, setSession] = useState("#637381")
  const [MenuItems, setMenuItems] = useState([])

  const [sessionIcon, setSessionIcon] = useState(<Login currentColor={Session}/>)
  const adminPages = [
   {name: "Home" , title:"Inicio", path: "/", icon: <HomeSvg currentColor={Home}/>},
   {name:"Users", title: "Usuarios", path: "/users", icon: <UserSvg currentColor={User}/>},
   {name: "Customers", title: "Clientes", path: "/customers", icon: <UserSvg currentColor={Customers}/>},
   {name: "Vendors" , title: "Vendedores", path: "/vendors", icon: <UserSvg currentColor={Vendors}/>},
   {name: "Inventory" , title: "Inventario", path: "/products", icon: <Products currentColor={Inventory}/>},
   {name: "Sales" , title: "Ventas", path: "/sales", icon: <SalesSvg currentColor={Sales}/>},
   {name:"MakeSale" , title: "Realizar una Venta", path: "/makeSale", icon: <SalesSvg currentColor={MakeSale}/>},
   {name: "Reports" , title: "Reportes", path: "/reports", icon: <ReportsSvg currentColor={Reports}/>},
   {name: "Settings" , title: "Ajustes" , path: "/settings", icon: <SettingsSvg currentColor={Settings}/>},
   {name: "Session" , title: sessionItem, path: "/login", icon: sessionIcon},]

   const vendorsPages = [
    {name: "Home" , title:"Inicio", path: "/", icon: <HomeSvg currentColor={Home}/>},
    {name: "Customers", title: "Clientes", path: "/customers", icon: <UserSvg currentColor={Customers}/>},
    {name: "Inventory" , title: "Inventario", path: "/products", icon: <Products currentColor={Inventory}/>},
    {name: "Sales" , title: "Ventas", path: "/sales", icon: <SalesSvg currentColor={Sales}/>},
    {name:"MakeSale" , title: "Realizar una Venta", path: "/makeSale", icon: <SalesSvg currentColor={MakeSale}/>},
    {name: "Settings" , title: "Ajustes" , path: "/settings", icon: <SettingsSvg currentColor={Settings}/>},
    {name: "Session" , title: sessionItem, path: "/login", icon: sessionIcon},]
 
    const clientsPages = [
      {name: "Home" , title:"Inicio", path: "/", icon: <HomeSvg currentColor={Home}/>},
      {name: "Inventory" , title: "Productos", path: "/products", icon: <Products currentColor={Inventory}/>},
      {name: "Sales" , title: "Carrito", path: "/cart", icon: <Cart currentColor={Sales}/>},
      {name: "Settings" , title: "Ajustes" , path: "/settings", icon: <SettingsSvg currentColor={Settings}/>},
      {name: "Customers", title: "Contactanos", path: "/contacUs", icon: <ContactUsSvg currentColor={Customers}/>},
      {name: "Session" , title: sessionItem, path: "/login", icon: sessionIcon},]
   
      const generalMenu = [
        {name: "Home" , title:"Inicio", path: "/", icon: <HomeSvg currentColor={Home}/>},
        {name: "Inventory" , title: "Productos", path: "/products", icon: <Products currentColor={Inventory}/>},
        {name: "Customers", title: "Contactanos", path: "/contacUs", icon: <ContactUsSvg currentColor={Customers}/>},
        {name: "Session" , title: "Iniciar Sesion", path: "/login", icon: <Login currentColor={Session}/>},
        {name: "Users" , title: "Registrarse", path: "/register", icon: <UserSvg currentColor={User}/>},]
     

  useEffect(()=>{
    const user = localStorage.getItem("user")
    if(user){
      setIsLogged(true)
      setSessionIcon(<LogoutSvg currentColor={Session}/>)
    }

    if (!user){
      setIsLogged(false)
      setSessionIcon(<Login currentColor={Session}/>)
    }

    let userRole = "admin";

    try {
      const parsedUser = JSON.parse(user);
      userRole = parsedUser.role;
    } catch (error) {
      console.error("an error occurred while parsing the user", error);
    }
  
    if (userRole === "admin") {
      setMenuItems(adminPages)
    } else if (userRole === "vendor") {
      setMenuItems(vendorsPages)
    } else if (userRole === "client") {
      setMenuItems(clientsPages)
    } else {
      setMenuItems(generalMenu)
    }

    if(isLogged === true){
      return setSessionItem("Cerrar Sesion")
    }else{
      return setSessionItem("Iniciar Sesion")
    }

  }, [Session, adminPages, clientsPages, generalMenu, isLogged, vendorsPages])

  const handleActive = (tab) => {
    const colors = {
      Home: "#3056d3",
      Users: "#3056d3",
      Customers: "#3056d3",
      Vendors: "#3056d3",
      Inventory: "#3056d3",
      Sales: "#3056d3",
      Reports: "#3056d3",
      Settings: "#3056d3",
      MakeSale: "#3056d3",
      Session: "#3056d3"
    };
  
    setIsActiveTab(tab.name);
    
    Object.keys(colors).forEach(key => {
      const color = key === tab.name ? colors[key] : "#637381";
      const setKey = {
        Home: setHome,
        Users: setUsers,
        Customers: setCustomers,
        Vendors: setVendors,
        Inventory: setInventory,
        Sales: setSales,
        Reports: setReports,
        Settings: setSettings,
        MakeSale: setMakeSale,
        Session: setSession
      };
      setKey[key](color);
    });
  };
  return (
    <>
      <div className="h-fit w-[183px] left-0 bg-[#f1f6f9] shadow-md rounded-[0px_0px_0px_25px] overflow-hidden border-b [border-bottom-style:solid] border-[#9ba4b4]">
        {MenuItems.map((page, index) => (
    <Link
      key={page.name}
      to={`http://localhost:5173${page.path}`}
      onClick={() => {handleActive(page)}}
      className={`grid grid-cols-[29px_1fr] gap-2 justify-items-start content-center h-[48px] top-0 border-b [border-bottom-style:solid] border-[#9ba4b4] w-[183px] left-0 ${
        activeTab === page.name ? "bg-[#d6dfff]" : "bg-[#f1f6f9]"
      } ${index === MenuItems.length - 1 ? "rounded-[0px_0px_0px_25px] overflow-hidden border-b [border-bottom-style:solid] border-[#9ba4b4]" : ""}`}
    >
      <div
        className={`w-[22px] h-[20px] px-2 ${
          activeTab === page.name ? "text-[#3056d3] stroke-[#3056d3]"  : "text-[#637381] stroke-[#637381]"
        }`}
        >
        {page.icon}
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