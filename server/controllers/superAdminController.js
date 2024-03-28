import bcrypt from "bcryptjs";
import errorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";

const createAdmin = async (req, res) => {
  let { firstName, lastName, middleName, email, password } = req.body;
  let avatar = req.file ? req.file.filename : "default.jpg";

  firstName = firstName.trim();
  lastName = lastName.trim();
  middleName = middleName.trim();
  email = email.trim();
  password = password.trim();

  const errors = [];
  const nameRegex = /^[a-zA-Z0-9 ]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,20})/;
  const existingEmail = await User.findOne({ email });

  try {
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

    if (existingEmail) {
      errors.push({
        field: "email",
        message: "Email already exists",
      });
    }

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

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      firstName,
      lastName,
      middleName,
      email,
      passwordHash,
      avatar,
      registered: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      role: "Admin",
    });

    res.status(200).json(newAdmin);
  } catch (err) {
    errorHandler(res, err);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "Admin" }).sort({ registered: -1 });
    res.status(200).json(admins);
  } catch (error) {
    errorHandler(res, err);
  }
};

const updateAdminAccount = async (req, res) => {
  const { id, firstName, lastName, middleName, email, password } = req.body;
  const user = await User.findById(id);
  const errors = [];
  const nameRegex = /^[a-zA-Z0-9 ]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,20})/;

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

    const updateAdmin = await user.save();

    res.status(200).json({
      _id: updateAdmin._id,
      firstName: updateAdmin.firstName,
      lastName: updateAdmin.lastName,
      middleName: updateAdmin.middleName,
      email: updateAdmin.email,
      avatar: updateAdmin.avatar,
      role: updateAdmin.role,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

const deleteAdminAccount = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  try {
    if (user) {
      await user.deleteOne();
      res.status(200).send("Admin Deleted Successfully");
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    errorHandler(res, err);
  }
};

const getAdmin = async (req, res) => {
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

export {
  createAdmin,
  getAllAdmins,
  updateAdminAccount,
  deleteAdminAccount,
  getAdmin,
};
