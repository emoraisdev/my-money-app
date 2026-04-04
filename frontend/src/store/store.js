import { configureStore } from "@reduxjs/toolkit";
import { billingCycleApi } from "../billingCycle/billingCycleApi";
import authReducer from "../auth/authSlice";
import { authApi } from "../auth/authApi";

export const store = configureStore({

  reducer: {
    // estado global de autenticação
    auth: authReducer,

    // APIs (RTK Query)
    [billingCycleApi.reducerPath]: billingCycleApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      billingCycleApi.middleware,
      authApi.middleware
    )
});