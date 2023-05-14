import { Close, CopyAll } from "@mui/icons-material";
import React from "react";
import {
  replaceSpaceWithUnderscore,
  replaceUnderscoreWithSpace,
} from "../../constants/reusable-functions";

export default function TransactionDetails({ activeTransaction, handleClose }) {
  const ejectDetails = () => {
    const properties = Object.keys(activeTransaction || {});
    return (
      Array.isArray(properties) &&
      properties.map((property, index) => {
        console.log(property, activeTransaction);
        return (
          <div
            key={index + "profile"}
            className=" flex justify-start  h-[40px] min-h-[40px] mb-[12%]"
          >
            {/* <div className="h-full flex justify-center items-center mr-[10px]">
          <span className="rounded-full w-[40px] text-blue-900 h-40px] min-w-[40px] min-h-[40px] shadow-md flex justify-center items-center">
            {item?.icon}
          </span>
        </div> */}
            <div className="flex w-full flex-col">
              <label className="font-extrabold w-full flex  text-gray-800 font-light ">
                {replaceUnderscoreWithSpace(property)}
              </label>
              <span className="w-full flex justify-end  items-center">
                <input
                  className="w-full flex items-center border-b-[1px] border-b-gray-300 bg-transparent outline-none"
                  value={activeTransaction[property]}
                  onChange={() => {}}
                />
              </span>
            </div>
          </div>
        );
      })
    );
  };
  return (
    <div className="w-full absolute flex justify-center items-center h-full  top-0 right-0 bg-[rgb(0,0,0,0.5)] z-[99999999999909999999] ">
      <div className="w-[90%] animate-rise bg-white h-[90%] flex p-3 flex-col relative">
        <div className="w-full h-[50px] flex justify-end px-2">
          <span
            onClick={handleClose}
            className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] bg-gray-50 rounded-full flex justify-center items-center"
          >
            <Close className="pointer-events-none" />
          </span>
        </div>
        <div className="w-full h-full overflow-x-hidden overflow-y-auto  ">
          {ejectDetails()}
        </div>
        <span className="min-h-[40px] min-w-[40px]  top-[24%] right-[20px] bg-bgTrade text-white rounded-md flex justify-center items-center">
          <CopyAll /> <span>Copy to Clipboard</span>
        </span>
      </div>
    </div>
  );
}
