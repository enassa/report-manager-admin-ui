import { images } from "../assets/images/images";

export const makeCall = (phoneNumber) => {
  window.open(`tel:${phoneNumber}`, "_self");
};

export const isMappable = (array) => {
  if (!Array.isArray(array)) {
    return false;
  }
  if (array.length === 0) {
    return false;
  }
  return true;
};

export const replaceSpaceWithUnderscore = (stringToReplace) => {
  let results;
  try {
    results = stringToReplace.replace(/ /g, "_");
  } catch {}
  return results;
};

export const replaceUnderscoreWithSpace = (stringToReplace) => {
  let results;
  try {
    results = stringToReplace.replace(/_/g, " ");
  } catch {}
  return results;
};

export const checkRegexPattern = (myString, pattern) => {
  let regex = new RegExp(pattern);
  let regexState = regex.test(myString);
  return regexState;
};

export const emailRegex = (max = 50) => {
  return "^[A-Za-z0-9\\._%+-]+@[A-Za-z0-9\\.-]+\\.[A-Za-z]{2," + max + "}$";
};

export const onlyPositiveNumbersRegex = (max = 50) => {
  return "^[1-9]+[0-9]*$";
};
export const generateSuperShortId = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4();
};

export const onlyNumbersRegex = (max = 50) => {
  return "^[1-9]+[0-9]*$";
};

export const createRipple = (event) => {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");
  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
};

export const searchContains = (dataToSearchIn, searchValue, property) => {
  try {
    let reg = new RegExp("[^,]*" + searchValue + "[^,]*", "ig");
    const searchResults = dataToSearchIn.filter((item) =>
      item[property].match(reg)
    );
    return searchResults;
  } catch {
    return;
  }
};

export function formatDate(dateString) {
  if (!dateString) return "";
  // const date = dayjs(dateString);
  // return date.format("Do MMMM, YYYY");
}

export const getAsObjectFromLocalStorage = (index) => {
  try {
    const serializedData = localStorage.getItem(index);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    return err;
  }
};

export const saveObjectInLocalStorage = (key, value) => {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    return err;
  }
};

export const getLightRGBColor = (rgbColor, opacity) => {
  const rgbArr = rgbColor.split(",");
  const firstValue = rgbArr[0].slice(4);
  const secondValue = rgbArr[1];
  const thirdValue = rgbArr[2].replace(")", "");
  return `rgb(${firstValue}, ${secondValue}, ${thirdValue}, ${opacity})`;
};

export const getImageFromSymbol = (symbol) => {
  switch (symbol) {
    case "GOOGL":
      return images.google;
    case "MSFT":
      return images.microsoft;
    case "TSLA":
      return images.tesla;
    case "IBM":
      return images.ibm;
    case "AAPL":
      return images.apple;
    case "AMZN":
      return images.amazon;
    case "ORCL":
      return images.oracle;
    case "NFLX":
      return images.netflix;
    default:
      break;
  }
};

export const getAsObjectFromSession = (index) => {
  try {
    const serializedData = sessionStorage.getItem(index);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    return err;
  }
};
export const saveObjectInSession = (key, value) => {
  try {
    const serializedData = JSON.stringify(value);
    sessionStorage.setItem(key, serializedData);
  } catch (err) {
    return err;
  }
};
export const sessionSave = (key, value) => {
  sessionStorage.setItem(key, value);
};
export const sessionGet = (key) => {
  const value = localStorage.getItem(key);
  return value;
};
export const clearSessionStorage = () => {
  let value = sessionStorage.clear();
  return value;
};
export const clearLocalStorage = () => {
  let value = localStorage.clear();

  return value;
};
export const removeItemsFromLocalStorage = (itemsArr) => {
  if (!!itemsArr) {
    for (let i = 0; i < itemsArr.length; i++) {
      localStorage.removeItem(itemsArr[i]);
    }
    return true;
  }
  return false;
};

export const removeItemsFromSessionStorage = (itemsArr) => {
  if (!!itemsArr) {
    for (let i = 0; i < itemsArr.length; i++) {
      sessionStorage.removeItem(itemsArr[i]);
    }
    return true;
  }
  return false;
};

export const getDurationOfStudies = (year) => {
  // I will write this function defintion to accomodate for varius use cases
  return 3;
};
