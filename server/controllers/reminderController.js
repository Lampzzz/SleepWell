import cron from "node-cron";
import Reminder from "../models/reminderModel.js";
import User from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";

const createReminder = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { hour, minute, meridiem } = req.body;

  try {
    const existingReminder = await Reminder.findOne({ user: user._id });

    if (existingReminder) {
      await Reminder.deleteOne({ _id: existingReminder._id });
    }

    let reminderHour = hour;
    if (meridiem === "pm" && hour < 12) {
      reminderHour += 12;
    } else if (meridiem === "am" && hour === 12) {
      reminderHour = 0;
    }

    const reminderTime = new Date();
    reminderTime.setHours(reminderHour);
    reminderTime.setMinutes(minute);
    reminderTime.setSeconds(0);
    reminderTime.setMilliseconds(0);

    const reminder = await Reminder.create({
      user: user._id,
      hour,
      minute,
      meridiem,
      reminderTime,
    });

    cron.schedule(
      `${minute} ${hour} * * *`,
      async () => {
        await sendEmail(
          user.email,
          "SleepWell Time Reminder",
          "It's time to sleep well!"
        );
      },
      { scheduled: true }
    );

    res.status(200).send(reminder);
  } catch (err) {
    errorHandler(res, err);
  }
};

const getTimeReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({ user: req.user._id });

    res.status(200).json(reminder);
  } catch (err) {
    errorHandler(res, err);
  }
};

export { createReminder, getTimeReminder };
