import {
  Delete,
  FileDownloadOutlined,
  FileOpenOutlined,
  Lock,
} from "@mui/icons-material";
import { ClickAwayListener, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientPay } from "../../pages/payment/ClientPay";
import { usePaymentService } from "../../store/slices/payment/payement-service";
import { saveObjectInLocalStorage } from "../../constants/reusable-functions";
import { useReportService } from "../../store/slices/report-slice/report-service";
import { LOCAL_STORAGE_KEYS, SCHOOL_INFO } from "../../constants/ui-data";

export default function ReportCard({ data, allData, handleOpenFileClick }) {
  const { Unique_Id, FormNumber, Semester, File_Name, _id, Graduation_Year } =
    allData;

  const { setActiveReport } = usePaymentService();
  const { downloadReportAsync, isfileInCache } = useReportService();

  const [newOpen, setNewOpen] = useState(false);
  const [drop, showDrop] = useState(true);

  const handleClick = () => {
    if (allData.Locked && !isfileInCache(data.File_Name)) {
      saveObjectInLocalStorage(LOCAL_STORAGE_KEYS.activeReport, {
        ...allData,
        ActivityDesc: `Payment for report ${allData.Unique_Id} F${allData.FormNumber} S${allData.Semester}`,
      });
      setActiveReport(allData);
      return;
    }
    downloadReportAsync(
      {
        Unique_Id,
        Semester,
        FormNumber,
        File_Name,
        Graduation_Year,
        ReportId: _id,
        ...SCHOOL_INFO,
      },
      allData
    ).then(() => {
      setNewOpen(true);
      setTimeout(() => {
        setNewOpen(false);
      }, 10000);
    });
  };

  const handleOpenClick = () => {
    if (allData.Locked && isfileInCache(data.File_Name)) {
      return;
    }
    setNewOpen(false);
    handleOpenFileClick(data);
  };

  const iconContainerClass =
    "md:mr-[20px] relative mr-2 cursor-pointer rounded-full  text-bgTrade hover:bg-bgTrade hover:text-white  border-bgTrade border-2 transition-all duration-100 md:min-h-[40px] md:min-w-[40px] md:w-[40px] md:h-[40px] w-[30px] h-[30px] px-1 md:px-3 flex justify-center items-center";
  const iconStyle = { fontSize: "1em" };
  const newOpenClass = newOpen
    ? " bg-bgTrade text-white  animate-bgChange duration-100"
    : "";

  return (
    <div className="w-full md:min-h-[100px] min-h-[60px] bg-white h-[60px] md:shadow-md shadow-sm flex items-center  justify-between   mb-[1px] md:p-[20px]  md:rounded-sm p-[10px]">
      <div className="w-full h-full flex items-center cursor-pointer ">
        <div
          className={`w-[22px] h-[22px] rounded-full font-extrabold ${
            data.locked && !isfileInCache(data.File_Name)
              ? "text-red-600 border-red-600"
              : "text-bgTrade border-bgTrade"
          }  border  flex justify-center items-center`}
        >
          {data.locked && !isfileInCache(data.File_Name) ? (
            <Lock style={iconStyle} />
          ) : (
            <span>{allData.DownloadsLeft}</span>
            // <LockOpen style={iconStyle} />
          )}
        </div>

        {/* <AssessmentOutlined style={iconStyle} /> */}
        {/* <input type="checkbox" /> */}
        <span className="ml-3 text-sm md:text-xl">Year {data?.year}</span>
        <span className="ml-3 text-sm md:text-xl">
          Semester {data?.semester}
        </span>
        {/* <span>{data.count}</span> */}
      </div>
      <div className="w-full cursor-pointer h-full md:flex items-center justify-end relative hidden">
        {/* <Tooltip title="Share">
          <div
            onClick={() => navigate(ROUTES.portfolioDetail.url)}
            className={iconContainerClass}
          >
            <ShareOutlined style={iconStyle} className="" />
          </div>
        </Tooltip> */}
        {isfileInCache(data.File_Name) && (
          <Tooltip title="Open file">
            <div
              onClick={() => handleOpenClick(data?.title)}
              className={iconContainerClass + newOpenClass}
            >
              <FileOpenOutlined style={iconStyle} className="" />
            </div>
          </Tooltip>
        )}

        <Tooltip title="Download">
          <div
            onClick={() => handleClick(true)}
            className={`${iconContainerClass}  relative`}
          >
            {data.locked && !isfileInCache(data.File_Name) ? (
              <div className=" absolute top-[-4] right-[-5]">
                <ClientPay reportData={allData} />
              </div>
            ) : null}
            <FileDownloadOutlined
              style={iconStyle}
              className=" text-[10px!important] w-[5px] h-[5px]"
            />
          </div>
        </Tooltip>

        {/* {drop && (
          <ClickAwayListener onClickAway={() => showDrop(false)}>
            <div className="w-[170px] z-[20] flex flex-col  absolute bg-white top-[70px]  shadow-neuroFlat animate-rise">
              <div
                onClick={() => {
                  handleClick();
                }}
                className=" w-full h-[60px] hover:bg-gray-50 hover:text-red-400  flex items-center justify-start px-[10px]"
              >
                <Delete className="" /> <span>Close portfolio</span>
              </div>
            </div>
          </ClickAwayListener>
        )} */}
      </div>
      <div className="h-full flex md:hidden  items-center  justify-center">
        {isfileInCache(data.File_Name) && (
          <div
            onClick={(e) => {
              handleOpenClick(allData);
            }}
            className={
              iconContainerClass +
              newOpenClass +
              " mr-[10px] bg-gray-900 text-white border-blue-400 flex justify-center items-center"
            }
          >
            {data.locked && !isfileInCache(data.File_Name) ? (
              <span className=" absolute top-[-4] right-[-5]">
                <ClientPay reportData={allData} />
              </span>
            ) : null}
            <FileOpenOutlined style={{ fontSize: 20 }} />
          </div>
        )}
        <div
          onClick={(e) => {
            handleClick(allData);
          }}
          className={`${iconContainerClass}  bg-gray-900 mr-[0px] text-white border-blue-400 flex justify-center items-center `}
        >
          {data.locked && !isfileInCache(data.File_Name) ? (
            <span className=" absolute top-[-4] right-[-5]">
              <ClientPay reportData={allData} />
            </span>
          ) : null}

          <FileDownloadOutlined style={{ fontSize: 20 }} />
        </div>
      </div>
    </div>
  );
}
