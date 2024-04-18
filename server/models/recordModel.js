import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  bedtime: {
    type: String,
    required: true,
  },

  wakeUp: {
    type: String,
    required: true,
  },

  sleepDuration: {
    type: String,
    required: true,
  },

  snoreCount: {
    type: String,
    required: true,
  },

  video: {
    type: String,
    required: true,
  },

  createdAt: {
    type: String,
    default: new Date(),
    required: true,
  },

  week: {
    type: String,
    required: true,
  },
});

const Record = mongoose.model("Record", recordSchema);

export default Record;
