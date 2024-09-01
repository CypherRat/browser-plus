import { Fragment, useContext, useState, useEffect } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@/app/_component/Tooltip";
import { SettingsContext } from "@/app/_context/Settings";
import { getValueFromObject, updateNestedObject } from "@/app/_shared/utils";
import { ConfirmDialogProps } from "@/app/_shared/types";
import { defaultConfirmDialogSetup } from "@/app/_shared/constants";
import { useRouter } from "next/navigation";

interface SettingRowInterface {
  title: string;
  children: React.ReactNode;
  tooltipTitle?: string;
}

interface DialogModalInterface {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

interface InitialSetupInterface {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ConfirmDialogInterface {
  isOpen: boolean;
  setConfirmDialog: React.Dispatch<React.SetStateAction<ConfirmDialogProps>>;
  onAccept: () => void;
  description?: string | null;
}

interface ListBoxInterface {
  keyName: string;
  options: any[];
}

interface OptionProps {
  label: string;
  disabled: boolean;
}

export const SettingRow: React.FC<SettingRowInterface> = ({
  title,
  children,
  tooltipTitle,
}) => (
  <div className="flex justify-between items-start mb-4 select-none">
    <div className="font-semibold flex-shrink-0 w-44">
      {tooltipTitle ? (
        <Tooltip title={tooltipTitle} color="light">
          {title}
        </Tooltip>
      ) : (
        title
      )}
    </div>
    <div className="flex-grow">{children}</div>
  </div>
);

export const CustomListbox: React.FC<ListBoxInterface> = ({
  keyName,
  options,
}) => {
  const { settings, setSettings } = useContext(SettingsContext)!;
  const [selectedOption, setSelectedOption] = useState<OptionProps | null>(
    null
  );

  const handleOptionUpdate = (opts: any) => {
    setSelectedOption(opts);
    if (opts?.label) {
      const keyPath = `settings.${keyName}`;
      const newSettings = updateNestedObject(settings, keyPath, opts.label);
      setSettings(newSettings);
    }
  };

  useEffect(() => {
    const storedValue = getValueFromObject(settings?.settings, keyName);
    if (storedValue) {
      const matchingOption = options.find(
        (option) => option.label === storedValue
      );
      setSelectedOption(matchingOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <Listbox value={selectedOption} onChange={handleOptionUpdate}>
      <div className="relative">
        <Listbox.Button className="relative text-secondary cursor-default rounded-lg bg-secondary-bg py-2 pl-3 pr-10 text-left shadow-sm shadow-secondary/40 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            {selectedOption ? selectedOption.label : "No Options"}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <FontAwesomeIcon
              icon={faChevronDown}
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={option}
                disabled={option.disabled}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="h-5 w-5 "
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
    // <Listbox value={selectedOption} onChange={S}>
    //   <Listbox.Button>{selectedOption.label}</Listbox.Button>
    //   <Listbox.Options>
    //     {options.map((option) => (
    //       <Listbox.Option
    //         key={option.id}
    //         value={option}
    //         disabled={option.disabled}
    //       >
    //         {option.label}
    //       </Listbox.Option>
    //     ))}
    //   </Listbox.Options>
    // </Listbox>
  );
};

export const DialogModal: React.FC<DialogModalInterface> = ({
  isOpen,
  setIsOpen,
  title,
  children,
}) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      as="div"
      className="fixed inset-0 z-30 overflow-y-auto"
      onClose={() => setIsOpen(false)}
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-primary-bg shadow-xl rounded-2xl">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-primary-text font-bold text-center mb-8"
          >
            {title}
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer float-right fa-lg text-secondary-text"
            />
          </Dialog.Title>

          <div className="mt-2">{children}</div>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export const ConfirmDialog: React.FC<ConfirmDialogInterface> = ({
  isOpen,
  setConfirmDialog,
  onAccept,
  description,
}) => {
  const closeModal = () => {
    setConfirmDialog(defaultConfirmDialogSetup);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block [w-full] max-w-sm p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h2"
              className="text-2xl tracking-tight text-center font-medium leading-6 text-gray-900"
            >
              Are you sure?
            </Dialog.Title>
            {description && (
              <div className="my-4">
                <p className="text-sm tracking-wide leading-relaxed text-center text-gray-500">
                  {description}
                </p>
              </div>
            )}

            <div className="mt-4 flex justify-center space-x-4">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-button-bg border border-transparent rounded-md hover:bg-button-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => {
                  onAccept();
                  closeModal();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const InitialSetupDialog: React.FC<InitialSetupInterface> = ({
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleSure = () => {
    router.push("/settings");
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 bg-black/50 flex justify-end items-end sm:p-8 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="text-center w-full sm:w-auto transition-all">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative rounded-lg overflow-hidden shadow-xl transition-all sm:max-w-xs sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Lets setup the app for you
                    </Dialog.Title>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-center items-center gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                >
                  Skip
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                  onClick={handleSure}
                >
                  Sure
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
