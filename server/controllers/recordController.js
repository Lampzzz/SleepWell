import Record from "../models/recordModel.js";
import User from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import cloudinary from "../utils/cloudinary.js";

const createRecord = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { bedtime, wakeUp, sleepDuration, snoreCount } = req.body;

  try {
    const firstRecord = await Record.findOne({ userID: user._id }).sort({
      createdAt: 1,
    });

    let weekNumber = 1;
    let weekStartDate;
    let weekEndDate;
    let videoUrl = "";

    if (!firstRecord) {
      weekStartDate = new Date();
    } else {
      weekStartDate = new Date(firstRecord.createdAt);
    }

    weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);

    const currentDate = new Date();
    const daysDifference = Math.floor(
      (currentDate - weekStartDate) / (1000 * 3600 * 24)
    );

    if (daysDifference >= 7) {
      weekNumber = Math.ceil(daysDifference / 7);
      weekStartDate.setDate(weekStartDate.getDate() + (weekNumber - 1) * 7);
      weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekEndDate.getDate() + 6);
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "video",
        resource_type: "video",
        public_id: `${user._id}_video`,
      });

      videoUrl = result.secure_url;
    }

    const record = await Record.create({
      user: user._id,
      bedtime,
      wakeUp,
      sleepDuration,
      snoreCount,
      video: videoUrl,
      week: `Week ${weekNumber}`,
    });

    res.status(200).send(record);
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
