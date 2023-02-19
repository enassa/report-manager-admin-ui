import React from "react";
import MLogo from "./logo-container/MLogo";
import MUserProfile from "./user-profile/MUserProfile";

export default function MNavBar() {
  return (
    <div className="flex  md:justify-end justify-space-between w-[100%] h-[60px]  bg-xxxx bg-white shadow-neumoNav">
      <div className="h-full flex items-center">
        <div className="flex justify-center md:hidden  rounded-[200px]  ml-2 h-[30px] w-[30px] min-w-[30px] min-h-[30px]">
          <MLogo />
        </div>
      </div>
      <div className="flex  min-w-[300px] justify-end">
        <MUserProfile />
      </div>
    </div>
  );
}
