import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  me: null,
  error: null,
  success: false,
  isAuthenticated: false,
};

//load users
export const loadUser = createAsyncThunk(
  "me/loadUser",
  async ({ getState, rejectWithValue }) => {
    try {
      //get user data from store
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/v1/me", config);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateProfile = createAsyncThunk(
  "me/updateProfile",
  async ({ formData, toast, navigate }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.patch(`/api/v1/me/update`, formData, config);
      toast.success("Your profile picture was update successfully");
      navigate(`/my-profile`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const editProfile = createAsyncThunk(
  "me/editProfile",
  async ({ id, formData, toast, navigate }, { rejectWithValue }) => {
    try {
   
      const response = await axios.patch(
        `/api/v1/me/edit/${id}`,
        formData,
     
      );
      toast.success("Your profile picture was update successfully");
      navigate(`/my-profile`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const myAuthSlice = createSlice({
  name: "me",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.me = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.me = null;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.me = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.me = null;
    });
  },
});
