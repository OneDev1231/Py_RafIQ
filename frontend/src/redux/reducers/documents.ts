import Axios from "config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const uploadDocument = createAsyncThunk(
  "document/upload",
  async ({ file, name, website_link, type="DOCUMENT" }: { file: any, type: any, name: any, website_link: any }) => {
    try {
      const fd = new FormData();
      file && fd.append("document", file);
      fd.append("name", name);
      fd.append("type", type);
      website_link && fd.append("website_link", website_link);
      const response = await Axios.post(`chatbot-document/`, fd);
      return response.data;
    } catch (error: any) {}
  }
);

interface State {
  document: any;
  uploaded: boolean;
  loading: boolean;
  errors: object;
}

const initialState: State = {
  loading: false,
  document: null,
  uploaded: false,
  errors: {},
};

const documentSlice = createSlice({
  name: "document",
  initialState: initialState,
  reducers: {
    resetDocument: (state) => {
      state.loading = false;
      state.document = null;
      state.uploaded = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadDocument.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(uploadDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.document = action.payload;
      state.uploaded = true;
    });
    builder.addCase(uploadDocument.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        upload: action.payload,
      };
    });
  },
});

export const { resetDocument } = documentSlice.actions;
export default documentSlice.reducer;
