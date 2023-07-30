import React from "react";

export default function SlimLoader({ loading = true, bgColor, loaderColor }) {
  return (
    <div
      className={`w-full h-[2px] flex relative ${
        bgColor ? bgColor : "bg-blue-100"
      } `}
    >
      {/* <div className="h-[5px] w-full bg-[#2C3F4F] infinite-slide"></div> */}
      {loading && (
        <div className="absolute w-full top-0 right-0 flex justify-center h-[2px] ">
          <div
            className={`h-full w-full bg-[#2C3F4F] infinite-slide-2 ${
              loaderColor ? loaderColor : ""
            }`}
          ></div>
        </div>
      )}
    </div>
  );
}
