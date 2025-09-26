"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "@/components/todos/priority-badge";
import type { TodoTypes } from "@/types/todo";
import {
  Pencil,
  Trash2,
  Check,
  X,
  Calendar,
  Tag,
  Clock,
  CalendarIcon,
  TimerIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarDateTime } from "../_calendar-custom/calendar-date-time";
import { Label } from "../ui/label";
import { format, formatDate } from "date-fns";
import { DD_MM_YYYY, DD_MM_YYYY_HH_MM_SS, MM_HH_DD_MM_YYYY } from "@/lib/date";

interface TodoItemProps {
  todo: TodoTypes;
  onUpdate: (id: string, updates: Partial<TodoTypes>) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(todo.name);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : ""
  );
  const [editTags, setEditTags] = useState((todo.tags || []).join(", "));

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);

  const handleSave = () => {
    const updates: Partial<TodoTypes> = {
      name: editName.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      tags: editTags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),

      updatedAt: new Date(),

      time: time || undefined,
    };

    if (editDueDate) {
      updates.dueDate = new Date(editDueDate);
    } else {
      updates.dueDate = undefined;
    }

    onUpdate(todo.id, updates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(todo.name);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
    setEditDueDate(
      todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : ""
    );

    setEditTags((todo.tags || []).join(", "));
    setIsEditing(false);
    setDate(undefined);
    setTime(null);
    setEditDueDate(
      todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : ""
    );
  };

  const handleToggleComplete = () => {
    onUpdate(todo.id, {
      completed: !todo.completed,
      completedAt: !todo.completed ? new Date() : undefined,
      timeCompleted: !todo.completed ? new Date() : undefined,
    });
  };

  const handleDateSelected = (date: Date | undefined) => {
    setDate(date);
    setEditDueDate(date?.toISOString().split("T")[0] || "");
  };

  const isOverdue =
    todo.dueDate && !todo.completed && new Date() > todo.dueDate;
  const isDueSoon =
    todo.dueDate &&
    !todo.completed &&
    new Date() <= todo.dueDate &&
    todo.dueDate.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000;

  return (
    <Card
      className={cn(
        "p-4 transition-all duration-300 hover:shadow-lg border group relative overflow-hidden",
        todo.completed && "bg-muted/30",
        isOverdue && "border-red-500/50 bg-red-500/5",
        isDueSoon && "border-yellow-500/50 bg-yellow-500/5"
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-0 w-1 h-full transition-opacity",
          todo.priority === "high" && "bg-red-500",
          todo.priority === "medium" && "bg-yellow-500",
          todo.priority === "low" && "bg-blue-500"
        )}
      />

      <div className="flex items-start gap-3 pl-2">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggleComplete}
          className="mt-1"
          id={todo.id}
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Todo name"
                className="font-medium"
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)"
                className="min-h-[80px] resize-none"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select
                    value={editPriority}
                    onValueChange={(value: "low" | "medium" | "high") =>
                      setEditPriority(value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Popover>
                  <PopoverTrigger asChild className="w-full">
                    <div className="flex w-full col-span-2  items-center gap-2 cursor-pointer rounded-md">
                      <CalendarIcon />
                      <span>Due Date</span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-xl max-w-2xl">
                    <CalendarDateTime
                      date={date}
                      time={time}
                      onDateSelected={handleDateSelected}
                      onTimeSelected={setTime}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Input
                  value={editTags}
                  onChange={(e) => setEditTags(e.target.value)}
                  placeholder="work, personal, urgent (comma separated)"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!editName.trim()}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <Label
                  htmlFor={todo.id}
                  className={cn(
                    "font-medium text-card-foreground leading-tight text-lg flex-1 cursor-pointer",
                    todo.completed && "line-through text-muted-foreground"
                  )}
                >
                  {todo.name}
                </Label>
                <PriorityBadge priority={todo.priority} />
              </div>

              {todo.description && (
                <p
                  className={cn(
                    "text-sm text-muted-foreground leading-relaxed",
                    todo.completed && "line-through"
                  )}
                >
                  {todo.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sky-700">
                    <Clock className="h-3 w-3" />
                    Created {format(new Date(todo.createdAt), "dd/MM/yyyy")}
                  </div>

                  {todo.dueDate && (
                    <div
                      className={cn(
                        "flex items-center gap-1",
                        isOverdue && "text-rose-600 font-medium",
                        isDueSoon && "text-yellow-600 font-medium"
                      )}
                    >
                      <Calendar className="h-3 w-3" />
                      Due {format(new Date(todo.dueDate), "dd/MM/yyyy")}
                      {isOverdue && " (Overdue)"}
                      {isDueSoon && " (Due Soon)"}
                    </div>
                  )}
                </div>

                {todo.updatedAt && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Clock className="h-3 w-3" />
                      Updated{" "}
                      {format(
                        new Date(todo.updatedAt || new Date()),
                        "dd/MM/yyyy"
                      )}
                    </div>
                  </div>
                )}

                {todo.completedAt && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-3 w-3" />
                    Completed{" "}
                    {formatDate(
                      new Date(todo.completedAt),
                      DD_MM_YYYY_HH_MM_SS
                    )}
                  </div>
                )}
              </div>

              <div>
                {todo.timeCompleted && (
                  <div className="flex items-center gap-1 text-green-600 font-medium">
                    <TimerIcon className="h-3 w-3" />
                    Completed{" "}
                    {formatDate(new Date(todo.timeCompleted), MM_HH_DD_MM_YYYY)}
                  </div>
                )}
              </div>

              {(todo.tags || []).length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  {(todo.tags || []).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(todo.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
