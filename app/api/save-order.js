import { db } from "@/app/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Received /save-order request:", req.body);

    const { cart, amount, paymentId, customer } = req.body;
    const userId = req.headers["x-user-id"];

    console.log("User ID from headers:", userId);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: missing user ID" });
    }

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty or invalid" });
    }

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ error: "Customer details missing or incomplete" });
    }

    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!paymentId || typeof paymentId !== "string") {
      return res.status(400).json({ error: "Invalid paymentId" });
    }

    // Save order to Firestore
    const docRef = await addDoc(collection(db, "orders"), {
      userId,
      cart,
      amount,
      paymentId,
      status: "Paid",
      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
      },
      createdAt: serverTimestamp(),
    });

    console.log("Order successfully saved with ID:", docRef.id);

    return res.status(200).json({ message: "Order saved", orderId: docRef.id });
  } catch (err) {
    console.error("Firebase save order error:", err);
    return res.status(500).json({ error: "Failed to save order: " + err.message });
  }
}
