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
