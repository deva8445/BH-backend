import "dotenv/config.js";
import express from "express";
import { PaymentController } from "../controllers/payment/payment.controller";

const router = express.Router();

router.post("/order", PaymentController.create);
router.post("/verify", PaymentController.varify);

export default router;
