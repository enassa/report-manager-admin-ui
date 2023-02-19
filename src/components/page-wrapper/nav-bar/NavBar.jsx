import React from "react";
import Logo from "./logo-container/Logo";
import UserProfile from "./user-profile/UserProfile";

export default function TNavBar() {
  return (
    <div className="flex  justify-space-between w-[100%] h-[60px] shadow-neumoNav bg-white ">
      <div className="flex w-full"></div>
      <div className="flex  min-w-[300px] justify-end">
        <UserProfile />
      </div>
    </div>
  );
}
