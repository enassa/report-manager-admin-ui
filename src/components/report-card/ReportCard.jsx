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
} from "@mui/icons-material";
import { ClickAwayListener, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-links";

export default function ReportCard({ data }) {
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
    <div className="w-full md:min-h-[100px] min-h-[60px] bg-white h-[60px] md:shadow-md shadow-sm flex items-center  justify-between   mb-[1px] md:p-[20px]  md:rounded-sm p-[10px]">
      <div className="w-full h-full flex items-center cursor-pointer ">
        {/* <AssessmentOutlined style={iconStyle} /> */}
        <input type="checkbox" />
        <span className="ml-3 text-sm md:text-xl">Year {data?.year}</span>
        <span className="ml-3 text-sm md:text-xl">
          Semester {data?.semester}
        </span>
        <span>{data.count}</span>
      </div>
      <div className="w-full cursor-pointer h-full md:flex items-center justify-end relative hidden">
        <Tooltip title="Share">
          <div
            onClick={() => navigate(ROUTES.portfolioDetail.url)}
            className={iconContainerClass}
          >
            <ShareOutlined style={iconStyle} className="pointer-events-none" />
          </div>
        </Tooltip>
        <Tooltip title="Edit detail">
          <div
            onClick={() => openEditPortfolioForm(data?.title)}
            className={iconContainerClass}
          >
            <FileOpenOutlined
              style={iconStyle}
              className="pointer-events-none"
            />
          </div>
        </Tooltip>
        <Tooltip title="Download">
          <div onClick={() => showDrop(true)} className={iconContainerClass}>
            <FileDownloadOutlined
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
      <div className="h-full flex md:hidden  items-center  justify-center">
        <button
          className={
            iconContainerClass +
            " bg-gray-900 mr-[10px] text-white border-blue-400"
          }
        >
          <FileOpenOutlined style={{ fontSize: 20 }} />
        </button>
        <button
          className={
            iconContainerClass +
            " bg-gray-900 mr-[0px] text-white border-blue-400"
          }
        >
          <FileDownloadOutlined style={{ fontSize: 20 }} />
        </button>
      </div>
    </div>
  );
}
