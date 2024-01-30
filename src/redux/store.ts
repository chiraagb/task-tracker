import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./task/taskSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { RootState } from "./RootState";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({ task: taskReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,

  // Just to prevent any error from the browser
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type { RootState };
