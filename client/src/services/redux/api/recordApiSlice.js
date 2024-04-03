import { RECORD_URL, STATUS_URL, SNORE_URL } from "../../../data/endpoint";
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

    recordStatus: builder.mutation({
      query: (data) => ({
        url: `${STATUS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    getSnore: builder.query({
      query: () => ({
        url: `${SNORE_URL}`,
        method: "GET",
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

export const {
  useCreateRecordMutation,
  useRecordStatusMutation,
  useGetSnoreQuery,
  useGetRecordsQuery,
} = recordApiSlice;
