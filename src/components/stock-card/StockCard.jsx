import {
  Add,
  AddCircle,
  AddCircleOutline,
  Remove,
  RemoveCircle,
  RemoveCircleOutline,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import CloseButton from "../close-button/CloseButton";
import SingleChart from "./../../pages/portfolio/charts/SingleChart";

export default function TStockCard({ data }) {
  const amount = (50 / Math.random(20)).toFixed(1);
  const [hovered, setHOvered] = useState(false);
  const [amountUpdat, setUpdate] = useState(1);
  useEffect(() => {
    setInterval(() => {
      setUpdate(Math.random() * 10);
    }, 5000);
  }, []);
  const amount2 = parseInt(amount) + parseInt(amountUpdat);
  return (
    <div
      onMouseOut={() => setHOvered(false)}
      onMouseOver={() => setHOvered(true)}
      className="shadow-md w-[243px] h-[100px] bg-white rounded-[10px] cursor-pointer p-3 flex flex-col relative overflow-hidden"
    >
      {hovered && (
        <span className="absolute top-0 right-0 z-[10 ">
          <CloseButton
            onClick={() => {
              console.log("");
            }}
            size={30}
          />
        </span>
      )}
      <div className="flex w-full h-full">
        <div className="h-full flex items-center">
          <img
            alt="stock-logo"
            className="h-[40px] w-[40px] max-w-[40px] mr-3"
            src={data.icon}
          />
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="w-[100%] h-[35px] whitespace-nowrap text-ellipsis overflow-hidden flex flex-col z-[10]">
            {data.title}
            <div className="h-full w-[100px] flex justify-center">
              {/* <SingleChart /> */}
            </div>
          </div>
          <div className="w-full bg-transparent text-gray-500 flex justify-center flex-col h-full mb-[10px] ">
            <span className="flex justify-start flex-row text-sm bg-transparent items-center">
              <span
                className={` ${
                  amount > 30
                    ? "bg-green-50 text-green-800 "
                    : "text-red-800 bg-red-50"
                }  px-[5px] rounded-md mr-1 flex items-center  whitespace-nowrap`}
              >
                <AddCircle className="mr-2" style={{ fontSize: 15 }} />{" "}
                <span>${amount2.toFixed(1)}</span>
              </span>
              <span
                className={` ${
                  amount > 30
                    ? "bg-green-50 text-green-800 "
                    : "text-red-800 bg-red-50"
                }  px-[5px] rounded-md whitespace-nowrap`}
              >
                <RemoveCircle className="mr-1" style={{ fontSize: 15 }} />
                <span
                  className={` ${
                    amount > 300
                      ? "bg-green-50 text-green-800 "
                      : "text-red-800 bg-red-50"
                  }  px-[5px] rounded-md h-[5px]`}
                >
                  ${amount2.toFixed(1)}
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[10px] w-full flex justify-center pl-[30px]">
        <span className="mt-3 text-gray-400 text-xs">{data.symbol}</span>
      </div>
    </div>
  );
}
/* Rectangle 27 */
/* Rectangle 27 */
