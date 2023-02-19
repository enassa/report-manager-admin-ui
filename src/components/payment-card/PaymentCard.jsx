import {
  BusinessCenter,
  Delete,
  Edit,
  MoreVert,
  Settings,
  ShowChart,
  AssessmentOutlined,
  DownloadForOfflineOutlined,
  FileDownloadOutlined,
  FileOpenOutlined,
  ShareOutlined,
  WatchLaterOutlined,
  HourglassTopOutlined,
  ReplayOutlined,
} from "@mui/icons-material";
import { ClickAwayListener, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-links";

export default function PaymentCard({ data }) {
  const { closePortfolio, openEditPortfolioForm } = {
    a: () => {},
    b: () => {},
  };
  const navigate = useNavigate();
  const [drop, showDrop] = useState(false);
  const iconContainerClass =
    "md:mr-[20px] mr-2 cursor-pointer rounded-full  text-bgTrade hover:bg-bgTrade hover:text-white  border-bgTrade border-2 transition-all duration-100 md:min-h-[40px] md:min-w-[40px] md:w-[40px] md:h-[40px] w-[30px] h-[30px] px-3 flex justify-center items-center";
  const iconStyle = { fontSize: "1.2em" };
  return (
    <div className="w-full md:min-h-[100px] min-h-[80px] bg-white h-[60px] md:shadow-md shadow-sm flex items-center  justify-between   mb-[1px] md:p-[20px]  md:rounded-sm md:py-[] py-[12px] p-[5px]">
      <div className="w-full h-full flex  cursor-pointer ">
        <div className="h-full flex items-center ">
          <span className="min-w-[30px] min-h-[30px] flex justify-center items-center rounded-lg bg-blue-400 text-white mr-[20px]">
            <HourglassTopOutlined style={iconStyle} />
          </span>
        </div>
        <div className="flex flex-col w-full h-full justify-between">
          <span className=" w-full  text-sm md:text-xl flex">{data?.bill}</span>
          <div className="font-extrabold text-xs text-gray-900 w-full justify-end flex md:hidden ">
            <span className="p-1 px-2 bg-gray-50 text-blue-900 rounded-full">
              GHS2000
            </span>
          </div>
          <span className="w-full flex items-center md:text=[50px]  text-[10px]">
            <WatchLaterOutlined
              style={{ fontSize: 15, marginRight: 2, color: "#333" }}
            />
            <span className="h-full items-center flex ">
              20th Jan 2021 | 10:54 AM
            </span>
          </span>
        </div>
      </div>
      <div className="w-full cursor-pointer h-full md:flex items-center justify-end relative hidden">
        <Tooltip title="Edit detail">
          <div
            onClick={() => openEditPortfolioForm(data?.title)}
            className={iconContainerClass + " md:min-w-[100px] md:w-[100px]"}
          >
            $500
          </div>
        </Tooltip>
        <Tooltip title="Download">
          <div onClick={() => showDrop(true)} className={iconContainerClass}>
            <ReplayOutlined
              style={iconStyle}
              className="pointer-events-none text-[10px!important] w-[5px] h-[5px]"
            />
          </div>
        </Tooltip>
        {drop && (
          <ClickAwayListener onClickAway={() => showDrop(false)}>
            <div className="w-[170px] z-[20] flex flex-col  absolute bg-white top-[70px]  shadow-neuroFlat animate-rise">
              <div
                onClick={() => {
                  showDrop(false);
                  closePortfolio();
                }}
                className=" w-full h-[60px] hover:bg-gray-50 hover:text-red-400  flex items-center justify-start px-[10px]"
              >
                <Delete className="" /> <span>Close portfolio</span>
              </div>
            </div>
          </ClickAwayListener>
        )}
      </div>
      <div className="h-full flex md:hidden  items-center  justify-center relative">
        <ReplayOutlined
          onClick={() => showDrop(true)}
          style={{ fontSize: 20 }}
          className="text-red-800"
        />
        {/* {drop && (
          <ClickAwayListener onClickAway={() => showDrop(false)}>
            <div className="w-[170px] z-[20] flex flex-col  absolute bg-white top-[10px]  shadow-neuroFlat animate-rise right-[0px]">
              <div
                onClick={() => {
                  showDrop(false);
                  closePortfolio();
                }}
                className=" w-full h-[60px] hover:bg-gray-50 hover:text-red-400  flex items-center justify-start px-[10px]"
              >
                <Delete className="" /> <span>Close portfolio</span>
              </div>
            </div>
          </ClickAwayListener>
        )} */}
      </div>
    </div>
  );
}
