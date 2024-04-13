// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState, useEffect, useContext } from "react";
// import { SettingsContext } from "../_context/Settings";

// interface CardModalProps {
//   isOpen: any;
//   setIsOpen: any;
//   id?: any;
//   form: any;
// }

// export default function CardModal({
//   isOpen,
//   setIsOpen,
//   id,
//   form,
// }: CardModalProps) {
//   const [currentForm, setCurrentForm] = useState(form.mainForm);
//   const [previousForm, setPreviousForm] = useState(null);
//   const { settings } = useContext(SettingsContext)!;

//   useEffect(() => {
//     // Load form details from local storage if id is provided
//     if (id) {
//       const savedForms = [] || [];
//       const form = savedForms.find((form: any) => form.id === id);
//       if (form) {
//         setCurrentForm(form);
//       }
//     }
//   }, [id]);

//   const closeModal = () => {
//     setIsOpen(false);
//     setCurrentForm(form.mainForm);
//     setPreviousForm(null);
//   };

//   const saveForm = () => {
//     const savedForms: any = [] || [];
//     const formIndex = savedForms.findIndex((form: any) => form.id === id);
//     if (formIndex !== -1) {
//       // Update the form if it exists
//       savedForms[formIndex] = currentForm;
//     } else {
//       // Add a new form if it doesn't exist
//       savedForms.push(currentForm);
//     }
//     localStorage.setItem("forms", JSON.stringify(savedForms));
//     closeModal();
//   };

//   const openForm = (formName: any) => {
//     const formToOpen =
//       formName === form.mainForm.name ? form.mainForm : form.supportingForm;
//     setPreviousForm(currentForm);
//     setCurrentForm(formToOpen);
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed inset-0 z-10 overflow-y-auto"
//         onClose={closeModal}
//       >
//         <div className="min-h-screen px-4 text-center">
//           <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

//           <span
//             className="inline-block h-screen align-middle"
//             aria-hidden="true"
//           >
//             ​
//           </span>

//           <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
//             <Dialog.Title
//               as="h3"
//               className="text-lg font-medium leading-6 text-gray-900"
//             >
//               {currentForm.title}
//             </Dialog.Title>

//             {previousForm && (
//               <button
//                 type="button"
//                 className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                 onClick={() => setCurrentForm(previousForm)}
//               >
//                 Go Back
//               </button>
//             )}

//             <div className="mt-2">
//               {currentForm.fields.map((field: any, index: any) =>
//                 field.type === "button" ? (
//                   <button
//                     key={index}
//                     type="button"
//                     className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                     onClick={() => openForm(field.targetForm)}
//                   >
//                     {field.name}
//                   </button>
//                 ) : (
//                   <input
//                     key={index}
//                     type="text"
//                     name={field.name}
//                     id={field.name}
//                     className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     placeholder={field.placeholder}
//                     value={field.value}
//                     disabled={field.disabled}
//                     onChange={(e) =>
//                       setCurrentForm({
//                         ...currentForm,
//                         fields: currentForm.fields.map((f: any, i: any) =>
//                           i === index ? { ...f, value: e.target.value } : f
//                         ),
//                       })
//                     }
//                   />
//                 )
//               )}
//             </div>

//             <div className="mt-4">
//               <button
//                 type="button"
//                 className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
//                 onClick={saveForm}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }

// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState, useEffect } from "react";

// interface Field {
//   id?: any;
//   name: string;
//   placeholder?: string;
//   value?: string;
//   disabled?: boolean;
//   type?: string;
//   targetForm?: string;
// }

// interface Form {
//   id?: any;
//   name: string;
//   title: string;
//   fields: Field[];
// }

// interface CardModalProps {
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
//   id?: string;
//   form: {
//     mainForm: Form;
//     supportingForm: Form;
//     viewUrlForm: Form;
//   };
// }

// export default function CardModal({
//   isOpen,
//   setIsOpen,
//   id,
//   form,
// }: CardModalProps) {
//   const [currentForm, setCurrentForm] = useState<Form>(form.mainForm);
//   const [previousForm, setPreviousForm] = useState<Form | null>(null);
//   const [urls, setUrls] = useState<Field[]>([]);

//   useEffect(() => {
//     // Load form details from local storage if id is provided
//     if (id) {
//       const savedForms: any = [];
//       const form = savedForms.find((form: Form) => form.id === id);
//       if (form) {
//         setCurrentForm(form);
//       }
//     }
//   }, [id]);

//   const closeModal = () => {
//     setIsOpen(false);
//     setCurrentForm(form.mainForm);
//     setPreviousForm(null);
//   };

