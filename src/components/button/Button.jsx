import React from "react";

/**
 * A component that has the fundamental design of all buttons for the Gall... platform.
 * Replace the className prop type with a string of all the classes you would like to modify
 * the button with
 * @props className | A text of all extra classes
 * @props styles | Normal css styles. Written just the way it is done
 * @props icon  | Material ui icon
 * @props iconSize | size of the icon you passed ( Eg. sm, lg, 10x, 6x 2x)
 * @props iconColor
 * @props onClick  | What should happen when the button is clicked?
 * @props iconPosition | Should the icon be on the left/right side of text?
 *
 */

function TButton({
  className,
  styles,
  children,
  iconColor,
  iconSize,
  icon,
  onClick,
  disabled,
}) {
  return (
    <button
      button={disabled}
      style={{ ...styles }}
      onClick={(e) => (onClick ? onClick(e) : e.preventDefault())}
      className={`bg-bgTrade hover:bg-blue-900 h-[47px]  w-full rounded-[5px] flex justify-center border border-[#8b8b8b] text-white overflow-hidden ${className}`}
    >
      {icon && (
        <>
          <div
            className={`${iconColor}} h-full  flex justify-center items-center pointer-events-none`}
            style={{ marginRight: children !== "" && 5, color: iconColor }}
          >
            {icon}
          </div>
        </>
      )}
      <div
        className={`${iconColor}}  h-full  flex justify-center items-center pointer-events-none`}
        style={{ marginRight: 5, color: iconColor }}
      >
        {children}
      </div>
    </button>
  );
}
export default TButton;
