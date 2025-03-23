import { useState } from "react";
import { useRouter } from "expo-router"; // ✅ Import useRouter from expo-router
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // ✅ Initialize router for navigation

  // 🔹 Login function with navigation
  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in successfully!");

      // ✅ Navigate to dashboard after successful login
      router.replace("/(dashboard)/DashboardScreen");
    } catch (err: any) {
      console.error("❌ Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Register function
  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Account created successfully!");

      // ✅ Navigate to dashboard after successful registration
      router.replace("/(dashboard)/DashboardScreen");
    } catch (err: any) {
      console.error("❌ Registration error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout function
  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log("✅ Logged out successfully!");

      // ✅ Navigate back to login after logout
      router.replace("/(auth)/LoginScreen");
    } catch (err: any) {
      console.error("❌ Logout error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleRegister,
    handleLogout,
    loading,
    error,
  };
};
