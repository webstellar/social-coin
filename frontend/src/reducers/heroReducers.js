import {
  ALL_HEROES_REQUEST,
  ALL_HEROES_SUCCESS,
  ALL_HEROES_FAIL,
  HERO_DETAILS_REQUEST,
  HERO_DETAILS_SUCCESS,
  HERO_DETAILS_FAIL,
  ADMIN_HEROES_REQUEST,
  ADMIN_HEROES_SUCCESS,
  ADMIN_HEROES_FAIL,
  NEW_HERO_REQUEST,
  NEW_HERO_SUCCESS,
  NEW_HERO_RESET,
  NEW_HERO_FAIL,
  UPDATE_HERO_REQUEST,
  UPDATE_HERO_SUCCESS,
  UPDATE_HERO_RESET,
  UPDATE_HERO_FAIL,
  DELETE_HERO_REQUEST,
  DELETE_HERO_SUCCESS,
  DELETE_HERO_RESET,
  DELETE_HERO_FAIL,
  CLEAR_ERRORS,
  MY_HEROES_REQUEST,
  MY_HEROES_SUCCESS,
  MY_HEROES_FAIL,
  UPDATE_MY_HERO_REQUEST,
  UPDATE_MY_HERO_SUCCESS,
  UPDATE_MY_HERO_FAIL,
  UPDATE_MY_HERO_RESET,
  DELETE_MY_HERO_REQUEST,
  DELETE_MY_HERO_SUCCESS,
  DELETE_MY_HERO_FAIL,
  DELETE_MY_HERO_RESET,
} from "../constants/heroConstant";

export const heroesReducer = (state = { heroes: [] }, action) => {
  switch (action.type) {
    case ALL_HEROES_REQUEST:
    case ADMIN_HEROES_REQUEST:
      return {
        loading: true,
        heroes: [],
      };

    case MY_HEROES_REQUEST:
      return {
        loading: true,
      };

    case ALL_HEROES_SUCCESS:
      return {
        loading: false,
        heroes: action.payload.heroes,
        heroesCount: action.payload.heroesCount,
      };

    case MY_HEROES_SUCCESS:
    case ADMIN_HEROES_SUCCESS:
      return {
        loading: false,
        heroes: action.payload,
      };

    case ALL_HEROES_FAIL:
    case MY_HEROES_FAIL:
    case ADMIN_HEROES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const heroDetailsReducer = (state = { hero: {} }, action) => {
  switch (action.type) {
    case HERO_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case HERO_DETAILS_SUCCESS:
      return {
        loading: false,
        hero: action.payload,
      };

    case HERO_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newHeroReducer = (state = { hero: {} }, action) => {
  switch (action.type) {
    case NEW_HERO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_HERO_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        hero: action.payload.hero,
      };

    case NEW_HERO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_HERO_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const heroReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_HERO_REQUEST:
    case DELETE_MY_HERO_REQUEST:
    case UPDATE_HERO_REQUEST:
    case UPDATE_MY_HERO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_HERO_SUCCESS:
    case DELETE_MY_HERO_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_HERO_SUCCESS:
    case UPDATE_MY_HERO_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_HERO_FAIL:
    case DELETE_MY_HERO_FAIL:
    case UPDATE_HERO_FAIL:
    case UPDATE_MY_HERO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_HERO_RESET:
    case DELETE_MY_HERO_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_HERO_RESET:
    case UPDATE_MY_HERO_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
