import React, { useState } from "react";
import { ClearAll, FileUploadOutlined } from "@mui/icons-material";
import TButton from "../../components/button/Button";
import { useStudentDataService } from "./../../store/slices/students-slice/student-service";
import AppGrid from "../../components/app-grid/AppGrid";
import TSimpleFileUplaoder from "../../components/simple-file-uploader/simple-file-uplaoder";
import * as XLSX from "xlsx";

export default function BulkDataUpload({ handleUploadClick }) {
  const staticCcolumns = [
    {
      field: "Name",
    },
    {
      field: "Unique ID",
    },
    {
      field: "Gender",
    },
    {
      field: "Residential Status",
    },
    {
      field: "Index",
    },
    {
      field: "Track",
    },
    {
      field: "JHS No.",
    },
    {
      field: "Class Stream",
    },
    // { field: "Contact",},
  ];
  const defaultClassName = `class_of_${new Date().getFullYear() + 1}`;
  useStudentDataService();
  const extraColumns = [{ field: "Contacts" }];

  const [selectedWorkSheet, setSelectWorksheet] = useState("");
  const [excelDataState, setExcelDataState] = useState({
    workBookNames: [],
    workBook: [],
    showDataPreview: false,
    file: "",
    gridColumns: [],
    gridData: [],
  });
  const [allDataObj, setallData] = useState({});
  const processExeclFiles = (chosenFile) => {
    if (chosenFile) {
      const reader = new FileReader();
      let gridData = {};
      let gridColumns = {};

      const make_cols = (arr) => {
        return [arr.map((colName, index) => ({ field: colName }))];
      };
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheets = workbook.Sheets;

        // Process each work book and convert it to array of objects
        workbook.SheetNames.map((sheetName, index) => {
          // Returns sheet obj in array of arrays, so we need to change it
          const unprocessedDataInWorkBook = XLSX.utils.sheet_to_json(
            sheets[sheetName],
            {
              header: 1,
            }
          );
          const columNamesArr = unprocessedDataInWorkBook[0];

          // Make collumn names for each workbook for grid
          const workBookColumns = make_cols(columNamesArr);

          // Convert workbook json in array of array format to array of Object
          const rowData = [];
          unprocessedDataInWorkBook.map((row, index) => {
            if (index === 0) return; //ignore first column
            const rowObj = {};

            // convert row array to obj
            for (let i = 0; i <= row.length; i++) {
              rowObj[columNamesArr[i]] = row[i];
            }
            // Add to
            rowData.push(rowObj);
          });

          // Record the sheet name and corresponding data in array of objects format and also columns
          gridData[sheetName] = rowData;
          gridColumns[sheetName] = workBookColumns;
        });

        setExcelDataState({
          workBookNames: workbook.SheetNames,
          workBook: gridData,
          showDataPreview: true,
          file: chosenFile,
          gridColumns,
          gridData,
        });
      };
      reader.readAsArrayBuffer(chosenFile);
    }
  };
  const changeWorSheet = (item) => {
    setSelectWorksheet(item);
  };
  const ejectWorkBooks = () => {
    const { workBookNames } = excelDataState;
    return (
      workBookNames &&
      workBookNames.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              changeWorSheet(item);
            }}
            className={`h-[50px] min-h-[50px] w-full flex items-start justify-center flex-col border-l-4 cursor-pointer ${
              selectedWorkSheet === item ? "border-l-bgTrade bg-white" : ""
            } `}
          >
            {/* <div className="h-full w-full flex justify-center items-center ">
            {item.icon}
          </div> */}
            <span className="w-full flex justify-start px-2 whitespace-nowrap text-ellipsis overflow-hidden">
              {item}
            </span>
          </div>
        );
      })
    );
  };

  const ejectTable = () => {
    const { workBook, gridColumns, gridData, workBookNames } = excelDataState;
    let selectedSheet = selectedWorkSheet || workBookNames[0];

    const colcolDef = excelDataState.gridColumns[selectedSheet];
    // if (selectedSheet === undefined) return;
    // const data = XLSX.utils.sheet_to_json(selectedSheet, { header: 1 });

    // /* generate an array of column objects */

    // const allFields = data[0];
    // const make_cols = (refstr) => {
    //   return allFields.map((colName, index) => ({ field: colName }));
    // };
    // let columns = make_cols(selectedSheet["!ref"]);
    // const rowData = [];

    // data.map((row, index) => {
    //   if (index === 0) return; //ignore first column
    //   const rowObj = {};
    //   for (let i = 0; i <= row.length; i++) {
    //     rowObj[allFields[i]] = row[i];
    //   }
    //   rowData.push(rowObj);
    // });
    console.log(gridData, staticCcolumns);
    return (
      <AppGrid
        colDef={staticCcolumns}
        tableData={excelDataState.gridData[selectedSheet]}
      />
    );
  };
  return (
    <div className="w-full h-full flex flex-col  overflow-hidden">
      <div className="w-full h-full p-2 flex  overflow-hidden">
        {excelDataState?.showDataPreview ? (
          <div className="w-full h-full">{ejectTable()}</div>
        ) : (
          <TSimpleFileUplaoder
            onChange={(selectedExcelFiles) => {
              processExeclFiles(selectedExcelFiles[0]);
            }}
            placeholder="Select semester"
            label=""
            name="reportFile"
            className="bg-[#F5F7F9] border-0 flex "
            multiple={false}
            filesAccepted={[".xlsx", "xls"]}
            buttonIcon={<FileUploadOutlined />}
            buttonText="Upload"
            hideButton={true}
          />
        )}

        {excelDataState?.showDataPreview && (
          <div className="w-[300px] h-full flex">
            <div className="w-[300px] h-full flex justify-between  flex-col">
              {/* <div className="w-full h-full flex justify-start"></div> */}
              <div className="w-full h-[calc(100%-45px)] max-w-[100%] max-h-[100%] overflow-y-auto pl-2 ">
                {ejectWorkBooks()}
              </div>
              <div className="w-full justify-center h-[30px] flex">
                <TButton
                  onClick={() => {
                    setExcelDataState({
                      workBookNames: [],
                      workBook: "",
                      showDataPreview: false,
                      file: "",
                    });
                  }}
                  iconColor={"white"}
                  className="w-auto rounded-none  bg-red-400 border-0"
                >
                  <ClearAll />
                  Close
                </TButton>
                <TButton
                  onClick={() => {
                    handleUploadClick &&
                      handleUploadClick(excelDataState.gridData);
                  }}
                  className="w-auto  rounded-none border-0"
                >
                  <FileUploadOutlined />
                  Upload
                </TButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
