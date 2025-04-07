import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';
import { User } from 'firebase/auth';


export default function Index() {
  const router = useRouter();

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
    if (user) {
      router.replace('/(dashboard)/DashboardScreen');
    } else {
      router.replace('/(auth)/LoginScreen');
    }
  });

  return unsubscribe;
}, []);

  return null;
}