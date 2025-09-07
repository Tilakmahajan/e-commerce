import { db } from "@/app/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { cart, amount, paymentId } = JSON.parse(req.body);
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const docRef = await addDoc(collection(db, "orders"), {
      userId,
      items: cart,
      amount,
      paymentId,
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    return res.status(200).json({ message: "Order saved", orderId: docRef.id });
  } catch (err) {
    console.error("Save Order Error:", err);
    return res.status(500).json({ error: "Failed to save order" });
  }
}
