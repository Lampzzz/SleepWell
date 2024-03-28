import express from "express";
import uploadFile from "../utils/uploadFile.js";
import {
  authenticate,
  authorizeSuperAdmin,
} from "../middleware/authMiddleware.js";
import {
  createAdmin,
  getAllAdmins,
  updateAdminAccount,
  deleteAdminAccount,
  getAdmin,
} from "../controllers/superAdminController.js";

const router = express.Router();

router
  .post(
    "/create",
    uploadFile.single("avatar"),
    authenticate,
    authorizeSuperAdmin,
    createAdmin
  )
  .get("/admins", authenticate, authorizeSuperAdmin, getAllAdmins)
  .get("/admin/:id", authenticate, authorizeSuperAdmin, getAdmin)
  .put(
    "/admins/update",
    uploadFile.single("avatar"),
    authenticate,
    authorizeSuperAdmin,
    updateAdminAccount
  )
  .delete(
    "/admins/delete/:id",
    authenticate,
    authorizeSuperAdmin,
    deleteAdminAccount
  );

export default router;
