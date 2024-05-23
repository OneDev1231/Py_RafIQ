import Axios from "config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getProfile = createAsyncThunk("users/profile", async () => {
  try {
    const response = await Axios.get(`users/me/`);
    return response.data;
  } catch (error: any) {}
});

export const updateProfile = createAsyncThunk(
  "users/update-profile",
  async ({ email, name }: { name: string; email: string }) => {
    try {
      const response = await Axios.post(`user-profile/`, { name, email });
      return response.data;
    } catch (error: any) {}
  }
);

interface State {
  loading: boolean;
  isUpdated: boolean;
  user: any;
  errors: object;
}

const initialState: State = {
  loading: false,
  isUpdated: false,
  user: null,
  errors: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.isUpdated = false;
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    // get profile
    builder.addCase(getProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        profile: action.payload,
      };
    });
    // update profile
    builder.addCase(updateProfile.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        updateProfile: action.payload,
      };
    });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
