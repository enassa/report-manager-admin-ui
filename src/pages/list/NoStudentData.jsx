import React from "react";
import { svgs } from "../../assets/svg/svg";

export default function NoStudentData() {
  return (
    <div className="flex justify-center items-center w-full h-full flex-col bg-white">
      <div className="w-[200px] h-[200px]">{svgs.NoReport}</div>
      <div className="flex items-center">
        <span> Select a class to view student list</span>
      </div>
    </div>
  );
}
