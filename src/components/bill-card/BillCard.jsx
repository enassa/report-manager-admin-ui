import React, { useState } from "react";
import { WatchLaterOutlined, InfoOutlined } from "@mui/icons-material";
import { ClickAwayListener, Tooltip } from "@mui/material";

export default function BillCard({ data }) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="flex flex-col items-center mb-[30px] md:w-[260px] w-[93%]">
      <div
        className=" bg-white w-full md:h-[200px] md:min-h-[150px] min-h-[150px] h-[80px] shadow-md  p-2 flex flex-col relative
         
           "
      >
        <Tooltip
          title="This money is used to help make the school a better place for our wards"
          open={showTooltip}
          onOpen={() => setShowTooltip(true)}
          onClose={() => setShowTooltip(false)}
        >
          <InfoOutlined
            style={{ fontSize: 19 }}
            className="absolute right-2 top-2 cursor-pointer text-gray-400"
            onClick={() => setShowTooltip(!showTooltip)}
          />
        </Tooltip>
        {/* <div
        className="flex px-2 truncate text-setTimeout(() => {
        
      }, timeout); w-full justify-center h-[50px] text-gray-600"
      >
        {data.name}
      </div> */}
        <div className="h-full flex justify-center items-center bg-gray-50 rounded-2xl ">
          <span className="text-2xl">Paid GHS</span>
          <span className="text-5xl">200</span>/
          <span className="text-2xl">500</span>
        </div>
        <div className="w-full h-[30px] min-h-[30px] text-gray-500  text-xs italic flex items-end">
          <span className="flex items-center w-full">
            <WatchLaterOutlined style={{ fontSize: 15 }} />
            <span className="h-full items-center flex">
              20th Jan 2021 | 10:54 AM
            </span>
          </span>
          <div className="w-[50px] h-[20px] flex items-center">
            <button
              // style={{ borderRadius: "20px 20px 20px 20px" }}
              className="px-[30px] mb-2 mr-2 py-[10px] bg-green-700 absolute right-0 text-white rounded-md"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
      <span className="justify-center text-gray-500  w-full flex mt-[5px] text-sm px-[15px]">
        {" "}
        {data.name}
      </span>
    </div>
  );
}
