import express from "express";
import { createRecord, allRecords } from "../controllers/recordController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import uploadFile from "../utils/uploadFile.js";

const router = express.Router();

router
  .post("/session", authenticate, uploadFile.single("video"), createRecord)
  .get("/data", authenticate, allRecords);

export default router;
