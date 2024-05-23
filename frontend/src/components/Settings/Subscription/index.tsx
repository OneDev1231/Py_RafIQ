import Image from "next/image";

import icon from "assets/img/settings/Group125.png";

type Props = {
  onUpgrade?: () => void;
}

const Subscription = ({ onUpgrade }: Props) => {
  return (
    <div>
      <h2 className="font-Satoshi not-italic font-[500] text-[20px] leading-[27px] text-[#000000] dark:text-[#FFFFFF]  max-md:text-[18px] max-mdleading-[24px]">
        Subscription
      </h2>
      <div className="max-w-[614px] mt-[25px] mb-[55px] flex flex-row items-center p-[20px] bg-[#FFFFFF] dark:bg-[#313131] border-[1.5px] border-solid border-[#00000014] rounded-[8px] max-xl:max-w-full max-lg:mb-[45px] max-md:mt-[20px] max-md:mb-[35px] max-md:p-[15px] max-lg:items-start max-sm:w-full">
        <Image
          src={icon}
          alt=""
          className="w-[52px] h-auto max-md:w-[44px] mr-[16px] max-md:mr-[12px]"
        />
        <div className="flex flex-row items-center max-lg:flex-col w-full max-md:w-auto max-lg:items-start">
          <div className="max-lg:w-full mr-[10px]">
            <div className="flex flex-row items-center mb-[10px]">
              <p className="font-Satoshi not-italic font-[500] text-[20px] leading-[27px] text-[#000000] dark:text-[#fff] mr-[10px] max-md:text-[17px] max-md:leading-[23px]">
                Hobby Plan
              </p>
              <button className="bg-[#E7F6EA] dark:bg-[#313131] border-[1px] border-solid border-[#00BB33] px-[11px] rounded-[4px] font-Satoshi not-italic font-[500] text-[12px] leading-[16px] text-[#00BB33] max-md:text-[10px] max-md:leading-[14px]">
                Active
              </button>
            </div>
            <div className="flex flex-row items-center">
              <p className="font-Satoshi not-italic font-[500] text-[14px] leading-[19px] text-[#999999] max-md:text-[12px] max-md:leading-[16px]">
                Billing Monthly
              </p>
              <div className="h-[10px] w-[1px] bg-[#999999] mx-[14px] max-md:mx-[10px]" />
              <p className="font-Satoshi not-italic font-[500] text-[14px] leading-[19px] text-[#999999] max-md:text-[12px] max-md:leading-[16px]">
                Next Invoice on Jul 29 for $9.99
              </p>
            </div>
          </div>
          <div className="max-md:w-full ml-auto max-lg:ml-0 ">
            <button type="button" onClick={onUpgrade} className="capitalize w-[126px] hover:cursor-pointer hover:opacity-70 border-[1px] border-solid  border-[rgba(0, 0, 0, 0.12)] dark:border-[#FFFFFF1F] py-[8px] px-[10px] rounded-[8px] font-Satoshi not-italic font-[500] text-[14px] leading-[19px] text-[#00ADB5] bg-[#FFFFFF] dark:bg-[#313131] max-lg:w-full max-lg:mt-[25px] max-md:text-[12px] max-md:leading-[16px]">
              Upgrade now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
