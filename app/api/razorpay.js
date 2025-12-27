import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const { amount } = JSON.parse(req.body);

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      payment_capture: 1,
    });

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Razorpay order creation failed" });
  }
}
