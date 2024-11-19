"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useTranslations } from "next-intl";

export default function DatePicker({ date, setDate }) {
  const today = new Date();
  const t = useTranslations("DatePicker");
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal bg-secondary",
            !date && "text-inactive"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          fromDate={today}
          disabled={(date) => date < today}
        />
      </PopoverContent>
    </Popover>
  );
}