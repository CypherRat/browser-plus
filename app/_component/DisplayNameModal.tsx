import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { DisplayNameContext } from "../_context/DisplayName";
import toast from "react-hot-toast";

Modal.setAppElement("#my-browser-window");

const DisplayNameModal: React.FC = () => {
  const { setDisplayName } = useContext(DisplayNameContext)!;
  const [name, setName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleSave = () => {
    if (name.length) {
      const jsonBucket = { isNameSkipped: false, val: name };
      setDisplayName(jsonBucket);
      toast.success("Successfully saved display name");
      setModalIsOpen(false);
    } else {
      toast.error("Display name is required on save");
    }
  };

  const handleSkip = () => {
    const jsonBucket = { isNameSkipped: true, val: null };
    if (name.trim().length === 0) {
      setDisplayName(jsonBucket);
      setModalIsOpen(false);
    } else {
      const isSkipConfirm = confirm(
        "You have provided a name, do you still want to skip?"
      );
      if (isSkipConfirm) {
        setDisplayName(jsonBucket);
        toast.success("Successfully skipped display name");
        setModalIsOpen(false);
      } else {
        toast.error("You cancelled skipping display name");
      }
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      contentLabel="Display Name Modal"
      className="outline-none"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="flex flex-row bg-white text-black rounded shadow-lg w-auto overflow-hidden">
        <div className="flex flex-col space-y-6 px-12 py-6 pt-10 items-center justify-center">
          <h2 className="text-2xl text-indigo-500 font-bold">
            What should I call you?
          </h2>
          <form className="flex flex-row overflow-hidden">
            <input
              type="text"
              placeholder="Enter Display Name"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 py-3 px-3 w-full outline-none"
            />
            <button
              type="submit"
              onClick={handleSave}
              className="bg-indigo-800 text-white py-2 px-4 hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400"
              disabled={name.length === 0}
            >
              Save
            </button>
          </form>
          <div className="text-sm cursor-pointer" onClick={handleSkip}>
            Skip
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DisplayNameModal;
