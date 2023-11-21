import React from "react";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";

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
    className="w-1/3 h-3/4 border mx-auto mt-20 bg-white shadow shadow-lg"
    >
          <button onClick={onClose} className="float-right p-4"> <IoMdClose className="w-6 h-6" /> </button>
        <div className="flex justify-between mt-20">
        <h1 className="text-3xl mx-auto font-semibold p-4"> Get on Board </h1>
        </div>

       <form className="flex flex-col mt-6 justify-center items-center w-full">
        <div className="flex mb-2 gap-1 w-4/5">
        <input className="border p-2 w-1/2" placeholder="First Name" />
        <input  className="border p-2 w-1/2" placeholder="Last Name" />
        </div>
        <div className="flex flex-col gap-2 w-4/5">
        <input className="border p-2" placeholder="Email" />
        <input  className="border p-2" placeholder="Password" />
        <input  className="border p-2" placeholder="Confirm Password"/>
        </div>
        <button className="btn btn-neutral mt-4 hover:text-white"> Sign Up </button>
       </form>
    </ReactModal>
  );
};

export default ModalComponent;
