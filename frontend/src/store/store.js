import { configureStore } from "@reduxjs/toolkit";
import { billingCycleApi } from "../billingCycle/billingCycleApi";

export const store = configureStore({
  reducer: {
    [billingCycleApi.reducerPath]: billingCycleApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(billingCycleApi.middleware)
});