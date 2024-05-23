import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Switch from "react-switch";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getPlans } from "redux/reducers/plans";

import iconTick from "assets/img/settings/Vector.png";
import iconTickDark from "assets/img/settings/VectorDark.png";
import arrowsquareleft from "assets/img/settings/arrowsquareleft.png";
import arrowsquareleftDark from "assets/img/settings/arrowsquareleftDark.png";

import ChooseAPlan from "./chooseAPlan";
import { free, basic, pro, business } from "./data";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Plan({ open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const { plans } = useAppSelector((state) => state.plans);
  const cancelButtonRef = useRef(null);
  const { theme, setTheme } = useTheme();
  const [data, setData] = useState([]);
  const [pricePlan, setPricePlan] = useState(false);

  useEffect(() => {
    dispatch(getPlans());
  }, []);

  useEffect(() => {
    if (plans && plans.length > 0) {
      let results: any = [];
      const period = pricePlan ? "ANUAL" : "MONTHLY";
      plans.forEach((plan: any) => {
        if (plan.title === "FREE" ||  plan.subscription_tenure === period) {
          results.push(plan);
        }
      });
      results.sort((a: any, b: any) => a.price - b.price);
      setData(results);
    }
  }, [plans, pricePlan]);

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center  text-center sm:items-center sm:bg-[#0000008C]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className=" relative transform overflow-hidden rounded-lg max-md:rounded-none bg-white dark:bg-[#373636] text-left shadow-xl transition-all  sm:my-8 w-[1154px] max-xl:w-[984px]">
                <div className="flex flex-row p-[24px] max-xl:p-[20px] border-b-[1px] border-solid border-[#0000001F] dark:border-[#FFFFFF1A]">
                  <button
                    type="button"
                    onClick={onClose}
                    ref={cancelButtonRef}
                    className="sm:hidden hover:opacity-70"
                  >
                    <Image
                      src={
                        theme === "dark" ? arrowsquareleftDark : arrowsquareleft
                      }
                      alt=""
                      className="h-auto w-[20px]"
                    />
                  </button>
                  <h1 className="mr-auto font-Satoshi not-italic font-[700] text-[20px] leading-[27px] text-[#000000] dark:text-[#FFFFFF] capitalize max-xl:font-[700] max-xl:text-[17px] max-xl:leading-[23px] max-sm:ml-auto max-sm:pr-[20px]">
                    Choose a plan
                  </h1>
                  <button
                    type="button"
                    onClick={onClose}
                    ref={cancelButtonRef}
                    className="max-sm:hidden hover:opacity-70"
                  >
                    <Image
                      src={theme === "dark" ? iconTickDark : iconTick}
                      alt=""
                      className="h-auto w-[20px]"
                    />
                  </button>
                </div>
                <div className="py-[27px] px-[36px] max-xl:py-[23px] max-xl:px-[30px]">
                  <div className="w-full text-center">
                  <Switch
                    checked={pricePlan}
                    onChange={setPricePlan}
                    height={60}
                    width={180}
                    handleDiameter={48}
                    className="react-switch border border-white"
                    onColor={theme === "dark" ? "#000" : "#DDDDDD"}
                    offColor={theme === "dark" ? "#000" : "#DDDDDD"}
                    uncheckedIcon={
                      <div className="flex justify-center items-center text-base h-full text-[#00ADB5] dark:text-white">
                        Yearly
                      </div>
                    }
                    checkedIcon={
                      <div className="flex justify-center items-center text-base h-full text-[#00ADB5] dark:text-white">
                        Monthly
                      </div>
                    }
                    uncheckedHandleIcon={
                      <div className="flex justify-center items-center bg-[#00ADB5] text-white text-base rounded-3xl h-12 w-20">
                        Monthly
                      </div>
                    }
                    checkedHandleIcon={
                      <div className="float-right flex justify-center items-center bg-[#00ADB5] text-white text-base rounded-3xl h-12 w-20">
                        Yearly
                      </div>
                    }
                    id="icon-switch"
                  />
                  </div>
                  <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
                    {data &&
                      data.length > 0 &&
                      data.map((item: any, i: number) => {
                        const name = item.title.toLowerCase();
                        const list =
                          name === "free"
                            ? free
                            : name === "basic"
                            ? basic
                            : name === "pro"
                            ? pro
                            : business;
                        return (
                          <ChooseAPlan
                            key={i}
                            id={item.id}
                            title={item.title}
                            price={`$${item.price}`}
                            time={pricePlan ? "Year" : "Month"}
                            list={list}
                          />
                        );
                      })}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
