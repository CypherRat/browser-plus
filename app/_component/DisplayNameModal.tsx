import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { DisplayNameContext } from "../_context/DisplayName";
import toast from "react-hot-toast";
import { ConfirmDialogProps } from "../_shared/types";
import { defaultConfirmDialogSetup } from "../_shared/constants";
import { ConfirmDialog } from "../(ui)/settings/_utils";
import Button from "./Button";

Modal.setAppElement("#my-browser-window");

interface DisplayNameModalProps {
  supportingBoolFn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayNameModal: React.FC<DisplayNameModalProps> = ({
  supportingBoolFn,
}) => {
  const { displayName, setDisplayName } = useContext(DisplayNameContext)!;
  const [name, setName] = useState(displayName?.val ?? "");
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogProps>(
    defaultConfirmDialogSetup
  );

  const workSupportingBookFn = (boolState: boolean) => {
    if (supportingBoolFn) supportingBoolFn(boolState);
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (name.trim().length) {
      const jsonBucket = { isNameSkipped: false, val: name.trim() };
      setDisplayName(jsonBucket);
      toast.success("Successfully saved display name");
      setModalIsOpen(false);
      workSupportingBookFn(false);
    } else {
      toast.error("Display name is required on save");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClose = () => {
    setModalIsOpen(false);
    workSupportingBookFn(false);
  };

  const handleSkip = () => {
    const jsonBucket = { isNameSkipped: true, val: null };
    if (name.trim().length === 0) {
      setDisplayName(jsonBucket);
      setModalIsOpen(false);
      workSupportingBookFn(false);
    } else {
      const skipName = () => {
        setDisplayName(jsonBucket);
        toast.success("Successfully skipped display name");
        setModalIsOpen(false);
        workSupportingBookFn(false);
      };
      setConfirmDialog({
        isOpen: true,
        description:
          "You have already provided a name, skipping will override it.",
        onAccept: skipName,
      });
      // const isSkipConfirm = confirm(
      //   "You have provided a name, do you still want to skip?"
      // );
      // if (isSkipConfirm) {
      //   setDisplayName(jsonBucket);
      //   toast.success("Successfully skipped display name");
      //   setModalIsOpen(false);
      //   workSupportingBookFn(false);
      // } else {
      //   toast.error("Cancelled skipping name");
      // }
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        contentLabel="Display Name Modal"
        className="outline-none"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="flex flex-row bg-primary-bg text-black rounded shadow-lg w-auto overflow-hidden">
          <div className="flex flex-col space-y-6 px-12 py-6 pt-10 items-center justify-center">
            <h2 className="text-2xl text-primary-text font-bold">
              What should I call you?
            </h2>
            <form className="flex flex-row overflow-hidden">
              <input
                type="text"
                placeholder="Enter Display Name"
                value={name}
                autoFocus
                onChange={handleChange}
                className="border border-gray-400 text-secondary-text py-3 px-3 w-full outline-none"
              />
              <button
                type="submit"
                onClick={handleSave}
                className="bg-button-bg text-white py-2 px-4 hover:bg-button-hover transition duration-200 disabled:bg-gray-400"
                disabled={name.trim().length === 0}
              >
                Save
              </button>
            </form>
            <div className="flex flex-row gap-2">
              <div
                className="text-sm cursor-pointer font-medium text-secondary-text hover:text-primary-text"
                onClick={handleSkip}
              >
                Skip
              </div>
              {!displayName?.isNameSkipped && (
                <div
                  className="text-sm cursor-pointer text-red-600 hover:text-red-800"
                  onClick={handleClose}
                >
                  Close
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <ConfirmDialog
        isOpen={confirmDialog?.isOpen}
        description={confirmDialog?.description}
        setConfirmDialog={setConfirmDialog}
        onAccept={confirmDialog?.onAccept}
      />
    </>
  );
};

export default DisplayNameModal;
