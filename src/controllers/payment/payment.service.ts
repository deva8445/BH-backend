import crypto from "crypto";
import Razorpay from "razorpay";
import { AppDataSource } from "../../ormconfig";
import { Payment } from "../../modules/payment.module";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const PaymentService = {
  async createOrder(amount, res) {
    const option = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    razorpay.orders.create(option, (err, order) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Something went wrong during payment process" });
      }
      return res.status(200).json({ data: order });
    });
  },
  async verifyPayment(req, res) {
    const { orderId, paymentId, signature } = req.body;
    const sign = orderId + "|" + paymentId;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === signature) {
      const paymentRepo = AppDataSource.getRepository(Payment);
      const payment = paymentRepo.create({
        orderId,
        paymentId,
        signature,
      });
      await paymentRepo.save(payment);
      res
        .status(200)
        .json({ message: "Payment verified and saved successfully" });
    }
  },
};
