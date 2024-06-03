import { configureStore } from "@reduxjs/toolkit";
import { settingsReducer } from "../slices/settings-slice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
