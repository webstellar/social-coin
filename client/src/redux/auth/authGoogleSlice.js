import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  user: {},
  error: null,
  success: false,
  isAuthenticated: false,
};

export const googleSignIn = createAsyncThunk(
  "google/login",
  async ({ userData, navigate, toast }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/authGoogle", userData, config);
      toast.success("Logged in successfully");
      navigate("/");
      document.location.reload();
      return data;
    } catch (err) {
      toast.error(err.response.data.errMessage);
      return rejectWithValue(err.response.data);
    }
  }
);

export const googleSignUp = createAsyncThunk(
  "google/signup",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/v1/authGoogle", formData, config);
      toast.success("Registered successfully");
      document.location.reload();
      setTimeout(() => {
        navigate("/create-hero");
      }, 3000);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const googleSlice = createSlice({
  name: "authGoogle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(googleSignIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(googleSignIn.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.isAuthenticated = true;
      state.success = true;
    });
    builder.addCase(googleSignIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.user = null;
    });

    builder.addCase(googleSignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(googleSignUp.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.isAuthenticated = true;
      state.success = true;
    });
    builder.addCase(googleSignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.user = null;
    });
  },
});
