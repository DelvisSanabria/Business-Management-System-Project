/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect,useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { EmpresasPolar, Hamburger, MenuBox, UserSession, HomeSvg, Login, Products, ReportsSvg, SalesSvg, SettingsSvg, UserSvg, LogoutSvg, Cart, ContactUsSvg, AccountSvg } from "./exports";

export default function Menu () {
  const [isOpen, setOpen] = useState(false)

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
  const [Contact, setContact] = useState("#637381")
  const [MenuItems, setMenuItems] = useState([])
  const navigate = useNavigate();
  const [sessionIcon, setSessionIcon] = useState(<Login currentColor={Session}/>)
  /* const {user, setUser} = useContext(UserSession); */
  const logout = () => {
    setUser(null);
    navigate("/");
  }
  const adminPages = [
   {name: "Home" , title:"Inicio", path: "/", icon: <HomeSvg currentColor={Home}/>},
   {name:"Users", title: "Usuarios", path: "/users", icon: <UserSvg currentColor={User}/>},
   {name: "Customers", title: "Clientes", path: "/customers", icon: <UserSvg currentColor={Customers}/>},
   {name: "Vendors" , title: "Vendedores", path: "/vendors", icon: <UserSvg currentColor={Vendors}/>},
   {name: "Inventory" , title: "Inventario", path: "/products", icon: <Products currentColor={Inventory}/>},
   {name: "Sales" , title: "Ventas", path: "/sales", icon: <SalesSvg currentColor={Sales}/>},
   {name:"MakeSale" , title: "Realizar una Venta", path: "/makeSale", icon: <SalesSvg currentColor={MakeSale}/>},
   {name: "Reports" , title: "Reportes", path: "/reports", icon: <ReportsSvg currentColor={Reports}/>},]

   const vendorsPages = [
    {name: "Home" , title:"Inicio", path: "/", icon: <HomeSvg currentColor={Home}/>},
    {name: "Customers", title: "Clientes", path: "/customers", icon: <UserSvg currentColor={Customers}/>},
    {name: "Inventory" , title: "Inventario", path: "/products", icon: <Products currentColor={Inventory}/>},
    {name: "Sales" , title: "Ventas", path: "/sales", icon: <SalesSvg currentColor={Sales}/>},
    {name:"MakeSale" , title: "Realizar una Venta", path: "/makeSale", icon: <SalesSvg currentColor={MakeSale}/>},]
 
    const clientsPages = [
      {name: "Home" , title:"Inicio", path: "/", icon: <HomeSvg currentColor={Home}/>},
      {name: "Inventory" , title: "Productos", path: "/products", icon: <Products currentColor={Inventory}/>},
      {name: "Sales" , title: "Carrito", path: "/cart", icon: <Cart currentColor={Sales}/>},
      {name: "Customers", title: "Contactanos", path: "/contacUs", icon: <ContactUsSvg currentColor={Customers}/>},]
   
      const generalMenu = [
        {name: "Home" , title:"Inicio", path: "/", icon: <HomeSvg currentColor={Home}/>},
        {name: "Inventory" , title: "Productos", path: "/products", icon: <Products currentColor={Inventory}/>},
        {name: "Customers", title: "Contactanos", path: "/contacUs", icon: <ContactUsSvg currentColor={Customers}/>},
        {name: "Users" , title: "Registrarse", path: "/register", icon: <UserSvg currentColor={User}/>},]
        const SubMenuItems = [
          {name: "Contact", title: "Contactanos", path: "/contacUs", icon: <ContactUsSvg currentColor={Contact}/>},
          {name: "Settings" , title: "Ajustes" , path: "/settings", icon: <SettingsSvg currentColor={Settings}/>},
          {name: "Session" , title: sessionItem, path: "/login", icon: sessionIcon},]

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
      /* const parsedUser = JSON.parse(user);
      userRole = parsedUser.role; */
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
      Session: "#3056d3",
      Contact: "#3056d3"
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
        Session: setSession,
        Contact: setContact
      };
      setKey[key](color);
    });
  };
  return (
    <>
      <div className="grid grid-rows-[73px_1fr] justify-center md:hidden lg:hidden xl:hidden">
        <header>
          <div className="fixed grid grid-cols-2 m-y-2 m-x-4 items-center justify-items-end  w-full h-[73px] top-0 left-0 bg-[#f1f6f9]">
            <div>
              <img
                className="absolute w-[141px] h-[47px] top-[13px] left-[28px] object-cover"
                alt="Empresaspolar"
                src={EmpresasPolar}
              />
            </div>
            <div className="mr-4">
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                color="#14274E"
                duration={0.8}
                easing="ease-in"
                hideOutline={false}
              />
            </div>
          </div>
          <div className="fixed top-[73px] right-0">
            {isOpen && <MenuBox />}
          </div>
        </header>
      </div>

      <div className="hidden md:block w-[375px] h-fit">
        <div className="fixed w-[220px] h-[100vh] top-0 left-0 bg-white shadow-[0px_1px_4px_#0000001f]">
          <div className="flex m-4">
            <img
              className="w-[200px] object-cover"
              alt="Empresaspolar"
              src={EmpresasPolar}
            />
          </div>
          <div className="grid grid-rows-2 w-[220px] h-[100vh]">
            <div>
              {MenuItems.map((page) => (
                <Link
                  to={`http://localhost:5173${page.path}`}
                  onClick={() => {
                    if (page.title === "Cerrar Sesion") {
                      logout();
                    } else {
                      handleActive(page);
                    }
                  }}
                  key={page.name}
                  className={`grid grid-cols-[29px_1fr_4px] items-center justify-center w-[220px] h-[35px] ${
                    activeTab === page.name ? "bg-[#d6dfff]" : "bg-[#FFFFFF]"
                  }`}
                >
                  <div className="w-[22px] px-2 h-[21px]">{page.icon}</div>
                  <div
                    className={`w-[55px] px-3 font-medium text-[16px] tracking-[0] leading-[24px] whitespace-nowrap ${
                      activeTab === page.name
                        ? "text-[#3056d3]"
                        : "text-[#637381]"
                    }`}
                  >
                    {page.title}
                  </div>
                  <div
                    className={`w-[4px] h-[35px] ${
                      activeTab === page.name ? "bg-[#3056d3]" : ""
                    }`}
                  />
                </Link>
              ))}
            </div>
            <div>
              <div className="bg-[#E7E7E7] w-[190px] h-[1px] m-4"></div>
              {SubMenuItems.map((page) => (
                <Link
                  to={`http://localhost:5174${page.path}`}
                  onClick={() => {
                    handleActive(page);
                  }}
                  key={page.name}
                  className={`grid grid-cols-[29px_1fr_4px] items-center justify-center w-[220px] h-[35px] ${
                    activeTab === page.name ? "bg-[#d6dfff]" : "bg-[#FFFFFF]"
                  }`}
                >
                  <div className="w-[22px] px-2 h-[21px]">{page.icon}</div>
                  <div
                    className={`w-[55px] px-3 font-medium text-[16px] tracking-[0] leading-[24px] whitespace-nowrap ${
                      activeTab === page.name
                        ? "text-[#3056d3]"
                        : "text-[#637381]"
                    }`}
                  >
                    {page.title}
                  </div>
                  <div
                    className={`w-[4px] h-[35px] ${
                      activeTab === page.name ? "bg-[#3056d3]" : ""
                    }`}
                  />
                </Link>
              ))}
              <div className="w-[255px] h-[80px]">
              <div className="w-[255px] h-[80px]">
                <div className="w-[259px] h-[80px]">
                  <div className="grid grid-cols-[29px_1fr] gap-2 my-3 mx-7 items-center justify-center w-[220px]">
                    <Link to="http://localhost:5174/settings">
                      <AccountSvg></AccountSvg>
                    </Link>
                    <div>
                      <div className="font-medium text-[#637381] text-[13px] tracking-[0] leading-[24px] whitespace-nowrap">
                        DelvisDev
                      </div>
                      <div className=" font-normal text-[#637381] text-[11px] tracking-[0] leading-[20px] whitespace-nowrap">
                        Delvissivira9@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}