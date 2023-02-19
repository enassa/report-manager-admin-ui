import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export default function ComponentName({
  propName = "defaultParamete",
  secondProp = "defaultPropName",
}) {
  //  ------------------  Funtion declarations--------------------------------
  const functionName = (row) => {
    //function defintion here
  };

  const moreFunctions = (row) => {
    //function defintion here
  };

  //  Component template defintion
  return (
    <>
      <div className="w-full h-full bg-white flex flex-col"></div>
    </>
  );
}

// ---------------------------- Documentation ----------------------
ComponentName.prototype = {
  /**
   * @propName Explaination of prop
   * More explaination for the above prop goes here
   */
  // Type definition for the prop:
  // This is the defintion for a required prop that takes an array of object
  // of any shape for properties and values
  propName: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * @propName2 Explaination of prop
   * More explaination for the above prop
   */
  // Type definition for the prop:
  // This is the defintion for a required prop that takes an array of object of the shape defined in Proptypes.shape()
  // of any shape for properties and values
  propName2: PropTypes.arrayOf(
    PropTypes.shape({
      property1: PropTypes.string.isRequired,
      property2: PropTypes.string.isRequired,
    })
  ),

  /**
   * @propName3  Definition of prop
   */
  // {Function} --This is the definition for a prop that takes a
  // function that takes two arguments: a string and a bool
  propName3: PropTypes.func(PropTypes.string, PropTypes.bool),
};

ComponentName.defaultProps = {};
