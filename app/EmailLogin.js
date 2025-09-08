"use client";
import { useState } from "react";
import { auth } from "@/app/firebaseConfig";
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const actionCodeSettings = {
    url: `${window.location.origin}/finishSignUp`, // redirect page after clicking email
    handleCodeInApp: true,
  };

  const handleSendLink = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("📩 Login link sent! Please check your email.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to send email link.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Login with Email</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-2 mb-4 border rounded-lg"
      />
      <button
        onClick={handleSendLink}
        className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Send Login Link
      </button>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
