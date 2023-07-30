import { FileDownloadOutlined, FileOpenOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { usePaymentService } from "../../store/slices/payment/payement-service";
import { useReportService } from "../../store/slices/report-slice/report-service";
import { useAuthService } from "../../store/slices/auth-slice/auth-service";

export default function ReportCard({ data, allData, handleOpenFileClick }) {
  const { Unique_Id, FormNumber, Semester, File_Name, _id, Graduation_Year } =
    allData;

  const { setActiveReport } = usePaymentService();
  const { downloadReportAsync, isfileInCache } = useReportService();
  const { userData } = useAuthService();
  const [newOpen, setNewOpen] = useState(false);
  const [drop, showDrop] = useState(true);

  const handleClick = () => {
    // if (allData.Locked && !isfileInCache(data.File_Name)) {
    //   saveObjectInLocalStorage(LOCAL_STORAGE_KEYS.activeReport, {
    //     ...allData,
    //     ActivityDesc: `Payment for report ${allData.Unique_Id} F${allData.FormNumber} S${allData.Semester}`,
    //   });
    //   setActiveReport(allData);
    //   return;
    // }
    downloadReportAsync(
      {
        Unique_Id,
        Semester,
        FormNumber,
        File_Name,
        Graduation_Year,
        ReportId: _id,
        ...userData,
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
    setNewOpen(false);
    handleOpenFileClick(data);
  };

  const iconContainerClass =
    "md:mr-[20px] relative mr-2 cursor-pointer rounded-full  text-bgTrade hover:bg-bgTrade hover:text-white  transition-all duration-100 md:min-h-[40px] min-w-[20px] w-[20px] h-[20px] w-[20px] flex justify-center items-center";
  const iconStyle = { fontSize: "1em" };
  const newOpenClass = newOpen
    ? " bg-bgTrade text-white  animate-bgChange duration-100"
    : "";

  return (
    <div className="w-full min-h-[60px] bg-white h-[60px] shadow-sm flex items-center  justify-between   mb-[1px]  rounded-sm p-[10px]">
      <div className="w-full h-full flex items-center cursor-pointer ">
        <span className="ml-3 text-xs ">Year {data?.year}</span>
        <span className="ml-3 text-xs ">Semester {data?.semester}</span>
      </div>
      <div className="w-full cursor-pointer h-full md:flex items-center justify-end relative ">
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
            <FileDownloadOutlined
              style={iconStyle}
              className=" text-[10px!important] w-[5px] h-[5px]"
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
