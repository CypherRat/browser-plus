import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { DisplayNameContext } from "../_context/DisplayName";

Modal.setAppElement("#my-browser-window");

const DisplayNameModal: React.FC = () => {
  const { setDisplayName } = useContext(DisplayNameContext)!;
  const [name, setName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(true);

  const handleSave = () => {
    setDisplayName(name);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Display Name Modal"
      className="flex items-center justify-center outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-2xl mb-4">Enter Display Name</h2>
        <input
          type="text"
          placeholder="Display Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default DisplayNameModal;
