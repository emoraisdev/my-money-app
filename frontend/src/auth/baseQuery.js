import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";

const baseQuery = fetchBaseQuery({
    
    baseUrl: "http://localhost:3003/api/",
    
    prepareHeaders: (headers, { getState }) => {

        const token = getState().auth.token;
        if (token) headers.set("Authorization", `Bearer ${token}`)
        return headers;
    }
})

export const baseQueryWithAuth = async (args, api, extraOptions) => {
    
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        console.log("Token expirado → logout automático");

        api.dispatch(logout());
    }

    return result;
};