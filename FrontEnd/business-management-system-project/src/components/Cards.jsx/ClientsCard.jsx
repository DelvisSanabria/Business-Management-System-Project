/* eslint-disable react/prop-types */
import { easeInOut, motion } from "framer-motion"
import { useEffect, useState } from "react";

const ClientsCard = ({ isOpen, onClose, orderId,type}) => {
  const [previousDates, setPreviosDates] = useState({})
  const userRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/;
  const totalRegex = /^[\d]+$/;
  const [erroMess,setErrMess] = useState("")
  const [newData, setNewData] = useState({
    usuario: '',
    productos: [""],
    total: 0
  });
  const getOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json()
        setPreviosDates(data);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
   getOrder(orderId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const updateOrder = async (event,orderId, data) => {
    event.preventDefault();
    const finalData= {
      usuario: data.usuario !==0 ? data.usuario: previousDates.usuario,
      productos: data.productos == [""] ? data.productos: previousDates.productos,
      total: data.inventario !== 0 ? data.total: previousDates.total,
    }
    if (finalData.usuario || finalData.total) {
      if (!userRegex.test(finalData.usuario)) {
        setErrMess(
          "No estás ingresando el ID del usuario en un formato válido. Por favor, utiliza solo letras y numeros sin espacios"
        );
        return;
      }
      if (!totalRegex.test(finalData.total)) {
        setErrMess(
          "No estás ingresando un monto valido, por favor solo usa numeros para tu monto"
        );
        return;
      }
    }

    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        alert("Orden Actualizada correctamente");
        setNewData({
          usuario: "",
          productos: [""],
          total: 0,
        });
      } else {
        alert("Error al actualizar los datos de la orden");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleChangeUpdt = async (event) => {
    const { name, value } = event.target;
    setNewData({ ...newData, [name]: value });
  };
  return (
    <>
      {isOpen && type === "actualizar" && (
        <motion.div
          initial={{
            opacity: 0,
            y: -100,
            transitionTimingFunction: easeInOut,
            transitionDuration: 3,
          }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -100,
            transitionTimingFunction: easeInOut,
            transitionDuration: 3,
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg">
            {erroMess && (
              <div className="flex justify-center border shadow-md p-4 text-red-500">
                <span>{erroMess}</span>
              </div>
            )}
            <h2 className="text-xl font-bold mb-4">Actualizar Una Orden:</h2>
            <form
              onSubmit={(e) => {
                updateOrder(e, orderId, newData);
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Usuario:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="usuario"
                  type="text"
                  placeholder="Usuario"
                  value={newData.usuario}
                  onChange={handleChangeUpdt}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Productos:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="productos"
                  type="text"
                  placeholder="Productos"
                  value={newData.productos}
                  onChange={handleChangeUpdt}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Total:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="total"
                  type="text"
                  placeholder="Total"
                  value={newData.total}
                  onChange={handleChangeUpdt}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="px-4 py-2 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500"
                  onClick={onClose}
                  type="button"
                >
                  Cerrar
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 ml-2"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
      {isOpen && type === "verInfo" && (
        <motion.div
          initial={{
            opacity: 0,
            y: -100,
            transitionTimingFunction: easeInOut,
            transitionDuration: 3,
          }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -100,
            transitionTimingFunction: easeInOut,
            transitionDuration: 3,
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Informacion de la orden del usuario:{" "}
              <span>{previousDates[0].usuario}</span>
            </h2>
            {previousDates && (
              <div className="h-[70vh] overflow-auto">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 select-none"
                    htmlFor="Id"
                  >
                    ID:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="Id"
                  >
                    {previousDates[0]._id}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="usuario"
                  >
                    Nombre:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="usuario"
                  >
                    {previousDates[0].usuario}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productos"
                  >
                    Productos(IDs):
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="productos"
                  >
                    {previousDates[0].productos.map((product) => {
                      return <span key={product}>{product}</span>;
                    })}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="total"
                  >
                    Total:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="total"
                  >
                    {previousDates[0].total}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="creationDate"
                  >
                    Fecha de Creacion:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="creationDate"
                  >
                    {previousDates[0].createdAt}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="updateDate"
                  >
                    Ultima Actualizacion:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="updateDate"
                  >
                    {previousDates[0].updatedAt}
                  </span>
                </div>
                <div className="flex justify-center">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500"
                    onClick={onClose}
                    type="button"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ClientsCard;