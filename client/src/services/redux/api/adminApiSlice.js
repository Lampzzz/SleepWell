import { ADMIN_URL } from "../../../data/endpoint";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: "GET",
      }),
      invalidatesTags: ["Admin"],
    }),

    getAllAdmins: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/admins`,
        method: "GET",
      }),
      invalidatesTags: ["Admin"],
    }),

    getAllRecords: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/user-records`,
        method: "GET",
      }),
      invalidatesTags: ["Admin"],
    }),

    deleteUsersAccount: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/users/delete-account/${userId}`,
        method: "DELETE",
      }),
    }),

    deleteUsersRecord: builder.mutation({
      query: (recordID) => ({
        url: `${ADMIN_URL}/users/delete-record/${recordID}`,
        method: "DELETE",
      }),
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `${ADMIN_URL}/users/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    updateUsersAccount: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users/update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllAdminsQuery,
  useGetAllRecordsQuery,
  useDeleteUsersAccountMutation,
  useDeleteUsersRecordMutation,
  useGetUserDetailsQuery,
  useUpdateUsersAccountMutation,
} = adminApiSlice;
