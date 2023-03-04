import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allHeroes: [],
  heroes: [],
  categoryHeroes: [],
  loading: true,
  error: null,
  success: false,
  heroesCount: 0,
  currentPage: 1,
  numberOfPages: null,
  loadedHeroes: [],
};

export const getHeroes = createAsyncThunk("heroes/getHeroes", async (page) => {
  try {
    const { data } = await axios.get(`/api/v1/heroes?page=${page}`);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const getAllHeroes = createAsyncThunk(
  "heroes/getAllHeroes",
  async () => {
    try {
      const { data } = await axios.get(`/api/v1/allHeroes`);
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getMoreHeroes = createAsyncThunk(
  "heroes/getMoreHeroes",
  async (skip) => {
    try {
      const { data } = await axios.get(`/api/v1/moreHeroes?skip=${skip}`);
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getHeroesWithParams = createAsyncThunk(
  "heroes/getHeroesWithParams",
  async ({ keyword = null, skip, page }) => {
    try {
      const { data } = await axios.get(
        `/api/v1/heroes?page=${page}&keyword=${keyword}&skip=${skip}`
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  }
);

export const getCategoryHero = createAsyncThunk(
  "heroes/getCategoryHero",
  async (category, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/hero/category/${category}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHeroes.pending, (state) => {
      state.loading = true;
      state.heroes = [];
    });
    builder.addCase(getHeroes.fulfilled, (state, action) => {
      state.loading = false;
      state.heroes = action.payload.heroes;
      state.heroesCount = action.payload.heroesCount;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
      state.success = true;
    });
    builder.addCase(getHeroes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllHeroes.pending, (state) => {
      state.loading = true;
      state.heroes = [];
    });
    builder.addCase(getAllHeroes.fulfilled, (state, action) => {
      state.loading = false;
      state.allHeroes = action.payload.heroes;
      state.success = true;
    });
    builder.addCase(getAllHeroes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getMoreHeroes.pending, (state) => {
      state.loading = true;
      state.heroes = [];
    });
    builder.addCase(getMoreHeroes.fulfilled, (state, action) => {
      state.loading = false;
      state.loadedHeroes = [...state.loadedHeroes, ...action.payload.heroes];
      state.heroesCount = action.payload.heroesCount;
      state.success = true;
    });
    builder.addCase(getMoreHeroes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getHeroesWithParams.pending, (state) => {
      state.loading = true;
      state.heroes = [];
    });
    builder.addCase(getHeroesWithParams.fulfilled, (state, action) => {
      state.loading = false;
      state.heroes = action.payload.heroes;
      state.heroesCount = action.payload.heroesCount;
      state.currentPage = action.payload.currentPage;
      state.numberOfPages = action.payload.numberOfPages;
      state.success = true;

      console.log(state.currentPage);
    });
    builder.addCase(getHeroesWithParams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getCategoryHero.pending, (state) => {
      state.loading = true;
      state.categoryHeroes = [];
    });
    builder.addCase(getCategoryHero.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryHeroes = action.payload.heroes;
      state.success = true;
    });
    builder.addCase(getCategoryHero.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setCurrentPage } = heroesSlice.actions;
