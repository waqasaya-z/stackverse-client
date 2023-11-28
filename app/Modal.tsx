import React from "react";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import SignupForm from "./components/SignupForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ModalComponent = ({ open, onClose }: Props) => {
  if (!open) return null;

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      contentLabel="Modal"
      role="form"
      ariaHideApp={false}
      className="w-1/3 h-3/4 border mx-auto mt-20 bg-white shadow-xl"
    >
      <button onClick={onClose} className="float-right p-4">
        {" "}
        <IoMdClose className="w-6 h-6" />{" "}
      </button>
      <div className="flex justify-between mt-20">
        <h1 className="text-3xl mx-auto font-semibold p-4"> Get on Board </h1>
      </div>
      <SignupForm onClose={onClose} />
    </ReactModal>
  );
};

export default ModalComponent;
