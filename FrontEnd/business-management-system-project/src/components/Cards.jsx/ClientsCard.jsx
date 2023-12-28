/* eslint-disable react/prop-types */
import {  motion } from "framer-motion"
import { useEffect, useState,useRef } from "react";
import axios from "axios";



const ClientsCard = ({ isOpen,type, onClose,clientEmail}) => {
  const [previousDates, setPreviosDates] = useState({})

  const [statusMsg, setStatusMsg] = useState("");

  const server = "http://localhost:3001";
   const [user, setUser] = useState({
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      role: "client"
   });
   const [error, setError] = useState({
      avatar: "",
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      repPassword: "",
      address: ""
   });
   const [input, setInput] = useState({
      avatar: "",
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      repPassword: "",
      address: "",
      role: "client"
   });
   const button = useRef();
   const inputFile = useRef();
   if (user.name && user.lastName && user.address) {
      let name = "";
      let lastName = "";
      for (let word of user.name.split(" ")) {
         name += word[0].toLowerCase() + word.slice(1) + " ";
      }
      for (let word of user.lastName.split(" ")) {
         lastName += word[0].toLowerCase() + word.slice(1) + " ";
      }
      user.name = name.trim();
      user.lastName = lastName.trim();
      user.address = user.address.trim();
   }

   
   const handleSubmit = async () => {
      try {
         const formdata = new FormData();
         for (const prop in user) {
            formdata.append(prop, user[prop]);
         }
         
         const response = await axios.patch(`${server}/users/${clientEmail}`, formdata, {
            headers: {
               "Content-Type": "multipart/form-data"
            }
         });
         if (response.status === 201) {
            setInput({
               avatar: "",
               name: "",
               lastName: "",
               phone: "",
               email: "",
               password: "",
               repPassword: "",
               address: "",
               role: "client"
            })
            setStatusMsg("El usuario se ha editado correctamente");
         }else if (response.status === 500) {
            setStatusMsg("Error al editar el usuario");
         }
      } catch ({name, message, response}) {
         if (response.data.email) {
            setError((prev) => ({...prev, email: response.data.email}));
         }
         console.error(`${name}: ${message}`);
      }
   }
   const handleChange = (event) => {
      const { name, value } = event.target;
      setInput((prev) => ({...prev, [name]: value }));
   }

   const handleValidation = (previousDates) => {
    const { password, repPassword } = input;
    const regexList = { 
      name: /^[a-zñ áéíóúñÁÉÍÓÚÑ]+$/i, 
      lastName: /^[a-zñ áéíóúñÁÉÍÓÚÑ]+$/i, 
      email: /^[a-z0-9.-]+@[a-z0-9-]+(\.[a-z]{2,4}){1,3}$/i, 
      phone: /^(\+[\d]{2})?\d{3,4}\d{3}\d{2}\d{2}$/, 
      password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&.*/])[^<>{}:;'"?,]{8,16}$/, 
      address: /^[a-z0-9-,. áéíóúñÁÉÍÓÚÑ]+$/i,
      role: /^[a-zñ áéíóúñÁÉÍÓÚÑ]+$/i, 
    };
  
    const message = {
      name: "El nombre es inválido",
      lastName: "El apellido es inválido",
      email: "El correo es inválido",
      phone: "El teléfono es inválido",
      password: "La contraseña es inválida",
      address: "La dirección es inválida",
      avatar: "Sólo en formato: png, jpg, jpeg"
    };
    
    let user = {};
    let errors = {};
    let isValid = true;
    
    for (let field in input) {
      if(input[field] === ""){
        user = { ...user, [field]: previousDates[field] };
      }
      else if (input[field]) {
        if (regexList[field] && !regexList[field].test(input[field])) {
          errors = { ...errors, [field]: message[field] };
          user = { ...user, [field]: "" };
          isValid = false;
        } else {
          errors = { ...errors, [field]: "" };
          user = { ...user, [field]: input[field] };
        }
      } else if (field === "avatar") {
        if (inputFile.current && inputFile.current.files.length > 0) {
          const file = inputFile.current.files[0];
          switch (file.type) {
            case "image/jpeg":
            case "image/png":
              user = { ...user, avatar: file };
              errors = { ...errors, avatar: "" };
              break;
            default:
              errors = { ...errors, [field]: message[field] };
              user = { ...user, avatar: null };
              isValid = false;
          }
        } else {
          isValid = false;
        }
      } else {
        isValid = false;
      }
    }
    
    if (password && regexList.password.test(password)) {
      if (!repPassword) {
        isValid = false;
      } else if (password !== repPassword) {
        errors = { ...errors, repPassword: "La contraseña no coincide" };
        user = { ...user, password: "" };
        isValid = false;
      } else {
        errors = { ...errors, repPassword: "" };
        user = { ...user, password };
      }
    }
    if(button.current){
      button.current.disabled = !isValid;
      setError(errors);
      setUser(user);
    }
  }

  const getClient = async (clientEmail) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${clientEmail}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setPreviosDates(data);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

   useEffect(() => {
      handleValidation(previousDates);
      //eslint-disable-next-line
   }, [input]);

   useEffect(() => {
     getClient(clientEmail)
     console.log(previousDates)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [clientEmail])

  return (
    <>
      {isOpen && type === "createClient" && (
        <motion.div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg overflow-auto h-[95vh] w-[460px]">
            <form className="z-10 flex flex-col justify-center items-center gap-[21px]   rounded-[20px]">
            <div className="relative grid grid-cols-[1fr_30px]">
                <div>
                  <p className="text-[24px] border-[#E7E7E7] border-b-[1px] text-center w-full">
                    Crear nuevo Cliente
                  </p>
                </div>
                <div onClick={onClose} className="absolute top-0 right-[-100px] flex px-4 hover:text-white hover:bg-red-500 rounded-[8px] border border-[#394867]">
                  <button className="text-[#394867] w-[20px]   font-bold rounded" >X</button>
                </div>
            </div>
              {statusMsg && (
                <div className={`${statusMsg == "El usuario se ha creado correctamente" ? "bg-green-200 text-green-500 p-3" : "bg-red-200 text-red-500 p-3"}`}>
                  <span>{statusMsg}</span>
                </div>
              )}
              <div className="frame flex flex-col gap-[15px] px-4 w-full">
                <div className="flex justify-center">
                  <figure onClick={() => inputFile.current.click()} className="cursor-pointer relative rounded-full bg-[#E7E7E7] w-[125px] h-[125px] shadow-sm">
                    <div
                      className="absolute bottom-0 flex justify-center items-center w-[35px] h-[35px] rounded-full bg-[#FFFFFF] border-[1px] border-[#E7E7E7]"
                    >
                      <img className="w-[25px]" src={"camera"} alt="camara" />
                    </div>
                    <input
                      className="hidden"
                      ref={inputFile}
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/jpeg, image/png"
                      onChange={handleValidation}
                    />
                    <div className="p-3 absolute top-0 right-0">
                      <img src={input.avatar} alt="image" />
                    </div>
                  </figure>
                </div>
                <div className="relative">
                  <span className="error">{error.avatar}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div >
                    <label
                      className="text-[16px] text-[#394867]"
                      htmlFor="name"
                    >
                      Nombre:
                    </label>
                    <input className="hidden"
                      id="role"
                      type="text"
                      name="role"
                      value="client"
                    />
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${
                        error.name ? "border-[#DC3545]" : ""
                      }`}
                      id="name"
                      type="text"
                      name="name"
                      onChange={handleChange}
                    />
                    <div className="relative">
                      <span className="error text-[14px] text-red-500">{error.name}</span>
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[16px] text-[#394867]"
                      htmlFor="lastName"
                    >
                      Apellido:
                    </label>
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${error.lastName ? "border-[#DC3545]" : ""}`}
                      id="lastName"
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                    />
                    <div className="relative">
                      <span className="error text-[14px]">{error.lastName}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[16px] text-[#394867]" htmlFor="phone">
                      Número de teléfono:
                    </label>
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${error.phone ? "border-[#DC3545]" : ""}`}
                      id="phone"
                      type="tel"
                      name="phone"
                      onBlur={handleChange}
                    />
                    <div className="relative">
                      <span className="error text-[14px]">{error.phone}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[16px] text-[#394867]" htmlFor="email">
                      Correo electrónico:
                    </label>
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${error.email ? "border-[#DC3545]" : ""}`}
                      id="email"
                      type="email"
                      name="email"
                      onBlur={handleChange}
                    />
                    <div className="relative">
                      <span className="error text-[14px]">{error.email}</span>
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[16px] text-[#394867]"
                      htmlFor="password"
                    >
                      Contraseña:
                    </label>
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${error.password ? "border-[#DC3545]" : ""}`}
                      id="password"
                      type="password"
                      name="password"
                      onBlur={handleChange}
                      title={
                        "La contraseña debe contener entre 8 y 16 caracteres y al menos uno de los siguientes:\n- Mayúscula\n- Minúcula\n- Dígito\n- Un caracter especial de entre: !@#$%^&*/"
                      }
                    />
                    <div className="relative">
                      <span className="error text-[14px]">{error.password}</span>
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[16px] text-[#394867]"
                      htmlFor="repPassword"
                    >
                      Confirmar contraseña:
                    </label>
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${
                        error.repPassword ? "border-[#DC3545]" : ""
                      }`}
                      id="repPassword"
                      type="password"
                      name="repPassword"
                      onBlur={handleChange}
                    />
                    <div className="relative">
                      <span className="error text-[14px]">{error.repPassword}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-rows-[30px_100px_30px]">
                  <label className="text-[16px] text-[#394867]" htmlFor="address">
                    Dirección:
                  </label>
                  <textarea
                    className={`data outline-none p-3 border w-[350px] border-[#394867] rounded-[5px] focus:h-[100px] transition-[height] duration-500 ease-in ${
                      error.address ? "border-[#DC3545]" : ""
                    }`}
                    name="address"
                    id="address"
                    onChange={handleChange}
                  ></textarea>
                  <div className="relative">
                    <span className="error text-[14px]">{error.address}</span>
                  </div>
                </div>
                <div>
                  <button
                    className={
                      button.current && button.current.disabled === true
                        ? "btn bg-[#3056D3] text-[#FFFFFF] w-full rounded-[6px] h-[50px] opacity-50"
                        : "btn bg-[#3056D3] text-[#FFFFFF] w-full rounded-[6px] h-[50px]"
                    }
                    ref={button}
                    id="submit"
                    onClick={handleSubmit}
                    type="button"
                  >
                    Crear Cliente
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      )}
      {isOpen && type === "updateClient" && (
        <motion.div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg overflow-auto h-[95vh] w-[460px]">
            <form className="z-10 flex flex-col justify-center items-center gap-[21px]  rounded-[20px]">
              <div className="relative grid grid-cols-[1fr_30px]">
                  <div>
                    <p className="text-[24px] border-[#E7E7E7] border-b-[1px] text-center w-full">
                      Editar Cliente
                    </p>
                  </div>
                  <div onClick={onClose} className="absolute top-0 right-[-100px] flex px-4 hover:text-white hover:bg-red-500 rounded-[8px] border border-[#394867]">
                    <button className="text-[#394867] w-[20px]   font-bold rounded" >X</button>
                  </div>
              </div>
              {statusMsg && (
                <div className={`${statusMsg == "El usuario se ha editado correctamente" ? "bg-green-200 text-green-500 p-3" : "bg-red-200 text-red-500 p-3"}`}>
                  <span>{statusMsg}</span>
                </div>
              )}
              <div className="frame flex flex-col gap-[15px] px-4 w-full">
                <div className="flex justify-center">
                  <figure onClick={() => inputFile.current.click()} className="cursor-pointer relative rounded-full bg-[#E7E7E7] w-[125px] h-[125px] shadow-sm">
                    <div
                      className="absolute bottom-0 flex justify-center items-center w-[35px] h-[35px] rounded-full bg-[#FFFFFF] border-[1px] border-[#E7E7E7]"
                    >
                      <img className="w-[25px]" src={"camera"} alt="camara" />
                    </div>
                    <input
                      className="hidden"
                      ref={inputFile}
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/jpeg, image/png"
                      onChange={handleValidation}
                    />
                    <div className="p-3 absolute top-0 right-0">
                      <img src={input.avatar} alt="image" />
                    </div>
                  </figure>
                </div>
                <div className="relative">
                  <span className="error">{error.avatar}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div >
                    <label
                      className="text-[16px] text-[#394867]"
                      htmlFor="name"
                    >
                      Nombre:
                    </label>
                    <input className="hidden"
                      id="role"
                      type="text"
                      name="role"
                      value="client"
                    />
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${
                        error.name ? "border-[#DC3545]" : ""
                      }`}
                      id="name"
                      type="text"
                      placeholder={previousDates.name}
                      name="name"
                      onChange={handleChange}
                    />
                    <div className="relative">
                      <span className="error text-[14px] text-red-500">{error.name}</span>
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[16px] text-[#394867]"
                      htmlFor="lastName"
                    >
                      Apellido:
                    </label>
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${error.lastName ? "border-[#DC3545]" : ""}`}
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder={previousDates.lastName}
                      onChange={handleChange}
                    />
                    <div className="relative">
                      <span className="error text-[14px]">{error.lastName}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[16px] text-[#394867]" htmlFor="phone">
                      Número de teléfono:
                    </label>
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${error.phone ? "border-[#DC3545]" : ""}`}
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder={previousDates.phone}
                      onBlur={handleChange}
                    />
                    <div className="relative">
                      <span className="error text-[14px]">{error.phone}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[16px] text-[#394867]" htmlFor="email">
                      Correo electrónico:
                    </label>
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${error.email ? "border-[#DC3545]" : ""}`}
                      id="email"
                      type="email"
                      name="email"
                      placeholder={previousDates.email}
                      onBlur={handleChange}
                    />
                    <div className="relative">
                      <span className="error text-[14px]">{error.email}</span>
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[16px] text-[#394867]"
                      htmlFor="password"
                    >
                      Contraseña:
                    </label>
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${error.password ? "border-[#DC3545]" : ""}`}
                      id="password"
                      type="password"
                      name="password"
                      placeholder={previousDates.password}
                      onBlur={handleChange}
                      title={
                        "La contraseña debe contener entre 8 y 16 caracteres y al menos uno de los siguientes:\n- Mayúscula\n- Minúcula\n- Dígito\n- Un caracter especial de entre: !@#$%^&*/"
                      }
                    />
                    <div className="relative">
                      <span className="error text-[14px]">{error.password}</span>
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[16px] text-[#394867]"
                      htmlFor="repPassword"
                    >
                      Confirmar contraseña:
                    </label>
                    <input
                      className={`data outline-none px-3 py-1 border w-[160px] border-[#394867] rounded-[5px] ${
                        error.repPassword ? "border-[#DC3545]" : ""
                      }`}
                      id="repPassword"
                      type="password"
                      name="repPassword"
                      placeholder={previousDates.password}
                      onBlur={handleChange}
                    />
                    <div className="relative">
                      <span className="error text-[14px]">{error.repPassword}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-rows-[30px_100px_30px]">
                  <label className="text-[16px] text-[#394867]" htmlFor="address">
                    Dirección:
                  </label>
                  <textarea
                    className={`data outline-none p-3 border w-[350px] border-[#394867] rounded-[5px] focus:h-[100px] transition-[height] duration-500 ease-in ${
                      error.address ? "border-[#DC3545]" : ""
                    }`}
                    name="address"
                    id="address"
                    placeholder={previousDates.address}
                    onChange={handleChange}
                  ></textarea>
                  <div className="relative">
                    <span className="error text-[14px]">{error.address}</span>
                  </div>
                </div>
                <div>
                  <button
                    className={
                      button.current && button.current.disabled === true
                        ? "btn bg-[#3056D3] text-[#FFFFFF] w-full rounded-[6px] h-[50px] opacity-50"
                        : "btn bg-[#3056D3] text-[#FFFFFF] w-full rounded-[6px] h-[50px]"
                    }
                    ref={button}
                    id="submit"
                    onClick={handleSubmit}
                    type="button"
                  >
                    Editar Cliente
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ClientsCard;