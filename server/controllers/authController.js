import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import OTP from "../models/otpModel.js";
import sendOTP from "../utils/sendOTP.js";
import errorHandler from "../utils/errorHandler.js";

const createUser = async (req, res) => {
  let { firstName, lastName, middleName, email, password, confirmPassword } =
    req.body;

  firstName = firstName.trim();
  lastName = lastName.trim();
  middleName = middleName.trim();
  email = email.trim();
  password = password.trim();
  confirmPassword = confirmPassword.trim();

  try {
    const errors = [];
    const nameRegex = /^[a-zA-Z0-9 ]+$/;

    if (!firstName) {
      errors.push({
        field: "firstName",
        message: "First Name is required",
      });
    } else if (!nameRegex.test(firstName)) {
      errors.push({
        field: "firstName",
        message: "First Name cannot contain special characters",
      });
    }

    if (!lastName) {
      errors.push({
        field: "lastName",
        message: "Last Name is required",
      });
    } else if (!nameRegex.test(lastName)) {
      errors.push({
        field: "lastName",
        message: "Last Name cannot contain special characters",
      });
    }

    if (middleName && !nameRegex.test(middleName)) {
      errors.push({
        field: "middleName",
        message: "Middle Name cannot contain special characters",
      });
    }

    if (!email) {
      errors.push({
        field: "email",
        message: "Email is required",
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      errors.push({
        field: "email",
        message: "Email already exists",
      });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,20})/;

    if (!password) {
      errors.push({
        field: "password",
        message: "Password is required",
      });
    } else if (!passwordRegex.test(password)) {
      errors.push({
        field: "password",
        message: "Invalid password format",
      });
    }

    if (!confirmPassword) {
      errors.push({
        field: "confirmPassword",
        message: "Confirm Password is required",
      });
    }

    if (password != confirmPassword) {
      errors.push({
        field: "confirmPassword",
        message: "Password does not match",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      firstName,
      lastName,
      middleName: middleName ? middleName : "",
      email,
      passwordHash,
    };

    await sendOTP(newUser, res);
  } catch (err) {
    errorHandler(res, err);
  }
};

const verifyOTP = async (req, res) => {
  let { firstName, lastName, middleName, passwordHash, email, otp } = req.body;
  const errors = [];

  otp = otp.trim();

  try {
    const userOTPVerificationRecord = await OTP.findOne({ email });

    if (!userOTPVerificationRecord) {
      throw new Error("No OTP record found for the provided email");
    } else {
      const { expiredAt } = userOTPVerificationRecord;
      const hashedOTP = userOTPVerificationRecord.otp;

      if (expiredAt < Date.now()) {
        throw new Error("OTP has expired. Please request again.");
      } else {
        const validOTP = await bcrypt.compare(otp, hashedOTP);

        if (!otp) {
          errors.push({
            field: "otp",
            message: "OTP is required",
          });
        } else if (!validOTP) {
          errors.push({
            field: "otp",
            message: "Invalid OTP",
          });
        }

        if (errors.length > 0) {
          res.status(400).json({ errors });
          return;
        }

        await OTP.deleteMany({ email });

        await User.create({
          firstName,
          lastName,
          middleName: middleName ? middleName : "",
          email,
          passwordHash,
          avatar:
            "https://res.cloudinary.com/dgpjm3auu/image/upload/v1715363253/image/default_zdiya9.jpg",
        });

        res.status(200).send();
      }
    }
  } catch (err) {
    errorHandler(res, err);
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Email is required");
    }
    await OTP.deleteMany({ email });
    await sendOTP({ email }, res);
  } catch (err) {
    errorHandler(res, err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const errors = [];

    if (!email) {
      errors.push({
        field: "email",
        message: "Email is required",
      });
    }

    if (!password) {
      errors.push({
        field: "password",
        message: "Password is required",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("Wrong email or password");
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      throw new Error("Wrong email or password");
    }

    generateToken(res, existingUser._id, "token");

    res.status(200).json({
      _id: existingUser._id,
      email: existingUser.email,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      middleName: existingUser.middleName,
      role: existingUser.role,
      avatar: existingUser.avatar,
      verified: existingUser.verified,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).send();
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const errors = [];
    const user = await User.findOne({ email });

    if (!email) {
      errors.push({
        field: "email",
        message: "Email is required",
      });
    } else if (!user) {
      errors.push({
        field: "email",
        message: "User does not exist",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    generateToken(res, user._id, "resetToken", 5 * 60 * 1000);
    const link = `${process.env.BASE_URL}/reset-password`;

    await sendEmail(
      email,
      "Password Reset Link",
      `Click <a href=${link}>here<a/> to continue. Expired in 5 minutes.`
    );

    res.status(200).json({
      successMessage: "We've sent a password reset link to your email.",
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

const resetPassword = async (req, res) => {
  const { newPassword, repeatPassword } = req.body;
  const token = req.cookies.resetToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  const errors = [];

  try {
    if (!user) {
      errors.push({
        field: "email",
        message: "User does not exist",
      });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,20})/;

    if (!newPassword) {
      errors.push({
        field: "newPassword",
        message: "New Password is required",
      });
    } else if (!passwordRegex.test(newPassword)) {
      errors.push({
        field: "newPassword",
        message: "Invalid password format",
      });
    }

    if (!repeatPassword) {
      errors.push({
        field: "repeatPassword",
        message: "Repeat Password is required",
      });
    }

    if (newPassword != repeatPassword) {
      errors.push({
        field: "repeatPassword",
        message: "Password does not match",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);

    await user.save();

    // Clear the resetToken cookie after password reset
    res.clearCookie("resetToken").status(200).json({
      isSuccess: true,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ isExpired: true });
    }
    errorHandler(res, err);
  }
};

export {
  createUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  verifyOTP,
  resendOTP,
};
