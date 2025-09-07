import { db } from "@/app/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { cart } = await request.json();
  
  // You should get the user ID from auth context on client side
  const userId = request.headers.get("x-user-id"); 

  if (!userId) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const docRef = await addDoc(collection(db, "orders"), {
    items: cart,
    userId,
    status: "Pending",
    createdAt: serverTimestamp(),
  });

  return NextResponse.json({ id: docRef.id });
}
