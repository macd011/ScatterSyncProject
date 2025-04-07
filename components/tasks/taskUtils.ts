// utils/taskUtils.ts
import { Timestamp } from "firebase/firestore";

export const formatDeadline = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getDaysRemaining = (timestamp: Timestamp) => {
  const deadlineDate = timestamp.toDate();
  const today = new Date();
  
  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);
  
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return "Overdue";
  } else if (diffDays === 0) {
    return "Due today";
  } else if (diffDays === 1) {
    return "Due tomorrow";
  } else {
    return `${diffDays} days left`;
  }
};