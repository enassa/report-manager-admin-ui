import React from "react";
import PropTypes from "prop-types";

export default function TurntabLoader({
  propName = "defaultParamete",
  secondProp = "defaultPropName",
}) {
  //  Component template defintion
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col"></div>
    </>
  );
}

// ---------------------------- Documentation ----------------------
TurntabLoader.prototype = {
  /**
   * @spinSpeed Prop for how fast the loader should spin in milliseconds
   * The default is 100ms
   */

  spinSpeed: PropTypes.bool,
};

TurntabLoader.defaultProps = {
  spinSpeed: 200,
};
