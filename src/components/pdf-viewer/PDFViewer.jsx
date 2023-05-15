import React, { useState } from "react";

import {
  ArrowBack,
  ArrowForward,
  ArrowLeft,
  ArrowRight,
  Close,
  Download,
} from "@mui/icons-material";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PDFViewer = ({ handleClose, handleDownload, fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleNextClick = () => {
    if (numPages === null) return;
    if (pageNumber < numPages) {
      setPageNumber((prev) => prev + 1);
    }
  };
  const handlePrevClick = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full text-bgTrade fixed top-0  z-[9999999] right-0 h-full bg-[rgb(0,0,0,0.5)] flex justify-center items-center">
      <div className="w-[90%] overflow-hidden p-1 rounded-md  h-[90%] flex-col bg-white flex justify-between items-center">
        <div className="w-full flex justify-end">
          <span
            onClick={handleClose}
            className="min-h-[40px] cursor-pointer min-w-[40px] max-h-[40px] max-w-[40px]  rounded-full flex justify-center items-center"
          >
            <Close className="pointer-events-none" />
          </span>
        </div>
        <div className="w-full  overflow-scroll  flex h-full max-h-full  justify-center">
          <Document
            className={
              "w-full sm:justify-center flex justify-start  h-full  md:justify-center"
            }
            file={fileUrl}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              // height={
              //   document.getElementsByClassName("PdfDiv")[0]?.clientHeight *
              //     0.8 ?? 150
              // }
              renderTextLayer={false}
              pageNumber={pageNumber}
            />
          </Document>
        </div>
        <div className="h-[50px]  bg-gray-200 p-2 mt-2 w-full flex justify-between">
          <span className="w-full  flex justify-start items-center">
            <span className="mr-2">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => {
                handlePrevClick();
              }}
              className="outline-none bg-transparent
            "
            >
              <ArrowLeft
                className="pointer-events-none"
                style={{ fontSize: 32 }}
              />
            </button>
            <button
              onClick={() => {
                handleNextClick();
              }}
              className="outline-none bg-transparent
            "
            >
              <ArrowRight
                className="pointer-events-none"
                style={{ fontSize: 32 }}
              />
            </button>
          </span>
          <button
            onClick={handleDownload}
            className="flex justify-center items-center px-2 bg-bgTrade text-white rounded-md"
          >
            <Download />
            {/* <span className="ml-1 text-sm">Download</span> */}
          </button>
        </div>
      </div>
    </div>
  );
};
