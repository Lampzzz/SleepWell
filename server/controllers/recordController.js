import Record from "../models/recordModel.js";
import User from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";

const createRecord = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { bedtime, wakeUp, sleepDuration } = req.body;
  const snoreCount = 0;

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const year = formattedDate.getFullYear().toString();
    return `${month}/${day}/${year}`;
  };

  try {
    const firstRecord = await Record.findOne({ userID: user._id }).sort({
      createdAt: 1,
    });

    let weekNumber = 1;
    let weekStartDate;
    let weekEndDate;

    if (!firstRecord) {
      weekStartDate = new Date();
    } else {
      weekStartDate = new Date(firstRecord.createdAt);
    }

    weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);

    // Calculate the current date
    const currentDate = new Date();

    // Calculate the difference between the current date and the start of the first week
    const daysDifference = Math.floor(
      (currentDate - weekStartDate) / (1000 * 3600 * 24)
    );

    // If more than 7 days have passed since the start of the week, increment the week number
    if (daysDifference >= 7) {
      weekNumber = Math.ceil(daysDifference / 7);
      weekStartDate.setDate(weekStartDate.getDate() + (weekNumber - 1) * 7);
      weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekEndDate.getDate() + 6);
    }

    const record = await Record.create({
      user: user._id,
      bedtime,
      wakeUp,
      sleepDuration,
      snoreCount,
      video: req.file ? req.file.filename : "",
      createdAt: formatDate(new Date()),
      week: `Week ${weekNumber}`,
    });

    if (!record) {
      throw new Error("Failed to create record");
    }

    res.status(200).send();
  } catch (err) {
    errorHandler(res, err);
  }
};

const allRecords = async (req, res) => {
  try {
    const records = await Record.find({ user: req.user._id }).populate("user");
    res.status(200).json(records);
  } catch (err) {
    errorHandler(res, err);
  }
};

export { createRecord, allRecords };
