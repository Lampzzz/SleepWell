import Record from "../models/recordModel.js";
import User from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "User" }).sort({ registered: -1 });
    res.status(200).json(users);
  } catch (error) {
    errorHandler(res, err);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const users = await User.find({ role: "Admin" }).sort({ registered: -1 });
    res.status(200).json(users);
  } catch (error) {
    errorHandler(res, err);
  }
};

const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find()
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json(records);
  } catch (error) {
    errorHandler(res, err);
  }
};

const deleteUsersAccount = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (user) {
      await user.deleteOne();
      res.status(200).send();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    errorHandler(res, err);
  }
};

const deleteUsersRecord = async (req, res) => {
  const recordID = req.params.id;

  try {
    const record = await Record.findById(recordID);

    if (record) {
      await record.deleteOne();
      res.status(200).send();
    } else {
      throw new Error("Record not found");
    }
  } catch (error) {
    errorHandler(res, err);
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    errorHandler(res, err);
  }
};

const updateUserAccount = async (req, res) => {
  const errors = [];
  const nameRegex = /^[a-zA-Z0-9 ]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,20})/;
  const { id, firstName, lastName, middleName, email, password } = req.body;
  const user = await User.findById(id);

  try {
    if (!user) {
      throw new Error("User not found.");
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.middleName = middleName !== undefined ? middleName : "";
    user.email = email || user.email;
    user.passwordHash = password || user.passwordHash;
    user.avatar = req.file ? req.file.filename : user.avatar;

    if (!nameRegex.test(firstName)) {
      errors.push({
        field: "firstName",
        message: "First Name cannot contain special characters",
      });
    }

    if (!nameRegex.test(lastName)) {
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

    if (password && !passwordRegex.test(password)) {
      errors.push({
        field: "password",
        message: "Invalid password format",
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
    console.log(err.message);
  }
};

export {
  getAllUsers,
  getAllAdmins,
  deleteUsersAccount,
  deleteUsersRecord,
  getUserById,
  updateUserAccount,
  getAllRecords,
};
