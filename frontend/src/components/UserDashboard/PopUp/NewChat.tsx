import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Axios from "config/api";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  getAllMyChatbots,
  resetChatbot,
  createChatbot,
} from "redux/reducers/chatbots";
import { resetDocument, uploadDocument } from "redux/reducers/documents";
import { getProfile } from "redux/reducers/users";

import iconTick from "assets/img/settings/Vector.png";
import iconTickDark from "assets/img/settings/VectorDark.png";
import arrowsquareleft from "assets/img/settings/arrowsquareleft.png";
import arrowsquareleftDark from "assets/img/settings/arrowsquareleftDark.png";

import TickImg from "./tickImg";
import Files from "./Files";
import Website from "./Website";
import FilesWebsite from "./FilesWebsite";

type Props = {
  open: boolean;
  onClose: () => void;
};

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const NewChat = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { document, uploaded, errors } = useAppSelector(
    (state) => state.documents
  );
  const { newChatbot, isCreated } = useAppSelector(
    (state) => state.chatbots
  );
  const { user } = useAppSelector(
    (state) => state.users
  );

  const cancelButtonRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const [english, setEnglish] = useState<any>("english");
  const [textCss, setTextCss] = useState<any>("Files");
  const [content, setContent] = useState<any>("Files");
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [files, setFiles] = useState<any>([]);
  const [documents, setDocuments] = useState([]);
  const [linkWeb, setLinkWeb] = useState<any>(null);
  const [formValues, setFormValues] = useState<any>(null);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

  const initialValues = {
    name: "",
  };

  const handleSubmit = (values: any) => {
    let data = {
      name: values.name,
      user: user.id,
      thumbnail: thumbnail || "",
      data_language: english === "notEnglish" ? "NOT-ENGLISH" : "ENGLISH",
      data_source: content === "Website" ? "WEBSITE" : "FILES",
      website_link: linkWeb ? linkWeb : "",
      documents_id: [],
    };
    setFormValues(data);

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        dispatch(uploadDocument({ file, name: file.name, website_link: "", type: "DOCUMENT" }));
      }
    } else {
      // create
      dispatch(createChatbot({ data }));
    }
  };

  const handleUploadThumbnail = (file: any) => {
    getBase64(file).then((data: any) => {
      setThumbnail(data);
    })
  };

  const handleUploadFiles = (docs: any) => {
    setFiles(docs);
  };

  const handleChangeWeb = (link: string) => {
    setLinkWeb(link);
  };

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnglish(event.target.value);
  };

  const onChangeValueContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContent(value);
    setTextCss(value);
    setFiles([]);
  };

  useEffect(() => {
    if (isCreated === true && newChatbot) {
      dispatch(getAllMyChatbots());
      toast.success("Created chatbot successfully!");
      setDocuments([]);
      setFiles([]);
      onClose();
    }
  }, [isCreated, newChatbot]);

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }

    return () => {
      dispatch(resetChatbot());
    }
  }, []);

  useEffect(() => {
    if (document && uploaded) {
      let ids: any = documents;
      ids.push(document.id);
      setDocuments(ids);
    if (documents.length === files.length && documents.length > 0) {
      // create chatbot
      dispatch(createChatbot({ data: { ...formValues, documents_id: documents } }));
    }
      // dispatch(resetDocument())
    }
  }, [document, uploaded]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center text-center sm:items-center sm:bg-[#0000008C]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" relative transform overflow-hidden bg-white dark:bg-[#373636] text-left shadow-xl transition-all  sm:my-8 w-[506px] max-xl:w-[572px] max-sm:w-full">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, actions) => {
                    handleSubmit(values);
                  }}
                >
                  {({ values, errors, touched, handleChange }) => {
                    return (
                      <Form>
                        <div className="flex flex-row p-[24px] max-xl:p-[20px] border-b-[1px] border-solid border-[#0000001F] dark:border-[#FFFFFF38]">
                          <button
                            type="button"
                            onClick={onClose}
                            ref={cancelButtonRef}
                            className="sm:hidden hover:opacity-70"
                          >
                            <Image
                              className="w-[20px] h-auto"
                              src={
                                theme === "dark"
                                  ? arrowsquareleftDark
                                  : arrowsquareleft
                              }
                              alt=""
                            />
                          </button>
                          <h1 className="max-md:font-[500] mr-auto font-Satoshi not-italic font-[700] text-[20px] leading-[27px] text-[#000000] dark:text-[#FFFFFF] capitalize max-xl:font-[700] max-xl:text-[17px] max-xl:leading-[23px] max-sm:ml-auto max-sm:pr-[20px]">
                            Create Custom Chatbot
                          </h1>
                          <button
                            type="button"
                            onClick={onClose}
                            ref={cancelButtonRef}
                            className="max-sm:hidden hover:opacity-70"
                          >
                            <Image
                              className="w-[20px] h-auto"
                              src={theme === "dark" ? iconTickDark : iconTick}
                              alt=""
                            />
                          </button>
                        </div>

                        <div className="px-[22px] py-[28px] max-sm:px-[10px] max-sm:py-[30px]">
                          <div>
                            <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
                              Name of the chatbot
                            </label>
                            <input
                              name="name"
                              onChange={handleChange}
                              placeholder="Ex: Website Development"
                              className="dark:border-[#FFFFFF2E] dark:text-[#fff] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#7C7B7C]"
                            />
                          </div>
                          <div className="my-[30px] max-xl:my-[34px] max-md:my-[30px]">
                            <label className="dark:text-[#FFFFFF] opacity-50  font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
                              Chatbot thumbnail (optional)
                            </label>
                            <div className="mt-[10px] mb-[30px]">
                              <TickImg
                                onUpdate={handleUploadThumbnail}
                                multiple={false}
                                preview={true}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="dark:text-[#FFFFFF] font-Satoshi not-italic font-[700] text-[15px] leading-[20px] max-md:text-[15px] max-md:leading-[20px] max-xl:text-[17px] max-xl:leading-[23px] text-[#263238] ">
                              Data Language
                            </label>
                            <div className="mt-[10px] font-Satoshi not-italic font-[500] text-[15px] leading-[20px] max-md:text-[15px] max-md:leading-[20px] max-xl:text-[17px] max-xl:leading-[23px] text-[#263238] dark:text-[#FFFFFF60]">
                              <input
                                onChange={onChangeValue}
                                type="radio"
                                value="english"
                                defaultChecked={true}
                                name="Language"
                                className="mr-[10px] bg-[red] text-[#red] indeterminate:bg-slate-300"
                              />
                              <span
                                className={
                                  english == "english" ? "text-[#00ADB5]" : ""
                                }
                              >
                                English
                              </span>
                              <input
                                onChange={onChangeValue}
                                type="radio"
                                value="notEnglish"
                                name="Language"
                                className="mr-[10px] ml-[33px] radio:bg-black focus:bg-[red] focus:text-[red] "
                              />
                              <span
                                className={
                                  english == "notEnglish"
                                    ? "text-[#00ADB5]"
                                    : ""
                                }
                              >
                                Not English
                              </span>
                            </div>
                          </div>

                          <div className="my-[30px]">
                            <label className="dark:text-[#FFFFFF] font-Satoshi not-italic font-[700] text-[15px] leading-[20px] max-md:text-[15px] max-md:leading-[20px] max-xl:text-[17px] max-xl:leading-[23px] text-[#263238] ">
                              Data source
                            </label>
                            <div className="mt-[10px] font-Satoshi not-italic font-[500] text-[15px] leading-[20px] max-md:text-[15px] max-md:leading-[20px] max-xl:text-[17px] max-xl:leading-[23px] text-[#263238] dark:text-[#FFFFFF60]">
                              <input
                                onChange={onChangeValueContent}
                                type="radio"
                                value="Files"
                                defaultChecked={true}
                                name="source"
                                className="mr-[10px]"
                              />
                              <span
                                className={
                                  textCss == "Files" ? "text-[#00ADB5]" : ""
                                }
                              >
                                Files
                              </span>
                              <input
                                onChange={onChangeValueContent}
                                type="radio"
                                value="Website"
                                name="source"
                                className="mr-[10px] ml-[33px]"
                              />
                              <span
                                className={
                                  textCss == "Website" ? "text-[#00ADB5]" : ""
                                }
                              >
                                Website
                              </span>
                              <input
                                onChange={onChangeValueContent}
                                type="radio"
                                value="FilesWebsite"
                                name="source"
                                className="mr-[10px] ml-[33px]"
                              />
                              <span
                                className={
                                  textCss == "FilesWebsite"
                                    ? "text-[#00ADB5]"
                                    : ""
                                }
                              >
                                Files & Website
                              </span>
                            </div>
                            {content == "FilesWebsite" ? <FilesWebsite onChangeLink={handleChangeWeb} onUpload={handleUploadFiles} /> : ""}
                            {content == "Website" ? (
                              <Website onChangeLink={handleChangeWeb} />
                            ) : (
                              ""
                            )}
                            {content == "Files" ? (
                              <Files onUpload={handleUploadFiles} />
                            ) : (
                              ""
                            )}

                            <div className="w-full flex mt-[30px] ">
                              <button
                                type="button"
                                className="dark:border-[#FFFFFF1F] dark:text-[#FFFFFF] p-[9px] rounded-[9px] w-[160px] max-xl:w-[180px] max-sm:w-[49%] ml-auto   border-[1.13px] border-solid border-[#0000001F] font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[16px] max-xl:leading-[21px] text-[#263238] capitalize hover:opacity-70"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="p-[9px] rounded-[9px] w-[160px] max-xl:w-[180px] max-sm:w-[49%] mr-auto ml-[11px] bg-[#00ADB5] border-b-[1.13px] border-solid border-[#00ADB5] font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[16px] max-xl:leading-[21px] text-[#FDFDFD] capitalize hover:opacity-70"
                              >
                                Create chatbot
                              </button>
                            </div>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NewChat;
