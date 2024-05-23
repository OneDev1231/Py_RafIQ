import Axios from "config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getMessageWithChatGPT = createAsyncThunk(
  "chatGPT/messages",
  async () => {
    try {
      const response = await Axios.get(`gpt-chat/get_conversations_by_user/`);
      return response.data;
    } catch (error: any) {}
  }
);

export const getMessagesOfRoom = createAsyncThunk(
  "chatGPT/messages-room",
  async ({ roomId }: { roomId: any }) => {
    try {
      const response = await Axios.get(
        `gpt-messages/get_messages_by_conversation/?chat-id=${roomId}`
      );
      return response.data;
    } catch (error: any) {}
  }
);

export const createMessage = createAsyncThunk(
  "chatGPT/create-message",
  async ({ query, id }: { query: any; id: any }) => {
    try {
      console.log(">>>id: ", id);
      const fd = new FormData();
      fd.append("query", query);
      const response = await Axios.post(
        `gpt-messages/${id ? `?gpt-conversation-id=${id}` : ""}`,
        fd
      );
      return response.data;
    } catch (error: any) {}
  }
);

export const deleteConversation = createAsyncThunk(
  "chatGPT/delete-conversation",
  async () => {
    try {
      const response = await Axios.get(`gpt-chat/clear_all_conversations_by_user/`);
      return response.data;
    } catch (error: any) {}
  }
);

interface State {
  messages: any;
  newMessage: any;
  messagesOfRoom: any;
  room: any;
  loading: boolean;
  isCreated: boolean;
  errors: object;
}

const initialState: State = {
  loading: false,
  isCreated: false,
  messages: [],
  messagesOfRoom: [],
  room: null,
  newMessage: null,
  errors: {},
};

const chatGptSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    resetChatGpt: (state) => {
      state.isCreated = false;
      state.messagesOfRoom = [];
    },
  },
  extraReducers: (builder) => {
    // get messages of chatbot
    builder.addCase(getMessageWithChatGPT.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMessageWithChatGPT.fulfilled, (state, action) => {
      state.loading = false;
      state.messages = action.payload.results;
      state.room = action.payload;
    });
    builder.addCase(getMessageWithChatGPT.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        messages: action.payload,
      };
    });
    // get messages of room
    builder.addCase(getMessagesOfRoom.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMessagesOfRoom.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.messagesOfRoom = action.payload.results;
      }
    });
    builder.addCase(getMessagesOfRoom.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        messagesOfRoom: action.payload,
      };
    });
    // deleteConversations
    builder.addCase(deleteConversation.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteConversation.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.messagesOfRoom = action.payload.results;
      }
    });
    builder.addCase(deleteConversation.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        messagesOfRoom: action.payload,
      };
    });
    // create new message
    builder.addCase(createMessage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreated = true;
      state.newMessage = action.payload;
    });
    builder.addCase(createMessage.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        created: action.payload,
      };
    });
  },
});

export const { resetChatGpt } = chatGptSlice.actions;

export default chatGptSlice.reducer;
