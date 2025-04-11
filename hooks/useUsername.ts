// hooks/useUsername.ts
import { useState, useEffect } from "react";
import { auth, firestore } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const useUsername = () => {
  const [username, setUsername] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUsername(userData.username || "User");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  return { username, loading };
};