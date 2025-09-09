import { db } from "@/app/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendEmail } from "@/app/sendEmail";

export async function POST(req) {
  try {
    const body = await req.json();
    const { cart, amount, customer, userId, userEmail, paymentId } = body;

    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    if (!cart?.length) return new Response(JSON.stringify({ error: "Cart is empty" }), { status: 400 });
    if (!customer?.name || !customer?.phone || !customer?.address)
      return new Response(JSON.stringify({ error: "Customer info missing" }), { status: 400 });
    if (!paymentId) return new Response(JSON.stringify({ error: "Payment ID missing" }), { status: 400 });

    // 1️⃣ Save order in Firestore
    const docRef = await addDoc(collection(db, "orders"), {
      userId,
      userEmail,
      cart,
      amount,
      customer,
      paymentId,
      status: "Paid",
      createdAt: serverTimestamp(),
    });

    // 2️⃣ Prepare email content
    const subject = `New Order Received - ${docRef.id}`;
    const itemsHtml = cart
      .map((item) => `<li>${item.name} × ${item.quantity} → ₹${item.price * item.quantity}</li>`)
      .join("");

    const html = `
      <h2>New Order Placed!</h2>
      <p><strong>Customer:</strong> ${customer.name}</p>
      <p><strong>Email:</strong> ${userEmail}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Address:</strong> ${customer.address}</p>
      <p><strong>Payment ID:</strong> ${paymentId}</p>
      <h3>Items:</h3>
      <ul>${itemsHtml}</ul>
      <p><strong>Total:</strong> ₹${amount}</p>
    `;

    // 3️⃣ Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject,
      html,
    });

    return new Response(JSON.stringify({ message: "Order saved and email sent", orderId: docRef.id }), { status: 200 });

  } catch (err) {
    console.error("❌ Save Order Error:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), { status: 500 });
  }
}
