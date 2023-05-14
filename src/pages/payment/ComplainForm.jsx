import { Close, Report, Send } from "@mui/icons-material";
import React, { useState } from "react";

export default function ComplainForm({
  handleClose,
  handleSubmit,
  activeTransaction,
}) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="w-full absolute flex justify-center items-center h-full  top-0 right-0 bg-[rgb(0,0,0,0.5)] z-[99999999999909999999] ">
      <div className="w-[90%] animate-rise justify-between bg-white h-[90%] flex p-3 flex-col relative">
        <div className="w-full h-[50px] flex justify-between items-center px-2">
          <span className="text-red-400 rounded-md flex justify-center items-center">
            <Report />
            <span> Complain form</span>
          </span>
          <span
            onClick={handleClose}
            className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] bg-gray-50 rounded-full flex justify-center items-center"
          >
            <Close className="pointer-events-none" />
          </span>
        </div>
        {/* <div className="w-full h-[50px] flex justify-end px-2"> */}

        {/* </div> */}
        <textarea
          className="w-full h-[300px] bg-gray-100 rouned-md p-2 focus:outline-bgTrade"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
          type="text"
          placeholder="Type compain here..."
        />
        <button
          disabled={!inputValue.length}
          onClick={() => handleSubmit(inputValue)}
          className={`${
            inputValue.length > 5 ? "bg-bgTrade" : "bg-gray-400"
          } min-h-[40px] min-w-[40px]  top-[24%] right-[20px] bg-bgTrade text-white rounded-md flex justify-center items-center`}
        >
          <Send className="mr-2" /> <span>Submit complain</span>
        </button>
      </div>
    </div>
  );
}
