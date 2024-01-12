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
      address: ""
   });
   const inputFile = useRef();
   const [avatarURL, setAvatarUrl] = useState(null);
   useEffect(() => {
      if (input.avatar) {
         const url = URL.createObjectURL(input.avatar);
         setAvatarUrl(url);
      }
   }, [input.avatar])
   const button = useRef();
   const navigate = useNavigate();
   if (user.name && user.lastName && user.address) {
      let firstname = "";
      let lastname = "";
      for (let word of user.name.split(" ")) {
         firstname += word[0].toUpperCase() + word.slice(1) + " ";
      }
      for (let word of user.lastName.split(" ")) {
         lastname += word[0].toUpperCase() + word.slice(1) + " ";
      }
      user.name = firstname.trim();
      user.lastName = lastname.trim();
      user.address = user.address.trim();
   }
   const handleSubmit = async () => {
      try {
         const response = await axios.post(`${server}/users`, user, {
            headers: {
               "Content-Type": "application/json"
            }
         });
         if (response.status === 201) {
            const imageFile = new FormData();
            imageFile.append("avatar", inputFile.current.files[0]);
            imageFile.append("id", response.data._id);
            const newResponse = await axios.post(`${server}/users/uploadImage`, imageFile, {
               headers: {
                  "Content-Type": "multipart/form-data"
               }
            });
            if (newResponse.status === 201) {
               alert("Datos registrados con éxito");
               navigate("/login");
               const keys = ["avatar", "name", "lastName", "phone", "email", "password", "repPassword", "address"];
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
         if (response.data.email) {
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
                     if (avatarURL) {
                        URL.revokeObjectURL(avatarURL);
                        setAvatarUrl(null);
                     }
                     setInput({...input, avatar: file});
                     errors = {...errors, avatar: "" };
                     break;
                  default:
                     setInput({...input, avatar: null});
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
   useEffect(() => {
      return () => {
         if (avatarURL) {
            URL.revokeObjectURL(avatarURL);
         }
      };
   }, []);
   return (
      <section className="pt-[50px] flex flex-col w-full box-border relative h-max pb-10 min-[1440px]:px-[45px] min-[1440px]:gap-[24px] min-[1440px]:bg-[#F1F6F9] min-[1440px]:justify-center max-[1439px]:bg-[#1A3365] max-[1439px]:items-center">
         <img className="w-[262px] max-[1439px]:hidden" src={polar} alt="Empresas Polar" />
         <div className="w-full px-[95px]">
            <div className="flex justify-center items-center bg-[#D9D9D9] rounded-[25px]">
               <img className="w-[500px] h-[1045px] max-[1439px]:hidden" src={polarSede} alt="" />
               <form className="z-10 flex flex-col justify-center items-center gap-[21px] bg-[#F1F6F9] pt-[15px] pb-[25px] top-[75px] rounded-[25px] min-[1440px]:rounded-[10px] min-[1440px]:w-[500px] min-[1440px]:bg-[#FFFFFF] max-[1439px]:w-[312px]">
                  <img className="w-[224px] min-[1440px]:hidden" src={polar} alt="Empresas Polar" />
                  <p className="text-[24px] border-[#E7E7E7] border-b-[1px] text-center pb-[15px] w-full max-[1439px]:hidden">Registro</p>
                  <div className="frame flex flex-col gap-[15px] px-[44px] w-full">
                     <div className="flex justify-center">
                        <figure className="relative flex justify-center items-center rounded-full bg-[#E7E7E7] w-[125px] h-[125px] shadow-sm">
                           <img className={`max-w-[90%] max-h-[90%] ${!input.avatar && "hidden" }`} src={avatarURL} alt="imagen seleccionada" />
                           <div className="absolute bottom-0 left-0 flex justify-center items-center w-[35px] h-[35px] rounded-full bg-[#FFFFFF] border-[1px] border-[#E7E7E7]"
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
                     <div className="relative flex justify-center">
                        <span className="error">{error.avatar}</span>
                     </div>
                     <div className="flex gap-[15px] min-[1440px]:gap-[11px] max-[1439px]:flex-col">
                        <div className="flex flex-col gap-[15px] w-full">
                           <label className="text-[20px] text-[#394867]" htmlFor="name">Nombre:</label>
                           <input
                              className={`data ${error.name ? "border-[#DC3545]" : ""}`}
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
                           <label className="text-[20px] text-[#394867]" htmlFor="lastName">Apellido:</label>
                           <input
                              className={`data ${error.lastName ? "border-[#DC3545]" : ""}`}
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
                     <label className="text-[20px] text-[#394867]" htmlFor="phone">Número de teléfono:</label>
                     <input
                        className={`data ${error.phone ? "border-[#DC3545]" : ""}`}
                        id="phone"
                        type="tel"
                        name="phone"
                        value={input.phone}
                        onChange={handleChange}
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
                        value={input.email}
                        onChange={handleChange}
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
                        value={input.password}
                        onChange={handleChange}
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
                        value={input.repPassword}
                        onChange={handleChange}
                     />
                     <div className="relative">
                        <span className="error">{error.repPassword}</span>
                     </div>
                     <label className="text-[20px] text-[#394867]" htmlFor="address">Dirección:</label>
                     <textarea 
                        className={`data focus:h-[100px] transition-[height] duration-500 ease-in ${error.address ? "border-[#DC3545]" : ""}`}
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
                     <p className="text-[#ADADAD] text-[16px] tracking-tight min-[1440px]:text-center">¿Ya eres miembro? <Link to="/login" className="text-[#3056D3] underline">Iniciar sesión</Link></p>
                  </div>
               </form>
            </div>
         </div>
         <img className="z-0 absolute w-full -bottom-[20px] min-[1440px]:hidden" src={blueBg} alt="background" />
      </section>
   );
}

export default SignUp;