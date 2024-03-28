import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      required: true,
    },

    expiredAt: {
      type: Date,
      required: true,
    },
  },
  { collection: "otp" }
);

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
