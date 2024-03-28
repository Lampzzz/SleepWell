import { apiSlice } from "./apiSlice";
import { AUTH_URL } from "../../../data/endpoint";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    verifyOTP: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify-otp`,
        method: "POST",
        body: data,
      }),
    }),

    resendOTP: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/resend-otp`,
        method: "POST",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset-password`,
        method: "PUT",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = userApiSlice;
