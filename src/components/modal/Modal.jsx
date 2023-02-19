import React from "react";
import TButton from "./../button/Button";
import { useModal } from "./modal-context";

export default function Modal() {
  const { modalState, closeModal, setViewModal, viewModal } = useModal();
  const handleUserClick = (response) => {
    setViewModal(false);
    setTimeout(() => {
      closeModal(response);
    }, 100);
  };
  return (
    <div className="w-full h-full pointer-events-none fixed top-0 mr-0 z-[20]">
      {modalState.state && (
        <div
          //   onClick={() => handleUserClick(false)}
          className={`w-full z-[15] h-full  ${
            viewModal ? "animate-fadeIn  " : "animate-fadeOut "
          }flex justify-center  items-center bg-[rgb(0,0,0,0.5)] pointer-events-auto`}
        >
          <div
            className={`w-[500px] ${
              viewModal ? "animate-rise " : "animate-descend"
            } h-[270px] bg-white shadow-md rounded-md relative  flex justify-start flex-col p-[20px] pointer-events-none`}
          >
            <div className="w-full h-full flex justify-center items-center text-xl pointer-events-none">
              {modalState.message ?? "Do you really want to do this?"}
            </div>
            <div className="w-full flex justify-end right-[15px]  pointer-events-none">
              <TButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserClick(true);
                }}
                className="w-[80px] border-0 mr-[10px] pointer-events-auto"
              >
                Yes
              </TButton>
              <TButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserClick(false);
                }}
                className="w-[80px] bg-red-400 border-0 pointer-events-auto"
              >
                No
              </TButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
