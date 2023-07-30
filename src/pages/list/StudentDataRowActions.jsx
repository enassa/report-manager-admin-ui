import { ReadMore } from "@mui/icons-material";
import React, { useCallback } from "react";
import { useStudentDataService } from "../../store/slices/students-slice/student-service";

export default (props) => {
  const { setActiveStudentAsync, activeStudent } = useStudentDataService();

  const buttonClicked = useCallback((event) => {
    setActiveStudentAsync(props.data);
    console.log(props);
    // console.log("cellClicked", event);
  }, []);

  return !!props?.data ? (
    <div
      className={`w-full h-full items-center flex justify-center ${
        activeStudent?.Unique_Id === props?.data?.Unique_Id
          ? "bg--400 text"
          : ""
      }`}
    >
      {/* <span>{cellValue}</span>&nbsp; */}
      {/* <button onClick={() => buttonClicked()}>
        <Details />
      </button> */}

      {/* <button
        className="mr-4 rounded-full text-gray-600 bg-gray-0 flex justify-center items-center max-w-[30px] max-h-[30px]  min-w-[30px] min-h-[30px]"
        onClick={(e) => {
          e.stopPropagation();
          buttonClicked();
        }}
      >
        <FileUploadOutlined className="" />
      </button>
      <button
        className="mr-4 rounded-full text-gray-600 bg-gray-0 flex justify-center items-center max-w-[30px] max-h-[30px]  min-w-[30px] min-h-[30px]"
        onClick={(e) => {
          e.stopPropagation();
          buttonClicked();
        }}
      >
        <FileDownloadOutlined className="" />
      </button> */}
      <button
        className={`  ${
          activeStudent?.Unique_Id === props?.data?.Unique_Id
            ? "bg-blue-400 text-white"
            : ""
        } rounded-full text-gray-600  flex justify-center items-center max-w-[30px] max-h-[30px]  min-w-[30px] min-h-[30px]`}
        onClick={(e) => {
          e.stopPropagation();
          buttonClicked();
        }}
      >
        <ReadMore className="" />
      </button>
      {/* <button onClick={() => buttonClicked()}>
        <MoreVert />
      </button> */}
    </div>
  ) : null;
};
