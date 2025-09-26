"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Plus, Sparkles } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDateTime } from "@/components/_calendar-custom/calendar-date-time";

interface AddTodoFormProps {
  onAdd: (
    name: string,
    description: string,
    priority: "low" | "medium" | "high",
    dueDate?: Date,
    tags?: string[],
    time?: string
  ) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [tags, setTags] = useState("");

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);

  const handleDateSelected = (date: Date | undefined) => {
    setDate(date);
    setDueDate(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const parsedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      const parsedDueDate = dueDate ? new Date(dueDate) : undefined;
      const parsedTime = time ? time : "";

      onAdd(
        name.trim(),
        description.trim(),
        priority,
        parsedDueDate,
        parsedTags,
        parsedTime
      );
      setName("");
      setDescription("");
      setPriority("medium");
      setDueDate(undefined);
      setTags("");
      setIsExpanded(false);
      setDate(undefined);
      setTime(null);
    }
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setPriority("medium");
    setDueDate(undefined);
    setTags("");
    setIsExpanded(false);
    setDate(undefined);
    setTime(null);
  };

  if (!isExpanded) {
    return (
      <Card className="p-4 border-dashed border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-md cursor-pointer group">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(true)}
          className="w-full justify-start text-muted-foreground hover:text-foreground group-hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Plus className="h-4 w-4" />
            </div>
            <span className="font-medium">Add new todo</span>
            <Sparkles className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-primary/20 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Task Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What needs to be done?"
            className="font-medium"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about this task..."
            className="min-h-[80px] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Priority
            </label>
            <Select
              value={priority}
              onValueChange={(value: "low" | "medium" | "high") =>
                setPriority(value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">🔵 Low Priority</SelectItem>
                <SelectItem value="medium">🟡 Medium Priority</SelectItem>
                <SelectItem value="high">🔴 High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* <div className=" w-full"> */}
          {/* <label className="text-sm font-medium text-foreground">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="cursor-pointer"
            /> */}

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
        {/* </div> */}

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Tags</label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="work, personal, urgent (comma separated)"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" disabled={!name.trim()} className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Create Todo
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
