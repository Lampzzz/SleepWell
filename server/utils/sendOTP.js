import bcrypt from "bcryptjs";
import OTP from "../models/otpModel.js";
import sendEmail from "./sendEmail.js";
import errorHandler from "./errorHandler.js";
import User from "../models/userModel.js";

const sendOTP = async (data, res) => {
  try {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

    const hashedOTP = await bcrypt.hash(otp, 10);
    const newOTPVerfication = await new OTP({
      email: data.email,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiredAt: Date.now() + 3600000,
    });

    await newOTPVerfication.save();
    await sendEmail(
      data.email,
      "Verify Your Email",
      `Your OTP for email verification is ${otp}. Please enter this code within the next 1 hour.`
    );

    res.status(200).json(data);
  } catch (err) {
    errorHandler(res, err);
  }
};

export default sendOTP;
