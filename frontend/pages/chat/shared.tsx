import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAppSelector, useAppDispatch } from "redux/hooks";

import { FilePreview, SharedRoom } from "components/Chat";

const ChatRoom = () => {
  const router = useRouter();
  const { roomId, token } = router.query;
  const { chatDetail } = useAppSelector((state) => state.chatbots);
  const [isReady, changeIsReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (!roomId) return void router.push("/dashboard");
    // if user is logged in, let them go
    if (localStorage.getItem("token")) return changeIsReady(true);
    // if user isn't logged in but has token passed in url
    if (token) {
      // giving access temporarily
      localStorage.setItem("token", Array.isArray(token) ? token[0] : token);
      localStorage.setItem(
        "temporaryAccessToOptionalPage",
        new Date().toString()
      );
      // reloading to have effects
      router.reload();
    }
    // neither user is logged nor have token in url
    return void router.push("/auth/login");
  }, [router.isReady, roomId]);

  if (!isReady) return <></>;
  return (
    <div className="w-full h-screen">
      <div className="grid h-full grid-cols-1 lg:grid-cols-7">
        <div className="h-full col-span-5">
          <SharedRoom />
        </div>
        <div className="hidden h-full lg:block lg:col-span-2">
          <FilePreview documents={(chatDetail && chatDetail.documents) || []} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
