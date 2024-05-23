import React, { useState, useEffect } from "react";
import DashboardLayout from "layouts/DashboardLayout";
import Image from "next/image";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getProfile, resetUser, updateProfile } from "redux/reducers/users";

import avatar from "assets/img/settings/Ellipse9.png";
import icon from "assets/img/settings/Group125.png";
import Plan from "components/Settings/Plan";
import Subscription from "components/Settings/Subscription";

const Settings = () => {
  const dispatch = useAppDispatch();
  const { user, isUpdated } = useAppSelector((state) => state.users);
  const [openPlans, setOpenPlans] = useState<boolean>(false);
  const [password, setPassword] = useState<boolean>(true);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const onSubmit = (values: any) => {
    dispatch(updateProfile({ name: values.name, email: values.email }));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values: any) => {
      onSubmit(values);
    },
  });

  const handleTogglePlans = () => {
    setOpenPlans(!openPlans);
  };

  const onclickPass = () => {
    setPassword(!password);
  };

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }

    return () => {
      dispatch(resetUser());
    };
  }, []);

  useEffect(() => {
    if (isUpdated === true) {
      toast.success("Updated profile!");
      dispatch(resetUser());
      dispatch(getProfile());
    }
  }, [isUpdated]);

  useEffect(() => {
    if (user) {
      formik.setFieldValue("name", user.name);
      formik.setFieldValue("email", user.email);
    }
  }, [user]);

  const { values, errors, touched, handleChange, handleSubmit } = formik;
  console.log("errors: ", errors);
  return (
    <DashboardLayout>
      <div className="md:hidden mx-[10px] py-[22px] border-b-[1px] border-[#0000001F] dark:border-[#FFFFFF21] border-solid  font-[500] text-[16px] text-[#000000] dark:text-[#FFFFFF] leading-[22px] capitalize text-center">
        Profile Settings
      </div>
      <form onSubmit={handleSubmit}>
        <div className=" p-[40px] rounded-[3px] max-xl:px-[25px] max-xl:py-[30px] max-md:px-[10px] max-md:py-[32px]">
          <h1 className="capitalize font-Satoshi not-italic font-[500] text-[20px] leading-[27px] text-[#000000] dark:text-[#FFFFFF] max-md:text-[18px] max-md:leading-[24px]">
            Your profile picture
          </h1>
          <div className="mt-[25px] flex flex-row items-center">
            <Image
              src={
                user && user.userprofile && user.userprofile.profile_photo
                  ? user.userprofile.profile_photo
                  : "https://placehold.co/120x120"
              }
              alt=""
              width={123}
              height={123}
              className="mr-[18px] hover:cursor-pointer hover:opacity-70 h-auto w-[123px] rounded-full overflow-hidden"
            />
            <div>
              <button
                type="button"
                className="capitalize bg-[#00ADB5] rounded-[8px] w-[137px] h-[39px] px-[10px] mb-[13px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] text-[white] hover:cursor-pointer hover:opacity-70 max-md:text-[12px] max-md:leading-[16px]"
              >
                Change picture
              </button>
              <button
                type="button"
                className="capitalize relative flex flex-row items-center border-[1px] border-[solid] border-[rgba(255, 70, 70, 0.13)] dark:border-[#FFFFFF21] rounded-[8px] px-[10px] w-[137px] h-[39px] justify-center  text-[#FF4646] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] hover:cursor-pointer hover:opacity-70 max-md:text-[12px] max-md:leading-[16px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-[18px] h-[auto] absolute left-[10px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>

          <div className="my-[55px] max-w-[450px] max-xl:max-w-[700px] max-md:my-[30px]">
            <h2 className="capitalize font-Satoshi not-italic font-[500] text-[20px] leading-[27px] text-[#000000] dark:text-[#FFFFFF] mb-[7px] max-md:text-[18px] max-mdleading-[24px]">
              User info
            </h2>
            <div className=" mt-[18px]">
              <label className="font-Satoshi not-italic font-[500] text-[13px] leading-[18px] text-[#263238] dark:text-[#FFFFFF50]">
                Name
              </label>
              <input
                placeholder="Enter Name"
                defaultValue="User info"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="placeholder:text-[#263238] placeholder:opacity-40 placeholder:dark:text-white dark:bg-[#1A1A1A] bg-white w-full border-[1.5px] border-solid border-[#00000014] dark:border-[#FFFFFF2E] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] text-[#263238] dark:text-[#FFFFFF]"
              />
            </div>
            <div className=" mt-[18px]">
              <label className="font-Satoshi not-italic font-[500] text-[13px] leading-[18px] text-[#263238] dark:text-[#FFFFFF50]">
                Email Address
              </label>
              <input
                placeholder="Enter Email"
                defaultValue="john.doe123@gmail.com"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="placeholder:text-[#263238] placeholder:opacity-40 placeholder:dark:text-white dark:bg-[#1A1A1A] bg-white w-full border-[1.5px] border-solid border-[#00000014] dark:border-[#FFFFFF2E] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] text-[#263238] dark:text-[#FFFFFF]"
              />
            </div>
            {/* <div className=" mt-[18px]">
            <label className="font-Satoshi not-italic font-[500] text-[13px] leading-[18px] text-[#263238] dark:text-[#FFFFFF50]">
              Password
            </label>
            <div className="relative">
              <input
                placeholder="Enter Password"
                defaultValue="doe123@gmail"
                type={password == true ? "password" : "text"}
                className="placeholder:text-[#263238] placeholder:opacity-40 placeholder:dark:text-white dark:bg-[#1A1A1A] bg-white w-full border-[1.5px] border-solid border-[#00000014] dark:border-[#FFFFFF2E] rounded-[8px] px-[19px] py-[13px] mt-[10px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] text-[#263238] dark:text-[#FFFFFF]"
              />
              <div
                className="absolute right-[16px] top-[24px] hover:cursor-pointer hover:opacity-70"
                onClick={onclickPass}
              >
                {password == true ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div> */}
          </div>

          <Subscription onUpgrade={handleTogglePlans} />

          <div className="max-md:w-full max-md:px-[28px]">
            <button
              type="submit"
              className="capitalize hover:cursor-pointer hover:opacity-70 border-[1px] border-solid  border-[#00ADB5] py-[10px] px-[29px] rounded-[8px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] text-[#FDFDFD] bg-[#00ADB5] mb-[17px] max-md:text-[13px] max-md:leading-[18px] max-sm:w-full max-md:mx-auto max-md:py-[7px]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>

      <Plan open={openPlans} onClose={handleTogglePlans} />
    </DashboardLayout>
  );
};

export default Settings;
