import { useState } from "react";
import { auth, firestore } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );
      const user = userCredential.user;

      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        email: email.trim().toLowerCase(),
        username: username.trim(),
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        phone: "",
        createdAt: new Date().toISOString(),
      });

      router.replace("/(dashboard)/DashboardScreen");
    } catch (err: any) {
      console.error("❌ Registration error:", err.message);
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(dashboard)/DashboardScreen");
    } catch (err: any) {
      console.error("❌ Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
    handleLogin,
    loading,
    error,
  };
};