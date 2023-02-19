import React from "react";

export default function TextButton({ text, icon, onClick, active = false }) {
  return (
    <div
      onClick={() => onClick()}
      className={`${
        active ? "bg-bgTrade text-white" : "bg-white text-bgTrade"
      } mr-[20px] hover:bg-gray-900 transition-[background-color] duration-500  shadow-md pl-[8px] rounded-full cursor-pointer shadaw-md p-[0.5px] flex justify-end items-center relative`}
    >
      <div className="text-inherit whitespace-nowrap mr-[10px] pl-[5px] pointer-events-none">
        {text}
      </div>
      <span className="rounded-full bg-bgTrade pointer-events-none">
        {icon}
      </span>
    </div>
  );
}
