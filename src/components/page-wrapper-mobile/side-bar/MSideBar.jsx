import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MSideBarData as defaultMenuList } from "./side-bar-data/m-side-bar-data";
import { images } from "../../../assets/images/images";
// import { useAuthService } from "../../../store-and-services/auth-slice/auth-service";
import { useTheme } from "@emotion/react";
import MLogo from "../nav-bar/logo-container/MLogo";
import { useAuthService } from "../../../store/slices/auth-slice/auth-service";

export default function MSideBar({ menuItems = [] }) {
  // const { theme } = useTheme();
  const navigate = useNavigate();
  const { logOut } = useAuthService();
  // ================ get active route from url ================
  const activeMenu = useLocation().pathname.split("/")[1];
  console.log(activeMenu);
  const menuList =
    Array.isArray(menuItems) && menuItems.length ? menuItems : defaultMenuList;
  const MenuItem = ({ menuItem }) => {
    return (
      <a
        href={menuItem?.url} // ================ just here for screen reader ================
        onClick={(e) => {
          e.preventDefault();
          if (menuItem.title === "Logout") {
            logOut();
            return;
          }
          navigate(menuItem?.url);
        }}
        className={`${
          activeMenu === menuItem.text
            ? "bg-white  text-blue-500"
            : "hover:bg-[#F5F7F9] text-[#374F63]"
        } flex flex-col  w-full items-center justify-center transition-all md:rounded-none rounded-md cursor-pointer hover:text-blue-400 md:h-[63px] `}
      >
        <div className="flex justify-center items-center ">
          <span style={{ fontSize: 25 }}>{menuItem?.icon}</span>
        </div>
        <div className="flex justify-start items-center text-xs">
          {menuItem?.title}
        </div>
      </a>
    );
  };

  const ejectMenuListForGroupOne = () => {
    return menuList
      .filter((menuItem) => menuItem?.group === 1)
      .map((menuItem, index) => {
        return <MenuItem key={index} menuItem={menuItem} />;
      });
  };

  const ejectMenuListForGroupTwo = () => {
    return menuList
      .filter((menuItem) => menuItem?.group === 2)
      .map((menuItem, index) => {
        return <MenuItem key={index} menuItem={menuItem} />;
      });
  };

  return (
    <div className="shadow-neumoNav md:w-[60px] h-[60px] w-full md:min-w-[60px] md:h-full z-10  bg-xxxx flex md:flex-col ">
      <div className="w-full justify-center font-exrabold md:mt-[0px] mt-[10px] md:mb-[20px] md:flex hidden">
        {/* <BalanceCard balance={100} /> */}
        <div className="flex w-full  md:flex justify-center bg-blue-300 py-[3px]">
          <MLogo />
        </div>
      </div>
      <div className="w-full h-full flex md:flex-col">
        <div className="w-full h-full flex md:flex-col">
          {ejectMenuListForGroupOne()}
        </div>
        <div className="w-full md:flex md:flex-col md:justify-end md:pb-[10px] hidden">
          {ejectMenuListForGroupTwo()}
        </div>
      </div>
    </div>
  );
}
