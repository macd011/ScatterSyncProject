// styles/focusTimerStyles.ts
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const circleSize = width * 0.8;
const arcThickness = 24;

export const focusTimerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  
  // Header styles
  roundedHeader: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  
  // Main container for centering content
  centeredContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },

  // Timer components
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timerCircle: {
    width: circleSize,
    height: circleSize,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  circleBackground: {
    width: circleSize - 2 * arcThickness,
    height: circleSize - 2 * arcThickness,
    borderRadius: (circleSize - 2 * arcThickness) / 2,
    backgroundColor: "#f0f0f0",
    position: "absolute",
  },
  progressArc: {
    position: "absolute",
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth: arcThickness,
    borderColor: "transparent",
    borderTopColor: "#683AE7",
  },
  circleContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  minutesLeftText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  
  // Controls
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  controlButton: {
    backgroundColor: '#683AE7',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  resetButton: {
    backgroundColor: '#FF3B30', // Red color for reset button
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Pomodoro counter 
  pomodoroCounter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  pomodoroUnit: {
    width: 24,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  completedPomodoro: {
    backgroundColor: '#4CAF50', // Green for completed
  },
});