import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { ModalProvider } from "./components/modal/modal-context";
import "./index.css";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>
  // </React.StrictMode>
);
// const {
//   Graduation_Year,
//   Name,
//   Gender,
//   JHS_No,
//   Unique_Id,
//   First_Name,
//   Surname,
//   Other_Names,
//   Email,
//   DOB,
//   BECE_Index,
//   Programme,
//   Class,
//   Residential_Status,
//   Guardians_Contact,
//   Whatsapp,
//   Call_Contact,
//   WASSCE_Index,
//   Track,
//   Region,
//   City,
//   Area,
//   House,
//   Guardians_Name,
//   Guardians_Email,
//   Guardians_Profession,
//   image,
//   reports,
// } = userData;
