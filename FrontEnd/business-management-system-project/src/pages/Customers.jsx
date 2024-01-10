import EditSvg from "../components/Svgs/Edit";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteSvg from "../components/Svgs/Delete";
import ClientsCard from "../components/Cards/ClientsCard";

export default function Customers() {
  const [clients, setClients] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToUp, setClientToUp] = useState("")
  const [modalType, setModalType] = useState(""); 


  const openModal = async (type) => {
    setModalType(type);
    setIsModalOpen(true);
    
  };

  const handleOpenEdit = async (client, type) => {
    setModalType(type);
    setIsModalOpen(true);
    setClientToUp(client);
    
  };

   const closeModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    if (clients === undefined || currentPage !== 1) {
      const fetchData = async () => {
        axios
          .get("http://localhost:3001/users", {
            params: {
              page: currentPage,
              role: "client",
            },
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            const data = response.data;
            setClients(data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
      fetchData();
    }
  }, [currentPage,clients]);
  
  const handlePrevPage = () => {
    setCurrentPage(prevState => {
      let newValue;
      if (prevState === 2) {
        newValue = prevState - 2;
      }else {
        newValue = prevState - 1;
      }
      return newValue;
    });
  };
  
  const handleNextPage = () => {
    setCurrentPage(prevState => {
      let newValue;
      if (prevState === 0) {
        newValue = prevState + 2;
      } else {
        newValue = prevState + 1;
      }
      console.log(newValue);
      return newValue;
    });
  };

  const deleteClient = async (clientEmail) => {
      axios
        .patch(`http://localhost:3001/users/${clientEmail}/deleted`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
  };
  
  return (
    <>
      <div className="grid grid-rows-[100px_80px_1fr_80px] md:hidden">
        <header className="flex flex-col items-start w-[88vw] my-10 mx-5">
          <div className="grid grid-rows-2 justify-items-start">
            <div className="flex w-[327px] items-center gap-[8px]">
              <div className="w-fit mt-[-1.00px] font-medium text-gray-900 text-[18px] tracking-[0] leading-[28px] whitespace-nowrap">
                <span>Tabla de clientes</span>
              </div>
              <div className="inline-flex items-start flex-[0_0_auto]">
                <div className=" text-[#3056d3] rounded-full bg-[#F9F5FF] p-1 text-[12px] text-center leading-[18px] w-[80px] mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                  <span>{clients && clients.count} clientes</span>
                </div>
              </div>
            </div>
            <div>
              <p className="w-[327px] font-normal text-gray-500 text-[14px] tracking-[0] leading-[20px]">
                Lista de todos los clientes en la base de datos
              </p>
            </div>
          </div>
        </header>
        <div>
          <div className="flex justify-end mr-3">
            <div className="flex items-center justify-center rounded-full bg-[#3056d3] hover:bg-[#2f4ba8] w-[60px] h-[60px]">
              <button
                onClick={() => {
                  openModal("createClient");
                }}
                className="text-[50px] mb-3 text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="w-[97%] h-[70vh] mx-3 rounded-[20px_20px_0px_0px] overflow-auto ">
          {clients &&
            clients.users.map((client, index) => (
              <div
                key={client.email}
                className={`grid grid-cols-[100px_1fr_70px_3px] p-2 bg-[#f0f5f8] w-[100%] h-[180px] border-t-2 [border-top-style:solid] [border-bottom-style:solid] border-[#eaecf0] ${
                  index === 0
                    ? "rounded-[20px_20px_0px_0px] overflow-hidden border-t-2 [border-top-style:solid] border-b-2 [border-bottom-style:solid] border-[#eaecf0]"
                    : ""
                } ${
                  index === clients.users.length - 1
                    ? "rounded-[0px_0px_20px_20px] overflow-hidden border-b-2 [border-bottom-style:solid]"
                    : ""
                } `}
              >
                <div className="flex items-center w-[88px] m-5 h-[88px] bg-[#d9d9d9] rounded-[44px] shadow-[0px_4px_4px_#00000040]">
                  <img
                    src={client.avatar}
                    alt={`${client.name}-image`}
                    className="w-[80px] h-[80px] rounded-[44px]"
                  />
                </div>
                <div className="grid grid-rows-5  w-[200px] h-[142px]">
                  <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                    <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                      Nombre:
                    </label>
                    <span className="w-[150px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                      {client.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                    <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                      Apellido:
                    </label>
                    <span className="w-[150px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                      {client.lastName}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                    <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                      Correo:
                    </label>
                    <span className="w-[150px] overflow-hidden text-ellipsis py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                      {client.email}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                    <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                      Telefono:
                    </label>
                    <span className="w-[66px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                      {client.phone}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 items-center w-[200px] h-[30px]">
                    <label className="flex justify-end mt-2 mb-1 w-[100px] h-[30px] font-semibold text-[#667085] text-[15px] text-right tracking-[0] leading-[15px]">
                      Direccion:
                    </label>
                    <span className="w-[150px] py-[0.20em] h-[30px] font-semibold text-black text-[12px] tracking-[0] leading-[15px]">
                      {client.address}
                    </span>
                  </div>
                </div>
                <div className="h-[144px] p-6 grid grid-rows-2 items-center">
                  <div>
                    <EditSvg
                      onClick={() => {
                        handleOpenEdit(client.email, "updateClient");
                      }}
                    />
                  </div>
                  <div>
                    <DeleteSvg
                      onClick={() => {
                        deleteClient(client.email);
                      }}
                    />
                  </div>
                </div>
                <div className="h-[2px] bg-[#667085]"></div>
              </div>
            ))}
        </div>
        <div className="grid grid-cols-2 mt-5 items-center">
          <div className="w-[100px] h-[31px] py-3 font-semibold text-[#667085] text-[15px] text-center tracking-[0] leading-[15px]">
            <span>Página {clients ? clients.page : ""}</span>
          </div>
          <div className="grid grid-cols-2 px-5">
            <button className="inline-flex items-start rounded-[8px] all-[unset] box-border">
              <div
                onClick={() => {
                  if (clients && clients.hasPrevPage && clients.page > 1) {
                    handlePrevPage();
                  }
                }}
                className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[8px] flex-[0_0_auto] hover:text-white hover:bg-[#3056d3] rounded-[8px] overflow-hidden border border-solid border-gray-300 shadow-shadow-xs"
              >
                <div className="text-[14px] leading-[20px] relative w-fit mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                  <span>Anterior</span>
                </div>
              </div>
            </button>
            <button className="inline-flex items-start rounded-[8px] all-[unset] box-border">
              <div
                onClick={() => {
                  if (clients && clients.hasNextPage) {
                    handleNextPage();
                  }
                }}
                className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[8px] flex-[0_0_auto] hover:text-white hover:bg-[#3056d3] rounded-[8px] overflow-hidden border border-solid border-gray-300 shadow-shadow-xs"
              >
                <div className=" text-[14px] leading-[20px] relative w-fit mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                  <span>Siguiente</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="grid grid-rows-[100px_1fr_80px]">
          <header className="grid grid-cols-2 gap-2 my-10 mx-5">
            <div className="grid grid-rows-2 justify-items-start">
              <div className="flex w-[327px] items-center gap-[8px]">
                <div className="w-fit mt-[-1.00px] font-medium text-gray-900 text-[18px] tracking-[0] leading-[28px] whitespace-nowrap">
                  <span>Tabla de clientes</span>
                </div>
                <div className="inline-flex items-start flex-[0_0_auto]">
                  <div className=" text-[#3056d3] rounded-full bg-[#F9F5FF] p-1 text-[12px] text-center leading-[18px] w-[80px] mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                    <span>{clients && clients.count} clientes</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="w-[327px] font-normal text-gray-500 text-[14px] tracking-[0] leading-[20px]">
                  Lista de todos los clientes en la base de datos
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-end mr-3">
                <div className="flex items-center justify-center rounded-[8px] bg-[#3056d3] hover:bg-[#2f4ba8] w-[150px] h-[35px] p-3">
                  <button
                    onClick={() => {
                      openModal("createClient");
                    }}
                    className="text-[13px] mb-1 text-white grid grid-cols-[20px_1fr]"
                  > 
                    <span className="mr-2">+</span>
                    <span>Agregar Cliente</span>
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div className="mt-10">
            <table className="w-[80vw] border-b-2">
              <thead>
                <tr className="text-[#637381]">
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Avatar
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Nombre
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Apellido
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Correo Electronico
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Teléfono
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Direccion
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-50 p-2">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients &&
                  clients.users.map((client) => (
                    <tr
                      key={client.email}
                      className="text-[#637381] text-center"
                    >
                      <td className="border-b p-2 px-5">
                        <div className="flex items-center w-[35px] m-5 h-[35px] bg-[#d9d9d9] rounded-[44px] shadow-[0px_4px_4px_#00000040]">
                          <img
                            src={client.avatar}
                            alt={`${client.name}-image`}
                            className="w-[30px] h-[30px] rounded-[44px]"
                          />
                        </div>
                      </td>
                      <td className="border-b p-2">{client.name}</td>
                      <td className="border-b p-2">{client.lastName}</td>
                      <td className="border-b p-2">{client.email}</td>
                      <td className="border-b p-2">{client.phone}</td>
                      <td className="border-b p-2 overflow-hidden text-ellipsis text-sm">
                        {client.address}
                      </td>
                      <td className="border-b p-2">
                        <div className=" ml-5 grid grid-cols-[35px_35px]">
                          <div>
                            <EditSvg
                              onClick={() => {
                                handleOpenEdit(client.email, "updateClient");
                              }}
                            />
                          </div>
                          <div>
                            <DeleteSvg
                              onClick={() => {
                                deleteClient(client.email);
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 mt-5 items-between">
            <div className="w-[100px] h-[31px] py-3 font-semibold text-[#667085] text-[15px] text-center tracking-[0] leading-[15px]">
              <span>Página {clients ? clients.page : ""}</span>
            </div>
            <div className="grid grid-cols-[100px_100px] mx-10 px-10 lg:mx-36 lg:px-36">
              <button
                onClick={() => {
                  if (clients && clients.hasPrevPage && clients.page > 1) {
                    handlePrevPage();
                  }
                }}
                className="inline-flex items-start rounded-[8px] all-[unset] box-border"
              >
                <div className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[8px] flex-[0_0_auto] hover:text-white hover:bg-[#3056d3] rounded-[8px] overflow-hidden border border-solid border-gray-300 shadow-shadow-xs">
                  <div className="  text-[14px] leading-[20px] relative w-fit mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                    Anterior
                  </div>
                </div>
              </button>
              <button
                onClick={() => {
                  if (clients && clients.hasNextPage) {
                    handleNextPage();
                  }
                }}
                className="inline-flex items-start rounded-[8px] all-[unset] box-border"
              >
                <div className="inline-flex items-center justify-center gap-[8px] px-[14px] py-[8px] flex-[0_0_auto] hover:text-white hover:bg-[#3056d3] rounded-[8px] overflow-hidden border border-solid border-gray-300 shadow-shadow-xs">
                  <div className=" text-[14px] leading-[20px] relative w-fit mt-[-1.00px] font-medium tracking-[0] whitespace-nowrap">
                    Siguiente
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ClientsCard
        isOpen={isModalOpen}
        type={modalType}
        onClose={closeModal}
        clientEmail={clientToUp}
      ></ClientsCard>
    </>
  );
}
