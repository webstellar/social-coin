import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  hero: {},
  loading: true,
  error: null,
  success: false,
};

export const getHero = createAsyncThunk("hero/getHero", async (id) => {
  try {
    const { data } = await axios.get(`/api/v1/hero/${id}`);
    return data.hero;
  } catch (error) {
    return error.response.data.message;
  }
});

export const updateHero = createAsyncThunk(
  "hero/updatedHero",
  async ({ id, formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/v1/me/hero/${id}`, formData);
      toast.success("Your Hero was edited successfully");
      navigate("/list/myheroes");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHero.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHero.fulfilled, (state, action) => {
      state.loading = false;
      state.hero = action.payload;
      state.success = true;
    });
    builder.addCase(getHero.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(updateHero.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateHero.fulfilled, (state, action) => {
      state.loading = false;
      state.hero = action.payload.hero;
      state.success = true;
    });
    builder.addCase(updateHero.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});
