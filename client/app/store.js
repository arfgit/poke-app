import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import pokemonSlice from "../features/pokemon/pokemonSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pokemon: pokemonSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
