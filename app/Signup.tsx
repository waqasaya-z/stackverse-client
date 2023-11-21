import React, { ReactNode } from 'react'
import Modal from 'react-modal'

interface Props{
  isOpen: boolean
  onClose: () => void
}

Modal.setAppElement('#root');

const MyModal = ({isOpen, onClose} : Props) => {
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className="modal fixed inset-0 flex items-center justify-center overflow-auto"
    overlayClassName="modal-overlay fixed inset-0 bg-black opacity-50"
  >
    <div className="bg-white p-6 rounded shadow-md">
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Close
      </button>
    </div>
  </Modal>

  )
}

export default MyModal