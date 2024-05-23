import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";

import { useAppSelector, useAppDispatch } from "redux/hooks";
import { getMessageWithChatbot, createMessage } from "redux/reducers/chat";
import { getProfile } from "redux/reducers/users";
import { getChatbotWithId } from "redux/reducers/chatbots";

import Message from "./Message";
import SendMessage from "./SendMessage";
import Typing from "./Typing";

import Avatar1 from "assets/img/user.svg";
import Avatar2 from "assets/img/avatar2.svg";

type Props = {
  id?: any;
};

const Room = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const dispatch = useAppDispatch();
  const { messages, isCreated } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.users);
  const { chatDetail } = useAppSelector((state) => state.chatbots);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
    if (roomId && user) {
      dispatch(getMessageWithChatbot({ user_id: user.id, bot_id: roomId }));
      dispatch(getChatbotWithId({ roomId }));
    }
  }, [user, roomId]);

  useEffect(() => {
    if (isCreated === true) {
      dispatch(getMessageWithChatbot({ user_id: user.id, bot_id: roomId }));
      setLoading(false);
    }
  }, [isCreated]);

  useEffect(() => {
    if (messages) {
      let results: any = [];
      messages.forEach((mess: any) => {
        if (mess.chat && mess.chat.length > 0) {
          results = results.concat(mess.chat);
        }
      });
      results.reverse();
      setData(results);
    }
  }, [messages]);

  const handleSend = (msg: string) => {
    setLoading(true);
    dispatch(createMessage({ query: msg, bot_id: roomId }));
  };

  return (
    <div className="w-full h-full border-r-[1px] border-[#0000001a] relative pt-[73px]">
      <div
        className="w-full border-b-[1px] border-[#0000001a] absolute dark:bg-[#1D2632] 
        top-0 left-0 right-0 z-10 px-[20px] h-[73px] flex items-center"
      >
        <div>
          <h3
            className="text-black dark:text-white font-Satoshi font-bold text-[18px] leading-[24px] capitalize mb-[5px]
          max-sm:w-[243px] max-sm:truncate
        "
          >
            {(chatDetail && chatDetail.name) || ""}
          </h3>
          <p className="text-[#999] font-Satoshi font-medium text-base leading-[19px] capitalize">
            Total Documents:{" "}
            {(chatDetail &&
              chatDetail.documents &&
              chatDetail.documents.length) ||
              0}
          </p>
        </div>
      </div>

      <div className="chatScroller w-full h-chat overflow-y-auto bg-[#F8F8F8] dark:bg-black px-4 sm:px-[30px] pt-[30px]">
        {data &&
          data.length > 0 &&
          data.map((item: any, i: number) => {
            return (
              <>
                <Message
                  message={item.query || ""}
                  isMe={true}
                  avatar={Avatar2}
                  time={
                    item.created_at
                      ? moment(item.created_at).format("hh:mm A")
                      : ""
                  }
                />
                <Message
                  message={item.response || ""}
                  time=""
                  // time="pages: 2,5,6"
                  avatar={Avatar1}
                  tags={[]}
                />
              </>
            );
          })}
        {loading && <Typing />}
      </div>

      <div className="px-4 sm:px-[30px] pt-3 pb-[18px] bg-white dark:bg-[#1D2632] absolute bottom-0 left-0 right-0">
        <p className="text-[#00ADB5] text-[12px] font-Satoshi font-medium capitalize leading-[16px] mb-3 ml-4">
          {/* 809 messages left */}
        </p>
        <SendMessage onSend={handleSend} isSent={isCreated} />
      </div>
    </div>
  );
};

export default Room;
