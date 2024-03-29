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

export const isOfFileType = (filePath, fileExtension) => {
  const extension = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  if (fileExtension.includes(extension)) {
    return true;
  }
  return false;
};
export const formatYearToClassGroup = (admissionYear) => {
  const enrollmentYear = parseInt(admissionYear.split(" ")[2]);
  console.log(enrollmentYear);
  const className = `class_of_${
    enrollmentYear + getDurationOfStudies(enrollmentYear)
  }`;
  return className;
};
export const formatFormToClassGroup = (admissionYear) => {
  const enrollmentYear = parseInt(admissionYear.split(" ")[1]);
  console.log(enrollmentYear);
  const className = `class_of_${
    enrollmentYear + getDurationOfStudies(enrollmentYear)
  }`;
  return className;
};
export const formatFormToNumber = (admissionYear) => {
  const formNumber = parseInt(admissionYear.split(" ")[1]);
  return formNumber;
};

export const formatSemester = (semester) => {
  // console.log(semester);
  const formatedSemester = parseInt(semester.split(" ")[1]);
  return formatedSemester;
};
export const getCaretCoordinates = () => {
  let x = 0,
    y = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    console.log(selection);
    // Check if there is a selection (i.e. cursor in place)
    if (selection.rangeCount !== 0) {
      // Clone the range
      const range = selection.getRangeAt(0).cloneRange();
      // Collapse the range to the start, so there are not multiple chars selected
      range.collapse(true);
      // getCientRects returns all the positioning information we need
      const rect = range.getClientRects();
      console.log("====", rect);
      if (rect) {
        x = rect.left; // since the caret is only 1px wide, left == right
        y = rect.top; // top edge of the caret
      }
    }
  }
  return { x, y };
};

export const getCaretIndex = (element) => {
  let position = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    // Check if there is a selection (i.e. cursor in place)
    if (selection.rangeCount !== 0) {
      // Store the original range
      const range = window.getSelection().getRangeAt(0);
      // Clone the range
      const preCaretRange = range.cloneRange();
      // Select all textual contents from the contenteditable element
      preCaretRange.selectNodeContents(element);
      // And set the range end to the original clicked position
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      // Return the text length from contenteditable start to the range end
      position = preCaretRange.toString().length;
    }
  }
  return position;
};

export const updateIndex = (event, element) => {
  const textPosition = document.getElementById("caretIndex");
  if (element.contains(event.target)) {
    textPosition.innerText = getCaretIndex(element).toString();
  } else {
    textPosition.innerText = "–";
  }
};

// export const toggleTooltip = (event, contenteditable) => {
//   const tooltip = document.getElementById("tooltip");
//   if (contenteditable.contains(event.target)) {
//     const { x, y } = getCaretCoordinates();
//     tooltip.setAttribute("aria-hidden", "false");
//     tooltip.setAttribute(
//       "style",
//       `display: inline-block; left: ${x - 32}px; top: ${y - 36}px`
//     );
//   } else {
//     tooltip.setAttribute("aria-hidden", "true");
//     tooltip.setAttribute("style", "display: none;");
//   }
// };

export const setNativeValue = (element, value) => {
  const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(
    prototype,
    "value"
  ).set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
};

export const dynamicReplace = (inputString, pattern, replacement) => {
  const regex = new RegExp(pattern, "g");
  return inputString.replace(regex, replacement);
};

export const extractWordFromDelimiter = (word, delimiterLength) => {
  const myWord = word.split("");
  myWord.splice(0, delimiterLength || 1).join("");
  myWord.splice(-(delimiterLength || 1));
  return myWord.join("");
};

export const replaceWordInPhrase = (inputString, pattern, replacement) => {
  const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
  const regex = new RegExp(escapedPattern, "g");
  return inputString.replace(regex, replacement);
};

export const extractWordsInCustomSymbols = (
  sentence,
  openSymbol,
  closeSymbol
) => {
  const pattern = new RegExp(
    `${escapeRegExp(openSymbol)}([^${escapeRegExp(
      closeSymbol
    )}]+)${escapeRegExp(closeSymbol)}`,
    "g"
  );
  const matches = [];

  let match;
  while ((match = pattern.exec(sentence)) !== null) {
    matches.push(match[1]);
  }

  return matches;
};

export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

//prettier-ignore
export const wordIsSurroundedBy = (word, openSymbol, closeSymbol) => {
  console.log(word, openSymbol, closeSymbol)
  const pattern = new RegExp(`${escapeRegExp(openSymbol)}([^${escapeRegExp(closeSymbol)}]+)${escapeRegExp(closeSymbol)}`, 'g');
   return pattern.test(word)
}
