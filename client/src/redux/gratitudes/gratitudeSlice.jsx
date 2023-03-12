import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  appreciation: {},
  loading: true,
  error: null,
  success: false,
  reviews: [],
};

export const getGratitude = createAsyncThunk(
  "gratitude/getGratitude",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/appreciation/${id}`);
      return data.appreciation;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const reviewGratitude = createAsyncThunk(
  "gratitude/reviewGratitude",
  async (reviewData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.patch("/api/v1/review", reviewData, config);
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getReviews = createAsyncThunk(
  "gratitude/getReview",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/v1/review?id=${id}`);
      return data.reviews;
    } catch (error) {
      return error.data.message;
    }
  }
);

//id here = review._id
export const deleteReview = createAsyncThunk(
  "gratitude/deleteReview",
  async ({ id, appreciationid }) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/review?id=${id}&appreciationid=${appreciationid}`
      );

      return data;
    } catch (error) {
      return error.data.message;
    }
  }
);

export const deleteMyReview = createAsyncThunk(
  "gratitude/deleteMyReview",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/review/${id}`);

      return data;
    } catch (error) {
      return error.data.message;
    }
  }
);

export const updateGratitude = createAsyncThunk(
  "gratitude/updatedGratitude",
  async (formData, id, toast, navigate) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.patch(
        `/api/v1/me/appreciation/${id}`,
        formData,
        config
      );
      toast.success("Your gratitude was edited successfully");
      navigate("/my-profile");
      return data.appreciation;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const gratitudeSlice = createSlice({
  name: "gratitude",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGratitude.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGratitude.fulfilled, (state, action) => {
      state.loading = false;
      state.appreciation = action.payload;
      state.success = true;
    });
    builder.addCase(getGratitude.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(updateGratitude.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateGratitude.fulfilled, (state, action) => {
      state.loading = false;
      state.appreciation = action.payload;
      state.success = true;
    });
    builder.addCase(updateGratitude.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(reviewGratitude.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(reviewGratitude.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.appreciation = action.payload.appreciation;
    });
    builder.addCase(reviewGratitude.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(getReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.success = true;
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(deleteReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.loading = false;
      state.appreciation = action.payload.appreciation;
      state.success = true;
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(deleteMyReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteMyReview.fulfilled, (state, action) => {
      state.loading = false;
      state.appreciation = action.payload.appreciation;
      state.success = true;
    });
    builder.addCase(deleteMyReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});
