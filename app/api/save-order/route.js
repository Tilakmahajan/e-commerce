// /app/api/save-order/route.js
import { db } from "@/app/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


// Optional: only if you want to verify ID token
// import { getAuth } from "firebase-admin/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { cart, amount, paymentId, customer, userId, userEmail } = body;

    if (!userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    if (!cart?.length) return new Response(JSON.stringify({ error: "Cart is empty" }), { status: 400 });
    if (!customer?.name || !customer?.phone || !customer?.address)
      return new Response(JSON.stringify({ error: "Customer info missing" }), { status: 400 });
    if (!paymentId) return new Response(JSON.stringify({ error: "Payment ID missing" }), { status: 400 });

    const docRef = await addDoc(collection(db, "orders"), {
      userId,
      userEmail,
      cart,
      amount,
      paymentId,
      customer,
      status: "Paid",
      createdAt: serverTimestamp(),
    });

    return new Response(JSON.stringify({ message: "Order saved", orderId: docRef.id }), { status: 200 });
  } catch (err) {
    console.error("❌ Save Order Error:", err);
    return new Response(JSON.stringify({ error: err.message || "Internal Server Error" }), { status: 500 });
  }
}
