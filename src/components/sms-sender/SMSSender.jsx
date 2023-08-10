import React, { useEffect, useState } from "react";
import TSelector from "../input-selector/Selector";
import TButton from "../button/Button";
import { Send, Sms } from "@mui/icons-material";

export default function SMSSender() {
  const ejectFields = () => {
    const allFields = ["Name", "Age", "Residency Status"];
    return allFields.map((item, index) => {
      return <option key={index}>{item}</option>;
    });
  };
  const textAreaRef = React.useRef();
  const formatedTextHolder = React.useRef();
  const [messageState, setMessageState] = useState({
    message: "",
    placeholders: [],
    contactAddress: "",
    messageObj: {},
    messageArray: {},
  });

  const processFormatedText = (textValue) => {
    const allTextArr = textValue.split(" ");
    const formtatedContent = allTextArr
      .map((word, index) => {
        if (word.startsWith("@")) {
          return `<span style="color:blue" className="text-blue-500">${word}</span>`;
        } else {
          return word;
        }
      })
      .join(" ");
    formatedTextHolder.current.innerHTML = formtatedContent;
    // formatedTextHolder.current?.select();
  };

  useEffect(() => {
    processFormatedText(messageState.message);
  }, [messageState]);

  const handleTextInput = (textValue) => {
    setMessageState({ ...messageState, message: textValue });
  };

  const handleSelection = (event) => {
    // function getInputSelection(elem){
    const selection = window.getSelection();
    console.log(selection.anchorOffset, selection.extentOffset);
    console.log(window.getSelection());

    const elem = event.target;
    if (typeof elem != "undefined") {
      let start = elem.selectionStart;
      let end = elem.selectionEnd;
      // console.log(start, end, elem.value?.substring(start, end));
      // return elem.value.substring(start, end);
    } else {
      return "";
    }
    // }
    // console.log(textValue);
  };

  const synchronizeScroll = () => {};
  // contentTextarea.addEventListener("input", () => {
  //   const content = contentTextarea.value;
  //   const words = content.split(/\s+/);

  //   const formattedContent = words
  //     .map((word) => {
  //       if (word.startsWith("@")) {
  //         return <span className="highlight">${word}</span>;
  //       } else {
  //         return word;
  //       }
  //     })
  //     .join(" ");

  //   contentTextarea.innerHTML = formattedContent;
  // });
  return (
    <div className="w-full h-full flex flex-col bg-blue-50 p-4">
      <div className="w-full h-full flex flex-col justify-start bg-white shadow-md rounded-md relative">
        <div className="min-h-[100px] h-[100px] w-full flex bg-white items-center">
          <div className="flex items-center px-4 whitespace-nowrap">
            <span>Adress Field: </span>
            <TSelector
              onChange={(selectedAdmissionDate) => {}}
              placeholder="Select Contact Field"
              label=""
              name="year"
              className="bg-[#F5F7F9] border-0 flex "
              outerClassName=" ml-2 w-[80%]"
            >
              {ejectFields()}
            </TSelector>
          </div>
        </div>
        <div className="w-full flex h-[calc(100%-100px)] bg-gray-50 p-4">
          <textarea
            ref={textAreaRef}
            value={messageState.message}
            onInput={(e) => {
              handleTextInput(e.target.value);
            }}
            placeholder="Enter sms here..."
            className="w-1/2 h-full flex items-center text- bg-gray-400 border-0 outline-none"
          ></textarea>
          <pre
            // onMouseUp={(e) => {
            //   // console.log(e);
            //   handleSelection(e);
            // }}
            ref={formatedTextHolder}
            className="w-1/2 h-full bg-red-200 text-start"
          ></pre>
        </div>
        <div className="w-full flex justify-end px-8 absolute bottom-4 pointer-events-none">
          <TButton
            styles={{
              backgroundColor: `${false ? "bg-gray-400" : "#385064"}`,
            }}
            className={`max-mt-[40px] mt-[5%] w-[100px] max-w-[150px] pointer-events-auto`}
            icon={<Sms />}
          >
            Send SMS
          </TButton>
        </div>
      </div>
    </div>
  );
}
