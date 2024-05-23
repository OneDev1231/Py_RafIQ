import Axios from "config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getMessageWithChatbot = createAsyncThunk(
  "chat/messages",
  async ({ user_id, bot_id }: { user_id: any; bot_id: any }) => {
    try {
      const response = await Axios.get(
        `chat/get_conversations_by_user_bot/?user-id=${user_id}&bot-id=${bot_id}`
      );
      return response.data;
    } catch (error: any) {}
  }
);

export const createMessage = createAsyncThunk(
  "chat/create-message",
  async ({ bot_id, query }: { bot_id: any; query: any }) => {
    try {
      const fd = new FormData();
      fd.append("query", query);
      const response = await Axios.post(`message/?bot-id=${bot_id}`, fd);
      return response.data;
    } catch (error: any) {}
  }
);

interface State {
  messages: any;
  room: any;
  loading: boolean;
  isCreated: boolean;
  errors: object;
}

const initialState: State = {
  loading: false,
  isCreated: false,
  messages: [],
  room: null,
  errors: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialState,
  reducers: {
    resetChat: (state) => {
      state.isCreated = false;
    },
  },
  extraReducers: (builder) => {
    // get messages of chatbot
    builder.addCase(getMessageWithChatbot.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMessageWithChatbot.fulfilled, (state, action) => {
      state.loading = false;
      state.messages = action.payload.results;
      state.room = action.payload;
    });
    builder.addCase(getMessageWithChatbot.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        messages: action.payload,
      };
    });
    // create new message
    builder.addCase(createMessage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.isCreated = true;
    });
    builder.addCase(createMessage.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        created: action.payload,
      };
    });
  },
});

export const { resetChat } = chatSlice.actions;

export default chatSlice.reducer;
