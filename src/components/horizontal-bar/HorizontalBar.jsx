import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import React from "react";

export default function THorizontalBar({ children }) {
  const containerRef = React.createRef();

  let scrollValue = 0;

  const scrollLeft = () => {
    scrollValue = scrollValue + 100;
    containerRef.current.scroll({
      left: scrollValue,
      right: 0,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (scrollValue === 0) return;
    scrollValue = scrollValue + 100;
    containerRef.current.scroll({
      right: scrollValue,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="flex h-[150px] rounded-md scrollbar-hidden justify-start items-center overflow-auto w-full px-[20px] bg-white shadow-neumoNav  rounded-[20px] relative"
      >
        {children}
      </div>
      <div
        onClick={() => scrollRight()}
        className="absolute cursor-pointer top-[34%] left-[-10px] w-[40px] h-[40px] rounded-full bg-white shadow-md flex justify-center items-center"
      >
        <ChevronLeft className="pointer-events-none" />
      </div>
      <div
        onClick={() => scrollLeft()}
        className="absolute cursor-pointer top-[34%] right-[-10px] w-[40px] h-[40px] rounded-full bg-white shadow-md flex justify-center items-center"
      >
        <ChevronRight className="pointer-events-none" />
      </div>
    </div>
  );
}
