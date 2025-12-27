"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/app/firebaseConfig";
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { db } from "@/app/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("user"); // default role

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        setUser(firebaseUser);

        // 🔑 Check Firestore for role
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setRole(userSnap.data().role || "customer");
        } else {
          // if no doc → create one with default role
          await setDoc(userRef, { 
            email: firebaseUser.email, 
            role: "customer" 
          });
          setRole("customer");
        }
      } else {
        setUser(null);
        setRole("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (!userCredential.user.emailVerified) {
      await signOut(auth);
      throw new Error("Email not verified. Please check your inbox.");
    }

    return userCredential;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole("user");
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