//   const saveForm = () => {
//     const savedForms: any = [];
//     const formIndex = savedForms.findIndex((form: Form) => form.id === id);
//     if (formIndex !== -1) {
//       // Update the form if it exists
//       savedForms[formIndex] = currentForm;
//     } else {
//       // Add a new form if it doesn't exist
//       savedForms.push(currentForm);
//     }
//     localStorage.setItem("forms", JSON.stringify(savedForms));
//     closeModal();
//   };

//   const saveUrl = (url: Field) => {
//     setUrls([...urls, url]);
//     localStorage.setItem("urls", JSON.stringify(urls));
//   };

//   const deleteUrl = (urlId: string) => {
//     setUrls(urls.filter((url: Field) => url.id !== urlId));
//     localStorage.setItem("urls", JSON.stringify(urls));
//   };

//   const openForm = (formName: string) => {
//     const formToOpen =
//       formName === form.mainForm.name ? form.mainForm : form.supportingForm;
//     setPreviousForm(currentForm);
//     setCurrentForm(formToOpen);
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="fixed inset-0 z-10 overflow-y-auto"
//         onClose={closeModal}
//       >
//         <div className="min-h-screen px-4 text-center">
//           <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

//           <span
//             className="inline-block h-screen align-middle"
//             aria-hidden="true"
//           >
//             ​
//           </span>

//           <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
//             <Dialog.Title
//               as="h3"
//               className="text-lg font-medium leading-6 text-gray-900"
//             >
//               {currentForm.title}
//             </Dialog.Title>

//             {previousForm && (
//               <button
//                 type="button"
//                 className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                 onClick={() => setCurrentForm(previousForm)}
//               >
//                 Go Back
//               </button>
//             )}

//             <div className="mt-2">
//               {currentForm.fields.map((field, index) =>
//                 field.type === "button" ? (
//                   <button
//                     key={index}
//                     type="button"
//                     className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                     onClick={() => openForm(field.targetForm!)}
//                   >
//                     {field.name}
//                   </button>
//                 ) : (
//                   <input
//                     key={index}
//                     type="text"
//                     name={field.name}
//                     id={field.name}
//                     className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                     placeholder={field.placeholder}
//                     value={field.value}
//                     disabled={field.disabled}
//                     onChange={(e) =>
//                       setCurrentForm({
//                         ...currentForm,
//                         fields: currentForm.fields.map((f, i) =>
//                           i === index ? { ...f, value: e.target.value } : f
//                         ),
//                       })
//                     }
//                   />
//                 )
//               )}
//             </div>

//             <div className="mt-4">
//               <button
//                 type="button"
//                 className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
//                 onClick={saveForm}
//               >
//                 Save
//               </button>
//             </div>

//             {currentForm.name === "viewUrlForm" && (
//               <div className="mt-4">
//                 {urls.map((url, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center mt-2"
//                   >
//                     <input
//                       type="text"
//                       name={url.name}
//                       id={url.name}
//                       className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//                       placeholder={url.placeholder}
//                       value={url.value}
//                       disabled={url.disabled}
//                       onChange={(e) =>
//                         setUrls(
//                           urls.map((u, i) =>
//                             i === index ? { ...u, value: e.target.value } : u
//                           )
//                         )
//                       }
//                     />
//                     <button
//                       type="button"
//                       className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
//                       onClick={() => deleteUrl(url.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   className="inline-flex justify-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                   //   onClick={saveUrl}
//                 >
//                   Save URLs
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type FieldType = {
  name: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  type: string;
  targetForm?: string;
};

type FormType = {
  name: string;
  title: string;
  fields: FieldType[];
  supportingForm?: FormType;
};

type DialogComponentProps = {
  formProps: FormType;
  id?: string;
  onSave: (data: any) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  settings: any;
};

const DialogComponent: React.FC<DialogComponentProps> = ({
  formProps,
  id,
  onSave,
  isOpen,
  setIsOpen,
  settings,
}) => {
  const [formData, setFormData] = useState<any>({
    firstName: "abhi",
    lastName: "sharma",
  });

  useEffect(() => {
    if (id) {
      // Fetch data from settings prop and prepopulate form
      const data = settings[id]; // Fetch data based on id from settings prop
      setFormData(data);
    }
  }, [id, settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {}}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            ​
          </span>

          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              {formProps.title}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {formProps.fields.map((field) => {
                if (field.type === "button") {
                  return (
                    <button
                      key={field?.name}
                      type="button"
                      onClick={() => setIsOpen(true)}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {field.name}
                    </button>
                  );
                }

                return (
                  <div key={field?.name}>
                    <label htmlFor={field.name} className="sr-only">
                      {field.name}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      autoComplete="off"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}

              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogComponent;
