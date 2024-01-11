import { useState, useEffect } from "react";
import axios from "axios";

export default function VendorsReports () {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [showList, setShowList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [sellersReport, setSellersReport] = useState("");
  const months = [
    { name: "Enero", value: 1 },
    { name: "Febrero", value: 2 },
    { name: "Marzo", value: 3 },
    { name: "Abril", value: 4 },
    { name: "Mayo", value: 5 },
    { name: "Junio", value: 6 },
    { name: "Julio", value: 7 },
    { name: "Agosto", value: 8 },
    { name: "Septiembre", value: 9 },
    { name: "Octubre", value: 10 },
    { name: "Noviembre", value: 11 },
    { name: "Diciembre", value: 12 },
  ];
  
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

  const [input, setInput] = useState({
    dia: "",
    mes: "",
    año: "",
  });
  const years = [
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleClick = (type) => {
    setShowList(type);
    if(showList !== false){
      setShowList(false);
    }
  };

  const handleCloseList = () => {
    setShowList();
  };
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`http://localhost:3001/reports/sellersReportMonthly?month=${selectedMonth}&year=${selectedYear}`, {
          params: {
            page: currentPage,
            limit: 6,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data;
          setSellersReport(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
}, [selectedMonth,selectedYear]);
  return (
    <>
      <div className="border border-[#eaecf0] m-5 p-4 mr-7 rounded-[15px]">
        <div className="font-bold text-center grid grid-rows-2 justify-center">
          <div>
            <h4>Ventas por Vendedor</h4>
          </div>
          <div className="grid grid-cols-[60px_60px] gap-5 select-none justify-center">
            <div className="z-[96]">
              <ul className="p-3 border border-[#eaecf0] active:border-blue-500 hover:border-blue-500  rounded-[15px] h-[50px]">
                <li
                  className={`data outline-none cursor-pointer font-bold${
                    showList === false ? "text-black font-bold" : ""
                  }`}
                  onClick={() => {
                    handleClick("month");
                  }}
                >
                  {selectedMonth === "" ? "Mes" : selectedMonth}
                </li>
                <div
                  className={`h-[40vh] bg-[#fff] cursor-pointer overflow-y-auto border border-[#eaecf0] p-3 ${
                    showList === "month" ? "" : "hidden"
                  } `}
                >
                  {showList &&
                    showList === "month" &&
                    months.map((month) => (
                      <li
                        key={month.name}
                        className={`data outline-none font-bold hover:bg-[#eaecf0] ${
                          selectedMonth === month.name
                            ? " text-black font-bold"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedMonth(month.value);
                          handleChange({ target: { value: month.value } });
                          handleCloseList();
                        }}
                      >
                        {month.name}
                      </li>
                    ))}
                </div>
              </ul>
            </div>
            <div className="z-[95]">
              <ul className="p-3 border border-[#eaecf0] active:border-blue-500 hover:border-blue-500  rounded-[15px] h-[50px]">
                <li
                  className={`data outline-none cursor-pointer font-bold${
                    showList === false ? "text-black font-bold" : ""
                  }`}
                  onClick={() => {
                    handleClick("year");
                  }}
                >
                  {selectedYear === "" ? "Año" : selectedYear}
                </li>
                <div
                  className={`h-[40vh] w-[120px] bg-[#fff] cursor-pointer overflow-y-auto border border-[#eaecf0] p-3 ${
                    showList === "year" ? "" : "hidden"
                  } `}
                >
                  {showList &&
                    showList === "year" &&
                    years.map((year) => (
                      <li
                        key={year}
                        className={`data outline-none font-bold hover:bg-[#eaecf0] ${
                          selectedYear === year ? " text-black font-bold" : ""
                        }`}
                        onClick={() => {
                          setSelectedYear(year);
                          handleChange({ target: { value: year } });
                          handleCloseList();
                        }}
                      >
                        {year}
                      </li>
                    ))}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <table className="w-[80vw] border-b-2">
            <thead>
              <tr className="text-[#637381]">
                <th className="border-b-2 rounded-tl p-4 border-gray-200 bg-[#eaecf0]">
                  Avatar
                </th>
                <th className="border-b-2 border-gray-200 p-4 bg-[#eaecf0]">
                  Vendedor
                </th>
                <th className="border-b-2 rounded-tr border-gray-200 p-4 bg-[#eaecf0]">
                  Ventas Totales
                </th>
              </tr>
            </thead>
            <tbody>
              {sellersReport.users &&
                sellersReport.users.map((vendor) => (
                  <tr key={vendor.vendor} className="text-[#637381] text-center">
                    <td className="border-b p-2 px-5">
                      <div className="flex items-center w-[35px] m-5 h-[35px] bg-[#d9d9d9] rounded-[44px] shadow-[0px_4px_4px_#00000040]">
                        <img
                          src={vendor.avatar}
                          alt={`${vendor.vendor}-image`}
                          className="w-[30px] h-[30px] rounded-[44px]"
                        />
                      </div>
                    </td>
                    <td className="border-b p-2">{vendor.vendor}</td>
                    <td className="border-b p-2">{vendor.totalSales}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 mt-5">
          <div className="w-[100px] h-[31px] py-3 font-semibold text-[#667085] text-[15px] text-center tracking-[0] leading-[15px]">
            <span>Página {sellersReport ? sellersReport.page : ""}</span>
          </div>
          <div className="grid grid-cols-[100px_100px] mx-5">
            <button
              onClick={() => {
                if (sellersReport && sellersReport.hasPrevPage && sellersReport.page > 1) {
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
                if (sellersReport && sellersReport.hasNextPage) {
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
    </>
  );
}