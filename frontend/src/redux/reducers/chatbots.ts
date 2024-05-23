import Axios from "config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllMyChatbots = createAsyncThunk(
  "chatbots/my-chatbots",
  async () => {
    try {
      const response = await Axios.get(
        `chatbot/get_chatbot_by_user/`
      );
      return response.data;
    } catch (error: any) {}
  }
);

export const getChatbotWithId = createAsyncThunk(
  "chatbots/chatbot-detail",
  async ({ roomId }: { roomId: any }) => {
    try {
      const response = await Axios.get(
        `chatbot/${roomId}/`
      );
      return response.data;
    } catch (error: any) {}
  }
);

export const createChatbot = createAsyncThunk(
  "chatbots/chatbot-new",
  async ({ data }: { data: any }) => {
    try {
      const response = await Axios.post(
        `chatbot/`, data
      );
      return response.data;
    } catch (error: any) {}
  }
);

export const deleteChatbot = createAsyncThunk(
  "chatbots/chatbot-delete",
  async ({ roomId }: { roomId: any }) => {
    try {
      const response = await Axios.delete(
        `chatbot/${roomId}/`
      );
      return response.data;
    } catch (error: any) {}
  }
);

interface State {
  chatbots: any;
  chatDetail: any;
  newChatbot: any;
  loading: boolean;
  isCreated: boolean;
  isDeleted: boolean;
  errors: object;
}

const initialState: State = {
  loading: false,
  isCreated: false,
  isDeleted: false,
  chatbots: null,
  newChatbot: null,
  chatDetail: null,
  errors: {},
};

const chatbotsSlice = createSlice({
  name: "chatbots",
  initialState: initialState,
  reducers: {
    resetChatbot: (state) => {
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.newChatbot = null;
      state.errors = {};
    }
  },
  extraReducers: (builder) => {
    // my chatbots
    builder.addCase(getAllMyChatbots.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllMyChatbots.fulfilled, (state, action) => {
      state.loading = false;
      state.chatbots = action.payload;
    });
    builder.addCase(getAllMyChatbots.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        chatbots: action.payload,
      };
    });
    // chatbot detail
    builder.addCase(getChatbotWithId.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getChatbotWithId.fulfilled, (state, action) => {
      state.loading = false;
      state.chatDetail = action.payload;
    });
    builder.addCase(getChatbotWithId.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        detail: action.payload,
      };
    });
    // create chatbot
    builder.addCase(createChatbot.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createChatbot.fulfilled, (state, action) => {
      state.loading = false;
      state.newChatbot = action.payload;
      state.isCreated = true;
    });
    builder.addCase(createChatbot.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        create: action.payload,
      };
    });
    // delete chatbot
    builder.addCase(deleteChatbot.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteChatbot.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteChatbot.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        delete: action.payload,
      };
    });
  },
});

export const { resetChatbot } = chatbotsSlice.actions;

export default chatbotsSlice.reducer;
