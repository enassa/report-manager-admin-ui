import React from "react";
import { FileUploadOutlined } from "@mui/icons-material";
import TSimpleFileUplaoder from "../../components/simple-file-uploader/simple-file-uplaoder";

export default function BulkReportsUpload({ handleReportUpload }) {
  const handleSubmit = (data) => {
    if (data) {
      handleReportUpload(data);
    } else {
      alert("Please select files");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <TSimpleFileUplaoder
        onChange={(selectedAdmissionDate) => {}}
        placeholder="Select semester"
        label=""
        name="reportFile"
        className="bg-[#F5F7F9] border-0 flex "
        multiple={true}
        buttonIcon={<FileUploadOutlined />}
        buttonText="Upload"
        filesAccepted={[".pdf"]}
        handleButtonClick={(reportFiles) => {
          handleSubmit(reportFiles);
        }}
      />
    </div>
  );
}
