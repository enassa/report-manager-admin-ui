import React, { useState } from "react";
import { ClearAll, FileUploadOutlined, Visibility } from "@mui/icons-material";
import TButton from "../../components/button/Button";
import DynamicTable from "../../components/dynamic-table/DynamicTable";
import { useStudentDataService } from "./../../store/slices/students-slice/student-service";
import AppGrid from "../../components/app-grid/AppGrid";
import TSimpleFileUplaoder from "../../components/simple-file-uploader/simple-file-uplaoder";
import * as XLSX from "xlsx";
import SMSGrid from "./SMSGrid";
import SMSFIleUploader from "./SMSFIleUploader";
import { useSMS } from "./SMSHook";

export default function ExcelEntryMethod({ handleUploadClick }) {
  const { excelDataState, setExcelDataState } = useSMS();
  useStudentDataService();
  const extraColumns = [{ field: "Contacts" }];

  const [activeSheet, setActiveWorksheet] = useState("");

  const [allDataObj, setallData] = useState({});
  const processExeclFiles = (chosenFile) => {
    if (chosenFile) {
      const reader = new FileReader();
      let gridData = {};
      let allGridData = [];
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
          //   Add workbook name to columns
          const columNamesArr = ["Workbook", ...unprocessedDataInWorkBook[0]];

          // Make collumn names for each workbook for grid
          const workBookColumns = make_cols(columNamesArr);

          // Convert workbook json in array of array format to array of Object
          const rowData = [];
          unprocessedDataInWorkBook.map((row, index) => {
            if (index === 0) return; //ignore first column
            const rowObj = {};
            // Add sheetname to row
            const modifiedRow = [sheetName, ...row];
            // Convert row array to obj
            for (let i = 0; i <= modifiedRow.length; i++) {
              rowObj[columNamesArr[i]] = modifiedRow[i];
            }
            // Add to
            rowData.push(rowObj);
            allGridData.push(rowObj);
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
          gridData: {},
          allGridData,
        });
      };
      reader.readAsArrayBuffer(chosenFile);
    }
  };

  const changeWorSheet = (item) => {
    setActiveWorksheet(item);
  };

  const [selectedSheets, setSelectedSheet] = useState([]);

  const selectSheet = (item) => {
    const { workBookNames } = excelDataState;
    if (item === "All") {
      console.log(selectedSheets.length, workBookNames.length);
      if (selectedSheets.length === workBookNames.length) {
        setSelectedSheet([""]);
        return;
      }
      setSelectedSheet(workBookNames);
      return;
    }
    const isAlreadySelected = selectedSheets.find((sheet) => sheet === item);
    if (isAlreadySelected) {
      const newArr = selectedSheets.filter((sheet) => sheet !== item);
      setSelectedSheet([...newArr]);
      return;
    }
    setSelectedSheet([item, ...selectedSheets]);
  };

  const { workBookNames } = excelDataState;
  const ejectWorkBooks = () => {
    return (
      workBookNames &&
      workBookNames.map((item, index) => {
        return (
          <label
            key={index}
            className={`h-[50px] min-h-[50px] w-full flex items-center justify-start flex-row pl-2 border-l-4 cursor-pointer ${
              activeSheet === item ? "border-l-bgTrade bg-white" : ""
            } `}
            htmlFor={`workbook-label-${index}`}
          >
            <input
              id={`workbook-label-${index}`}
              type="checkbox"
              name="workbooks"
              checked={selectedSheets.includes(item)}
              onChange={() => {
                changeWorSheet(item);
                selectSheet(item);
              }}
            />
            {/* <div className="h-full w-full flex justify-center items-center ">
            {item.icon}
          </div> */}
            <div className="w-full flex justify-start px-2 ">
              {activeSheet === item ? (
                <Visibility className="text-blue-500" />
              ) : null}
              <span className="whitespace-nowrap ml-1 w-full text-start text-ellipsis overflow-hidden">
                {item}
              </span>
            </div>
          </label>
        );
      })
    );
  };

  const ejectTable = () => {
    const { workBook, gridColumns, gridData, allGridData } = excelDataState;
    let selectedSheet = activeSheet || workBookNames[0];

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
    return <SMSGrid colDef={[]} tableData={excelDataState.allGridData} />;
    // return <DynamicTable tableData={excelDataState.gridData[selectedSheet]} />;
  };
  return (
    <div className="w-full h-full flex flex-col  overflow-hidden">
      {/* <div className="w-full h-full p-2 flex  overflow-hidden bg-white border-2 border-white shadow-md rounded-md"> */}
      <div className="w-full h-full  flex  overflow-hidden bg-white ">
        {excelDataState?.showDataPreview ? (
          <div className="w-full h-full">{ejectTable()}</div>
        ) : (
          <SMSFIleUploader
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
      </div>
    </div>
  );
}
