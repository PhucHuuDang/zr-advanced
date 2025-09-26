"use client";

import type React from "react";

import { useState, useEffect } from "react";
import type { TodoTypes } from "@/types/todo";
import { TodoItem } from "@/components/todos/todo-item";
import { AddTodoForm } from "@/components/todos/add-todo-form";
import { TodoStats } from "@/components/todos/todo-stats";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Filter,
  Moon,
  Sun,
  Search,
  SortAsc,
  Trash2,
  Download,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { selectorTodo } from "@/app/(home)/zustand/z-stores/todos";

type FilterType = "all" | "pending" | "completed" | "high-priority" | "overdue";
type SortType = "created" | "priority" | "dueDate" | "name";

export default function TodoContainer() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [isDark, setIsDark] = useState(true);
  const [sortBy, setSortBy] = useState<SortType>("created");
  const [searchQuery, setSearchQuery] = useState("");

  const todosStore = selectorTodo.use.todos();

  const addTodoStore = selectorTodo.use.addTodo();
  const updateTodoStore = selectorTodo.use.updateTodo();
  const removeTodoStore = selectorTodo.use.removeTodo();
  const clearTodosStore = selectorTodo.use.clearTodos();
  const clearCompletedStore = selectorTodo.use.clearCompleted();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const addTodo = (
    name: string,
    description: string,
    priority: "low" | "medium" | "high",
    dueDate?: Date,
    tags?: string[],
    time?: string
  ) => {
    const newTodo: TodoTypes = {
      id: crypto.randomUUID(),
      name,
      description,
      completed: false,
      createdAt: new Date(),
      priority,
      dueDate,
      tags: tags || [],
      time,
    };

    addTodoStore(newTodo);

    toast.success("Todo added successfully");
    // setTodos((prev) => [newTodo, ...prev]);
  };

  console.log({ todosStore });

  const updateTodo = (id: string, updates: Partial<TodoTypes>) => {
    // setTodos((prev) =>
    //   prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    // );

    updateTodoStore(updates, id);

    toast.success("Todo updated successfully");
  };

  const deleteTodo = (id: string) => {
    // setTodos((prev) => prev.filter((todo) => todo.id !== id));
    removeTodoStore(id);

    toast.success("Todo deleted successfully");
  };

  const filteredAndSortedTodos = todosStore
    .filter((todo) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          todo.name.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query) ||
          (todo.tags || []).some((tag) => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      switch (filter) {
        case "pending":
          return !todo.completed;
        case "completed":
          return todo.completed;
        case "high-priority":
          return todo.priority === "high" && !todo.completed;
        case "overdue":
          return todo.dueDate && !todo.completed && new Date() > todo.dueDate;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        default:
          // return b.createdAt.getTime() - a.createdAt.getTime();
          const aTime = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
          const bTime = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
          return bTime - aTime;
      }
    });

  const clearCompleted = () => {
    clearCompletedStore();
    toast.success("Completed todos cleared successfully");
  };

  const exportTodos = () => {
    const dataStr = JSON.stringify(todosStore, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `todos-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success("Todos exported successfully");
  };

  // const importTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: ProgressEvent<FileReader>) => {
  //       try {
  //         const imported = JSON.parse(e.target?.result as string);
  //         const todosArray = Array.isArray(imported)
  //           ? imported
  //           : imported?.state?.todos ?? [];

  //         const validTodos = todosArray.map((todo: any) => ({
  //           ...todo,
  //           createdAt: new Date(todo.createdAt),
  //           dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
  //           completedAt: todo.completedAt
  //             ? new Date(todo.completedAt)
  //             : undefined,
  //           tags: todo.tags || [],
  //         }));

  //         validTodos.forEach((t: TodoTypes) => addTodoStore(t));
  //       } catch (error) {
  //         console.error("Failed to import todos:", error);
  //       }
  //     };
  //     reader.readAsText(file);
  //   }
  // };

  const importTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        const todosArray = Array.isArray(imported)
          ? imported
          : imported?.state?.todos ?? [];
        const validTodos = todosArray.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
          completedAt: t.completedAt ? new Date(t.completedAt) : undefined,
          tags: t.tags || [],
        }));
        selectorTodo.setState({ todos: validTodos });
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Todo Manager Pro
            </h1>
            <p className="text-muted-foreground">
              Advanced task management with priorities, due dates, and more
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportTodos}
              className="gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <label>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 cursor-pointer bg-transparent"
              >
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={importTodos}
                className="hidden"
              />
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDark(!isDark)}
              className="gap-2"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {isDark ? "Light" : "Dark"}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <TodoStats todos={todosStore} />
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search todos, descriptions, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
            <Select
              value={sortBy}
              onValueChange={(value: SortType) => setSortBy(value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">Date Created</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1 flex-wrap">
              {(
                [
                  { key: "all", label: "All" },
                  { key: "pending", label: "Pending" },
                  { key: "completed", label: "Completed" },
                  { key: "high-priority", label: "High Priority" },
                  { key: "overdue", label: "Overdue" },
                ] as { key: FilterType; label: string }[]
              ).map(({ key, label }) => (
                <Button
                  key={key}
                  variant={filter === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(key)}
                  className="capitalize"
                >
                  {label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {key === "all"
                      ? todosStore.length
                      : key === "pending"
                      ? todosStore.filter((t) => !t.completed).length
                      : key === "completed"
                      ? todosStore.filter((t) => t.completed).length
                      : key === "high-priority"
                      ? todosStore.filter(
                          (t) => t.priority === "high" && !t.completed
                        ).length
                      : todosStore.filter(
                          (t) =>
                            t.dueDate && !t.completed && new Date() > t.dueDate
                        ).length}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {todosStore.some((todo) => todo.completed) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearCompleted}
              className="text-destructive hover:text-destructive bg-transparent gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear Completed
            </Button>
          )}
        </div>

        {/* Add Todo Form */}
        <div className="mb-6">
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredAndSortedTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">
                {searchQuery
                  ? "🔍"
                  : filter === "completed"
                  ? "✅"
                  : filter === "overdue"
                  ? "⏰"
                  : "📝"}
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery
                  ? "No matching todos found"
                  : filter === "all"
                  ? "No todos yet"
                  : filter === "pending"
                  ? "No pending todos"
                  : filter === "completed"
                  ? "No completed todos"
                  : filter === "high-priority"
                  ? "No high priority todos"
                  : "No overdue todos"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : filter === "all"
                  ? "Create your first todo to get started!"
                  : filter === "pending"
                  ? "All caught up! Great work."
                  : filter === "completed"
                  ? "Complete some todos to see them here."
                  : filter === "high-priority"
                  ? "No urgent tasks at the moment."
                  : "Stay on top of your deadlines!"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAndSortedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
