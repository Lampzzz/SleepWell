import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createReminder,
  getTimeReminder,
} from "../controllers/reminderController.js";

const router = express.Router();

router
  .post("/time", authenticate, createReminder)
  .get("/get", authenticate, getTimeReminder);

export default router;
