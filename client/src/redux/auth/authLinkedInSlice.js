import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  user: {},
  lError: null,
  success: false,
  isAuthenticated: false,
};

export const linkedinSignIn = createAsyncThunk(
  "linkedin/login",
  async ({ userData, navigate, toast }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/authLinkedin",
        userData,
        config
      );
      toast.success("Logged in successfully");
      navigate("/");
      document.location.reload();
      return data;
    } catch (err) {
      toast.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const linkedinSignUp = createAsyncThunk(
  "linkedin/signup",
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/authLinkedin",
        formData,
        config
      );
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

export const linkedinSlice = createSlice({
  name: "authLinkedin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(linkedinSignIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(linkedinSignIn.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.isAuthenticated = true;
      state.success = true;
    });
    builder.addCase(linkedinSignIn.rejected, (state, action) => {
      state.loading = false;
      //state.lError = action.error.message;
      state.lError = "Unable to fetch profile data from linkedin";
      state.user = null;
    });

    builder.addCase(linkedinSignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(linkedinSignUp.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.isAuthenticated = true;
      state.success = true;
    });
    builder.addCase(linkedinSignUp.rejected, (state, action) => {
      state.loading = false;
      state.lError = action.error.message;
      state.user = null;
    });
  },
});
