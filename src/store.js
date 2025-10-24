import { configureStore } from "@reduxjs/toolkit";
import { revenueApi } from "./Slice/OverviewSlice";

export const store = configureStore({
  reducer: {
    [revenueApi.reducerPath]: revenueApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(revenueApi.middleware),
});