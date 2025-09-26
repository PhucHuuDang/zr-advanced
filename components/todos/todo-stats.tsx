import { Card } from "@/components/ui/card";
import type { TodoTypes } from "@/types/todo";
import {
  CheckCircle,
  Circle,
  ListTodo,
  AlertTriangle,
  Calendar,
  TrendingUp,
} from "lucide-react";

interface TodoStatsProps {
  todos: TodoTypes[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate =
    totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const highPriorityTodos = todos.filter(
    (todo) => todo.priority === "high" && !todo.completed
  ).length;
  const overdueTodos = todos.filter(
    (todo) => todo.dueDate && !todo.completed && new Date() > todo.dueDate
  ).length;
  const dueSoonTodos = todos.filter(
    (todo) =>
      todo.dueDate &&
      !todo.completed &&
      new Date() <= todo.dueDate &&
      todo.dueDate.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000
  ).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <ListTodo className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">
              {totalTodos}
            </p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">
              {completedTodos}
            </p>
            <p className="text-sm text-muted-foreground">Done</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Circle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">
              {pendingTodos}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">
              {highPriorityTodos}
            </p>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Calendar className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">
              {overdueTodos + dueSoonTodos}
            </p>
            <p className="text-sm text-muted-foreground">Due Soon</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <div className="relative h-5 w-5">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
              <div
                className="absolute inset-0 rounded-full border-2 border-primary border-r-transparent animate-spin"
                style={{
                  animation: `spin 2s linear infinite`,
                  transform: `rotate(${(completionRate / 100) * 360}deg)`,
                }}
              />
              <TrendingUp className="absolute inset-0 h-3 w-3 m-auto text-primary" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-card-foreground">
              {completionRate}%
            </p>
            <p className="text-sm text-muted-foreground">Progress</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
