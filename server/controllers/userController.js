import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import sendContact from "../utils/sendContact.js";

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  try {
    if (!user) {
      throw new Error("User not found.");
    }

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { firstName, lastName, middleName } = req.body;
  const errors = [];
  const nameRegex = /^[a-zA-Z0-9 ]+$/;

  try {
    if (!user) {
      throw new Error("User not found");
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.middleName = middleName !== undefined ? middleName : "";
    user.email = req.body.email || user.email;
    user.avatar = req.file ? req.file.filename : user.avatar;

    if (user.firstName && !nameRegex.test(user.firstName)) {
      errors.push({
        field: "firstName",
        message: "First Name cannot contain special characters",
      });
    }

    if (user.lastName && !nameRegex.test(user.lastName)) {
      errors.push({
        field: "lastName",
        message: "Last Name cannot contain special characters",
      });
    }

    if (user.middleName && !nameRegex.test(user.middleName)) {
      errors.push({
        field: "middleName",
        message: "Middle Name cannot contain special characters",
      });
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const updateUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      middleName: updateUser.middleName,
      email: updateUser.email,
      avatar: updateUser.avatar,
      role: updateUser.role,
      verified: updateUser.verified,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

const updateUserPassword = async (req, res) => {
  const { currentPassword, newPassword, repeatPassword } = req.body;
  const user = await User.findById(req.user._id);
  const errors = [];
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,20})/;

  try {
    if (!user) {
      throw new Error("User not found.");
    }

    const passwordCompare = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );

    if (!passwordCompare) {
      errors.push({
        field: "currentPassword",
        message: "Current password is incorrect",
      });
    }

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

    if (await bcrypt.compare(newPassword, user.passwordHash)) {
      errors.push({
        field: "newPassword",
        message: "New Password cannot be the same as current password",
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
    res.status(200).send();
  } catch (err) {
    errorHandler(res, err);
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      throw new Error("User Delete Failed");
    }

    res.status(200).send();
  } catch (err) {
    errorHandler(res, err);
  }
};

const sendMail = async (req, res) => {
  const { fullName, email, phoneNumber, message } = req.body;

  try {
    if (!fullName || !email || !phoneNumber || !message) {
      throw new Error("Please enter all required fields.");
    }

    const sender = {
      fullName,
      email,
      phoneNumber,
      message,
    };

    sendContact(sender);
    res.status(200).send();
  } catch (err) {
    errorHandler(res, err);
  }
};

export {
  getCurrentUser,
  updateUserProfile,
  updateUserPassword,
  deleteUser,
  sendMail,
};
