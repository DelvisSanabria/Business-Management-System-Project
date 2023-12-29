import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Session from "../Session/session";
import axios from "axios";
import { polar, bg_login } from "./exports";

function LogIn() {
   const server = "http://localhost:3001";
   const [error, setError] = useState({});
   const [input, setInput] = useState({});
   const { user, setUser } = useContext(Session);
   const navigate = useNavigate();
   useEffect(() => {
      if (user) {
         navigate("/");
      } //eslint-disable-next-line
   }, [user])
   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         const response = await axios.post(`${server}/users/login`, input, {
            headers: {
               'Content-Type': 'application/json'
            }
         });
         if (response.status === 200) {
				setInput({email: "" , password: ""});
            setUser(response.data);
         }
      } catch ({response, request, message, config}) {
			if (response.data) {
            const Errors = response.data;
				setError((prev) => ({...prev, email: Errors.email, password: Errors.password}));
            if (Errors.name && Errors.message) {
               console.log(`${Errors.name}: ${Errors.message}`);
            }
			} else if (request) {
				console.log(request);
			} else {
				console.log("Error", message);
			}
			console.log(config);
      }
   }
   const handleChange = (event) => {
      const { name, value } = event.target;
      setInput((prev) => ({...prev, [name]: value }));
   }
   
   const handleValidation = (event) => {
      const { email, password } = input;
		if (!email) {
         event.preventDefault();
         setError((prev) => ({...prev, email: "Introduce tu correo",}));
      } else {
         event.returnValue = true;
         setError((prev) => ({...prev, email: "",}));
      }
		if (!password) {
         event.preventDefault();
         setError((prev) => ({...prev, password: "Introduce la contraseña",}));
		} else {
         event.returnValue = true;
         setError((prev) => ({...prev, password: "",}));
      }
   }
   return (
      <>
      <section className="pt-[50px] flex flex-col w-full h-screen box-border relative top-[73px] bg-[#1A3365] items-center pb-10">
         <form className="w-[312px] z-10 flex flex-col justify-center items-center gap-[21px] px-[44px] py-[25px] top-[75px] bg-[#F1F6F9] rounded-[20px]" 
         onSubmit={handleSubmit}>
            <img className="w-[224px]" src={polar} alt="Empresas Polar" />
            <div className="frame flex flex-col gap-[15px] w-full">
               <label className="text-[20px] text-[#394867]" htmlFor="email">Correo:</label>
               <input
                  className={`data ${error.email ? "border-[#DC3545]" : ""}`}
                  id="email"
                  type="text"
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
               />
               <div className="relative">
                  <span className="error">{error.password}</span>
               </div>
               <button className="btn bg-[#3056D3] text-[#FFFFFF] w-full rounded-[6px] h-[50px]" 
                  id="submit" 
                  onClick={handleValidation} 
                  type="submit">Iniciar Sesión
               </button>
               <Link to="/forgot_password" className="text-[#ADADAD] underline text-[16px] tracking-tight">¿Olvidaste tu contraseña?</Link>
               <p className="text-[#ADADAD] text-[16px] tracking-tight">¿Aún no eres miembro? <Link to="/signup" className="text-[#3056D3] underline">Regístrate</Link></p>
            </div>
         </form>
         <img className="z-0 absolute bottom-0" src={bg_login} alt="background" />
      </section>
      </>
   );
};

export default LogIn;