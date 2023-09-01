import { Close, Wallet } from "@mui/icons-material";
import React from "react";
import TAuthInput from "../auth-input/AuthInput";
import { images } from "../../assets/images/images";
import ErrorsGrid from "./ErrorsGrid";
import ValidGrid from "./ValidGrid";
import { useSMS } from "./SMSHook";

export default function SMSPreview({ onClose }) {
  const { processedMessages, setprocessedMessages } = useSMS();
  return (
    <div className="w-full h-full flex fixed top-0 right-0 animte-rise bg-[rgb(0,0,0,0.6)] z-[99999] p-[5%] ">
      <div className="w-full h-full flex flex-col rounded-md relative animate-rise">
        <div className="w-full min-h-[50px] h-[50px] bg-blue-900  flex justify-end items-center px-2">
          <div
            onClick={() => setprocessedMessages()}
            className="w-[30px] cursor-pointer  text-white h-[30px] bg-[rgb(255,255,255,0.3)] rounded-full flex items-center justify-center"
          >
            <Close style={{ fontSize: 20 }} />
          </div>
        </div>
        <div className="flex flex h-full bg-blue-50">
          <div className="w-full mr-2 flex  flex-col justify-center items-center ">
            <ErrorsGrid
              tableData={
                processedMessages?.valid ? processedMessages.invalid : []
              }
              colDef={{}}
            />
          </div>
          <div className="w-full h-full flex bg-gray-50 justify-center items-center flex-col">
            <ValidGrid
              tableData={
                processedMessages?.invalid ? processedMessages.valid : []
              }
              colDef={{}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
