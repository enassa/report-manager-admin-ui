import {
  AccountBalanceOutlined,
  AccountBalanceRounded,
  Money,
  Wallet,
} from "@mui/icons-material";
import React from "react";
import TButton from "../button/Button";
import { useSMS } from "./SMSHook";

export default function SMSAcountBar() {
  const { isBuyingCredit, setIsBuyingCredit } = useSMS();

  return (
    <div className="w-full h-[40px] bg-transparent flex justify-between items-center px-2">
      <div className="flex items-center text-white">
        {/* <div className="w-[30px] h-[30px] mr-2 bg-gray-400 rounded-full"></div> */}
        <span className="text-gray-500 font-bold">
          {/* Achimota Senior High School */}
        </span>
      </div>
      <div className="text-gray-500 flex items-center  whitespace-nowrap">
        {/* <span className="mr-2 ">SMS balance: </span> */}
        <Wallet />
        <span className="ml-1 font-extrabold text-gray-500">200000 SMS</span>
        <TButton
          onClick={() => setIsBuyingCredit(!isBuyingCredit)}
          className="bg-green-700 hover:bg-yellow-600 px-2 text-bgTrade ml-4"
        >
          <Money className="mr-2" />
          Buy Credit
        </TButton>
      </div>
    </div>
  );
}
