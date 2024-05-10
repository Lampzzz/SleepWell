import mongoose from "mongoose";

const reminderShema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  hour: {
    type: Number,
    required: true,
  },

  minute: {
    type: Number,
    required: true,
  },

  meridiem: {
    type: String,
    required: true,
  },

  reminderTime: {
    type: String,
    required: true,
  },
});

const Reminder = mongoose.model("Reminder", reminderShema);

export default Reminder;
