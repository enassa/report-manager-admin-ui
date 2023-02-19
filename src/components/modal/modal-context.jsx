import React from "react";
import { useState } from "react";

const ModalContext = React.createContext();
export const ModalProvider = ({ children }) => {
  const [viewModal, setViewModal] = useState(true);

  const [modalState, setModalState] = useState({
    state: false,
    message: undefined,
    response: undefined,
    callBack: () => {
      console.log("modal response");
    },
  });
  const showModal = (message, callBack) => {
    setViewModal(true);
    setModalState({
      state: true,
      message: message,
      callBack,
    });
  };
  const closeModal = (response) => {
    modalState.callBack(response);
    setViewModal(false);
    setModalState({
      state: false,
      message: undefined,
      response: response,
    });
  };
  return (
    <ModalContext.Provider
      value={{ modalState, showModal, closeModal, setViewModal, viewModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => React.useContext(ModalContext);
