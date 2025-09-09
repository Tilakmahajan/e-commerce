import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // ✅ use server-only env
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const body = await req.json();

    const options = {
      amount: body.amount * 100, // amount in paisa
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`, // unique receipt
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (err) {
    console.error("Razorpay Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
