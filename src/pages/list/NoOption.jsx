import React from "react";
import { svgs } from "../../assets/svg/svg";
import { ReadMore } from "@mui/icons-material";

export default function NoOption() {
  return (
    <div className="flex justify-center items-center w-full h-full flex-col">
      <div className="w-[200px] h-[200px]">{svgs.noData}</div>
      <div className="flex items-center">Choose a student to view details</div>
    </div>
  );
}
