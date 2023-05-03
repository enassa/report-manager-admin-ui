import { Close, Search, Upload } from "@mui/icons-material";
import React, { Component } from "react";
import * as XLSX from "xlsx";
import SheetJSApp from "./ExcelManager";
import axios from "axios";
export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDataPreview: false,
      uploadedFiles: [],
      workBook: [],
      hoveredWorkSheet: "",
      selectedWorkSheet: "",
      workBookNames: [],
      activeCellName: "",
      activeCellValue: "",
      workBook: [],
      file: "",
      reportCards: undefined,
      fileName: "",
      yearClass: "",
      browseFileAttempt: false,
      uploadClass: "",
      uploadProgramme: "",
      uploadClicked: false,
    };
    this.inputRefExcel = React.createRef();
    this.inputReportFile = React.createRef();
  }

  // const worksheet = workbook.Sheets[sheetName];
  //             const json = XLSX.utils.sheet_to_json(worksheet);
  //             console.log(json);
  uploadStudentData = () => {
    // alert('hello')
    var formData = new FormData();
    // console.log(this.state.file)
    // var excelFile = this.inputRefExcel;
    formData.append(
      "extraInfo",
      JSON.stringify({
        className: this.state.uploadClass.toLowerCase(),
        schoolName: "Achimota secondary".replace(/ /g, "_"),
        schoolCode: "0010110",
      })
    );
    formData.append("file", this.state.file);
    axios
      .post("http://localhost:3032/api/students", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  processReportFiles = (e) => {
    this.setState({ reportCards: e.target.files });
  };
  uploadReportCards = () => {
    console.log(this.state.reportCards);
    // alert("");
    // alert('hello')
    // return;
    var formData = new FormData();
    // console.log(this.state.file)
    // var excelFile = this.inputRefExcel;
    formData.append(
      "extraInfo",
      JSON.stringify({
        className: this.state.uploadClass.toLowerCase(),
        schoolName: "Achimota secondary".replace(/ /g, "_"),
        schoolCode: "0010110",
        semester: 1,
        formNumber: 2,
      })
    );
    for (let i = 0; i < this.state.reportCards.length; i++) {
      formData.append("files", this.state.reportCards[i]);
    }
    // formData.append("file", this.state.reportCards);
    axios
      .post("http://localhost:3032/api/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  processExeclFiles = (e) => {
    this.setState({ file: e.target.files[0] });
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        this.setState({
          workBookNames: workbook.SheetNames,
          workBook: workbook,
          showDataPreview: true,
          fileName: e.target,
        });
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  processReportSheets = (e) => {};
  browseReportFiles = (e) => {
    let reportInput = this.inputReportFile.current;
    reportInput.click();
  };
  browseExcelFile = (e) => {
    if (this.state.uploadClass === "") {
      this.setState({ uploadClicked: true });
      alert("Please enter a class for the upload");
      return;
    }
    this.setState({ uploadClicked: false });
    let excelInput = this.inputRefExcel.current;
    excelInput.click();
  };

  browseReportFile = (e) => {
    if (this.state.uploadClass === "") {
      this.setState({ uploadClicked: true });
      alert("Please enter a class for the upload");
      return;
    }
    this.setState({ uploadClicked: false });
    let excelInput = this.inputRefExcel.current;
    excelInput.click();
  };

  changeWorSheet = (item) => {
    this.setState({ selectedWorkSheet: item }, () => {
      const { workBook, selectedWorkSheet } = this.state;
      if (selectedWorkSheet === "") return;
      // console.log(workBook.Sheets[selectedWorkSheet])
    });
  };
  ejectWorkSheets = () => {
    const { workBookNames, hoveredWorkSheet, selectedWorkSheet } = this.state;
    return workBookNames.map((item, index) => {
      return (
        <div
          key={index}
          onMouseOver={() => {
            this.setState({ hoveredWorkSheet: item });
          }}
          onMouseOut={() => {
            this.setState({ hoveredWorkSheet: "" });
          }}
          onClick={() => {
            this.changeWorSheet(item);
          }}
          style={{
            backgroundColor: `${
              selectedWorkSheet === item
                ? "#1876D1"
                : hoveredWorkSheet === item
                ? "#E8E8E8"
                : ""
            }`,
            color: `${
              selectedWorkSheet === item
                ? "white"
                : hoveredWorkSheet === item
                ? ""
                : ""
            }`,
            borderBottom: "1px solid #E8E8E8",
          }}
          className="w-full pointer p-[10px] pb-[0px] justify-between items-center flex-col flex h-[50px]  min-h-[50px]"
        >
          <div
            style={{ fontSize: 12 }}
            className="w-full h-full justify-start items-center"
          >
            {item.slice(0, 25)}...
          </div>
          {/* <span style={{borderBottom:"1px solid #E8E8E8"}} className='w-full bg-blue-500'></span> */}
        </div>
      );
    });
  };
  ejectColumnNames = () => {};
  ejectRowNumbers = () => {};
  ejectTable = () => {
    const { workBook, selectedWorkSheet } = this.state;
    if (selectedWorkSheet === "") return;
    let selectedSheet = workBook.Sheets[selectedWorkSheet];
    const data = XLSX.utils.sheet_to_json(selectedSheet, { header: 1 });
    let rows = data;
    let columns = make_cols(selectedSheet["!ref"]);
    // console.log(columns); return
    /* Update state */
    return (
      <div className="table-responsive overflow-y-auto pb-[70px]">
        <table className="table table-striped">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-y-auto d-block h-[600px]">
            {rows.map((r, i) => (
              <tr key={i}>
                {columns.map((c) => (
                  <td key={c.key}>
                    <div contenteditable="true">{r[c.key]}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  getCells = () => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {this.props.cols.map((c) => (
              <th key={c.key}>{c.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map((r, i) => (
            <tr key={i}>
              {this.props.cols.map((c) => (
                <td key={c.key}>{r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  render() {
    const { showDataPreview } = this.state;
    const classes = [
      "2009",
      "2010",
      "2011",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
    ];

    return (
      <div className="h-full w-full justify-center items-center flex">
        <input
          type="file"
          onChange={(e) => {
            this.processExeclFiles(e);
          }}
          accept=".csv,.xlsx"
          className="hidden"
          ref={this.inputRefExcel}
        />
        <input
          type="file"
          onChange={(e) => {
            this.processReportFiles(e);
          }}
          multiple
          accept=".pdf"
          className="hidden"
          ref={this.inputReportFile}
        />
        {showDataPreview ? (
          <div
            style={{ backgroundColor: "rgb(0,0,0,0.8)" }}
            className="fixed flex items-center z-[90000] h-full w-full top-0 left-0 justify-center"
          >
            <div
              style={{ backgroundColor: "white" }}
              className="z-[90000] w-[80%] overflow-hidden rounded-md h-[80%] top-0 left-0"
            >
              <div
                style={{ backgroundColor: "aliceblue" }}
                className="w-full items-center pl-[10px] h-[50px] justify-between flex"
              >
                <div className="w-1/2 h-full p-[10px] flex  justify-start items-center">
                  <Search />
                  {/* <span className="mr-[10px]">Formular:</span> */}
                  <input
                    placeholder="Search..."
                    className="w-[200px] h-full mr-[30px] ml-[10px] focus:outline-1 focus:outline-blue-600 rounded-md border-0 px-2 py-[10px] bg-gray-200 outline-none"
                  />
                </div>
                <div className="w-full  flex justify-end items-center ">
                  <button
                    onClick={() => {
                      this.uploadStudentData();
                    }}
                    className="border-0 cursor-pointer px-3 flex items-center h-[35px] bg-blue-400 rounded-md mr-[20px] text-white"
                  >
                    <Upload />
                    <span className="ml-[5px]">Upload</span>
                  </button>
                  <Close
                    style={{ fontSize: 15 }}
                    onClick={() => {
                      this.setState({ showDataPreview: false });
                    }}
                    className="cursor-pointer mr-2"
                  />
                  {/* <div className="w-full h-[10px] min-h-[10px] bg-red-600 items-center flex">
                    <div className="w-[50%] h-[50%] bg-blue-500"></div>
                  </div> */}
                </div>
              </div>
              <div className="w-full h-full overflow-y-auto">
                {this.ejectTable()}
              </div>
            </div>
            <div
              style={{ backgroundColor: "white" }}
              className="z-[9000] ml-[30px] w-[60px]  overflow-hidden  min-w-[200px] rounded-md h-[80%] top-0 left-0"
            >
              <div
                style={{ backgroundColor: "white" }}
                className="w-full h-full pb-[70px] overflow-y-auto flex-col justify-between flex"
              >
                <div
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "aliceblue",
                  }}
                  className="w-full bg-blue-500 cursor-pointer items-center justify-center flex-col flex h-[50px] min-h-[50px]"
                >
                  <h2>Work sheets</h2>
                </div>
                {this.ejectWorkSheets()}
              </div>
            </div>
          </div>
        ) : null}
        <div className="w-[300px] h-[300px] flex-col flex bg-white shadow-md cursor-pointer items-center justify-center mr-[20px]">
          <span className="mr-[10px]">Class*</span>
          <select
            style={{
              border: `${
                this.state.uploadClass === "" && this.state.uploadClicked
                  ? "1px solid red"
                  : "1px solid transparent"
              }`,
            }}
            className="w-[50%] shadow-md mb-[20px] h-[25px] mr-[30px] rounded-md border-0 bg-white"
            onChange={(e) => {
              this.setState({ uploadClass: e.target.value });
            }}
            value={this.state.uploadClass}
          >
            {classes.map((item, index) => {
              return <option>Class_of_{item}</option>;
            })}
          </select>
          {/* <span className="mr-[10px]">Programe*</span> */}
          {/* <select
            style={{
              border: `${
                this.state.uploadClass === "" && this.state.uploadClicked
                  ? "1px solid red"
                  : "1px solid transparent"
              }`,
            }}
            className="w-[50%] shadow-md mb-[20px] h-[25px] mr-[30px] rounded-md border-0 bg-white"
            onChange={(e) => {
              this.setState({ uploadProgramme: e.target.value });
            }}
            value={this.state.uploadProgramme}
          >
            {programeOptions.map((item, index) => {
              return <option>Class_of_{item}</option>;
            })}
          </select> */}
          <input
            onClick={() => {
              this.browseExcelFile();
            }}
            value="Browse"
            type="button"
            className="w-[50%] cursor-pointer h-[25px] mr-[30px] rounded-md border-0 text-white bg-blue-500 "
          />
          <h3>Upload Student Info Excel sheet</h3>
        </div>
        <div className="w-[300px] h-[300px] flex-col flex cursor-pointer bg-white  shadow-md items-center justify-center">
          <span className="mr-[10px]">Class*</span>
          <select
            style={{
              border: `${
                this.state.uploadClass === "" && this.state.uploadClicked
                  ? "1px solid red"
                  : "1px solid transparent"
              }`,
            }}
            className="w-[50%] shadow-md mb-[20px] h-[25px] mr-[30px] rounded-md border-0 bg-white"
            onChange={(e) => {
              this.setState({ uploadClass: e.target.value });
            }}
            value={this.state.uploadClass}
          >
            {classes.map((item, index) => {
              return <option>Class_of_{item}</option>;
            })}
          </select>

          <input
            onClick={() => {
              this.browseReportFiles();
            }}
            value="Browse"
            type="button"
            className="w-[50%] cursor-pointer h-[25px] mr-[30px] rounded-md border-0 text-white bg-blue-500 "
          ></input>
          <h3>Upload Report sheets</h3>
          <button
            onClick={() => {
              this.uploadReportCards();
            }}
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
}
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

/* generate an array of column objects */
const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};
