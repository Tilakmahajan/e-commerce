"use client";
import { useEffect } from "react";
import { auth } from "@/app/firebaseConfig";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function FinishSignUp() {
  const router = useRouter();

  useEffect(() => {
    async function completeSignIn() {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }

        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem("emailForSignIn");
          alert("✅ Logged in successfully!");
          router.push("/");
        } catch (error) {
          console.error("Error signing in with email link", error);
          alert("❌ Failed to sign in");
        }
      }
    }

    completeSignIn();
  }, [router]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Completing Sign In...</h1>
    </div>
  );
}
"use client";
import { useEffect } from "react";
import { auth } from "@/app/firebaseConfig";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function FinishSignUp() {
  const router = useRouter();

  useEffect(() => {
    async function completeSignIn() {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }

        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem("emailForSignIn");
          alert("✅ Logged in successfully!");
          router.push("/");
        } catch (error) {
          console.error("Error signing in with email link", error);
          alert("❌ Failed to sign in");
        }
      }
    }

    completeSignIn();
  }, [router]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Completing Sign In...</h1>
    </div>
  );
}
