import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { useEffect } from "react";

export default function TSelector({
  type,
  name,
  onChange,
  errorMessage,
  placeholder,
  value,
  description,
  styles,
  className,
  required = false,
  disabled = false,
  children,
  label,
  noBorder,
}) {
  const [dropOptions, setDropOptions] = useState();
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(value);

  const inputRef = React.createRef();
  useEffect(() => {
    const event = new Event("input");
    inputRef.current?.dispatchEvent(event);
  }, [selected]);

  const getOptions = () => {
    return children.map((option, index) => {
      if (option.type !== "option") return;
      return (
        <div
          onClick={() => {
            setSelected(option.props.children);
            if (option.props.children === selected) return;
            error && setError(false);
            setDropOptions(false);
          }}
          key={index}
          className="w-full min-h-[40px] h-[40px] px-4 cursor-pointer hover:bg-gray-50 flex items-center"
        >
          {option.props?.icon && (
            <div className="mr-3">{option.props?.icon}</div>
          )}
          {option.props?.image && (
            <img alt="" className="h-[50%] mr-3" src={option.props?.image} />
          )}

          <span className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
            {option.props.children}
          </span>
        </div>
      );
    });
  };

  const errorClass = "text-red-400 text-xs mt-1 ";

  return (
    <div className="w-full flex flex-col justify-start mb-2 relative">
      <label
        htmlFor={name}
        className="w-full text-gray-900 relative b-[30px] text-[18px]"
      >
        {label}
      </label>
      <div
        onClick={(e) => {
          !disabled && setDropOptions(true);
        }}
        className={` ${className} ${
          disabled && "bg-gray-100"
        } h-[40px] flex flex-row items-center w-full border-[#8b8b8b] border-[1px] rounded-[5px] outline-none cursor-pointer`}
      >
        <input
          ref={inputRef}
          onFocusCapture={() => {
            !disabled && setDropOptions(true);
          }}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={` ${className} h-full p-3 w-full  rounded-[5px] outline-none pointer-events-none`}
          type={type}
          placeholder={placeholder}
          name={name}
          value={selected || ""}
          disabled={disabled}
          id={name}
        />
        {dropOptions ? (
          <ExpandLess
            onClick={(e) => {
              setDropOptions(false);
              e.stopPropagation();
            }}
            className="cursor-pointer"
          />
        ) : (
          <ExpandMore className="cursor-pointer" />
        )}
      </div>
      {dropOptions && (
        <ClickAwayListener
          onClickAway={() => {
            selected === undefined && required && setError(true);
            setDropOptions(false);
          }}
        >
          <div
            className={`w-full rounded-md animate-rise bg-white shadow-neumoNav z-[10] max-h-[160px] overflow-y-auto  flex flex-col absolute top-[110%]   ${
              !noBorder && "border-t-black border-t-4"
            } `}
          >
            {getOptions()}
          </div>
        </ClickAwayListener>
      )}

      {description && <span className={errorClass}>{description}</span>}

      <span className={`${errorClass}`}>
        {error && `${name || "This field"} is required`}
      </span>
    </div>
  );
}
