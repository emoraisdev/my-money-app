import { createSlice } from "@reduxjs/toolkit";

const persistedAuth = JSON.parse(localStorage.getItem("auth"))
    || { user: null, token: null };

const initialState = persistedAuth;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem("auth", JSON.stringify({
                user: action.payload.user,
                token: action.payload.token
            }));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;

            localStorage.removeItem("auth");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;