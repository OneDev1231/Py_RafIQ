import React from "react";
import { useRouter } from 'next/router'

import { useAppSelector, useAppDispatch } from "redux/hooks";

import { ChatLayout } from "layouts";
import { FilePreview, Room } from "components/Chat";

const ChatRoom = () => {
  const router = useRouter();
  const { id } = router.query;
  const { chatDetail } = useAppSelector(state => state.chatbots);

  return (
    <ChatLayout>
      <div className="w-full h-full">
        <div className="grid h-full grid-cols-1 lg:grid-cols-7">
          <div className="h-full col-span-5">
            <Room />
          </div>
          <div className="hidden h-full lg:block lg:col-span-2">
            <FilePreview documents={chatDetail && chatDetail.documents || []} />
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default ChatRoom;
