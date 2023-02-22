import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appreciations: [],
  tagAppreciations: [],
  categoryAppreciations: [],
  loading: true,
  error: null,
  success: false,
};

export const getGratitudes = createAsyncThunk(
  "gratitudes/getGratitudes",
  async () => {
    try {
      const { data } = await axios.get("/api/v1/appreciations");
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getTagGratitude = createAsyncThunk(
  "gratitudes/getTagGratitude",
  async (tag, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/appreciation/tag/${tag}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCategoryGratitude = createAsyncThunk(
  "gratitudes/getCategoryGratitude",
  async (category, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/v1/appreciation/category/${category}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const likeGratitude = createAsyncThunk(
  "gratitude/likeGratitude",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/v1/like/${id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const gratitudesSlice = createSlice({
  name: "gratitudes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGratitudes.pending, (state) => {
      state.loading = true;
      state.appreciations = [];
    });
    builder.addCase(getGratitudes.fulfilled, (state, action) => {
      state.loading = false;
      state.appreciations = action.payload.appreciations;
      state.success = true;
    });
    builder.addCase(getGratitudes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getTagGratitude.pending, (state) => {
      state.loading = true;
      state.tagAppreciations = [];
    });
    builder.addCase(getTagGratitude.fulfilled, (state, action) => {
      state.loading = false;
      state.tagAppreciations = action.payload.appreciations;
      state.success = true;
    });
    builder.addCase(getTagGratitude.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getCategoryGratitude.pending, (state) => {
      state.loading = true;
      state.categoryAppreciations = [];
    });
    builder.addCase(getCategoryGratitude.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryAppreciations = action.payload.appreciations;
      state.success = true;
    });
    builder.addCase(getCategoryGratitude.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(likeGratitude.pending, (state) => {});
    builder.addCase(likeGratitude.fulfilled, (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.appreciations = state.appreciations.map((item) =>
          item._id === id ? action.payload : item
        );
      }
      state.appreciation = action.payload.updatedGratitude;
      state.success = true;
    });
    builder.addCase(likeGratitude.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});
