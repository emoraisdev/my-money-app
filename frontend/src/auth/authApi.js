import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003/api/auth" }),

    endpoints: (builder) => ({

        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),

        register: builder.mutation({
            query: (newUser) => ({
                url: "/register",
                method: "POST",
                body: newUser,
            }),
        })
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;