import React, { useState } from "react";
import TButton from "../button/Button";
import { ArrowRight } from "@mui/icons-material";
import { useSMS } from "./SMSHook";
import ManualEntryMethode from "./ManualEntryMethode";
import SelectEntryMethode from "./SelectEntryMethode";
import ExcelEntryMethod from "./ExcelEntryMethod";
import SMSViewBar from "./SMSViewBar";
import SMSControlBar from "./SMSControlBar";

export default function RecipientManager() {
  const { entryMethode, ENTRY_METHODS, rowData } = useSMS();
  const getEntryMethodeComponent = () => {
    switch (entryMethode) {
      case ENTRY_METHODS.manual:
        return <ManualEntryMethode />;
      case ENTRY_METHODS.excelFile:
        return <ExcelEntryMethod />;
      default:
        return <SelectEntryMethode />;
    }
  };
  return (
    <div className="w-full flex h-full flex-col ">
      {entryMethode !== undefined ? (
        <div className="min-h-[70px] h-[70px] flex">
          <SMSControlBar />
        </div>
      ) : null}
      {/* Create some height space if we have picked excel file to show view bar */}
      <div
        className={`w-full flex ${
          rowData?.length || entryMethode !== ENTRY_METHODS.excelFile
            ? " h-[calc(100%-150px)] max-h-[calc(100%-150px)]"
            : "h-full"
        }`}
      >
        {getEntryMethodeComponent()}
      </div>
      {(entryMethode !== undefined && rowData?.length) ||
      entryMethode === ENTRY_METHODS.manual ? (
        <div className="w-full h-[80px] flex ">
          <SMSViewBar />
        </div>
      ) : null}
    </div>
  );
}
