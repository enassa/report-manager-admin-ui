import React, { useState } from "react";
import { useSMS } from "./SMSHook";
import TSelector from "../input-selector/Selector";
import { images } from "../../assets/images/images";
import TAuthInput from "../auth-input/AuthInput";
import {
  AddCircle,
  Close,
  ContactPhone,
  PermContactCalendar,
} from "@mui/icons-material";

export default function ManualEntryMethode() {
  const {
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
    gridApi,
    setGridApi,
    gridRef,
    excelDataState,
    activePage,
    ENTRY_METHODS,
    columns,
    rowData,
    setRowData,
    countryCode,
    setCountryCode,
    COUNTRY_CODES,
  } = useSMS();

  const [inputValue, setInputValue] = useState();
  const validateInput = () => {};

  const addContact = () => {
    if (inputValue.length < 7 || recipientList.includes(inputValue)) {
      setInputValue("");
      return;
    }
    const contactValue = `${countryCode.code}${inputValue}`;
    const addresses = recipientList || [];
    setRecipientList([contactValue, ...addresses]);
    setInputValue("");
  };

  const removeContact = (value) => {
    const newList = recipientList.filter((item) => item !== value);
    setRecipientList(newList);
  };

  const ejectCountryodes = () => {
    return COUNTRY_CODES.map((item, index) => {
      return (
        <option key={index} image={item.flag}>
          {item?.code + " - " + item?.name}
        </option>
      );
    });
  };

  const ejectContactList = () => {
    return (
      Array.isArray(recipientList) &&
      recipientList?.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full bg-gray-50 border-2 items-center px-2 border-white shadow-sm h-[40px] min-h-[40px] flex justify-between  mb-3"
          >
            <span>
              <PermContactCalendar className="text-blue-600 mr-1" />
              <span className="text-gray-600">{item}</span>
            </span>
            <Close
              onClick={() => {
                removeContact(item);
              }}
              style={{ fontSize: 17 }}
              className="text-gray-400 cursor-pointer hover:text-gray-500"
            />
          </div>
        );
      })
    );
  };

  return (
    <div className="w-full h-full max-h-full flex flex-col">
      <div className="w-full h-[60px] min-h-[60px] bg-[#F8F8F8] px-1">
        <div className="w-full h-full flex justify-start p-1 items-center">
          <div className="w-auto  h-full  flex items-center">
            {/* <img src={images.google} className="h-[15px]" /> */}
            <TSelector
              onChange={(selectedCode) => {
                const selected = COUNTRY_CODES.find(
                  (country) =>
                    country.name === selectedCode.split("-")[1].trim()
                );
                setCountryCode(selected);
              }}
              placeholder="Select Adress"
              label=""
              name="year"
              value={countryCode?.code + "-" + countryCode?.name}
              selectedImage={countryCode?.flag}
              className="bg-blue-50 border-transparent px-1   flex text-bgTrade max-h-[35px]"
              outerClassName="min-w-[180px]  border-white rounded-md border-2 mr-2"
            >
              {ejectCountryodes()}
            </TSelector>
          </div>
          <div className="w-full h-full flex  items-center">
            <input
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.keyCode == 13) {
                  addContact();
                }
              }}
              placeholder="eg. 549546822"
              label=""
              type="Number"
              value={inputValue || ""}
              name="Contact"
              required={false}
              className="bg-blue-50 px-2 border-white mr-2 border-2 rounded-md outline-none border-transparent flex items-center text-bgTrade h-[40px]"
            />
            {/* <TSelector>{ejectCountryodes()}</TSelector> */}
          </div>
          <button
            onClick={() => {
              addContact();
            }}
            disabled={false}
            className={`bg-transparent text-blue-700 hover:bg-gray-100 flex justify-center   items-center min-w-[50px] cursor-pointer min-h-[50px]  border-0 shadow-none border-white  rounded-full whitespace-nowrap transition-all`}
          >
            <AddCircle />
          </button>
        </div>
      </div>
      <div className="w-full h-[calc(100%-60px)] max-h-[calc(100%-60px)] bg-white flex overflow-auto flex-col px-2 py-2">
        {ejectContactList()}
      </div>
    </div>
  );
}
