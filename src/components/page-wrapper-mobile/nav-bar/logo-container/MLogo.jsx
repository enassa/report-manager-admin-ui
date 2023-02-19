import React from "react";
import { images } from "../../../../assets/images/images";
export default function MLogo({
  containerClassName,
  imageClassName,
  textClassName,
}) {
  return (
    <div className={`${containerClassName} flex h-full items-center py-3`}>
      <img
        alt="logo"
        className={`${imageClassName} md:min-h-[30px] md:min-w-[30px] min-h-[25px] min-w-[25px] h-[25px] w-[20px]  `}
        src={images.koinoLogo}
      />
      {/* <span className={`${textClassName}`}>ToukanyaFX</span> */}
    </div>
  );
}
