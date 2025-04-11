// calendar.types.ts
import { Timestamp } from "firebase/firestore";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startDate: Timestamp;
  endDate: Timestamp;
  allDay: boolean;
  color?: string;
}

export interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
    selectedColor?: string;
  };
}

export interface CalendarDay {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

export type ViewMode = "month" | "year" | "schedule";
