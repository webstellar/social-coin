import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appreciation: {},
  loading: true,
  error: null,
  success: false,
};

export const createGratitude = createAsyncThunk(
  "gratitude/createGratitude",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/appreciation/new", formData);
      toast.success("Your testimony was created successfully");
      navigate(`/appreciation/${response.data?.appreciation?._id}`);
      return response.data;
    } catch (err) {
      toast.error(err.response.data.errMessage);
      return rejectWithValue(err.response.data.errMessage);
    }
  }
);

export const editGratitude = createAsyncThunk(
  "gratitude/editGratitude",
  async ({ id, formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/v1/me/appreciation/${id}`,
        formData
      );
      toast.success("Your testimony was updated successfully");
      navigate(`/appreciation/${id}`);
      return response.data;
    } catch (err) {
      toast.error("Sorry, something went wrong");
      return rejectWithValue(err.response.data.errMessage);
    }
  }
);

export const createGratitudeSlice = createSlice({
  name: "newgratitude",
  initialState,
  reducers: {
    clearGratitude: (state) => {
      state.appreciation = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGratitude.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createGratitude.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("gratitudes", JSON.stringify({ ...action.payload }));
      state.appreciation = action.payload.appreciation;
      state.success = true;
    });
    builder.addCase(createGratitude.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.errMessage;
      state.appreciation = null;
      state.success = false;
    });
    builder.addCase(editGratitude.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editGratitude.fulfilled, (state, action) => {
      state.loading = false;
      state.appreciation = action.payload.appreciation;
      state.success = true;
    });
    builder.addCase(editGratitude.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.errMessage;
      state.appreciation = null;
      state.success = false;
    });
  },
});

export const { clearGratitude } = createGratitudeSlice.actions;
