"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/app/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Load cart from Firestore
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCart(cartSnap.data().items);
        } else {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    };
    fetchCart();
  }, [user]);

  // Save cart to Firestore
  const saveCart = async (newCart) => {
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: newCart });
    }
  };

  const addToCart = async (product) => {
    let newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      newCart[index].quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    setCart(newCart);
    await saveCart(newCart);
  };

  const removeFromCart = async (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    await saveCart(newCart);
  };

  const updateQuantity = async (id, quantity) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(newCart);
    await saveCart(newCart);
  };

  const clearCart = async () => {
    setCart([]);
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      await setDoc(cartRef, { items: [] });
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
