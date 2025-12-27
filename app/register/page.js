"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/app/firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react"; // Correct professional icons

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("⚠️ Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: user.email,
        role: "customer",
        createdAt: new Date(),
      });

      await sendEmailVerification(user);
      setToast("✅ Registration successful! Check your email to verify your account.");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("⚠️ This email is already registered.");
      } else if (err.code === "auth/invalid-email") {
        setError("⚠️ Invalid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("⚠️ Password should be at least 6 characters.");
      } else {
        setError("⚠️ Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex text-black items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-4">
      {/* Animated Floating Circles */}
      <motion.div
        className="absolute w-64 h-64 bg-purple-400 rounded-full opacity-30 -top-24 -left-24 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      />
      <motion.div
        className="absolute w-56 h-56 bg-pink-400 rounded-full opacity-30 -bottom-20 -right-20 blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
      />

      {/* Registration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md z-10"
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6 drop-shadow-md">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.6)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        <p className="text-gray-600 text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-20 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
