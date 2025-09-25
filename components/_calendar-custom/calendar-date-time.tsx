import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export interface TimeSlot {
  time: string;
  available: boolean;
}

interface CalendarDateTimeProps {
  timeSlots?: TimeSlot[];

  time?: string | null;
  date?: Date | undefined;
  onTimeSelected?: (time: string | null) => void;
  onDateSelected?: (date: Date | undefined) => void;
}

const defaultTimeSlots: TimeSlot[] = [
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: true },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
  { time: "11:30", available: true },
  { time: "12:00", available: false },
  { time: "12:30", available: false },
  { time: "13:00", available: true },
  { time: "13:30", available: true },
  { time: "14:00", available: true },
  { time: "14:30", available: true },
  { time: "15:00", available: true },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
  { time: "16:30", available: true },
  { time: "17:00", available: true },
  { time: "17:30", available: true },
];

export const CalendarDateTime = ({
  timeSlots = defaultTimeSlots,
  time: timeProp,
  date: dateProp,
  onDateSelected,
  onTimeSelected,
}: CalendarDateTimeProps) => {
  const today = new Date();

  const currentTime = new Date().getTime();

  const [date, setDate] = useState<Date>(today);

  const [time, setTime] = useState<string | null>(null);

  const handleDateSelected = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setTime(null);
      // onDateSelected?.(newDate);
      onTimeSelected?.(null);
    }
  };

  const handleTimeSelected = (newTime: string | null) => {
    setTime(newTime);
    // onTimeSelected?.(newTime);
  };

  const handleApply = () => {
    onDateSelected?.(date);
    onTimeSelected?.(time);

    toast.success("Date and time applied");
  };

  const handleClear = () => {
    setDate(today);
    setTime(null);
    onDateSelected?.(undefined);
    onTimeSelected?.(null);
  };

  const buildDateTime = (date: Date, time: string | null) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":").map(Number);
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  return (
    <div className="rounded-lg border border-border w-full ">
      <div className="flex max-sm:flex-col">
        <Calendar
          mode="single"
          disabled={{
            before: today,
          }}
          selected={timeProp ? new Date(timeProp) : dateProp}
          onSelect={(newDate: Date | undefined) => {
            if (newDate) {
              handleDateSelected(newDate);
              setTime(null);

              return;
            }
            toast.warning("Please select a date after today");
          }}
          className={cn("p-2 sm:p-5 w-full bg-background")}
        />

        <div className="relative w-full">
          <div className="absolute inset-0 border-border py-4 max-sm:border-t">
            <ScrollArea className="h-full border-border sm:border-s">
              <div className="space-y-3">
                <div className="flex h-5 shrink-0 items-center px-5">
                  <p>
                    {format(date, "EEEE, d")} &{" "}
                    {time
                      ? format(buildDateTime(date, time) || new Date(), "HH:mm")
                      : "--:--"}
                  </p>
                </div>

                <div className="gird gap-1.5 px-5 max-sm:grid-cols-2 ">
                  {timeSlots.map(({ time: timeSlot, available }) => {
                    return (
                      <Button
                        key={timeSlot}
                        variant={time === timeSlot ? "default" : "outline"}
                        size="sm"
                        className={`w-full cursor-pointer transition-all ease-in-out duration-300 ${
                          time === timeSlot ? "p-5 " : ""
                        }`}
                        onClick={() => handleTimeSelected(timeSlot)}
                        disabled={
                          !available ||
                          new Date(timeSlot).getTime() < currentTime ||
                          new Date(timeSlot).getTime() >
                            new Date(date).getTime() + 24 * 60 * 60 * 1000
                        }
                      >
                        {timeSlot}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <Separator className="w-full my-2" />

      <div className="flex items-center justify-end p-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-24 cursor-pointer"
          onClick={handleClear}
        >
          Clear
        </Button>

        <Button
          variant="default"
          size="sm"
          className={`w-24 cursor-pointer ${
            !date || !time ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleApply}
          disabled={!date || !time}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
