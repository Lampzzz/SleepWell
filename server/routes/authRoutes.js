import express from "express";
import {
  createUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  verifyOTP,
  resendOTP,
} from "../controllers/authController.js";

const router = express.Router();

router
  .post("/register", createUser)
  .post("/login", loginUser)
  .post("/forgot-password", forgotPassword)
  .put("/reset-password", resetPassword)
  .post("/logout", logout)
  .post("/verify-otp", verifyOTP)
  .post("/resend-otp", resendOTP);

export default router;
