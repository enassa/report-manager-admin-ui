import { useState } from "react";
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import { ClickAwayListener } from "@mui/material";
export default function DropMenu({
  onChange,
  value,
  styles,
  className,
  required = false,
  disabled = false,
  children,
  listClassName,
}) {
  const [dropOptions, setDropOptions] = useState();
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(value);

  const getOptions = () => {
    return children.map((option, index) => {
      if (option.type !== "option") return;
      return (
        <div
          onClick={() => {
            setSelected(option.props.children);
            if (option.props.children === selected) return;
            error && setError(false);
            onChange && onChange(option.props.children, option.props.data);
            setDropOptions(false);
          }}
          key={index}
          className="w-full min-h-[40px] h-[40px] px-4 cursor-pointer hover:bg-gray-50 flex items-center mt-2 mb-2 py-2"
        >
          {option.props?.icon && (
            <div className="mr-3">{option.props?.icon}</div>
          )}
          {option.props?.image && (
            <img
              alt={option.props.children}
              src={option.props?.image}
              className="mr-3 h-full"
            />
          )}

          <span className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
            {option.props.children}
          </span>
        </div>
      );
    });
  };
  const errorClass = "text-red-400 text-xs mt-1";
  return (
    <div
      className={`w-full flex flex-col justify-start mb-2 relative py-1 ${className}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          !disabled && setDropOptions(true);
        }}
        className={` ${className} ${
          disabled && ""
        } h-[40px] flex flex-row items-center w-full  rounded-[5px] outline-none cursor-pointer py-3`}
      >
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
            className={`w-[300px] rounded-md animate-rise overflow-y-auto bg-white shadow-neumoNav z-[10]  flex flex-col absolute top-[130%] max-h-[400px]   ${listClassName}`}
          >
            {getOptions()}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
