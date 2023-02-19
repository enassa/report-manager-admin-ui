import { Close } from "@mui/icons-material";
import React from "react";

export default function CloseButton({
  onClick,
  size = 50,
  iconColorClass,
  iconColorStyle,
}) {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className={`scale-75 hover:text-red-500 hover:scale-100 flex cursor-pointer hover:rotate-90 transition-all duration-200 justify-center rounded-full items-center w-[${size}px] h-[${size}px] min-w-[${size}px] min-h-[${size}px] top-0 right-0 hover:bg-gray-100 pointer-events-auto`}
    >
      <Close
        onClick={() => {
          onClick();
        }}
        className="className "
        style={{ fontSize: "130%", color: iconColorStyle }}
      />
    </div>
  );
}
