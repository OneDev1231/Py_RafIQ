import Axios from "config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getPlans = createAsyncThunk("plans/all", async () => {
  try {
    const response = await Axios.get(`subscription-plans/`);
    return response.data;
  } catch (error: any) {}
});

interface State {
  plans: any;
  loading: boolean;
  errors: object;
}

const initialState: State = {
  loading: false,
  plans: [],
  errors: {},
};

const userSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlans.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPlans.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.plans = action.payload.results;
      }
    });
    builder.addCase(getPlans.rejected, (state, action) => {
      state.loading = false;
      state.errors = {
        plans: action.payload,
      };
    });
  },
});

export default userSlice.reducer;
