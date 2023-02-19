import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SideBarData as defaultMenuList } from "./side-bar-data/side-bar-data";
import BalanceCard from "./../../balance-card/BalanceCard";
import { images } from "./../../../assets/images/images";
import { useAuthService } from "./../../../store/redux/slices/auth-slice/auth-service";

export default function TSideBar({ menuItems = [] }) {
  const navigate = useNavigate();
  const { logOut, userData } = useAuthService();
  // ================ get active route from url ================
  const activeMenu = useLocation().pathname.split("/")[2];
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
          activeMenu === menuItem.route
            ? "bg-[#F5F7F9]  text-[#000]"
            : "hover:bg-[#F5F7F9] text-[#374F63]"
        } flex px-[9px] w-full items-center mb-3  transition-all rounded-md cursor-pointer hover:text-[#202e3a] h-[43px] overflow-hidden`}
      >
        <div className="flex justify-start items-center mr-2">
          <span style={{ fontSize: 25 }}>{menuItem?.icon}</span>
        </div>
        <div className="flex justify-start items-center">{menuItem?.title}</div>
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
    <div className="shadow-neumoNav w-[260px] min-w-[260px] h-full z-10  bg-white flex flex-col px-[20.89px]">
      <div className="">
        <div className="flex justify-center mb-[20px] mt-[20px]">
          <div className="py-3">
            <img alt="toukanya logo" src={images.toukanyaLogo} />
          </div>
        </div>
      </div>
      <div className="w-full justify-center font-exrabold mt-[10px] mb-[20px]">
        <BalanceCard balance={100} />
      </div>
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-full flex flex-col">
          {ejectMenuListForGroupOne()}
        </div>
        <div className="w-full flex flex-col justify-end pb-[10px]">
          {ejectMenuListForGroupTwo()}
        </div>
      </div>
    </div>
  );
}
