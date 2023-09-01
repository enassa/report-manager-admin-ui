import React, { useEffect, useRef, useState } from "react";
import TSelector from "../input-selector/Selector";
import { Delete, Redo, Spellcheck, Undo } from "@mui/icons-material";
import {
  dynamicReplace,
  extractWordFromDelimiter,
  replaceUnderscoreWithSpace,
  setNativeValue,
} from "../../constants/reusable-functions";
import RecipientManager from "./RecipientManager";
import { SMSProvider, useSMS } from "./SMSHook";
import { images } from "../../assets/images/images";
import CursorPositionPopUp from "../cursor-position-popup/CursorPositionPopUp";
import SMSAcountBar from "./SMSAcountBar";
import SMSSalesBoard from "./SMSSalesBoard";
import SMSPreview from "./SMSPreview";

const SMSSenderMain = () => {
  const {
    activePage,
    setActivePage,
    ENTRY_METHODS,
    entryMethode,
    rowData,
    columns,
    delimter,
    setDelimeter,
    allDelimters,
    processSMS,
    showOptions,
    setShowOptions,
    messageState,
    setMessageState,
    isBuyingCredit,
    setIsBuyingCredit,
    processedMessages,
    setprocessedMessages,
  } = useSMS();
  const textAreaRef = React.useRef();
  const formatedTextHolder = React.useRef();
  const smsRef = React.useRef();
  const [history, setHistory] = useState({
    historyArr: [],
    historyIndex: undefined,
  });
  const focusTextArea = () => textAreaRef.current.focus();

  // ------------------------MANAGE UNDO AND REDO ------------------------
  const updateHistory = (valueToAdd) => {
    const { historyIndex, historyArr } = history;
    let splicedHistory = historyArr;
    let newHistoryIndex = historyIndex;

    // Create a new history path if portion of hisotry is overwritten
    if (historyIndex !== undefined) {
      splicedHistory = historyArr.splice(0, historyIndex);
      newHistoryIndex = undefined;
    }
    //  Keep history length at 1000
    if (splicedHistory.length >= 1000) {
      splicedHistory.shift();
    }

    // Add value to history
    if (splicedHistory[splicedHistory.length - 1] !== valueToAdd) {
      let myArr = [...splicedHistory, valueToAdd];
      if (myArr.length === 1) {
        myArr[0] = "";
      }
      setHistory({
        ...history,
        historyArr: myArr,
        historyIndex: newHistoryIndex,
      });
    }
  };

  const { historyIndex, historyArr } = history;
  const redoEnabled =
    historyArr.length &&
    historyIndex !== undefined &&
    historyIndex !== historyArr.length - 1;
  const undoEnabled = historyArr.length && historyIndex !== 0;

  const undo = () => {
    if (!undoEnabled) return;
    const { historyIndex, historyArr } = history;
    if (historyIndex === 0 && !historyArr.length) return;
    let newIndex = historyIndex ? historyIndex - 1 : historyArr.length - 1;
    setMessageState({
      ...messageState,
      message: historyArr[newIndex] || "",
      changedByHistory: true,
    });
    focusTextArea();
    setHistory({ ...history, historyIndex: newIndex });
  };

  const redo = () => {
    if (!redoEnabled) return;
    const { historyIndex, historyArr } = history;
    if (historyIndex === undefined) return;
    const newIndex =
      historyIndex < historyArr.length - 1 ? historyIndex + 1 : historyIndex;
    console.log(historyArr, newIndex, historyArr[newIndex]);
    setMessageState({
      ...messageState,
      message: historyArr[newIndex] || "",
      changedByHistory: true,
    });
    focusTextArea();
    setHistory({ ...history, historyIndex: newIndex });
  };

  const clearInput = (e) => {
    handleTextInput("", e);
    setMessageState({
      ...messageState,
      message: "",
      changedByHistory: true,
    });
  };

  //TODO:: ------------------------ SHOW POP AT CARET POSITION ------------------------

  // ------------------------MANAGE FIELD INSERTION AND CHANGE OF DELIMITERS ------------------------

  const spaceAway = delimter.start.length * 2 + 1;
  const ejectDelimiters = () => {
    return allDelimters.map((item, index) => {
      return <option key={index}>{item.start}</option>;
    });
  };

  const resetDelimiter = (selectedDelimiter) => {
    const oldDelimiter = delimter;
    const newDelimiter = allDelimters.find(
      (value) => value.start === selectedDelimiter
    );
    let myMessage = messageState.message;
    // prettier-ignore
    if (myMessage.length) {
      myMessage = dynamicReplace(myMessage,`[\\${oldDelimiter.start}]`, newDelimiter.start);
      console.log(myMessage)
      myMessage = dynamicReplace(myMessage,`[\\${oldDelimiter.end}]`, newDelimiter.end);
    }
    setDelimeter(newDelimiter);

    setMessageState({
      ...messageState,
      message: myMessage,
      // changedByHistory: true,
    });
  };

  const insertField = (value) => {
    const myNode = textAreaRef.current;
    // e.preventDefault();
    var start = myNode.selectionStart;
    var end = myNode.selectionEnd;
    // set textarea value to: text before caret + tab + text after caret
    const newValue =
      myNode.value.substring(0, start) +
      ` ${delimter.start}${value}${delimter.end} ` +
      myNode.value.substring(end);

    setNativeValue(myNode, newValue);

    myNode.dispatchEvent(new Event("input", { bubbles: true }));

    // put caret at right position again
    setTimeout(() => {
      myNode.selectionStart = myNode.selectionEnd =
        start + 1 + value.length + spaceAway;
      focusTextArea();
    }, 20);
  };

  const allFields = columns?.columnsArr || [];
  const ejectFieldsToInsert = () => {
    //  [
    //   "Name",
    //   "Age",
    //   "Residency_Status",
    //   "DOB",
    //   "House_No.",
    //   "Contact",
    //   "Class_teacher",
    //   "Guadians_contact",
    //   "Home_Address",
    //   "Home_Address",
    //   "Home_Address",
    //   "Home_Address",
    //   "Home_Address",
    //   "Home_Address",
    //   "Home_Address",
    //   "Home_Address",
    // ];
    return allFields.map((item, index) => {
      return (
        <span
          onClick={() => {
            insertField(item);
          }}
          className={` hover:bg-gray-100 border-2 text-blue-700 border-white bg-blue-50 hover:text-bgTrade text-start  w-full  h-[30px]  min-h-[30px]  text-ellipsis whitespace-nowrap overflow-hidden cursor-pointer px-2`}
          key={index}
        >
          {/* {replaceUnderscoreWithSpace(item)} */}
          {item}
        </span>
      );
    });
  };

  // ------------------------ SYNC TEXTAREA WITH PRE INPUT FIELD------------------------
  const checkIfWordIsAColumn = (word) => {
    return columns.columnsArr.includes(
      extractWordFromDelimiter(word, delimter.start.length)
    );
  };

  const processFormatedText = (textValue) => {
    const allTextArr = textValue?.split(" ");
    const formtatedContent = allTextArr
      .map((word, index) => {
        if (word.startsWith(delimter.start)) {
          if (checkIfWordIsAColumn(word)) {
            return `<span style="color:#1D66DE" >${word}</span>`;
          }
          return word;
          // setShowOptions(true);
        } else {
          // setShowOptions(false);
          return word;
        }
      })
      .join(" ");
    formatedTextHolder.current.innerHTML = formtatedContent;
  };

  let initialLoad = useRef(true);

  useEffect(() => {
    processFormatedText(messageState.message);
    if (!messageState.changedByHistory && !initialLoad.current) {
      clearTimeout(debounce);
      var debounce = setTimeout(() => {
        updateHistory(messageState.message);
      }, 100);
    }
    initialLoad.current = false;
  }, [messageState]);

  // HANDLE INPUT CHANGE
  const handleTextInput = (textValue, e) => {
    const myText = textValue.substring(0, 150);
    setMessageState({
      ...messageState,
      message: myText,
      changedByHistory: false,
    });
  };

  const ejectFields = () => {
    const allFields = ["Name", "Age", "Residency Status"];
    return allFields.map((item, index) => {
      return <option key={index}>{item}</option>;
    });
  };

  return (
    <div className="flex flex-col w-full h-full p-4 bg-blue-50">
      {isBuyingCredit ? (
        <SMSSalesBoard
          onClose={() => {
            setIsBuyingCredit(!isBuyingCredit);
          }}
        />
      ) : null}
      <div className=" w-full  mb-1">
        <SMSAcountBar />
      </div>
      {processedMessages ? <SMSPreview /> : null}
      <div ref={smsRef} className="w-full h-full flex flex-row bg-blue-50">
        {/* <CursorPositionPopUp /> */}
        <div
          onClick={() => setActivePage("editor")}
          className={`w-3/4 h-full flex flex-col justify-start bg-white shadow-md rounded-md relative ${
            activePage === "editor" ? "z-[500]" : ""
          }`}
        >
          {/* Overlay which is clicked to switch to recipeint manager, only appears if we are in editor mode */}
          {activePage !== "editor" ? (
            <div
              onClick={() => {
                setActivePage("editor");
              }}
              className="w-full h-full absolute  z-[2] top-0 right-0 bg-transparent cursor-cell"
            ></div>
          ) : null}
          <div className="min-h-[100px] h-[100px] w-full flex bg-white items-center">
            <div className="flex items-center justify-start w-full px-4">
              <div className="flex items-center px-4 whitespace-nowrap">
                <span>Redo </span>
              </div>
              <button
                onClick={() => {
                  redo();
                }}
                disabled={!redoEnabled}
                className={`${
                  redoEnabled
                    ? "bg-bgTrade text-white hover:bg-blue-800"
                    : "bg-gray-100 text-bgTrade "
                } flex justify-center   items-center min-w-[50px] cursor-pointer min-h-[50px]  border-2 border-white shadow-md rounded-full whitespace-nowrap transition-all`}
              >
                <Redo />
              </button>
              <div className="flex items-center px-4 whitespace-nowrap">
                <span>Undo </span>
              </div>
              <button
                disabled={!undoEnabled}
                onClick={() => {
                  undo();
                }}
                className={`${
                  undoEnabled
                    ? "bg-bgTrade text-white hover:bg-blue-800"
                    : "bg-gray-100 text-bgTrade "
                } flex justify-center   items-center min-w-[50px] cursor-pointer min-h-[50px]  border-2 border-white shadow-md rounded-full whitespace-nowrap transition-all`}
              >
                <Undo />
              </button>
              <div className="flex items-center px-4 whitespace-nowrap">
                <span>Clear </span>
              </div>
              <button
                disabled={!historyArr.length}
                onClick={(e) => {
                  clearInput(e);
                }}
                className={`${
                  messageState.message.length
                    ? "bg-bgTrade text-red-100 hover:bg-blue-800  "
                    : "bg-gray-100 text-bgTrade "
                } flex justify-center   items-center min-w-[50px] cursor-pointer min-h-[50px] shadow-md  border-2 border-white rounded-full whitespace-nowrap transition-all`}
              >
                <Delete />
              </button>
              <div className="flex items-center px-4 whitespace-nowrap">
                <span>Delimter </span>
                <TSelector
                  onChange={(selectedDelimiter) => {
                    resetDelimiter(selectedDelimiter);
                  }}
                  placeholder="Select Contact Field"
                  label=""
                  name="year"
                  className="bg-blue-50 border-transparent  flex text-bgTrade max-w-[100px]"
                  outerClassName=" ml-2 border-white border-2 shadow-md"
                  value={delimter.start}
                >
                  {ejectDelimiters()}
                </TSelector>
              </div>
            </div>
          </div>
          <div className="w-full  flex  h-[calc(100%-150px)] max-h-[calc(100%-150px)] p-4">
            {/* <div className="w-full h-full  flex  p-4"> */}
            <div className="w-full h-full flex p-4 bg-gray-100  border-white border-2 shadow-md rounded-md overflow-hidden ">
              <div className="w-full flex flex-col h-full    relative">
                <pre
                  style={{ fontFamily: '"Cairo", sans-serif' }}
                  ref={formatedTextHolder}
                  className="w-full h-full text-start whitespace-pre-wrap break-words p-0 pt-0 relative top-0 right-0 margin-0"
                ></pre>
                <textarea
                  ref={textAreaRef}
                  value={messageState.message}
                  style={{ resize: "none", fontFamily: '"Cairo", sans-serif' }}
                  onInput={(e) => {
                    if (e.target.value === "Tab") {
                      e.preventDefault();
                      return;
                    }

                    handleTextInput(e.target.value, e);
                  }}
                  onKeyDown={(event) => {
                    // prettier-ignore
                    if ((event.ctrlKey || event.metaKey) && event.key === "z") {
                    event.preventDefault(); // Prevent the default browser action (e.g., browser undo)
                    if(undoEnabled)
                    undo();
                  } else if ((event.ctrlKey || event.metaKey) && event.key === "y") {
                    event.preventDefault(); // Prevent the default browser action (e.g., browser redo)
                    redo();
                  }
                  }}
                  className="w-full h-full flex items-center caret-gray-900 text-transparent text- bg-transparent outline-none whitespace-pre-wrap absolute top-0 left-0"
                  placeholder="Enter sms here..."
                ></textarea>
              </div>
            </div>

            {columns?.columnsArr?.length ? (
              <div className="w-[200px] max-w-[200px] min-w-[200px] h-full flex flex-col   ml-2 mr-2  overflow-hidden">
                <div className="min-h-[50px] h-[20px] flex justify-center items-center  text-blue-900 mb-2">
                  <img className="h-[20px]" src={images.excelFile} />

                  <span className="ml-1">Click to insert fields</span>
                </div>
                <div className="w-full h-[calc(100%-60px)] max-h-[calc(100%-60px)]  overflow-auto flex flex-col ">
                  {ejectFieldsToInsert()}
                </div>
              </div>
            ) : (
              <div className="w-[200px] max-w-[200px] flex-col px-4 min-w-[200px] bg-gray-50 h-full flex items-center justify-center  ml-2 mr-2  overflow-hidden">
                <img className="h-[20%]" src={images.message} />
                <span className="w-[80%]">
                  Use an excile file to insert fields directly into your message
                </span>
              </div>
            )}
          </div>
          <div className="w-full flex justify-start pointer-events-none px-8 items-center">
            <div className=" flex  justify-start whitespace-nowrap mr-4  text-green-700">
              <Spellcheck />
              <b>
                {150 - messageState.message?.split("").length} characters left{" "}
              </b>
            </div>
          </div>
        </div>
        {/* Expand recipient manager if active Page is recipient manager and not editor */}
        <div
          className={` h-full flex flex-col items-start justify-center pl-4  ${
            activePage === "recipient"
              ? "z-[500] w-3/4 absolute min-w-1/2  top-0 px-4 py-4"
              : "w-[500px] relative"
          } right-0 bg-blue-50 `}
        >
          <RecipientManager />
          {/* Overlay which is clicked to switch to recipeint manager, only appears if we are in recipient manager mode  */}
          {entryMethode === ENTRY_METHODS?.excelFile &&
          rowData?.length &&
          activePage !== "recipient" ? (
            <div
              onClick={() => {
                setActivePage("recipient");
              }}
              className="w-full h-full absolute top-0 right-0 bg-transparent cursor-cell"
            ></div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const SMSSender = () => (
  <SMSProvider>
    <SMSSenderMain />
    {/* <div className="w-full flex flex-col">
    </div> */}
  </SMSProvider>
);
export default SMSSender;
