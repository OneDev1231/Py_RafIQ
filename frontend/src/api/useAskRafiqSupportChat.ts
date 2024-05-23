import { useState } from "react";
import Axios from "config/api";

const botId = 145;

export const useAskRafiqSupportChat = () => {
  const [isLoading, changeIsLoading] = useState(false);
  const [newMessage, changeNewMessage] = useState<{
    query: string;
    response?: string;
  }>();
  const [previousMessages, changePreviousMessages] = useState<
    { query: string; response?: string }[]
  >([]);
  const [conversationId, changeConversationId] = useState<number>();

  const mutateAsync = async ({ message }: { message: string }) => {
    const fd = new FormData();
    fd.append("query", message);
    changePreviousMessages([...previousMessages, { query: message }]);
    changeIsLoading(true);
    const newMessage = await Axios.post(`message/`, fd, {
      params: {
        ...(!!conversationId
          ? {
              "conversation-id": conversationId,
            }
          : {}),
        "bot-id": botId,
      },
    });
    changeIsLoading(false);
    changeNewMessage({
      query: newMessage.data.data.query,
      response: newMessage.data.data.response,
    });
    changePreviousMessages([
      ...previousMessages,
      {
        query: newMessage.data.data.query,
        response: newMessage.data.data.response,
      },
    ]);
    changeConversationId(newMessage.data.conversation_id);

    return newMessage.data;
  };

  return { isLoading, data: newMessage, previousMessages, mutateAsync };
};
