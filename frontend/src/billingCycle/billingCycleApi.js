import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../auth/baseQuery";

const billingCyclePath = "billingCycles"

export const billingCycleApi = createApi({
    reducerPath: "billingCycleApi",

    baseQuery: baseQueryWithAuth,

    tagTypes: ["BillingCycle", "Summary"],

    endpoints: (builder) => ({

        getSummary: builder.query({
            query: () => `${billingCyclePath}/summary`,
            providesTags: ["Summary"]
        }),

        getBillingCycles: builder.query({
            query: ({ page = 1, limit = 10 } = {}) =>
                `${billingCyclePath}?page=${page}&limit=${limit}`,
            providesTags: ["BillingCycle"]
        }),

        createBillingCycle: builder.mutation({
            query: (data) => ({
                url: billingCyclePath,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["BillingCycle", "Summary"]
        }),

        updateBillingCycle: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${billingCyclePath}/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["BillingCycle", "Summary"]
        }),

        deleteBillingCycle: builder.mutation({
            query: (data) => ({
                url: `${billingCyclePath}/${data.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["BillingCycle", "Summary"]
        })
    })
})

export const {
    useGetSummaryQuery,
    useGetBillingCyclesQuery,
    useCreateBillingCycleMutation,
    useUpdateBillingCycleMutation,
    useDeleteBillingCycleMutation
} = billingCycleApi;