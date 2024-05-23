import Axios from "config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getSaved = createAsyncThunk("saved/all", async () => {
  try {
    const response = await Axios.get(`saved-bot/`);
    return response.data;
  } catch (error: any) {}
});

export const saveChatbot = createAsyncThunk("saved/save-chatbot", async ({ user, bot_id, name }: { user: any, bot_id: any, name: string }) => {
  try {
    const response = await Axios.post(`saved-bot/`, { user, bot_id, name });
    return response.data;
  } catch (error: any) {}
});

interface State {
  saved: any,
  loading: boolean,
  isSaved: boolean,
  errors: object,
}

const initialState: State = {
  loading: false,
  isSaved: false,
  saved: null,
  errors: {},
}

const savedSlice = createSlice({
  name: "saved",
  initialState: initialState,
  reducers: {
    resetSaved: (state) => {
      state.loading = false;
      state.isSaved = false;
    }
  },
  extraReducers: (builder) => {
    // all saved
    builder.addCase(getSaved.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSaved.fulfilled, (state, action) => {
      state.loading = false;
      state.saved = action.payload;
    });
    builder.addCase(getSaved.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        user: action.payload,
      };
    });
    // save chatbot
    builder.addCase(saveChatbot.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveChatbot.fulfilled, (state, action) => {
      state.loading = false;
      state.isSaved = true;
    });
    builder.addCase(saveChatbot.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        user: action.payload,
      };
    });
  },
});

export const { resetSaved } = savedSlice.actions;

export default savedSlice.reducer;
