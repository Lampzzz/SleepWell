import { RECORD_URL } from "../../../data/endpoint";
import { apiSlice } from "./apiSlice";

export const recordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRecord: builder.mutation({
      query: (data) => ({
        url: `${RECORD_URL}/session`,
        method: "POST",
        body: data,
      }),
    }),

    getRecords: builder.query({
      query: () => ({
        url: `${RECORD_URL}/data`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateRecordMutation, useGetRecordsQuery } = recordApiSlice;
