import React, { useRef } from "react";
import { useState } from "react";
import { images } from "../../assets/images/images";
import {
  extractWordFromDelimiter,
  extractWordsInCustomSymbols,
  replaceSpaceWithUnderscore,
  replaceUnderscoreWithSpace,
  replaceWordInPhrase,
} from "../../constants/reusable-functions";

const SMSContext = React.createContext();
export const SMSProvider = ({ children }) => {
  const ENTRY_METHODS = { manual: "manual", excelFile: "excelFile" };
  const COUNTRY_CODES = [
    { name: "Ghana", code: "+233", flag: images.ghana },
    { name: "Nigeria", code: "+234", flag: images.nigeria },
  ];
  const allDelimters = [
    { start: "{", end: "}" },
    { start: "[", end: "]" },
    { start: "<", end: ">" },
    { start: "(", end: ")" },
    // { start: "~", end: "~" },
    // { start: "$", end: "$" },
    // { start: "#", end: "#" },
  ];

  const [delimter, setDelimeter] = useState(allDelimters[0]);
  const [recipientList, setRecipientList] = useState([]);
  const [entryMethode, setEntryMethode] = useState(undefined);
  const [columns, setColumns] = useState({ columnsArr: [], gridColumns: [] });
  const [activePage, setActivePage] = useState("editor");
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [gridApi, setGridApi] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [processedMessages, setprocessedMessages] = useState();
  const [smsCredits, setSMSCredits] = useState();
  const [contactField, setContactField] = useState({
    value: "",
    error: undefined,
  });

  const [isBuyingCredit, setIsBuyingCredit] = useState();

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [messageState, setMessageState] = useState({
    message: "",
    placeholders: [],
    contactAddress: "",
    messageObj: {},
    messageArray: {},
    changedByHistory: false,
  });

  const gridRef = useRef();
  const [countryCode, setCountryCode] = useState({
    name: "Ghana",
    code: "+233",
    flag: images.ghana,
  });

  // Optional - for accessing Grid's API
  const [excelDataState, setExcelDataState] = useState({
    workBookNames: [],
    workBook: [],
    showDataPreview: false,
    file: "",
    gridColumns: [],
    gridData: {},
    allGridData: [],
  });

  const [processedSMS, setProcessedSMS] = useState();
  const [modalState, setSMSState] = useState({
    state: false,
    message: undefined,
    response: undefined,
    callBack: () => {
      console.log("modal response");
    },
  });

  const resetManualInput = () => {
    setCountryCode({ name: "Ghana", code: "+233", flag: images.ghana });
  };

  const resetExcelEntry = (message) => {
    setExcelDataState({
      workBookNames: [],
      workBook: "",
      showDataPreview: false,
      file: "",
    });
    setRowData([]);
    setColumns([{ columnsArr: [], gridColumns: [] }]);
    setRecipientList([]);
    setContactField({
      value: "",
      error: undefined,
    });
  };

  const changeEntryMethode = (value) => {
    setColumns([{ columnsArr: [], gridColumns: [] }]);
    setRecipientList([]);
    setCountryCode({ name: "Ghana", code: "+233", flag: images.ghana });
    setColumns([{ columnsArr: [], gridColumns: [] }]);
    setEntryMethode(value);
    setContactField({
      value: "",
      error: undefined,
    });
  };

  const executeLocalSearch = (value) => {
    gridRef.current.api.setQuickFilter(value);
  };

  const getValidatedContact = (contact) => {
    console.log(contact);
    if (contact) {
      contact = contact.trim();
      contact = contact.replace(/[.*?^${}'"()|[\]\\]/g, "");
    }

    // Check if field value is number
    if (!!!Number(contact) || contact?.length < 9) {
      // setContactField({ value: "", error: true });
      return null;
    }
    // prettier-ignore
    // Check if field value starts with country code or just 0: Ghanain numbers e.g [+233541234567, 0541234567]
    if ((contact.startsWith("0") || contact.startsWith("+")) && contact.length > 9 ) {
      // setContactField({ value: field, error: false });
      return contact
    }

    // Check if field value does not starts with 0 and add 0: Ghanain numbers e.g [541234567 ==> 0541234567]
    if (contact.length === 9) {
      contact = `0${contact}`;
      return contact;
      // setContactField({ value: field, error: false });
    }
  };

  const processSMS = () => {
    let wordsInserted = extractWordsInCustomSymbols(
      messageState.message,
      delimter.start,
      delimter.end
    );

    wordsInserted = Array.from(new Set(wordsInserted));

    wordsInserted = wordsInserted.filter((word) => {
      return columns.columnsArr.includes(replaceSpaceWithUnderscore(word));
    });

    // wordsInserted = wordsInserted.map((item) =>
    //   extractWordFromDelimiter(item, delimter.start.length)
    // );

    wordsInserted = wordsInserted.map((item) =>
      replaceUnderscoreWithSpace(item)
    );

    console.log(wordsInserted);

    const messagesObj = {
      valid: [],
      invalid: [],
    };
    // console.log(recipientList);
    const processed = recipientList.map((row, index) => {
      const errors = [];

      let replacedMessage = messageState.message;
      let isInValidMessage = false;
      wordsInserted.forEach((word) => {
        if (row[word] === undefined) {
          isInValidMessage = true;
        }

        replacedMessage = replaceWordInPhrase(
          replacedMessage,
          `${delimter.start}${replaceSpaceWithUnderscore(word)}${delimter.end}`,
          row[word]
        );
      });

      const contact = getValidatedContact(`${row[contactField.value]}`);

      if (!contact) {
        errors.push("Invalid contact address");
      }

      if (isInValidMessage) {
        errors.push("Some fields could not be inserted");
      }

      if (replacedMessage.length > 150) {
        errors.push(
          "Message length exceeds 150 characters after insertion of fields"
        );
      }

      if (errors.length) {
        messagesObj.invalid.push({
          contact: row[contactField.value],
          message: replacedMessage,
          errors,
        });
      } else {
        messagesObj.valid.push({
          contact: contact,
          message: replacedMessage,
        });
      }
    });

    setprocessedMessages(messagesObj);
  };

  console.log(processedMessages);
  const changeContactField = (field) => {
    let fieldValue = rowData[0][field];

    if (fieldValue) {
      fieldValue = fieldValue.trim();
      fieldValue = fieldValue.replace(/[.*?^${}'"()|[\]\\]/g, "");
    }

    // Check if field value is number
    if (!!!Number(fieldValue) || fieldValue?.length < 9) {
      setContactField({ value: "", error: true });
      return;
    }
    // prettier-ignore
    // Check if field value starts with country code or just 0: Ghanain numbers e.g [+233541234567, 0541234567]
    if ((fieldValue.startsWith("0") || fieldValue.startsWith("+")) && fieldValue.length > 9 ) {
      setContactField({ value: field, error: false });
      return
      console.log(fieldValue);
    }

    // Check if field value does not starts with 0 and add 0: Ghanain numbers e.g [541234567 ==> 0541234567]
    if (fieldValue.length === 9) {
      fieldValue = `0${fieldValue}`;
      setContactField({ value: field, error: false });
    }
  };

  return (
    <SMSContext.Provider
      value={{
        recipientList,
        entryMethode,
        processedSMS,
        setProcessedSMS,
        setEntryMethode,
        setRecipientList,
        setColumns,
        setActivePage,
        setExcelDataState,
        resetExcelEntry,
        changeEntryMethode,
        executeLocalSearch,
        changeContactField,
        contactField,
        showContextMenu,
        processedMessages,
        setprocessedMessages,
        setShowContextMenu,
        delimter,
        setDelimeter,
        allDelimters,
        gridApi,
        countryCode,
        messageState,
        setMessageState,
        setCountryCode,
        setGridApi,
        isBuyingCredit,
        setIsBuyingCredit,
        gridRef,
        excelDataState,
        activePage,
        ENTRY_METHODS,
        columns,
        rowData,
        setRowData,
        processSMS,
        COUNTRY_CODES,
      }}
    >
      {children}
    </SMSContext.Provider>
  );
};
export const useSMS = () => React.useContext(SMSContext);
