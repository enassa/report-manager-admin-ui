import {
  Delete,
  DescriptionOutlined,
  FileUploadOutlined,
  LibraryAddOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useEffect } from "react";
import TButton from "../button/Button";
import { isOfFileType } from "../../constants/reusable-functions";
import { images } from "../../assets/images/images";

export default function SMSFIleUploader({
  name,
  placeholder,
  description,
  className,
  disabled = false,
  multiple,
  outerClassName,
  filesAccepted = [],
  buttonIcon,
  buttonText = "Submit",
  handleButtonClick,
  hideButton,
  onChange,
  hideFileSize,
}) {
  const [selectedFiles, setFiles] = useState();
  const [key, setKey] = useState(Date.now());
  // Array(100).fill({ name: "Name", size: 200 })
  const inputFile = React.createRef();

  useEffect(() => {}, [selectedFiles?.length]);

  const processFiles = (e) => {
    onChange && onChange(Array.from(e.target.files));
    setFiles(Array.from(e.target.files));
    console.log(e.target);
  };

  const browseFiles = () => {
    setFiles([]);
    let reportInput = inputFile.current;
    reportInput.click();
  };

  const handleBrowseClick = () => {
    !disabled && browseFiles();
  };
  const handleFilesDrop = (ev) => {
    ev.preventDefault();
    const arrayFromFiles = Array.from(ev.dataTransfer.files)?.filter((file) =>
      isOfFileType(file.name, filesAccepted)
    );
    onChange && onChange(arrayFromFiles);
    setFiles(Array.from(arrayFromFiles));
  };

  function convertFileSize(fileSizeInBytes) {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;

    if (fileSizeInBytes >= megabyte) {
      return `${(fileSizeInBytes / megabyte).toFixed(2)} MB`;
    } else if (fileSizeInBytes >= kilobyte) {
      return `${(fileSizeInBytes / kilobyte).toFixed(2)} KB`;
    } else {
      return `${fileSizeInBytes} bytes`;
    }
  }

  const ejectFiles = () => {
    const allFiles = [];
    for (let i = 0; i < selectedFiles?.length; i++) {
      allFiles.push({
        name: selectedFiles[i].name,
        size: selectedFiles[i].size,
      });
    }
    return allFiles.map((file, index) => {
      if (index >= 20) return;
      return (
        <div
          key={`${index}-file`}
          className="flex items-center justify-between animate-rise w-full h-[50px] min-h-[40px] shadow-sm mb-2 bg-white px-2"
        >
          <div className="w-full h-full flex items-center">
            <DescriptionOutlined />
            <span className="w-[80%] text-left  ml-1 whitespace-nowrap text-ellipsis overflow-hidden text-xs">
              {file.name}
            </span>
          </div>
          {!hideFileSize && (
            <div className="w-[60px] h-[30px]  flex rounded-full justify-center items-center text-xs overflow-hidden">
              <span className="text-blue-600 text-sm">
                {convertFileSize(file.size || 0)}
              </span>
            </div>
          )}
        </div>
      );
    });
  };
  return (
    <div
      className={`w-full h-full flex flex-col justify-start items-center relative ${outerClassName}`}
    >
      {selectedFiles?.length ? (
        <div className="w-full h-full justify-between overflow-hidden flex flex-col p-4 relative">
          <div className="w-full h-[30px]  text-red-500 justify-end flex mb-2   bg-[#F9FAFB] ">
            <button
              onClick={(e) => {
                inputFile.current.value = null;
                inputFile.current.file = null;
                onChange && onChange(undefined);

                // setKey(Date.now());
                e.preventDefault();

                // document.getElementById(name).value = "";
                setFiles([]);
              }}
              className="max-w-[100px] bg-transparent text-red-500"
            >
              <Delete />
              Clear All
            </button>
          </div>
          <div className="w-full overflow-y-auto overflow-x-hidden flex items-center rounded-md flex-col h-[calc(100%-80px)]">
            {ejectFiles()}
          </div>

          <div className="w-full text-violet-500 h-auto items-center justify-between flex sticky top-0 bg-[#F9FAFB] ">
            <div className="w-full flex justify-start">
              <span className="mr-4">
                <LibraryAddOutlined />
                Total:
                {selectedFiles.length}
              </span>

              {selectedFiles.length - 20 > 0 && (
                <span className="mr-2">
                  <LibraryAddOutlined />
                  {selectedFiles.length - 20}
                </span>
              )}
            </div>
            {!hideButton && (
              <div className="w-[100px] h-[30px]">
                <TButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleButtonClick && handleButtonClick(selectedFiles);
                  }}
                  className="w-auto ma-x-h-[10px]"
                >
                  {buttonIcon}
                  {buttonText}
                </TButton>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div
            onClick={() => {
              handleBrowseClick();
            }}
            draggable={true}
            onDrop={(e) => {
              e.preventDefault();
              handleFilesDrop(e);
            }}
            // ondragOver="dragOverHandler(event)"
            onDragOver={(e) => {
              e.preventDefault();
              // handleFilesDrop(e);
            }}
            className="border-4  cursor-pointer animate-rise shadow-md bg-gray-50 border-white w-full h-full flex justify-center items-center rounded-md flex-col"
          >
            <img src={images.excelFile} className="h-[30%]" />
            <span className="text-xl">
              Drop excel file here or click to{" "}
              <b className="text-blue-900 cursor-pointer">browse</b>{" "}
            </span>
          </div>
        </div>
      )}

      <div
        className={` ${className} ${
          disabled && "bg-gray-100"
        } h-[40px] hidden bg-red-400  flex-row items-center  w-full border-[#8b8b8b] border-[1px] rounded-[5px] outline-none cursor-pointer`}
      >
        <input
          key={key}
          type="file"
          multiple={multiple}
          accept={`${filesAccepted.join(",")}`}
          className="flex"
          ref={inputFile}
          onFocusCapture={() => {}}
          onChange={(e) => processFiles(e)}
          onInput={(e) => {
            console.log(e.target);
          }}
          placeholder={placeholder}
          name={name}
          value={""}
          disabled={disabled}
          id={name}
        />
      </div>
      {/* {description && <span className={errorClass}>{description}</span>} */}
      {/* 
        <span className={`${errorClass}`}>
          {error && `${name || "This field"} is required`}
        </span> */}
    </div>
  );
}
