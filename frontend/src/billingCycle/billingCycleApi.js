import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const billingCycleApi = createApi({
    reducerPath: "billingCycleApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3003/api/billingCycles"
    }),

    tagTypes: ["BillingCycle", "Summary"],

    endpoints: (builder) => ({

        getSummary: builder.query({
            query: () => "/summary",
            providesTags: ["Summary"]
        }),

        getBillingCycles: builder.query({
            query: ({ page = 1, limit = 10 } = {}) =>
                `?page=${page}&limit=${limit}`,
            providesTags: ["BillingCycle"]
        }),

        createBillingCycle: builder.mutation({
            query: (data) => ({
                url: "",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["BillingCycle", "Summary"]
        })
    })
})

export const {
    useGetSummaryQuery,
    useGetBillingCyclesQuery,
    useCreateBillingCycleMutation
} = billingCycleApi;