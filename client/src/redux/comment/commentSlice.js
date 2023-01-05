import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { response } from "express";

const initialState = {
  loading: true,
  data: null,
  error: null,
  success: false,
};

export const addCommentToAppreciation = createAsyncThunk(
  "appreciation/addComment",
  async ({ appreciationData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/v1/me/appreciations/comment`,
        appreciationData,
        config
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errMessage);
    }
  }
);

export const addReactionToAppreciation = createAsyncThunk(
  "appreciation/addReaction",
  async ({ appreciationData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/v1/me/appreciations/reaction`,
        appreciationData,
        config
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.errMessage);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCommentToAppreciation.pending, (state) => {
      state.loading = false;
      state.data = null;
    });
    builder.addCase(addCommentToAppreciation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.success = true;
    });
    builder.addCase(addCommentToAppreciation.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.success = false;
      state.error = action.payload.message;
    });
    builder.addCase(addReactionToAppreciation.pending, (state) => {
      state.loading = false;
      state.data = null;
    });
    builder.addCase(addReactionToAppreciation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.success = true;
    });
    builder.addCase(addReactionToAppreciation.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.success = false;
      state.error = action.payload.message;
    });
  },
});
