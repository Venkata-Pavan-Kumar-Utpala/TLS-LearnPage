import { Router } from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  checkEligibility,
  getAllPayments,
  payCertificateFee,
  paymentConfirmation,
} from "../controllers/paymentController.js";
const paymentRouter = Router();
paymentRouter.get("/:userId/:courseId/status", protect, checkEligibility);
paymentRouter.post("/pay", protect, payCertificateFee);
paymentRouter.get("/payments", protect, isAdmin, getAllPayments);
paymentRouter.patch(
  "/payments/:paymentId",
  protect,
  isAdmin,
  paymentConfirmation
);

export default paymentRouter;
