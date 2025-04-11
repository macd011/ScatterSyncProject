// models/tracker.types.ts
export interface DailyTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  scheduled: boolean;
  scheduledTime?: string;
  category: string;
  categoryColor: string;
  icon: string;
}

export interface TaskSection {
  title: string;
  tasks: DailyTask[];
}