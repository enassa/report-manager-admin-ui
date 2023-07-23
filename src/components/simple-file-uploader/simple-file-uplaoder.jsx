// import React from "react";

// export default function TSimpleFileUplaoder() {
//   return (
//     <div className="w-full h-full flex items-center justify-center">
//       <div className="border-2 border-dashed border-blue-400 w-[200px] h-[200px]"></div>
//     </div>
//   );
// }
import { FileUploadOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useEffect } from "react";

export default function TSimpleFileUplaoder({
  type,
  name,
  onChange,
  errorMessage,
  placeholder,
  value,
  description,
  styles,
  className,
  required = false,
  disabled = false,
  children,
  label,
  multiple,
  noBorder,
  outerClassName,
  accept = [],
}) {
  const [error, setError] = useState(false);
  const [selectedFiles, setFiles] = useState();
  const inputFile = React.createRef();
  console.count("cpmponent");
  const errorClass = "text-red-400 text-xs mt-1 ";

  useEffect(() => {
    // console.log(selectedFiles);
  }, [selectedFiles?.length]);

  const processFiles = (e) => {
    // onChange && onChange(e);
    console.count("processFiles files");
    console.log(e.target.files);
    // if (!selectedFiles) {
    // setFiles(e.target.files);
    // }
  };

  const browseFiles = (e) => {
    console.count("browse files");
    let reportInput = inputFile.current;
    reportInput.click();
  };

  const handleBrowseClick = () => {
    !disabled && browseFiles();
  };

  const ejectFiles = () => {
    console.log(selectedFiles);
    const allFiles = [];
    // console.log(selectedFiles);
    for (let i = 0; i < selectedFiles?.length; i++) {
      allFiles.push({
        name: selectedFiles[i].name,
        size: selectedFiles[i].size,
      });
    }
    // console.log(allFiles);
    return allFiles.map((file, index) => {
      return (
        <div
          key={`${index}-file`}
          className="flex items-center w-full h-[50px] min-h-[40px] shadow-md mb-2 bg-white px-2"
        >
          <span className="w-[80%] whitespace-nowrap text-ellipsis overflow-hidden text-xs">
            {file.name}
          </span>
        </div>
      );
    });
  };

  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center relative ${outerClassName}`}
    >
      {selectedFiles?.length ? (
        <div className="w-[80%] h-[80%] overflow-scroll flex items-center rounded-md flex-col bg-gray-50 p-2">
          {ejectFiles()}
        </div>
      ) : (
        <div
          onClick={() => {
            handleBrowseClick();
          }}
          className="border-4 border-dashed cursor-pointer border-blue-200 w-[80%] h-[80%] flex justify-center items-center rounded-md flex-col"
        >
          <FileUploadOutlined
            style={{ fontSize: 100 }}
            className="text-3xl text-blue-400"
          />
          <span>
            Drop file here or{" "}
            <b className="text-blue-400 cursor-pointer">browse</b>{" "}
          </span>
          {/* <div className="w-[80%] h-[80%] overflow-scroll flex items-center rounded-md flex-col bg-gray-50 p-2">
            {ejectFiles()}
          </div> */}
        </div>
      )}

      <div
        className={` ${className} ${
          disabled && "bg-gray-100"
        } h-[40px] hidden bg-red-400  flex-row items-center  w-full border-[#8b8b8b] border-[1px] rounded-[5px] outline-none cursor-pointer`}
      >
        <input
          type="file"
          multiple={multiple}
          accept={`${accept.join(",")}`}
          className="flex"
          ref={inputFile}
          onFocusCapture={() => {}}
          onChange={(e) => processFiles(e)}
          placeholder={placeholder}
          name={name}
          value={"" || ""}
          disabled={disabled}
          id={name}
        />
      </div>
      {description && <span className={errorClass}>{description}</span>}

      <span className={`${errorClass}`}>
        {error && `${name || "This field"} is required`}
      </span>
    </div>
  );
}
