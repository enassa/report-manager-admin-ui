import React, { useEffect, useState } from "react";
import { getCaretCoordinates } from "../../constants/reusable-functions";

export default function CursorPositionPopUp({ options }) {
  const [position, setPosition] = useState();
  const popUpDiv = React.useRef();

  useEffect(() => {
    document.addEventListener("mousemove", (ele) => {
      let top = ele.clientY;
      // top = ele.clientX;
      let right = ele.clientX;
      // console.log(window.innerWidth - right);
      if (window.innerWidth - right < 103) {
        right -= 100;
      }
      if (right <= 0) {
        right = 5;
      }
      if (window.innerHeight - top < 103) {
        top -= 100;
      }
      setPosition({ top, right });
    });
    // getCaretCoordinates();
  }, []);

  const ejetOptions = () => {
    return [1, 2, 3, 4, 5, 6].map((item, index) => {
      return <div key={index}>{index} item</div>;
    });
  };
  return (
    <div
      ref={popUpDiv}
      style={{ top: position?.top, left: position?.right }}
      className="w-[100px] h-auto fixed z-[600] bg-red-500"
    >
      {ejetOptions()}
    </div>
  );
}
