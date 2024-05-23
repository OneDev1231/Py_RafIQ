import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";

import Image from "next/image";

import logo from "assets/img/billing/logo.png";
import { API } from "api";
import { useLoaderOverlay, useNotify } from "hooks";
import StripeFormComponent from "./StripeFormComponent";

interface IOption {
  clientSecret: string;
}

const StripeOpen = () => {
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
  const [options, setOptions] = useState<IOption>();
  const { notifyError } = useNotify();

  const getStripeIntent = async (e: any) => {
    e.preventDefault();

    setWaitingForResponse(true);
    const { status, setupIntent, publish_key } = await API.getNewSetupIntent();
    setWaitingForResponse(false);
    if (status === "OK") {
      setStripePromise(loadStripe(publish_key));
      setOptions({ clientSecret: setupIntent });
      setLoaded(true);
    } else {
      notifyError("Stripe loading error!");
    }
  };

  useLoaderOverlay(waitingForResponse);

  return (
    <>
      {loaded ? (
        <div className="pt-[160px] pb-[400px] rounded-[3px] flex justify-center max-xl:pt-[70px] max-md:pt-[156px] max-md:px-[10px]">
          <div className="bg-[#FFFFFF] dark:bg-[#f9f9fc10] dark:border-[#0000001A] rounded-[8px] border-[1px] border-solid border-[#0000001A] py-[42px] px-[55px] align-center text-center	max-w-[480px] max-xl:max-w-[420px] max-xl:px-[25px] max-xl:py-[35px] max-md:max-w-[309px] max-md:py-[20px] max-md:px-[27px]">
            <Elements stripe={stripePromise!} options={options}>
              <StripeFormComponent />
            </Elements>
          </div>
        </div>
      ) : (
        <div>
          <div className="md:hidden mx-[10px] py-[22px] border-b-[1px] border-[#0000001F] dark:border-[#FFFFFF21] border-solid  font-[500] text-[16px] text-[#000000] dark:text-[#FFFFFF] leading-[22px] capitalize text-center">
            Billing info
          </div>

          <div className="pt-[160px] pb-[400px] rounded-[3px] flex justify-center max-xl:pt-[70px] max-md:pt-[156px] max-md:px-[10px]">
            <div className="bg-[#FFFFFF] dark:bg-[#f9f9fc10] dark:border-[#0000001A] rounded-[8px] border-[1px] border-solid border-[#0000001A] py-[42px] px-[55px] align-center text-center	max-w-[480px] max-xl:max-w-[420px] max-xl:px-[25px] max-xl:py-[35px] max-md:max-w-[309px] max-md:py-[20px] max-md:px-[27px]">
              <div className="w-full">
                <Image src={logo} alt="" className="mx-auto w-[55px] h-auto" />
              </div>
              <h1 className="mt-[26px] mb-[12px] font-[700] text-[24px] text-[#000000] dark:text-[#FFFFFF] leading-[32px] capitalize max-xl:text-[20px] max-xl:leading-[27px] max-xl:mt-[15px] max-xl:mb-[11px] max-md:text-[18px] max-md:leading-[24px] max-md:mt-[20px] maxmd:mb-[12px]">
                Lorem ipsum dolor sit.
              </h1>
              <p className="font-[500] text-[15px] text-[#999999] leading-[20px] mb-[33px] capitalize max-xl:text-[13px] max-xl:leading-[18px] max-xl:mb-[18px] max-md:text-[12px] max-md:leading-[16px] max-md:mb-[20px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                consectetur faucibus sem vel molestie.
              </p>
              <button
                onClick={getStripeIntent}
                className="font-[500] text-[14px] text-[#FDFDFD] leading-[19px] bg-[#635AFF] rounded-[8px] px-[54px] py-[10px] capitalize hover:cursor-pointer hover:opacity-70 max-xl:text-[14px] max-xl:leading-[19px] max-md:text-[12px] max-md:leading-[16px] max-md:w-full"
              >
                Open Stripe
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StripeOpen;
