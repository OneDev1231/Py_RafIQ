import { HomeLayout } from "layouts";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard, Mousewheel, FreeMode, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// @ts-ignore
import Typical from "react-typical";
import Switch from "react-switch";
import queryString from "query-string";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

import avatar1 from "assets/img/avatar1.svg";
import avatar2 from "assets/img/avatar2.svg";
import avatar3 from "assets/img/avatar3.svg";
import landingCuate from "assets/img/landing-cuate.svg";
import cohereLogo from "assets/img/cohere-logo.svg";
import opeanaiLogoDark from "assets/img/openai-logo-dark.svg";
import anthropicLogoDark from "assets/img/anthropic-logo-dark.svg";
import rafiqVieo from "assets/img/rafiqvideo.svg";
import leftCircles from "assets/img/leftcircles.svg";
import rightCircles from "assets/img/rightcircles.svg";
import landingUploadIcon from "assets/img/icons/landing-upload.svg";
import landingCreateChatbotIcon from "assets/img/icons/landing-create-chatbot.svg";
import landingMessageIcon from "assets/img/icons/landing-message.svg";
import landingTagIcon from "assets/img/icons/landing-tag.svg";
import landingMacbook from "assets/img/landing-macbook.svg";
import checkIcon from "assets/img/icons/check.svg";
import crossIcon from "assets/img/icons/cross.svg";
import chatbubbleIcon from "assets/img/icons/landing-chatbubble.svg";
import {
  forStudents,
  forBusiness,
  unlock1,
  unlock2,
  plans,
  prices,
  pricesHeader,
} from "allConstants";
import { StarRating } from "components";
import Support from "components/Support";
import { scrollToTop } from "utils";
import { API } from "api";
import { useNotify } from "hooks";
import { useAskRafiqSupportChat } from "api/useAskRafiqSupportChat";

SwiperCore.use([Keyboard, Mousewheel]);

