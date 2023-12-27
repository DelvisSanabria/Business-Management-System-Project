import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { polar, camera, blueBg, polarSede } from "../images/exports";

function SignUp() {
   const server = "http://localhost:3000";
   const [user, setUser] = useState({
      avatar: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      role: "client",
      address: ""
   });
   const [error, setError] = useState({
      avatar: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      repPassword: "",
      address: ""
   });
   const [input, setInput] = useState({
      avatar: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      repPassword: "",
      address: ""
   });
   const button = useRef();
   const inputFile = useRef();
   const navigate = useNavigate();
   if (user.firstname && user.lastname && user.address) {
      let firstname = "";
      let lastname = "";
      for (let word of user.firstname.split(" ")) {
         firstname += word[0].toUpperCase() + word.slice(1) + " ";
      }
      for (let word of user.lastname.split(" ")) {
         lastname += word[0].toUpperCase() + word.slice(1) + " ";
      }
      user.firstname = firstname.trim();
      user.lastname = lastname.trim();
      user.address = user.address.trim();
   }
   const handleSubmit = async () => {
      try {
         const formdata = new FormData();
         for (const prop in user) {
            formdata.append(prop, user[prop]);
         }
         const response = await axios.post(`${server}/users/signup`, formdata, {
            headers: {
               "Content-Type": "multipart/form-data"
            }
         });
         if (response.status === 201) {
            alert("Datos registrados con éxito");
            navigate("/login");
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

   const handleValidation = () => {
      const { password, repPassword } = input;
      const regexList = { 
         firstname: /^[a-zñ áéíóúñÁÉÍÓÚÑ]+$/i, 
         lastname: /^[a-zñ áéíóúñÁÉÍÓÚÑ]+$/i, 
         email: /^[a-z0-9.-]+@[a-z0-9-]+(\.[a-z]{2,4}){1,3}$/i, 
         phone: /^(\+[\d]{2})?\d{3,4}\d{3}\d{2}\d{2}$/, 
         password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&.*/])[^<>{}:;'"?,]{8,16}$/, 
         address: /^[a-z0-9-,. áéíóúñÁÉÍÓÚÑ]+$/i
      };

      const message = {
         firstname: "El nombre es inválido",
         lastname: "El apellido es inválido",
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
         if (input[field]) {
            if (regexList[field] && !regexList[field].test(input[field])) {
               errors = {...errors, [field]: message[field]};
               user = {...user, [field]: ""};
               isValid = false;
            } else {
               errors = {...errors, [field]: ""};
               user = {...user, [field]: input[field]};
            }
         } else if (field === "avatar") {
            if (inputFile.current.files.length > 0) {
               const file = inputFile.current.files[0];
               switch (file.type) {
                  case "image/jpeg":
                  case "image/png":
                     user = {...user, avatar: file };
                     errors = {...errors, avatar: "" };
                     break;
                  default:
                     errors = {...errors, [field]: message[field]};
                     user = {...user, avatar: null};
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
            errors = {...errors, repPassword: "La contraseña no coincide"};
            user = {...user, password: ""};
            isValid = false;
         } else {
            errors = {...errors, repPassword: ""};
            user = {...user, password};
         }
      }
      button.current.disabled = !isValid;
      setError(errors);
      setUser((prev) => ({...prev, ...user}));
   }
   useEffect(() => {
      handleValidation();
      //eslint-disable-next-line
   }, [input]);
   return (
      <section className="pt-[50px] flex flex-col w-full box-border relative top-[73px] h-max pb-10 min-[1440px]:px-[45px] min-[1440px]:gap-[24px] min-[1440px]:bg-[#F1F6F9] min-[1440px]:justify-center max-[1439px]:bg-[#1A3365] max-[1439px]:items-center">
         <img className="w-[262px] max-[1439px]:hidden" src={polar} alt="Empresas Polar" />
         <div className="w-full px-[95px] max-[1439px]:hidden">
            <div className="flex justify-center items-center bg-[#D9D9D9] rounded-lg max-[1439px]:hidden">
               <img className="w-[500px] h-[800px] max-[1439px]:hidden" src={polarSede} alt="" />
               <form className="z-10 flex flex-col justify-center items-center gap-[21px] bg-[#F1F6F9] pt-[15px] pb-[25px] top-[75px] rounded-[20px] min-[1440px]:w-[500px] min-[1440px]:bg-[#FFFFFF] max-[1439px]:w-[312px]">
                  <img className="w-[224px] min-[1440px]:hidden" src={polar} alt="Empresas Polar" />
                  <p className="text-[24px] border-[#E7E7E7] border-b-[1px] text-center pb-[15px] w-full max-[1439px]:hidden">Registro</p>
                  <div className="frame flex flex-col gap-[15px] px-[44px] w-full">
                     <div className="flex justify-center">
                        <figure className="relative rounded-full bg-[#E7E7E7] w-[125px] h-[125px] shadow-sm">
                           <div className="absolute bottom-0 flex justify-center items-center w-[35px] h-[35px] rounded-full bg-[#FFFFFF] border-[1px] border-[#E7E7E7]"
                           onClick={() => inputFile.current.click()}>
                              <img className="w-[25px]"
                              src={camera} alt="camara" />
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
                        </figure>
                     </div>
                     <div className="relative">
                        <span className="error">{error.avatar}</span>
                     </div>
                     <label className="text-[20px] text-[#394867]" htmlFor="firstname">Nombre:</label>
                     <input
                        className={`data ${error.firstname ? "border-[#DC3545]" : ""}`}
                        id="firstname"
                        type="text"
                        name="firstname"
                        onChange={handleChange}
                     />
                     <div className="relative">
                        <span className="error">{error.firstname}</span>
                     </div>
                     <label className="text-[20px] text-[#394867]" htmlFor="lastname">Apellido:</label>
                     <input
                        className={`data ${error.lastname ? "border-[#DC3545]" : ""}`}
                        id="lastname"
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                     />
                     <div className="relative">
                        <span className="error">{error.lastname}</span>
                     </div>
                     <label className="text-[20px] text-[#394867]" htmlFor="phone">Número de teléfono:</label>
                     <input
                        className={`data ${error.phone ? "border-[#DC3545]" : ""}`}
                        id="phone"
                        type="tel"
                        name="phone"
                        onBlur={handleChange}
                     />
                     <div className="relative">
                        <span className="error">{error.phone}</span>
                     </div>
                     <label className="text-[20px] text-[#394867]" htmlFor="email">Correo electrónico:</label>
                     <input
                        className={`data ${error.email ? "border-[#DC3545]" : ""}`}
                        id="email"
                        type="email"
                        name="email"
                        onBlur={handleChange}
                     />
                     <div className="relative">
                        <span className="error">{error.email}</span>
                     </div>
                     <label className="text-[20px] text-[#394867]" htmlFor="password">Contraseña:</label>
                     <input
                        className={`data ${error.password ? "border-[#DC3545]" : ""}`}
                        id="password"
                        type="password"
                        name="password"
                        onBlur={handleChange}
                        title={"La contraseña debe contener entre 8 y 16 caracteres y al menos uno de los siguientes:\n- Mayúscula\n- Minúcula\n- Dígito\n- Un caracter especial de entre: !@#$%^&*/"}
                     />
                     <div className="relative">
                        <span className="error">{error.password}</span>
                     </div>
                     <label className="text-[20px] text-[#394867]" htmlFor="repPassword">Confirmar contraseña:</label>
                     <input
                        className={`data ${error.repPassword ? "border-[#DC3545]" : ""}`}
                        id="repPassword"
                        type="password"
                        name="repPassword"
                        onBlur={handleChange}
                     />
                     <div className="relative">
                        <span className="error">{error.repPassword}</span>
                     </div>
                     <label className="text-[20px] text-[#394867]" htmlFor="address">Dirección:</label>
                     <textarea 
                        className={`data focus:h-[100px] transition-[height] duration-500 ease-in ${error.address ? "border-[#DC3545]" : ""}`}
                        name="address" 
                        id="address"
                        onChange={handleChange}
                     >
                     </textarea>
                     <div className="relative">
                        <span className="error">{error.address}</span>
                     </div>
                     <button className={button.current && button.current.disabled === true ? "btn bg-[#3056D3] text-[#FFFFFF] w-full rounded-[6px] h-[50px] opacity-50" : "btn bg-[#3056D3] text-[#FFFFFF] w-full rounded-[6px] h-[50px]"}
                        ref={button}
                        id="submit"
                        onClick={handleSubmit} 
                        type="button">Registrarse
                     </button>
                     <p className="text-[#ADADAD] text-[16px] tracking-tight">¿Ya eres miembro? <Link to="/login" className="text-[#3056D3] underline">Iniciar sesión</Link></p>
                  </div>
               </form>
            </div>
         </div>
         <img className="z-0 absolute bottom-0 min-[1440px]:hidden" src={blueBg} alt="background" />
      </section>
   );
};

export default SignUp;