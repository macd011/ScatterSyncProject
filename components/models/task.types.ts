// models/task.types.ts
import { Timestamp } from "firebase/firestore";

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  deadline: Timestamp | null;
  completed: boolean;
  createdAt: Timestamp;
}

export const CATEGORIES: Category[] = [
  { id: "work", name: "Work", color: "#FF5733" },
  { id: "personal", name: "Personal", color: "#33A8FF" },
  { id: "health", name: "Health", color: "#33FF57" },
  { id: "education", name: "Education", color: "#D033FF" },
  { id: "finance", name: "Finance", color: "#FFD700" },
];