function Icon({ id, open }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform dark:text-cyan`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export const HomeContainer = () => {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [open, setOpen] = useState(0);
  const supportChatBotMessages = useAskRafiqSupportChat();
  const [pricePlan, setPricePlan] = useState(false);
  const [openSupport, setOpenSupport] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const router = useRouter();
  const { theme } = useTheme();
  const { notifyError } = useNotify();

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const handleToggleSupport = () => {
    setOpenSupport(!openSupport);
  };

  const handleGoogleLogin = async (code: string | (string | null)[]) => {
    const { access_token } = await API.getAccessTokenFromCode(code);
    const { key } = await API.postGoogleAccessToken(access_token);
    if (key) {
      localStorage.setItem("token", key);
      router.push("/dashboard");
    } else {
      localStorage.removeItem("token");
      notifyError("Access denied!");
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(localStorage.theme);
    root.classList.add(localStorage.theme);
    setData(JSON.parse(localStorage.getItem("homepageData")!));
  }, []);

  useEffect(() => {
    const urlParams = queryString.parse(window.location.search);
    urlParams && urlParams.code && handleGoogleLogin(urlParams.code);
  }, [router.pathname]);

  return (
    <>
      {data && data.status === "ok" && (
        <HomeLayout>
          {/* Section 1 */}
          <div className="flex flex-col h-[90vh] lg:flex-row px-[10vw] lg:px-[12vw] bg-[#F2F0F0] dark:bg-black">
            <div className="flex flex-col justify-center pt-4 space-y-6 lg:space-y-6 lg:pb-20 w-full h-[58%] lg:w-1/2 lg:h-full text-black dark:text-white">
              <div className="text-[2.5rem] lg:text-5xl xl:text-6xl 2xl:text-7xl text-center lg:text-left font-black leading-tight">
                <p>ChatGPT, </p>
                <p>But With Your</p> <span>Own </span>
                <Typical
                  steps={[
                    "Data",
                    2500,
                    "Books",
                    2500,
                    "Reports",
                    2500,
                    "Content",
                    2500,
                    "Docs",
                    2500,
                  ]}
                  wrapper="span"
                  loop={Infinity}
                  className="text-[#00ADB5]"
                />
              </div>
              <div className="font-light text-xs lg:text-base lg:w-[28rem] text-center lg:text-left">
                Effortlessly create AI chatbots tailored to your data,
                documents, or files, and experience limitless general chatting
                with ChatGPT. Boost your productivity, learning, and research
                with the power of AI at your fingertips
              </div>
              <div className="flex flex-col items-center space-y-4 lg:space-y-0 lg:flex-row lg:pt-8 px-4 lg:px-0 justify-between w-full lg:w-[28rem]">
                <button
                  className="text-xs lg:text-sm rounded-lg bg-black hover:bg-[#222222] dark:bg-white py-2 lg:py-3 px-10 w-full lg:w-auto dark:hover:bg-[#E6F7F8] text-white dark:text-[#263238]"
                  onClick={() =>
                    scrollToTop(document.getElementById("scroll4")?.offsetTop)
                  }
                >
                  {"Get Started ->"}
                </button>
                <div className="flex space-x-1 items-center font-light">
                  <div className="flex -space-x-3 overflow-hidden">
                    <Image
                      alt="avatar1"
                      src={avatar1.src}
                      width={screen.width >= 1024 ? 36 : 28}
                      height={screen.width >= 1024 ? 36 : 28}
                    />
                    <Image
                      alt="avatar2"
                      src={avatar2.src}
                      width={screen.width >= 1024 ? 36 : 28}
                      height={screen.width >= 1024 ? 36 : 28}
                    />
                    <Image
                      alt="avatar3"
                      src={avatar3.src}
                      width={screen.width >= 1024 ? 36 : 28}
                      height={screen.width >= 1024 ? 36 : 28}
                    />
                  </div>
                  <span className="text-[0.6rem] lg:text-base">
                    Join with <b>10,000+</b> users
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Image
                alt="Innovation"
                src={landingCuate.src}
                width={0}
                height={0}
                className="lg:h-2/3 w-full"
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className="flex bg-white dark:bg-black dark:text-gray">
            <div className="w-full flex flex-col xl:mt-20 mt-8 items-center space-y-4 mx-8 lg:mx-32 border-b-2 border-[#7C7B7C] border-opacity-40">
              <span>Powerd By</span>
              <div className="flex space-x-4 lg:space-x-24 pb-8 lg:pb-12 justify-center">
                <Image
                  alt="OpenAI"
                  src={opeanaiLogoDark}
                  width={0}
                  height={0}
                  className="w-1/4 lg:w-full"
                />
                <Image
                  alt="cohere"
                  src={cohereLogo.src}
                  width={0}
                  height={0}
                  className="mix-blend-luminosity w-1/4 lg:w-full"
                />
                <Image
                  alt="ANTHROPIC"
                  src={anthropicLogoDark}
                  width={0}
                  height={0}
                  className="w-1/4 lg:w-full"
                />
              </div>
            </div>
          </div>
          {/* Section 3 */}
          <div className="flex flex-col items-center px-[5vw] lg:px-[12vw] py-24 space-y-12 bg-white text-[#263238] dark:bg-black dark:text-white">
            <p className="text-3xl lg:text-4xl xl:text-5xl font-black text-center">
              Explore The Power Of Chat-GPT With{" "}
              <span className="text-[#00ADB5]">RAFIQ</span>
            </p>
            <div className="flex flex-col lg:flex-row w-full gap-[5vw]">
              <div className="w-full h-[85.3vw] lg:h-[33.5vw] bg-[url('/gpt-power1.svg')] dark:bg-[url('/gpt-power1-dark.svg')] bg-no-repeat bg-cover" />
              <div className="w-full h-[85.3vw] lg:h-[33.5vw] bg-[url('/gpt-power2.svg')] dark:bg-[url('/gpt-power2-dark.svg')] bg-no-repeat bg-cover" />
            </div>
          </div>
          {/* Section 4 */}
          <div className="relative z-50 flex flex-col items-center space-y-4 px-4 py-12 lg:py-24 lg:px-[12vw] bg-[#00ADB5] bg-opacity-10 text-[#263238] dark:bg-opacity-20 dark:text-white">
            <p className="text-2xl lg:text-4xl xl:text-5xl font-black text-center">
              Watch RAFIQ <span className="text-[#00ADB5]">In Action</span>
            </p>
            <span className="font-light dark:opacity-60 text-sm lg:text-base">
              A Step-by-Step Video Demo
            </span>
            <Image
              src={rafiqVieo}
              alt="video"
              width={0}
              height={0}
              className="w-full"
            />
          </div>
          {/* Section 5 */}
          <div className="relative" id="scroll1">
            <div className="absolute w-full bg-cyan flex justify-between h-80 lg:h-96 items-center">
              <Image src={leftCircles} alt="circle" width={245} height={245} />
              <Image src={rightCircles} alt="circle" width={203} height={203} />
            </div>
            <div className="py-20 px-2 lg:py-40 lg:px-[12vw] z-50 relative text-[#263238] dark:text-white">
              <div className="py-12 px-4 lg:p-16 flex flex-col lg:space-y-6 bg-white rounded-xl dark:bg-[#263238] shadow-xl shadow-gray/30 dark:shadow-none">
                <p className="text-2xl lg:text-4xl xl:text-5xl font-black text-center">
                  <span className="text-cyan">Create Your Own</span> Custom
                </p>
                <p className="text-2xl lg:text-4xl xl:text-5xl font-black text-center">
                  Chat-GPT In 10 Seconds.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 pt-4 mt-2">
                  <div className="p-6 lg:p-8 flex flex-col space-y-2 bg-[#F9F9FC] dark:bg-[#333E44] rounded-md">
                    <Image
                      src={landingUploadIcon}
                      alt="upload"
                      width={screen.width >= 1024 ? 80 : 50}
                      height={screen.width >= 1024 ? 80 : 50}
                    />
                    <p className="text-lg lg:text-xl">Upload Your Documents.</p>
                    <div>
                      <p className="font-light text-xs lg:text-base">
                        Upload links and documents or any content you
                      </p>
                      <p className="font-light text-xs lg:text-base">
                        Want to ask questions to.
                      </p>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col space-y-2 bg-[#F9F9FC] dark:bg-[#333E44] rounded-md">
                    <Image
                      src={landingCreateChatbotIcon}
                      alt="upload"
                      width={screen.width >= 1024 ? 80 : 50}
                      height={screen.width >= 1024 ? 80 : 50}
                    />
                    <p className="text-lg lg:text-xl">Create Your Chatbot.</p>
                    <div>
                      <p className="font-light text-xs lg:text-base">
                        Customise how it looks and responds to questions. All
                      </p>
                      <p className="font-light text-xs lg:text-base">
                        Powered by ChatGPT.
                      </p>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col space-y-2 bg-[#F9F9FC] dark:bg-[#333E44] rounded-md">
                    <Image
                      src={landingMessageIcon}
                      alt="upload"
                      width={screen.width >= 1024 ? 80 : 50}
                      height={screen.width >= 1024 ? 80 : 50}
                      className="-mt-4 dark:bg-[#333E44]"
                    />
                    <p className="text-lg lg:text-xl">Start Talking with it.</p>
                    <p className="font-light text-xs lg:text-base">
                      Upload links and documents or any content you want to ask
                      questions to.
                    </p>
                  </div>
                  <div className="p-6 lg:p-8 flex flex-col space-y-2 bg-[#F9F9FC] dark:bg-[#333E44] rounded-md">
                    <Image
                      src={landingTagIcon}
                      alt="upload"
                      width={screen.width >= 1024 ? 80 : 50}
                      height={screen.width >= 1024 ? 80 : 50}
                    />
                    <p className="text-lg lg:text-xl">
                      Embed & Share Your Chatbot on Your Website.
                    </p>
                    <p className="font-light text-xs lg:text-base">
                      upload links and documents, customise chatbot appearance
                      and responses with ChatGPT.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Section 6 */}
          <div className="flex flex-col space-y-4 text-[#263238] dark:text-white text-center mb-8">
            <p className="text-2xl lg:text-4xl xl:text-5xl font-black">
              Use Cases
            </p>
            <p className="font-light text-xs lg:text-base">
              let's discuss how you can use RAFIQ and get its maximum values
            </p>
          </div>
          {/* Section 7 */}
          <div>
            <div className="w-full flex h-44 lg:h-64 bg-[url('/landing-students-mobile.jpg')] lg:bg-[url('/landing-students.jpg')] bg-no-repeat bg-cover">
              <div className="flex w-full h-full justify-center items-center bg-black/50">
                <span className="text-white lg:text-2xl">FOR STUDENTS</span>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 px-4 lg:px-[12vw] py-12 lg:py-24 mt-2 text-[#263238] dark:text-white">
              {forStudents.map((item, index) => (
                <div
                  key={"forstudents" + index}
                  className="flex flex-col items-center space-y-3 lg:space-y-6"
                >
                  <Image
                    src={theme === "dark" ? item.darkImgUrl : item.imgUrl}
                    alt=""
                    width={screen.width >= 1024 ? 80 : 50}
                    height={screen.width >= 1024 ? 80 : 50}
                    className="-mt-4"
                  />
                  <p className="lg:text-2xl text-black text-center dark:text-white">
                    {item.title}
                  </p>
                  <p className="font-light text-xs lg:text-base text-center">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Section 8 */}
          <div>
            <div className="w-full flex justify-center items-center h-44 lg:h-64 bg-[url('/landing-business-mobile.svg')] lg:bg-[url('/landing-business.svg')] bg-no-repeat bg-cover">
              <span className="text-white lg:text-2xl">
                FOR WORK, BUSINESS & COMPANIES
              </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 px-4 lg:px-[12vw] py-12 lg:py-24 mt-2 text-[#263238] dark:text-white">
              {forBusiness.map((item, index) => (
                <div
                  key={"forbusiness" + index}
                  className="flex flex-col items-center space-y-3 lg:space-y-6"
                >
                  <Image
                    src={theme === "dark" ? item.darkImgUrl : item.imgUrl}
                    alt=""
                    width={screen.width >= 1024 ? 80 : 50}
                    height={screen.width >= 1024 ? 80 : 50}
                    className="-mt-4"
                  />
                  <p className="lg:text-2xl text-black text-center dark:text-white">
                    {item.title}
                  </p>
                  <p className="font-light text-xs lg:text-base text-center">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Section 9 */}
          <div className="w-full flex items-center justify-center text-[#263238] dark:text-white px-8 lg:px-16 py-16 lg:py-0 lg:h-[104vh] bg-[url('/landing-byyourself-mobile.svg')] lg:bg-[url('/landing-byyourself.svg')] bg-no-repeat bg-cover">
            <div className="flex flex-col-reverse lg:flex-row items-center bg-white dark:bg-[#263238] rounded-2xl">
              <div className="p-8 lg:py-16 xl:py-32 lg:pl-16 lg:pr-8 xl:pr-32 lg:w-1/2 flex flex-col space-y-4 lg:space-y-12 text-center lg:text-left">
                <p className="text-4xl lg:text-4xl xl:text-[3vw] font-black">
                  Try <span className="text-[#00ADB5]">RAFIQ</span>
                </p>
                <p className="text-4xl lg:text-4xl xl:text-[3vw] font-black">
                  By Yourself
                </p>
                <span className="font-light dark:opacity-60 text-xs lg:text-lg pt-4 lg:pt-0">
                  This chat has been created by a file that has all of Rafiq's
                  information in it.
                </span>
                <button className="lg:w-fit rounded-xl text-white bg-[#00ADB5] text-xs lg:text-base py-3 lg:px-20 hover:bg-[#009CA4]">
                  Try It For Free
                </button>
              </div>
              <div className="py-8 pl-32 lg:pl-0 lg:py-16 flex justify-end w-full lg:w-1/2">
                <Image
                  src={landingMacbook.src}
                  alt="Macbook"
                  width={100}
                  height={100}
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
          {/* Section 10 */}
          <div className="flex flex-col items-center justify-center py-8 px-8 lg:py-12 text-white bg-[url('/landing-blueimagecircle-mobile.svg')] lg:bg-[url('/landing-blueimagecircle.svg')] bg-no-repeat bg-cover">
            <div className="text-2xl lg:text-4xl xl:text-5xl font-black text-center">
              Experience RAFIQ's Multilingual Power
            </div>
            <div className="opacity-60 text-xs lg:text-lg px-12 lg:px-[28vw] pt-4 text-center">
              Seamlessly interact and engage in over 100 languages, bridging
              communication gaps and reaching a global audience.
            </div>
          </div>
          {/* Section 11 */}
          <div className="px-4 py-8 lg:py-24 lg:px-[8vw] text-[#263238] dark:text-white bg-[url('/landing-review.svg')] dark:bg-[url('/landing-review-dark.svg')] bg-no-repeat bg-cover">
            <p className="text-2xl lg:text-4xl xl:text-5xl font-black text-center mb-8 lg:mb-32">
              What People Said About{" "}
              <span className="text-[#00ADB5]">RAFIQ</span>
            </p>
            <div className="overflow-x-auto">
              {screen.width >= 1366 ? (
                <Swiper
                  slidesPerView={3}
                  spaceBetween={50}
                  centeredSlides={false}
                  freeMode={true}
                  modules={[FreeMode, Navigation]}
                  navigation={true}
                  keyboard={true}
                  direction="horizontal"
                  mousewheel={true}
                  className="min-w-[1366px]"
                >
                  {data.testomonials.map((testimonial: any, index: number) => (
                    <SwiperSlide key={"swiper" + index}>
                      <div className="m-3 rounded-sm drop-shadow-[rgba(0,0,0,0.25)_0px_0px_2px] p-8 bg-white dark:bg-[#263238]">
                        <StarRating rating={testimonial.rating} />
                        <div className="mt-6">{testimonial.review}</div>
                        <div className="mt-12 text-[#160042] dark:text-white">
                          {testimonial.customer_name.split(",")[0]}
                        </div>
                        <div className="text-sm text-[#393B6A] dark:text-white">
                          {testimonial.customer_name.split(",")[1]}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex min-w-[1366px] px-2 space-x-12 text-[#263238] dark:text-white">
                  {data.testomonials.map((testimonial: any, index: number) => (
                    <div
                      key={"review" + index}
                      className="mx-3 rounded-sm drop-shadow-[rgba(0,0,0,0.25)_0px_0px_2px] p-8 bg-white dark:bg-[#263238]"
                    >
                      <StarRating rating={testimonial.rating} />
                      <div className="mt-6">{testimonial.review}</div>
                      <div className="mt-12 text-[#160042] dark:text-white">
                        {testimonial.customer_name.split(",")[0]}
                      </div>
                      <div className="text-sm text-[#393B6A] dark:text-white">
                        {testimonial.customer_name.split(",")[1]}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Section 12 */}
          <div
            className="flex flex-col justify-center px-4 py-24 lg:px-[12vw] lg:py-32 space-y-8"
            id="scroll2"
          >
            <div className="text-2xl lg:text-4xl xl:text-5xl font-black text-center dark:text-white">
              Unlock <span className="text-[#00ADB5]">The Power</span> of
              Chat-GPT+ premium
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-16 lg:py-4 mt-2 text-[#263238] dark:text-white">
              {unlock1.map((item, index) => (
                <div
                  key={"unlock1" + index}
                  className="flex flex-col p-3 lg:p-8 space-y-3 lg:space-y-6 border border-gray border-opacity-40 rounded-lg"
                >
                  <Image
                    src={item.imgUrl}
                    alt=""
                    width={screen.width >= 1024 ? 80 : 50}
                    height={screen.width >= 1024 ? 80 : 50}
                  />
                  <p className="lg:text-2xl text-black dark:text-white">
                    {item.title}
                  </p>
                  <p className="font-light text-xs lg:text-base">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Section 13 */}
          <div className="flex flex-col justify-center px-4 pb-24 lg:px-[12vw] lg:pb-32 space-y-8">
            <div className="text-2xl lg:px-52 lg:text-4xl xl:text-5xl font-black text-center dark:text-white">
              Unlock The Power of Custom Chat-GPT With{" "}
              <span className="text-[#00ADB5]">Your Own Data</span> and
              documents
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-16 lg:py-4 mt-2 text-[#263238] dark:text-white">
              {unlock2.map((item, index) => (
                <div
                  key={"unlock2" + index}
                  className="flex flex-col p-3 lg:p-8 space-y-3 lg:space-y-6 border border-gray border-opacity-40 rounded-lg"
                >
                  <Image
                    src={item.imgUrl}
                    alt=""
                    width={screen.width >= 1024 ? 80 : 50}
                    height={screen.width >= 1024 ? 80 : 50}
                  />
                  <p className="lg:text-2xl text-black dark:text-white">
                    {item.title}
                  </p>
                  <p className="font-light text-xs lg:text-base">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Section 14 */}
          <div
            className="flex flex-col justify-center bg-[#E6F7F8] dark:bg-[#00ADB5]/10 px-8 py-12 lg:px-[11vw] lg:py-16 space-y-6"
            id="scroll3"
          >
            <div className="text-2xl lg:text-4xl xl:text-5xl font-black text-center dark:text-white">
              Choose The <span className="text-[#00ADB5]">Perfect Plan</span>
            </div>
            <div className="text-center">
              <Switch
                checked={pricePlan}
                onChange={setPricePlan}
                height={60}
                width={180}
                handleDiameter={48}
                className="react-switch border border-white"
                onColor={theme === "dark" ? "#000" : "#fff"}
                offColor={theme === "dark" ? "#000" : "#fff"}
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
            <div className="font-light opacity-60 text-xs lg:text-lg px-12 text-center dark:text-white">
              Get 2 months for free by subscribing yearly!
            </div>
            <div className="overflow-x-auto" id="scroll4">
              <div className="flex min-w-[1366px] space-x-12 text-[#263238] dark:text-white">
                {plans.map((item, index) => (
                  <div
                    key={"plan" + index}
                    className="flex flex-col space-y-4 p-8 hover:bg-white dark:hover:bg-white/10 rounded-2xl"
                    onClick={() => setSelectedPlan(index + 1)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-2xl">{item.plan}</div>
                      {index === 0 && (
                        <div className="lg:hidden arrow-container animated fadeInDown">
                          <div className="arrow-2">
                            <i className="fa fa-angle-right"></i>
                          </div>
                          <div className="arrow-1 animated hinge infinite zoomIn"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-4xl">
                        {pricePlan ? item.yearlyPrice : item.price}
                      </span>
                      <span className="text-sm text-[#263238] dark:text-white text-opacity-60">
                        {" /" + (pricePlan ? item.period2 : item.period1)}
                      </span>
                    </div>
                    <div className="font-light">{item.description}</div>
                    {item.features.map((feat, featIndex) => (
                      <div
                        key={"plan" + index + "feature" + featIndex}
                        className="flex space-x-4"
                      >
                        <Image src={checkIcon} alt="" width={18} height={18} />
                        <div>{feat}</div>
                      </div>
                    ))}
                    <div className="pt-8">
                      <button
                        onClick={() =>
                          index === 0 && router.push("/auth/signup")
                        }
                        className="w-full py-3 rounded-xl text-[#00ADB5] hover:bg-[#00ADB5] hover:text-white border border-[#00ADB5]"
                      >
                        {index === 0 ? "Get Started" : "Choose Plan"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-16 px-8">
              <hr className="text-[#00ADB5]" />
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[1366px]">
                <table className="text-center self-center w-full bg-[#D8F3F4] dark:bg-[#001E20] text-black dark:text-white rounded-2xl">
                  <thead>
                    <tr className="border-b border-[#AED1D2]">
                      {pricesHeader.map((item, index) => (
                        <td
                          key={"pricesHeader" + index}
                          className={
                            "text-3xl px-8 py-4 border-[#AED1D2]" +
                            (index === 0 ? "" : " border-l")
                          }
                        >
                          {item}
                        </td>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((price, index) => (
                      <tr
                        key={"price" + index}
                        className={
                          "" +
                          (index !== 0
                            ? ""
                            : "text-3xl border-[#AED1D2] border-b")
                        }
                      >
                        {price.map((item, itemIndex) => (
                          <td
                            key={"price" + index + "item" + itemIndex}
                            className={
                              index !== 0
                                ? itemIndex === 0
                                  ? "font-light px-8 py-3"
                                  : "font-light px-8 py-3 border-l border-[#AED1D2]"
                                : itemIndex === 0
                                ? "px-8 py-6 text-2xl"
                                : "px-8 py-6 border-l border-[#AED1D2]"
                            }
                          >
                            {item === "#check" && (
                              <div className="flex justify-center">
                                <Image
                                  src={checkIcon}
                                  alt=""
                                  width={18}
                                  height={18}
                                />
                              </div>
                            )}
                            {item === "#cross" && (
                              <div className="flex justify-center">
                                <Image
                                  src={crossIcon}
                                  alt=""
                                  width={18}
                                  height={18}
                                />
                              </div>
                            )}
                            {item !== "#check" && item !== "#cross" && item}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="border-t border-[#AED1D2]">
                      <td />
                      <td className="border-l border-[#AED1D2] px-8 py-4">
                        <button
                          onClick={() => router.push("/auth/signup")}
                          className="w-full py-3 rounded-xl text-[#00ADB5] hover:bg-[#00ADB5] hover:text-white border border-[#00ADB5]"
                        >
                          Get Started
                        </button>
                      </td>
                      <td className="border-l border-[#AED1D2] px-8 py-4">
                        <button
                          onClick={() => router.push("/auth/signup")}
                          className="w-full py-3 rounded-xl text-[#00ADB5] hover:bg-[#00ADB5] hover:text-white border border-[#00ADB5]"
                        >
                          Choose Plan
                        </button>
                      </td>
                      <td className="border-l border-[#AED1D2] px-8 py-4">
                        <button
                          onClick={() => router.push("/auth/signup")}
                          className="w-full py-3 rounded-xl text-[#00ADB5] hover:bg-[#00ADB5] hover:text-white border border-[#00ADB5]"
                        >
                          Choose Plan
                        </button>
                      </td>
                      <td className="border-l border-[#AED1D2] px-8 py-4">
                        <button
                          onClick={() => router.push("/auth/signup")}
                          className="w-full py-3 rounded-xl text-[#00ADB5] hover:bg-[#00ADB5] hover:text-white border border-[#00ADB5]"
                        >
                          Choose Plan
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Section 15 */}
          <div className="px-4 py-24 lg:px-[24vw] text-[#263238] dark:text-white">
            <p className="text-2xl lg:text-4xl xl:text-5xl font-black text-center">
              Frequently Asked <span className="text-[#00ADB5]">Questions</span>
            </p>
            <div className="w-full mt-8 lg:mt-16">
              {data.faq.map((item: any, index: number) => (
                <Accordion
                  key={"faqdata" + index}
                  className="mb-4"
                  open={open === index}
                  icon={<Icon id={index} open={open} />}
                >
                  <AccordionHeader
                    className="text-sm lg:text-base px-4 lg:px-8 border-b-[#263238]/20"
                    onClick={() => handleOpen(index)}
                  >
                    {item.question}
                  </AccordionHeader>
                  <AccordionBody className="text-xs lg:text-sm px-4 lg:px-8">
                    {item.answer}
                  </AccordionBody>
                </Accordion>
              ))}
            </div>
          </div>
          <Popover
            placement="top-end"
            open={openSupport}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <PopoverHandler onClick={handleToggleSupport}>
              <button
                onClick={handleToggleSupport}
                className="rounded-[54px] fixed bottom-[20px] right-[10px] lg:bottom-[45px] lg:right-[45px] z-[100] inline-flex items-center 
                  justify-center text-white dark:text-[#263238] font-medium font-Satoshi capitalize text-12px] leading-[16px] px-[18px] 
                  py-[8px] box-border"
              >
                <Image
                  src={chatbubbleIcon}
                  alt=""
                  width={screen.width >= 1024 ? 90 : 60}
                  height={screen.width >= 1024 ? 90 : 60}
                />
              </button>
            </PopoverHandler>
            <PopoverContent className="p-0 border-0 shadow-none">
              <Support
                chatBotMessages={supportChatBotMessages}
                onClose={handleToggleSupport}
              />
            </PopoverContent>
          </Popover>
        </HomeLayout>
      )}
    </>
  );
};
