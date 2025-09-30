export type Priority = "low" | "medium" | "high";

export interface TodoTypes {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date | string;
  updatedAt?: Date | string;
  priority: Priority;
  dueDate?: Date | string;
  time?: string;

  timeCompleted?: Date | string;

  tags: string[];
  completedAt?: Date | string;
}
