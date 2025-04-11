// app/(dashboard)/FocusTimerScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Vibration } from "react-native";
import * as Notifications from "expo-notifications";
import { auth, firestore } from "../../firebaseConfig";
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

import FocusTimerDisplay from "../../components/focus/FocusTimerDisplay";
import { focusTimerStyles } from "../../components/styles/focusTimerStyles";
import dashboardStyles from "../../components/styles/dashboardStyles";
import UserDrawer from "../../components/ui/common/UserDrawer";

const POMODORO_WORK = 25 * 60;
const POMODORO_SHORT_BREAK = 5 * 60;
const POMODORO_LONG_BREAK = 30 * 60;
const POMODORO_CYCLES = 4;

const FocusTimerScreen = () => {
  const [timeLeft, setTimeLeft] = useState(POMODORO_WORK);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [username, setUsername] = useState("User");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);

  // Request notification permissions
  useEffect(() => {
    Notifications.requestPermissionsAsync().then((res) => {
      if (res.status !== "granted") {
        console.log("Notification permission not granted");
      }
    });

    // Fetch username
    fetchUserData();
    
    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  // Get username from Firestore
  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(firestore, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUsername(userData.username || "User");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Timer logic
  const startTimer = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setSessionStart(new Date());
    }
    setIsActive(true);

    timerInterval.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval.current!);
          setIsActive(false);
          onTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
    setIsPaused(true);
    setIsActive(false);
  };

  const resetTimer = (duration?: number) => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
    
    // If duration is provided, use it (for breaks). Otherwise reset to default work time
    setTimeLeft(duration || POMODORO_WORK);
    setIsActive(false);
    setIsPaused(false);
  };

  const toggleTimer = () => {
    if (isActive) {
      pauseTimer();
    } else {
      startTimer();
    }
  };
  
  // Reset button handler - doesn't increment pomodoro count
  const handleReset = () => {
    resetTimer();
  };

  const onTimerComplete = async () => {
    try {
      Vibration.vibrate([500, 100, 500]);

      if (!isBreak) {
        const newCount = pomodoroCount + 1;
        setPomodoroCount(newCount);

        if (newCount >= POMODORO_CYCLES) {
          setIsBreak(true);
          resetTimer(POMODORO_LONG_BREAK);
          await scheduleNotification(
            "Long Break Time!",
            "You completed 4 pomodoros. Take a 30-minute break."
          );
          setPomodoroCount(0);
        } else {
          setIsBreak(true);
          resetTimer(POMODORO_SHORT_BREAK);
          await scheduleNotification(
            "Break Time!",
            "Take a 5-minute break before your next pomodoro."
          );
        }
        await saveFocusSession();
      } else {
        setIsBreak(false);
        resetTimer(POMODORO_WORK);
        await scheduleNotification(
          "Back to Work!",
          "Your break is over. Start your next pomodoro."
        );
      }
    } catch (error) {
      console.error("Error completing timer:", error);
    }
  };

  const scheduleNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: null,
    });
  };

  const saveFocusSession = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(firestore, "focusSessions"), {
        userId: user.uid,
        duration: POMODORO_WORK / 60,
        isPomodoro: true,
        pomodoroCount: pomodoroCount + 1,
        startTime: sessionStart,
        endTime: new Date(),
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error saving focus session:", error);
    }
  };

  // progress fraction for the arc
  const getProgressValue = () => {
    const total = isBreak
      ? pomodoroCount >= POMODORO_CYCLES
        ? POMODORO_LONG_BREAK
        : POMODORO_SHORT_BREAK
      : POMODORO_WORK;
    return 1 - timeLeft / total;
  };

  return (
    <View style={focusTimerStyles.container}>
      {/* Header with rounded edges */}
      <View style={[dashboardStyles.header, focusTimerStyles.roundedHeader]}>
        <Text style={dashboardStyles.usernameText}>
          {username.toUpperCase()}'S FOCUS
        </Text>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={focusTimerStyles.centeredContent}>
        <FocusTimerDisplay
          timeLeft={timeLeft}
          formatTime={(seconds) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins < 10 ? "0" : ""}${mins}:${
              secs < 10 ? "0" : ""
            }${secs}`;
          }}
          isActive={isActive}
          progress={getProgressValue()}
          toggleTimer={toggleTimer}
          pomodoroCount={pomodoroCount}
          isBreak={isBreak}
        />

        {/* Control buttons */}
        <View style={focusTimerStyles.controlsContainer}>
          <TouchableOpacity
            style={focusTimerStyles.controlButton}
            onPress={toggleTimer}
          >
            <Ionicons
              name={isActive ? "pause" : "play"}
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={focusTimerStyles.controlButtonText}>
              {isActive ? "Pause" : "Start"}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[focusTimerStyles.controlButton, focusTimerStyles.resetButton]}
            onPress={handleReset}
          >
            <Ionicons
              name="refresh"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={focusTimerStyles.controlButtonText}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* User Drawer */}
      {drawerVisible && (
        <UserDrawer isVisible={drawerVisible} onClose={() => setDrawerVisible(false)} />
      )}
    </View>
  );
};

export default FocusTimerScreen;