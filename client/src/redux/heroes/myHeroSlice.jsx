import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  myheroes: [],
  loading: true,
  error: null,
  success: false,
  heroesCount: 0,
  currentPage: 1,
  numberOfPages: null,
};

export const getMyHeroes = createAsyncThunk(
  "heroes/getMyHeroes",
  async (page) => {
    try {
      const { data } = await axios.get(`/api/v1/me/heroes?page=${page}`);
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const myHeroesSlice = createSlice({
  name: "myHeroes",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyHeroes.pending, (state) => {
      state.loading = true;
      state.myheroes = [];
    });
    builder.addCase(getMyHeroes.fulfilled, (state, action) => {
      state.loading = false;
      state.myheroes = action.payload.heroes;
      state.heroesCount = action.payload.heroesCount;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
      state.success = true;
    });
    builder.addCase(getMyHeroes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { reset } = myHeroesSlice.actions;
