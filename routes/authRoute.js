import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// Router Object
const router = express.Router();

// Routing
// Register || Method Post
router.post("/register", registerController);

// Login || Post
router.post("/login", loginController);

// Forgot Password || Post
router.post("/forgot-password", forgotPasswordController);

// Test Route
router.get("/test", requireSignIn, isAdmin, testController);

// Protected Route Auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Route Auth Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update Profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
