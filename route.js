import express from "express";
const router = express.Router();
import {
  register,
  login,
  showRegisterPage,
  showLoginPage,
} from "../Exam-final-node-2/controllers/authController.js";
import { showDashboardPage } from "../Exam-final-node-2/controllers/dashboardController.js";
import { isAuthenticated } from "../Exam-final-node-2/middleware/isAuth.js";

// Route pour la page dashboard
router.get("/dashboard", isAuthenticated, showDashboardPage);
router.get("/register", showRegisterPage);
router.post("/register", register);
router.get("/login", showLoginPage);
router.post("/login", login);

export default router;
