import { asyncHandler } from "../../middlewares/asyncHandler";
import { PaymentService } from "./payment.service";

export const PaymentController = {
  create: asyncHandler(async (req, res) => {
    const { amount } = req.body;
    await PaymentService.createOrder(amount, res);
  }),

  varify: asyncHandler(async (req, res) => {
    await PaymentService.verifyPayment(req, res);
  }),
};
