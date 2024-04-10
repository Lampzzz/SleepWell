import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  middleName: {
    type: String,
  },

  lastName: {
    type: String,
    required: true,
  },

  fullName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  avatar: { type: String, required: true },

  registered: {
    type: String,
    required: true,
    default: new Date(),
  },

  role: { type: String, default: "User" },
});

const User = mongoose.model("User", userSchema);

export default User;
