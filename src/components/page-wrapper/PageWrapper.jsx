import React from "react";
import NavBar from "./nav-bar/NavBar";
import SideBar from "./side-bar/SideBar";
import Modal from "./../modal/Modal";
import PopOverForm from "./../../pages/pop-overs/PopOverForm";

export default function TPageWrapper({ children }) {
  return (
    <div className="flex w-full h-full max-w-full justify-center">
      <Modal />
      <PopOverForm />
      <div className="flex w-full h-full max-w-full overflow-hidden items-start justify-start">
        <div className="w-auto h-full items-center">
          <SideBar />
        </div>
        <div className="w-[calc(100%-260px)] h-full max-h-full flex justify-start flex-col">
          <div className="h-auto w-full flex">
            <NavBar />
          </div>
          <div className="h-[calc(100%-60px)]  overflow-y-auto overflow-x-hidden w-full flex flex-col justify-start max-w-full max-h-full  ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
