import { SUPER_URL } from "../../../data/endpoint";
import { apiSlice } from "./apiSlice";

export const superAdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: `${SUPER_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    getAllAdmin: builder.query({
      query: () => ({
        url: `${SUPER_URL}/admins`,
        method: "GET",
      }),
    }),

    getAdminDetails: builder.query({
      query: (id) => ({
        url: `${SUPER_URL}/admin/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),

    deleteAdminsAccount: builder.mutation({
      query: (id) => ({
        url: `${SUPER_URL}/admins/delete/${id}`,
        method: "DELETE",
      }),
    }),

    updateAdminsAccount: builder.mutation({
      query: (data) => ({
        url: `${SUPER_URL}/admins/update`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminQuery,
  useGetAdminDetailsQuery,
  useUpdateAdminsAccountMutation,
  useDeleteAdminsAccountMutation,
} = superAdminApiSlice;
