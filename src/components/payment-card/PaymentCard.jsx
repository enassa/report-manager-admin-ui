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
  Report,
  Check,
  Article,
} from "@mui/icons-material";
import { ClickAwayListener, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-links";

export default function PaymentCard({
  data,
  handleOpenDetails,
  handleOpenComplainForm,
}) {
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
    <div
      onClick={() => showDrop(true)}
      className="w-full cursor-pointer md:min-h-[100px] min-h-[80px] relative bg-white h-[60px] md:shadow-md shadow-sm flex items-center  justify-between   mb-[1px] md:p-[20px]  md:rounded-sm md:py-[] py-[12px] p-[5px]"
    >
      {data?.new ? (
        <div className="w-[25px] h-[25px] absolute text-[50%] text-white top-[-5px] right-0 rounded-full bg-green-500 flex justify-center items-center">
          New
        </div>
      ) : null}
      <div className="w-full h-full flex  cursor-pointer ">
        <div className="h-full flex items-center ">
          <span className="min-w-[30px] min-h-[30px] flex justify-center items-center rounded-lg bg-blue-400 text-white mr-[20px]">
            <HourglassTopOutlined style={iconStyle} />
          </span>
        </div>
        <div className="flex flex-col w-full h-full justify-between relative">
          <div className="w-full md:max-w-[80%] max-w-[80%]  text-sm md:text-xl text-left whitespace-nowrap overflow-hidden text-ellipsis">
            {data?.bill}
          </div>

          <span className="w-full flex items-center md:text=[50px]  text-[10px]">
            <WatchLaterOutlined
              style={{ fontSize: 15, marginRight: 2, color: "#333" }}
            />
            <span className="w-full max-w-[60%] md:max-w-[80%] overflow-hidden whitespace-nowrap text-ellipsis  text-left">
              {data?.date}
            </span>
          </span>
        </div>
      </div>
      <div className="font-extrabold absolute right-2 text-xs  text-gray-900 w-full justify-end flex md:hidden ">
        <span className="p-1 px-2 bg-gray-50 text-blue-900 rounded-full">
          GHS {data?.amount}
        </span>
      </div>
      {/* 20th Jan 2021 | 10:54 AM */}
      <div className="w-full cursor-pointer  h-full md:flex items-center justify-end relative hidden">
        <Tooltip title="">
          <div
            onClick={() => showDrop(true)}
            style={{ minWidth: 120 }}
            className={
              iconContainerClass +
              " px- whitespace-nowrap border-bgTrade text-white bg-bgTrade "
            }
          >
            GHS {data.amount}
          </div>
        </Tooltip>
        <Tooltip title="">
          <div
            onClick={() => showDrop(true)}
            className={
              iconContainerClass +
              " bg-green-400 text-white border-transparent hover:bg-green-400"
            }
          >
            <Check
              style={iconStyle}
              className="pointer-events-none text-[10px!important] w-[5px] h-[5px]"
            />
          </div>
        </Tooltip>
        <Tooltip title="">
          <div
            onClick={() => showDrop(true)}
            className={
              iconContainerClass +
              " md:min-w-[100px] md:w-[100px] md:mr-[0px] border-transparent hover:bg-transparent hover:text-black"
            }
          >
            <MoreVert />
          </div>
        </Tooltip>
      </div>
      {drop && (
        <ClickAwayListener onClickAway={() => showDrop(false)}>
          <div className="w-[170px] z-[20] flex flex-col  absolute bg-white top-[20px] right-0 shadow-neuroFlat animate-rise">
            <div
              onClick={() => {
                showDrop(false);
                handleOpenDetails(data);
              }}
              className=" w-full text-gray-500 h-[60px] hover:bg-gray-50 hover:text-black flex items-center justify-start px-[10px]"
            >
              <Article className=" mr-1" /> <span>View details</span>
            </div>
            <div
              onClick={() => {
                showDrop(false);
                handleOpenComplainForm(data);
              }}
              className=" w-full text-gray-500 h-[60px] hover:bg-gray-50 hover:text-red-400  flex items-center justify-start px-[10px]"
            >
              <Report className=" mr-1" /> <span>Raise a complain</span>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
