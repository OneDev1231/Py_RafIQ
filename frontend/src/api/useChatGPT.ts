import Axios from "config/api";
import { useEffect, useState } from "react";

export interface ChatGPTAPIInterface {
  isTyping: boolean;
  roomMessages: ChatGPTRoom;
  sendMessage: ({ msg }: { msg: string }) => Promise<void>;
  changeRoomId: React.Dispatch<React.SetStateAction<number | undefined>>;
  roomId: number | undefined;
  allMessages: ChatGPTAllMessages;
  fetchMessages: () => Promise<void>;
  fetchMesagesOfRoom: () => Promise<void>;
  createNewChat: () => void;
  deleteConversations: () => Promise<void>;
}

export interface ChatGPTMessage {
  cost?: 0;
  created_at?: string;
  id?: number;
  query: string;
  response?: string;
}

export interface ChatGPTAllMessages {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    chat: ChatGPTMessage[];
    created_at: string;
    user: number;
  }[];
}

export interface ChatGPTRoom {
  count: number;
  next: string | null;
  previous: string | null;
  results: ChatGPTMessage[];
}
const initialAllMessages = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};
export const useChatGPT = () => {
  const [roomId, changeRoomId] = useState<number>();
  const [isTyping, changeIsTyping] = useState(false);
  const [allMessages, changeMessages] =
    useState<ChatGPTAllMessages>(initialAllMessages);
  const [roomMessages, changeRoomMessages] =
    useState<ChatGPTRoom>(initialAllMessages);
  const [message, changeMessage] = useState("");

  const fetchMessages = async () => {
    const response = await Axios.get(`gpt-chat/get_conversations_by_user/`);
    changeMessages(response.data);
  };

  const fetchMesagesOfRoom = async () => {
    if (!roomId) return;
    const response = await Axios.get(
      `gpt-messages/get_messages_by_conversation/?chat-id=${roomId}`
    );
    console.log(response.data)
    response.data.results.reverse()
    
     changeRoomMessages(response.data);
  };

  const sendMessage = async () => {
    const fd = new FormData();
    if (message == "") return;
    fd.append("query", message);
    // append just the query in room messages
    changeRoomMessages({
      ...roomMessages,
      count: roomMessages.count + 1,
      results: [...roomMessages.results, { query: message }],
    });
    changeIsTyping(true);
    changeMessage("");
    const response = await Axios.post(
      `gpt-messages/${roomId ? `?gpt-conversation-id=${roomId}` : ""}`,
      fd
    );
    changeIsTyping(false);
    // append the the new respond of messages
    changeRoomMessages({
      ...roomMessages,
      count: roomMessages.count + 1,
      results: [...roomMessages.results, response.data.data],
    });
    if (!roomId) fetchMessages()
    if (roomId !== response.data.conversation_id)
      changeRoomId(response.data.conversation_id);
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    fetchMesagesOfRoom();
  }, [roomId]);

  return {
    roomId,
    changeRoomId,
    isTyping,
    allMessages,
    roomMessages,
    fetchMessages,
    fetchMesagesOfRoom,
    sendMessage,
    createNewChat: () => {
      changeRoomId(undefined);
      changeRoomMessages(initialAllMessages);
    },
    message,
    changeMessage,
    deleteConversations: async () => {
      if (isTyping) return;
      await Axios.get(`gpt-chat/clear_all_conversations_by_user/`);
      changeRoomId(undefined);
      changeMessage("");
      changeMessages(initialAllMessages);
      changeRoomMessages(initialAllMessages);
    },
  };
};
