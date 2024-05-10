import { USER_URL, REMINDER_URL } from "../../../data/endpoint";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteAccount: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),

    updateProfle: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/edit-profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/edit-password`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getDetails: builder.query({
      query: () => ({
        url: `${USER_URL}/details`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    sendContact: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/send-message`,
        method: "POST",
        body: data,
      }),
    }),

    createReminder: builder.mutation({
      query: (data) => ({
        url: `${REMINDER_URL}/time`,
        method: "POST",
        body: data,
      }),
    }),

    getReminder: builder.query({
      query: () => ({
        url: `${REMINDER_URL}/get`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useDeleteAccountMutation,
  useUpdateProfleMutation,
  useUpdatePasswordMutation,
  useGetDetailsQuery,
  useSendContactMutation,
  useCreateReminderMutation,
  useGetReminderQuery,
} = userApiSlice;
