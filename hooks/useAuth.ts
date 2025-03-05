import { useState } from "react";

export const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    // TODO: Add authentication logic
  };

  return { email, setEmail, password, setPassword, handleLogin };
};
