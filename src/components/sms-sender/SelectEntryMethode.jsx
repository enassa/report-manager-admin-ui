import React, { useState } from "react";
import TButton from "../button/Button";
import { ArrowRight } from "@mui/icons-material";
import { useSMS } from "./SMSHook";

export default function SelectEntryMethode() {
  const [temMethode, setTemMethode] = useState();
  const { setEntryMethode, ENTRY_METHODS } = useSMS();
  return (
    <div className="w-full min-w-[300px] h-full flex flex-col items-start justify-center px-4">
      <span className="mb-2">How would you want to enter recipient?</span>
      <div className="w-full  ">
        <span className="w-full flex items-center mb-2 ">
          <input
            id="manual"
            className="mr-1 cursor-pointer"
            type="radio"
            value={ENTRY_METHODS.manual}
            name="recipientType"
            onChange={(e) => {
              setTemMethode(e.target.value);
            }}
          />
          <label className="cursor-pointer" htmlFor="manual">
            Manual Entry
          </label>
        </span>
        <span className="w-full flex items-start mb-2 ">
          <input
            id="useFile"
            className="mr-1 cursor-pointer"
            type="radio"
            value={ENTRY_METHODS.excelFile}
            name="recipientType"
            onChange={(e) => {
              setTemMethode(e.target.value);
            }}
          />
          <label
            className="cursor-pointer text-start relative top-[-5px]"
            htmlFor="useFile"
          >
            Use an excel file{" "}
            <span className="text-green-700 text-sm font-bolder">
              {" "}
              ( Use one column of excel file as recipient address and insert
              other columns as fields into message )
            </span>
          </label>
        </span>
        <TButton
          className={`w-[100px] max-w-[150px] pointer-events-auto bg-green-700`}
          icon={<ArrowRight />}
          onClick={() => setEntryMethode(temMethode)}
        >
          Contiinue
        </TButton>
      </div>
    </div>
  );
}
