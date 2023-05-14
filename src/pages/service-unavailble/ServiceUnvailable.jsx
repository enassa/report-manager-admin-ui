import React from "react";
import { svgs } from "../../assets/svg/svg";

export default function ServiceUnvailable() {
  return (
    <div className="flex animate-rise justify-center items-center w-full h-full flex-col">
      <div className="w-[200px] h-[200px]">{svgs.ServiceInProgress}</div>
      <div>
        We are working diligently to add this service, Check here again!
      </div>
    </div>
  );
}
