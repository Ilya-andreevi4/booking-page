import { combineReducers, configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./slices/registration-slice";

const rootReducer = combineReducers({
  registration: registrationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
