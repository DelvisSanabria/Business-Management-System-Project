import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { polar, camera, blueBg, polarSede } from "./../components/exportsImports";

function SignUp() {
   const server = "http://localhost:3001";
   const [user, setUser] = useState({
      name: "",
      lastName: "",
      phone: "",
      email: "",
      role: "client",
      password: "",
      address: ""
   });
   const [error, setError] = useState({
      image: "",
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      repPassword: "",
      address: ""
   });
   const [input, setInput] = useState({
      image: "",
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      repPassword: "",
      address: ""
   });
   const inputFile = useRef();
   const button = useRef();
   const navigate = useNavigate();
   const [imageUrl, setImageUrl] = useState(null);
   useEffect(() => {
      if (input.image) {
         const url = URL.createObjectURL(input.image);
         setImageUrl(url);
      }
   }, [input.image]);
   useEffect(() => {
      return () => {
         if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
            setImageUrl(null);
         }
      };
   }, [imageUrl]);

   const handleSubmit = async () => {
      try {
         const response = await axios.post(`${server}/users`, user, {
            headers: {
               "Content-Type": "application/json"
            } 
         });
         if (response.status === 201) {
            const imageFile = new FormData();
            imageFile.append("image", inputFile.current.files[0]);
            imageFile.append("id", response.data._id);
            const newResponse = await axios.post(`${server}/users/uploadImage`, imageFile, {
               headers: {
                  "Content-Type": "multipart/form-data"
               }
            });
            if (newResponse.status === 200) {
               alert("Datos registrados con éxito");
               navigate("/login");
               const keys = ["image", "name", "lastName", "phone", "email", "password", "repPassword", "address"];
               for (const key of keys) {
                  if (input[key]) {
                     setInput((prev) => ({...prev, [key]: ""}));
                  }
                  if (error[key]) {
                     setError((prev) => ({...prev, [key]: ""}));
                  }
                  if (user[key]) {
                     setUser((prev) => ({...prev, [key]: ""}));
                  }
               }
            } 
         }
      } catch ({name, message, response}) {
         if (response.data) {
            setError((prev) => ({...prev, email: response.data.email}));
         }
         console.error(`${name}: ${message}`);
      }
   }
   const handleChange = (event) => {
      const { name, value } = event.target;
      setInput({...input, [name]: value });
   }

   const handleValidation = () => {
      const { password, repPassword } = input;
      const regexList = { 
         name: /^[a-zñ áéíóúñÁÉÍÓÚÑ]+$/i, 
         lastName: /^[a-zñ áéíóúñÁÉÍÓÚÑ]+$/i, 
         email: /^[a-z0-9.-]+@[a-z0-9-]+(\.[a-z]{2,4}){1,3}$/i, 
         phone: /^(\+[\d]{2})?\d{3,4}\d{3}\d{2}\d{2}$/, 
         password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&.*/])[^<>{}:;'"?,]{8,16}$/, 
         address: /^[a-z0-9-,. áéíóúñÁÉÍÓÚÑ]+$/i
      };

      const message = {
         name: "El nombre es inválido",
         lastName: "El apellido es inválido",
         email: "El correo es inválido",
         phone: "El teléfono es inválido",
         password: "La contraseña es inválida",
         address: "La dirección es inválida",
         image: "Sólo en formato: png, jpg, jpeg"
      };
      let user = {};
      let errors = {};
      let isValid = true;
      for (let field in input) {
         if (input[field]) {
            if (regexList[field] && field !== "image" && !regexList[field].test(input[field])) {
               errors = {...errors, [field]: message[field]};
               user = {...user, [field]: ""};
               isValid = false;
            } else {
               errors = {...errors, [field]: ""};
               user = {...user, [field]: input[field]};
            }
         } else if (field === "image") {
            if (inputFile.current.files.length > 0) {
               const file = inputFile.current.files[0];
               switch (file.type) {
                  case "image/jpeg":
                  case "image/png":
                     setInput((prev) => ({...prev, image: file}));
                     errors = {...errors, image: "" };
                     break;
                  default:
                     errors = {...errors, [field]: message[field]};
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
      setError((prev) => ({...prev, ...errors}));
      setUser((prev) => ({...prev, ...user}));
   }
   useEffect(() => {
      handleValidation();
      //eslint-disable-next-line
   }, [input]);
   return (
      <section className="pt-[50px] flex flex-col w-full box-border relative max-lg:top-[73px] h-max pb-10 lg:px-[45px] lg:gap-[24px] lg:bg-[#F1F6F9] lg:justify-center max-lg:bg-[#1A3365] max-lg:items-center">
         <img className="w-[262px] max-lg:hidden" src={polar} alt="Empresas Polar" />
         <div className="w-full px-[95px]">
            <div className="py-[50px] flex justify-center items-center lg:bg-[#D9D9D9] rounded-lg">
               <img className="max-w-[45%] h-[999px] rounded-[10px] max-lg:hidden" src={polarSede} alt="" />
               <form className="z-10 flex flex-col justify-center items-center gap-[21px] bg-[#F1F6F9] pt-[15px] pb-[25px] top-[75px] rounded-[20px] lg:rounded-[10px] lg:w-[45%] lg:bg-[#FFFFFF] max-lg:w-[312px]">
                  <img className="w-[224px] lg:hidden" src={polar} alt="Empresas Polar" />
                  <p className="text-[24px] border-[#E7E7E7] border-b-[1px] text-center pb-[15px] w-full max-lg:hidden">Registro</p>
                  <div className="frame flex flex-col gap-[15px] px-[44px] w-full">
                     <div className="flex justify-center items-center">
                        <div className="rounded-full border-[20px] border-[#FFFFFF] w-[155px] h-[155px] absolute z-10"></div>
                        <div className="flex justify-center">
                           <figure className="relative flex justify-center items-center rounded-full bg-[#E7E7E7] w-[125px] h-[125px] shadow-sm">
                              <img className={`max-w-[90%] max-h-[90%] ${!imageUrl && "hidden" }`} src={imageUrl} key={imageUrl} alt="imagen seleccionada" />
                              <div className="absolute bottom-0 left-0 flex z-20 justify-center items-center w-[35px] h-[35px] rounded-full bg-[#FFFFFF] border-[1px] border-[#E7E7E7]"
                              onClick={() => inputFile.current.click()}>
                                 <img className="w-[25px]"
                                 src={camera} alt="camara" />
                              </div>
                              <input
                                 title="Subir imagen"
                                 className="hidden"
                                 ref={inputFile}
                                 id="image"
                                 type="file"
                                 name="image"
                                 accept="image/jpeg, image/png"
                                 onChange={handleValidation}
                                 onClick={(event) => (event.target.value = null)}
                              />
                           </figure>
                        </div>
                     </div>
                     <div className="relative flex justify-center">
                        <span className="error">{error.image}</span>
                     </div>
                     <div className="flex gap-[15px] lg:gap-[11px] max-lg:flex-col">
                        <div className="flex flex-col gap-[15px] w-full">
                           <label className="label text-[18px] text-[#394867]" htmlFor="name">Nombre:</label>
                           <input
                              className={`data123 ${error.name ? "border-[#DC3545]" : ""}`}
                              id="name"
                              type="text"
                              name="name"
                              value={input.name}
                              onChange={handleChange}
                           />
                           <div className="relative">
                              <span className="error">{error.name}</span>
                           </div>
                        </div>
                        <div className="flex flex-col gap-[15px] w-full">
                           <label className="label text-[18px] text-[#394867]" htmlFor="lastName">Apellido:</label>
                           <input
                              className={`data123 ${error.lastName ? "border-[#DC3545]" : ""}`}
                              id="lastName"
                              type="text"
                              name="lastName"
                              value={input.lastName}
                              onChange={handleChange}
                           />
                           <div className="relative">
                              <span className="error">{error.lastName}</span>
                           </div>
                        </div>
                     </div>
                     <label className="label text-[18px] text-[#394867]" htmlFor="phone">Número de teléfono:</label>
                     <input
                        className={`data123 ${error.phone ? "border-[#DC3545]" : ""}`}
                        id="phone"
                        type="tel"
                        name="phone"
                        value={input.phone}
                        onChange={handleChange}
                     />
                     <div className="relative">
                        <span className="error">{error.phone}</span>
                     </div>
                     <label className="label text-[18px] text-[#394867]" htmlFor="email">Correo electrónico:</label>
                     <input
                        className={`data123 ${error.email ? "border-[#DC3545]" : ""}`}
                        id="email"
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                     />
                     <div className="relative">
                        <span className="error">{error.email}</span>
                     </div>
                     <label className="label text-[18px] text-[#394867]" htmlFor="password">Contraseña:</label>
                     <input
                        className={`data123 ${error.password ? "border-[#DC3545]" : ""}`}
                        id="password"
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        title={"La contraseña debe contener entre 8 y 16 caracteres y al menos uno de los siguientes:\n- Mayúscula\n- Minúcula\n- Dígito\n- Un caracter especial de entre: !@#$%^&*/"}
                     />
                     <div className="relative">
                        <span className="error">{error.password}</span>
                     </div>
                     <label className="label text-[18px] text-[#394867]" htmlFor="repPassword">Confirmar contraseña:</label>
                     <input
                        className={`data123 ${error.repPassword ? "border-[#DC3545]" : ""}`}
                        id="repPassword"
                        type="password"
                        name="repPassword"
                        value={input.repPassword}
                        onChange={handleChange}
                     />
                     <div className="relative">
                        <span className="error">{error.repPassword}</span>
                     </div>
                     <label className="label text-[18px] text-[#394867]" htmlFor="address">Dirección:</label>
                     <textarea 
                        className={`data123 focus:h-[100px] transition-[height] duration-500 ease-in ${error.address ? "border-[#DC3545]" : ""}`}
                        name="address" 
                        id="address"
                        value={input.address}
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
                     <p className="text-[#ADADAD] text-[16px] tracking-tight lg:text-center">¿Ya eres miembro? <Link to="/login" className="text-[#3056D3] underline">Iniciar sesión</Link></p>
                  </div>
               </form>
            </div>
         </div>
         <img className="z-0 absolute bottom-0 lg:hidden" src={blueBg} alt="background" />
      </section>
   );
};

export default SignUp;