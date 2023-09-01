import { Search } from "@mui/icons-material";
import React from "react";
import { useSMS } from "./SMSHook";
import { images } from "../../assets/images/images";

export default function SMSControlBar() {
  const {
    setRecipientList,
    columns,
    setColumns,
    rowData,
    setRowData,
    setExcelDataState,
    resetExcelEntry,
    changeEntryMethode,
    executeLocalSearch,
    gridRef,
    entryMethode,
    ENTRY_METHODS,
  } = useSMS();

  const ejectControls = () => {};
  return (
    <div className="flex bg-white shadow-md  w-full h-full justify-between items-center">
      {/* <div className="mr-2 whitespace-nowrap">
              <span className="mr-2  text-[#364E62]">Sort by |</span>
              <select
                onChange={(e) => {
                  executeSort(e.target.value);
                }}
                className="cursor-pointer capitalize text-[#364E62] outline-none bg-transparent "
              >
                {ejectSorters()}
              </select>
            </div> */}

      <div className="px-2 py-2 whitespace-nowrap w-[40%] h-full flex items-center min-w-[150px] ">
        <b className=" text-xl text-[#364E62] h-full flex items-center">|</b>

        <input
          type="search"
          disabled={!rowData?.length}
          placeholder="Type here to search..."
          onChange={(e) => {
            executeLocalSearch(e.target.value);
          }}
          className=" mr-1 text-sm  p-2 outline-nonew-full  h-[40px] bg-transparent outline-none"
        />
        <Search />
      </div>
      <div className="flex z-[2] bg-white">
        {/* <div className="flex px-2 cursor-pointer bg-blue-900 mr-2 text-white"> */}
        <div
          onClick={(e) => {
            changeEntryMethode(ENTRY_METHODS.manual);
          }}
          className={`flex px-2  hover:bg-blue-50 cursor-pointer  text-bgTrade mr-2  border-b-2  ${
            entryMethode === ENTRY_METHODS.manual
              ? "border-b-bgTrade bg-blue-50"
              : "border-b-transparent"
          }   `}
        >
          <div className="flex mr-2 justify-end w-full items-center  whitespace-nowrap">
            <span className="text-bg-blue-900">Manual input </span>
          </div>
          <button
            className={` h-[34px] text-red-100  hover:text-white flex justify-center   items-center  cursor-pointer  rounded-full whitespace-nowrap transition-all`}
          >
            <img className="w-[20px]" src={images.contactBook1} />
          </button>
        </div>
        {/* <div className="flex px-2 cursor-pointer  bg-blue-900 text-white"> */}
        <div
          onClick={(e) => {
            changeEntryMethode(ENTRY_METHODS.excelFile);
          }}
          className={`flex px-2 hover:bg-blue-50 cursor-pointer  text-bgTrade mr-2 border-b-2  ${
            entryMethode === ENTRY_METHODS.excelFile
              ? "border-b-bgTrade bg-blue-50"
              : "border-b-transparent"
          }   `}
        >
          <div className="flex mr-2 justify-end w-full items-center  whitespace-nowrap">
            <span className="text-bg-blue-900 text-bgTrade">Use File </span>
          </div>
          <button
            className={` h-[34px] text-red-100   flex justify-center   items-center  cursor-pointer  rounded-full whitespace-nowrap transition-all`}
          >
            <img className="h-[20px]" src={images.excelFile} />
          </button>
        </div>
      </div>
    </div>
  );
}
