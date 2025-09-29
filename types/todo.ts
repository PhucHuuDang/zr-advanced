export type Priority = "low" | "medium" | "high";

export interface TodoTypes {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
  priority: Priority;
  dueDate?: Date;
  time?: string;

  timeCompleted?: Date;

  tags: string[];
  completedAt?: Date;
}
