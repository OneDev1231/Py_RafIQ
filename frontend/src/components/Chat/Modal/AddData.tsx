import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { resetDocument, uploadDocument } from "redux/reducers/documents";

import { Button } from "components";
import UploadFile from "../../UserDashboard/PopUp/tickImg";

const AddData = () => {
  const dispatch = useAppDispatch();
  const { uploaded } = useAppSelector((state) => state.documents);

  const [value, setValue] = useState<any>("1");
  const [file, setFile] = useState<any>(null);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    type: yup.string(),
    website_link: yup.string(),
  });

  const initialValues = {
    name: "",
    type: "DOCUMENT",
    website_link: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: any) => {
      const obj: any = {
        type: values.type,
        name: values.name,
      };
      if (values.type === "DOCUMENT") {
        obj.file = file;
      } else {
        obj.website_link = values.website_link;
      }
      dispatch(uploadDocument({ ...obj }));
    },
  });

  const handleUpload = (file: any) => {
    setFile(file);
  };
  function onChangeValue(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    if (uploaded === true) {
      toast.success("Upload document successfully!");
      formik.resetForm();
      setFile(null);
      dispatch(resetDocument());
    }
  }, [uploaded]);

  const { values, errors, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label className="dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14px] max-xl:leading-[20px] text-[#263238] ">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name"
              defaultValue="Lorem Ipsum"
              className="placeholder:text-[#263238] placeholder:opacity-40 dark:placeholder:text-[#fff] dark:border-[#FFFFFF2E] dark:text-[#fff] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#263238]"
            />
            {errors && errors.name && (
              <p className="text-[12px] text-red mt-1">{errors.name || ""}</p>
            )}
          </div>
          <div className="my-[18px] w-full">
            <label className=" dark:text-[#FFFFFF] opacity-50 font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14px] max-xl:leading-[20px] text-[#263238] ">
              Data Type
            </label>
            <div className="relative w-full mt-[10px]">
              <select
                name="type"
                value={values.type}
                onChange={handleChange}
                className="w-full dark:bg-[#373636] dark:border-[#FFFFFF26] dark:text-white font-[Satoshi] not-italic font-[500] text-[14px] leading-[19px] text-[#263238] block appearance-none bg-white rounded-[8px] border-[1.5px] border-solid border-[#00000014] px-[19px] py-[14px]"
              >
                <option
                  value="DOCUMENT"
                  className="text-[#263238] dark:text-white font-[500] text-[14px] leading-[19px] "
                >
                  Documents
                </option>
                <option
                  value="WEBSITE"
                  className="text-[#263238] dark:text-white font-[500] text-[14px] leading-[19px] "
                >
                  Website
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:!text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {values.type === "DOCUMENT" ? (
          <div className="mt-[20px] w-[98%] ml-[2px]">
            <div className="w-full opacity-50 dark:text-[#FFFFFF] font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
              Upload Document
            </div>
            <div className="mt-[10px]">
              <UploadFile
                onUpdate={handleUpload}
                multiple={false}
                preview={true}
                types={["pdf", "doc", "docx", "msword", "csv", "txt", "plain"]}
              />
            </div>
            {/* <div className="mt-[10px] flex justify-center border-[1.5px] border-dashed py-[60px] border-[#00ADB5] rounded-[8px] bg-[#00adb50f]">
          <div className="text-center">
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span className="dark:text-white font-Satoshi not-italic font-[400] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#263238]">
                  Drag & drop your file or,{" "}
                  <span className="text-[#00ADB5]">Browse</span>
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
            </div>
          </div>
        </div> */}
          </div>
        ) : (
          <div>
            <div className="w-full flex flex-row dark:text-[#FFFFFF] font-Satoshi not-italic font-[500] text-[13px] leading-[18px] max-md:text-[13px] max-md:leading-[18px] max-xl:text-[14.6957px] max-xl:leading-[20px] text-[#263238] ">
              <p className="opacity-50">Website Link</p>{" "}
              <div className="text-[#00ADB5] ml-auto">+ Add More</div>
            </div>
            <input
              name="website_link"
              value={values.website_link}
              onChange={handleChange}
              type="text"
              placeholder="Ex: www.apple.com"
              className="placeholder:text-[#263238] placeholder:opacity-40 dark:placeholder:text-[#7C7B7C] dark:border-[#FFFFFF2E] dark:text-[#fff] w-full border-[1.7px] border-solid border-[#00000014] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] max-md:text-[14px] max-md:leading-[19px] max-xl:text-[16px] max-xl:leading-[21px] text-[#263238]"
            />
          </div>
        )}

        <div className="w-full text-center mt-[25px] max-sm:mt-[50px]">
          <Button
            variant="outlined"
            className="w-[160px] h-[35px] max-sm:h-[35px] max-xl:h-[40px] mr-[10px] max-sm:w-[48%] text-sm bg-white dark:!text-white dark:bg-[#373636] !text-[#263238] border-[#26323826] dark:border-[#ffffff26] px-[22px] py-[8px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="w-[160px] h-[35px] max-sm:h-[35px] max-xl:h-[40px] max-sm:w-[48%] text-sm"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddData;
