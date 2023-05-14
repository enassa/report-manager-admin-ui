import React from "react";
import NavBar from "./nav-bar/MNavBar";
import SideBar from "./side-bar/MSideBar";
import Modal from "../modal/Modal";
import OverlayLoader from "../overlay_loader/OverlayLoader";
import { useActivityService } from "../../store/slices/activity-slice/activity-service";

export default function MPageWrapper({ children }) {
  const { activity } = useActivityService();

  return (
    <div className="md:p-[2rem] flex w-full h-full">
      {activity.loading ? <OverlayLoader loaderText={activity?.title} /> : null}
      <div
        className={`${
          false ? "bg-[#222222] " : "bg-white"
        } flex w-full h-full max-w-full justify-center`}
      >
        <Modal />
        <div className="md:w-[10px] w-[4px] bg-blue-400 fixed left-0 h-full top-0 xx:hidden md:flex"></div>
        <div className="md:w-[10px] w-[4px] bg-blue-400 fixed right-0 h-full top-0  xx:hidden md:flex"></div>
        <div className="flex w-full  h-full max-w-full overflow-hidden items-start md:justify-start md:flex-row flex-col-reverse justify-between">
          <div className="md:w-auto w-full  h-full items-center">
            <SideBar />
          </div>
          <div className="w-full min-h-[calc(100%-60px)] md:h-full h-[calc(100%-60px)]  max-h-full flex justify-start flex-col bg-gray-50">
            <div className="h-auto w-full flex">
              <NavBar />
            </div>
            <div className="h-full overflow-y-auto overflow-x-hidden  w-full flex flex-col justify-start md:max-w-full md:max-h-full  ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
