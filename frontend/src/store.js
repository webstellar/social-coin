import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  heroesReducer,
  heroDetailsReducer,
  newHeroReducer,
  heroReducer,
  myHeroesReducer,
} from "./reducers/heroReducers";
import {
  appreciationsReducer,
  appreciationDetailsReducer,
  newAppreciationReducer,
  appreciationReducer,
  myAppreciationsReducer,
} from "./reducers/appreciationReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  heroes: heroesReducer,
  heroDetails: heroDetailsReducer,
  newHero: newHeroReducer,
  hero: heroReducer,
  myHeroes: myHeroesReducer,
  newAppreciation: newAppreciationReducer,
  appreciation: appreciationReducer,
  appreciations: appreciationsReducer,
  appreciationDetails: appreciationDetailsReducer,
  myAppreciations: myAppreciationsReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
});

let initiateState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initiateState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
