import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import uploadFile from "../utils/uploadFile.js";
import {
  getAllUsers,
  getAllAdmins,
  deleteUsersAccount,
  deleteUsersRecord,
  getUserById,
  updateUserAccount,
  getAllRecords,
} from "../controllers/adminController.js";

const router = express.Router();

router
  .get("/users", authenticate, authorizeAdmin, getAllUsers)
  .get("/admins", authenticate, authorizeAdmin, getAllAdmins)
  .get("/user-records", authenticate, authorizeAdmin, getAllRecords)
  .get("/users/:id", authenticate, authorizeAdmin, getUserById)
  .delete(
    "/users/delete-account/:id",
    authenticate,
    authorizeAdmin,
    deleteUsersAccount
  )
  .delete(
    "/users/delete-record/:id",
    authenticate,
    authorizeAdmin,
    deleteUsersRecord
  )
  .put(
    "/users/update/",
    uploadFile.single("avatar"),
    authenticate,
    authorizeAdmin,
    updateUserAccount
  );

export default router;
