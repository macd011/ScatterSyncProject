// components/focus/FocusTimerDisplay.tsx
import React from "react";
import { View, Text, Animated } from "react-native";
import { focusTimerStyles } from "./../styles/focusTimerStyles";

interface FocusTimerDisplayProps {
  timeLeft: number;
  formatTime: (seconds: number) => string;
  isActive: boolean;
  progress: number;
  toggleTimer: () => void;
  pomodoroCount: number;
  isBreak: boolean;
}

const FocusTimerDisplay: React.FC<FocusTimerDisplayProps> = ({
  timeLeft,
  formatTime,
  isActive,
  progress,
  pomodoroCount,
  isBreak,
}) => {
  const formattedTime = formatTime(timeLeft);

  const rotation = progress * 360;

  return (
    <View style={focusTimerStyles.timerContainer}>
      <View style={focusTimerStyles.timerCircle}>
        <View style={focusTimerStyles.circleBackground} />

        <Animated.View
          style={[
            focusTimerStyles.progressArc,
            {
              transform: [
                { rotate: "-90deg" }, 
                { rotateZ: `${rotation}deg` },
              ],
            },
          ]}
        />

        <View style={focusTimerStyles.circleContent}>
          <Text style={focusTimerStyles.timeDisplay}>{formattedTime}</Text>
          <Text style={focusTimerStyles.minutesLeftText}>
            {isBreak ? "Break time" : "Focus time"}
          </Text>
        </View>
      </View>

      <View style={focusTimerStyles.pomodoroCounter}>
        {[...Array(4)].map((_, i) => (
          <View
            key={i}
            style={[
              focusTimerStyles.pomodoroUnit,
              i < pomodoroCount && focusTimerStyles.completedPomodoro,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default FocusTimerDisplay;