import React from "react";
import { images } from "../../../../assets/images/images";
export default function TLogo({
  containerClassName,
  imageClassName,
  textClassName,
}) {
  return (
    <div className={`${containerClassName} flex h-full items-center py-3`}>
      <img
        alt="logo"
        className={`${imageClassName} h-[40px] w-[100%] mr-2 `}
        src={images.toukanyaLogo}
      />
      {/* <span className={`${textClassName}`}>ToukanyaFX</span> */}
    </div>
  );
}
