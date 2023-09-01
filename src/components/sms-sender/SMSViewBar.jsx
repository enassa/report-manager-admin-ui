import { ArrowRight, CheckBox, Sms } from "@mui/icons-material";
import React from "react";
import TButton from "../button/Button";
import { useSMS } from "./SMSHook";
import TSelector from "../input-selector/Selector";
import {
  replaceSpaceWithUnderscore,
  replaceUnderscoreWithSpace,
} from "../../constants/reusable-functions";

export default function SMSViewBar() {
  const {
    recipientList,
    columns,
    entryMethode,
    ENTRY_METHODS,
    processSMS,
    messageState,
    changeContactField,
    contactField,
  } = useSMS();

  const ejectColumns = () => {
    return (
      Array.isArray(columns?.columnsArr) &&
      columns?.columnsArr.map((item, index) => {
        return <option key={index}>{replaceUnderscoreWithSpace(item)}</option>;
      })
    );
  };

  const disableSendButton =
    !messageState?.message?.length ||
    !recipientList.length ||
    contactField.error !== false;
  return (
    <div className="w-full h-full flex items-center justify-between  px-2 rounded-md shadow-md border-2 border-white bg-gray-50">
      <div className="whitespace-nowrap w-[40%] text-start  text-ellipsis overflow-hidden">
        <CheckBox /> {recipientList?.length || 0} selected
      </div>
      <div className="w-full flex items-center justify-end">
        {entryMethode !== ENTRY_METHODS.manual ? (
          <div className="flex items-center px-4 whitespace-nowrap">
            <span className="whitespace-nowrap text-ellipsis">
              Contact Field:{" "}
            </span>
            <TSelector
              onChange={(selectedField) => {
                changeContactField(selectedField);
              }}
              placeholder="Select Contact Field"
              label=""
              value={contactField?.value || ""}
              name="year"
              popUpDirection={"top"}
              className={`${
                contactField?.error === undefined
                  ? "bg-gray-400"
                  : contactField?.error === false
                  ? "bg-blue-900 text-white"
                  : "bg-red-400 text-black"
              } border-transparent  flex text-bgTrade max-w-[170px] max-h-[35px]`}
              outerClassName=" ml-2 border-white rounded-md border-2 shadow-md"
            >
              {ejectColumns()}
            </TSelector>
          </div>
        ) : null}
        <TButton
          disabled={disableSendButton}
          onClick={() => {
            processSMS();
          }}
          className={`w-[100px] min-w-[150px] max-w-[150px] text-sm whitespace-nowrap rounded-none text-ellipsis overflow-hidden pointer-events-auto  ${
            disableSendButton
              ? "bg-gray-400 border-0 text-gray-400 hover:bg-gray-400"
              : "bg-blue-900 hover:bg-blue-600"
          }`}
          icon={<Sms style={{ fontSize: 17 }} />}
        >
          Send SMS
        </TButton>
      </div>
    </div>
  );
}
