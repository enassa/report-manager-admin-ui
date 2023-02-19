import React, { useState } from "react";
import {
  checkRegexPattern,
  replaceUnderscoreWithSpace,
} from "../../constants/reusable-functions";

export default function TAuthInput({
  type,
  name,
  onChange,
  onValidated,
  errorMessage,
  regexPattern,
  placeholder,
  value,
  description,
  styles,
  className,
  required = true,
  disabled = false,
  maxCharLength,
  minCharLength,
  label,
  rightIcon,
  leftIcon,
  containerClassName,
}) {
  const [error, setError] = useState({
    status: false,
    requiredErr: false,
    patternErr: false,
    maxCharLengthErr: false,
    minCharLengthErr: false,
  });
  const validate = (e) => {
    let errorLog = {};

    // ===================== validate required =====================
    required && e.target.value === ""
      ? (errorLog = { ...errorLog, requiredErr: true })
      : (errorLog = { ...errorLog, requiredErr: false });

    // ===================== validate max character length =====================
    maxCharLength && e.target.value.length > maxCharLength
      ? (errorLog = { ...errorLog, maxCharLengthErr: true })
      : (errorLog = { ...errorLog, maxCharLengthErr: false });

    // ===================== validate min character length =====================
    minCharLength && e.target.value.length < minCharLength
      ? (errorLog = { ...errorLog, minCharLengthErr: true })
      : (errorLog = { ...errorLog, minCharLengthErr: false });

    // ===================== validate regex length =====================
    regexPattern && !checkRegexPattern(e.target.value, regexPattern)
      ? (errorLog = { ...errorLog, patternErr: true })
      : (errorLog = { ...errorLog, patternErr: false });

    if (
      errorLog?.requiredErr ||
      errorLog?.patternErr ||
      errorLog?.maxCharLengthErr ||
      errorLog?.minCharLengthErr
    ) {
      setError({ ...errorLog, status: true });
      return;
    } else {
      setError({ ...errorLog, status: false });
      return true;
    }
  };

  const getErrorMessage = () => {
    if (error.requiredErr)
      return `${replaceUnderscoreWithSpace(name) || "This field"} is required`;
    else if (error.patternErr)
      return `${errorMessage || "Your input is invalid"}`;
    else if (error.minCharLengthErr)
      return `Minimum of ${minCharLength} characters required`;
    else if (error.maxCharLengthErr)
      return `Maximum of ${maxCharLength} characters exceeded`;
  };

  const handleChange = (e) => {
    // ======== validate input ========
    const validated = validate(e);
    // ======== get event and validation state ========
    onChange && onChange(e, validated);
    // ======== get event only ========
    validated && onValidated && onValidated(e, e.target.value);
  };

  const errorClass =
    "text-red-600 text-xs mt-1 capitalize absolute  bottom-[-15px] capitalise";

  const [inputType, setInputType] = useState(type);
  const changeFieldType = () => {
    inputType === "password" && setInputType("text");
    inputType === "text" && setInputType("password");
  };

  return (
    <div
      className={`w-full flex flex-col justify-start relative mb-[20px] ${containerClassName}`}
    >
      <span
        style={{ color: "black" }}
        htmlFor={name}
        className="w-full text-black relative b-[30px] text-[18px] md:mb-[10px] mb-[1px] normal-case text-left"
      >
        {label}
      </span>
      {value ? (
        <div
          className={` ${className} h-[40px] max-h-[40px]  flex w-full border-[#8b8b8b]  border-[1px] rounded-[5px] outline-none  items-center`}
        >
          {leftIcon && (
            <span className="mr-2 text-gray-500 cursor-pointer">
              {leftIcon}
            </span>
          )}
          <input
            className={`h-full w-full  outline-none bg-transparent text-xl`}
            onChange={(e) => handleChange(e)}
            type={inputType}
            placeholder={placeholder}
            name={name}
            style={{ ...styles }}
            disabled={disabled}
            required={required}
            value={value}
          />
          {rightIcon && (
            <span
              onClick={() => type === "password" && changeFieldType()}
              className="ml-2 text-gray-500 cursor-pointer"
            >
              {rightIcon}
            </span>
          )}
        </div>
      ) : (
        <div
          className={` ${className} h-[40px] max-h-[40px]  flex w-full border-[#8b8b8b]  border-[1px] rounded-[5px] outline-none  p-2 `}
        >
          {leftIcon && (
            <span className="mr-2 text-gray-500 cursor-pointer h-full flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            className={`h-full w-full  outline-none bg-transparent text-xl`}
            onChange={(e) => handleChange(e)}
            type={inputType}
            placeholder={placeholder}
            name={name}
            style={{ ...styles }}
            disabled={disabled}
            required={required}
          />
          {rightIcon && (
            <span
              onClick={() => type === "password" && changeFieldType()}
              className="ml-2 text-gray-500 cursor-pointer h-full flex items-center"
            >
              {rightIcon}
            </span>
          )}
        </div>
      )}
      {description && <span className={errorClass}>{description}</span>}
      <span className={`${errorClass}`}>{getErrorMessage()}</span>
    </div>
  );
}
