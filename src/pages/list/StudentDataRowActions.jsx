import {
  Article,
  CloudDownloadOutlined,
  Details,
  Download,
  DownloadDoneOutlined,
  DownloadOutlined,
  FileDownload,
  FileDownloadOutlined,
  FileUpload,
  FileUploadOutlined,
  MoreVert,
  OpenInFull,
  ReadMore,
  Upload,
  UploadFile,
  UploadOutlined,
  ViewAgenda,
  Visibility,
} from "@mui/icons-material";
import React from "react";
import { useStudentDataService } from "../../store/slices/students-slice/student-service";

const StudentDataRowActions = (props) => {
  const { setActiveStudentAsync } = useStudentDataService();

  const buttonClicked = () => {
    // alert(`${cellValue} medals won!`);
    setActiveStudentAsync(props.data);
    console.log(props);
  };

  return (
    <div className="w-full h-full flex justify-center">
      {/* <span>{cellValue}</span>&nbsp; */}
      {/* <button onClick={() => buttonClicked()}>
        <Details />
      </button> */}

      <button
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
      </button>
      <button
        className="mr-4 rounded-full text-gray-600  flex justify-center items-center max-w-[30px] max-h-[30px]  min-w-[30px] min-h-[30px]"
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
  );
};
export default StudentDataRowActions;
