import React, { useState } from "react";
import {
  checkRegexPattern,
  replaceUnderscoreWithSpace,
} from "../../constants/reusable-functions";

export default function TInput({
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
    // ================ validate required ================
    required && e.target.value === ""
      ? (errorLog = { ...errorLog, requiredErr: true })
      : (errorLog = { ...errorLog, requiredErr: false });

    // ================ validate max character length ================
    maxCharLength && e.target.value.length > maxCharLength
      ? (errorLog = { ...errorLog, maxCharLengthErr: true })
      : (errorLog = { ...errorLog, maxCharLengthErr: false });

    //  ================ validate min character length ================
    minCharLength && e.target.value.length < minCharLength
      ? (errorLog = { ...errorLog, minCharLengthErr: true })
      : (errorLog = { ...errorLog, minCharLengthErr: false });

    // ================ validate regex length ================
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
    // ================ validate input ================
    const validated = validate(e);
    // ================ get event and validation state ================
    onChange && onChange(e, validated);
    // ================  get event only ================
    validated && onValidated && onValidated(e, e.target.value);
  };
  const errorClass = "text-red-400 text-xs mt-1";
  return (
    <div className="w-full flex flex-col justify-start">
      <label
        htmlFor={name}
        className="w-full text-gray-900 relative b-[30px] text-[18px]"
      >
        {label}
      </label>
      {value ? (
        <input
          className={` ${className} h-[40px] p-3 w-full border-[#8b8b8b]  border-[1px] rounded-[5px] outline-none`}
          onChange={(e) => handleChange(e)}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
        />
      ) : (
        <input
          className={` ${className} h-[40px] p-3 w-full  border-[1px] rounded-[5px] outline-none`}
          onChange={(e) => handleChange(e)}
          type={type}
          placeholder={placeholder}
          name={name}
          style={{ ...styles }}
          disabled={disabled}
          required={required}
        />
      )}
      {description && <span className={errorClass}>{description}</span>}
      <span className={`${errorClass}`}>{getErrorMessage()}</span>
    </div>
  );
}
