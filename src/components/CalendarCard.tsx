import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Task } from "../types";

interface CalendarCardProps {
  tasks: Task[];
  selectedDate: string | null; // "YYYY-MM-DD"
  onDateSelect: (dateStr: string | null) => void;
}

export default function CalendarCard({ tasks, selectedDate, onDateSelect }: CalendarCardProps) {
  // Use today as baseline
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Helper to get number of days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get first day of the month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  // Get previous month's trailing days for padding
  const prevMonthIndex = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonthIndex);

  // Browse controls
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate calendar cells
  const cells: { day: number; isCurrentMonth: boolean; dateStr: string }[] = [];

  // 1. Previous month padded days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayVal = daysInPrevMonth - i;
    const mStr = String(prevMonthIndex + 1).padStart(2, '0');
    cells.push({
      day: dayVal,
      isCurrentMonth: false,
      dateStr: `${prevYear}-${mStr}-${String(dayVal).padStart(2, '0')}`
    });
  }

  // 2. Current month days
  const mStr = String(currentMonth + 1).padStart(2, '0');
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      isCurrentMonth: true,
      dateStr: `${currentYear}-${mStr}-${String(d).padStart(2, '0')}`
    });
  }

  // 3. Next month padded days to complete grid rows
  const remainingCells = 42 - cells.length; // 6 rows of 7 days = 42
  const nextMonthIndex = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const nextMStr = String(nextMonthIndex + 1).padStart(2, '0');
  for (let n = 1; n <= remainingCells; n++) {
    cells.push({
      day: n,
      isCurrentMonth: false,
      dateStr: `${nextYear}-${nextMStr}-${String(n).padStart(2, '0')}`
    });
  }

  // Helper: Check if dateStr has any pending tasks
  const hasPendingTasks = (dateStr: string) => {
    return tasks.some(t => t.dueDate === dateStr && !t.completed);
  };

  // Helper: Check if dateStr is today's real date
  const isTodayDate = (dateStr: string) => {
    const tYear = today.getFullYear();
    const tMonth = String(today.getMonth() + 1).padStart(2, '0');
    const tDay = String(today.getDate()).padStart(2, '0');
    return dateStr === `${tYear}-${tMonth}-${tDay}`;
  };

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl border border-white/5">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold font-display tracking-widest text-text-secondary uppercase">
            {monthNames[currentMonth]} {currentYear}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white border border-white/5 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white border border-white/5 transition-all cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Weekdays Row */}
      <div className="grid grid-cols-7 gap-y-2 text-center mb-3">
        {daysOfWeek.map((day, idx) => (
          <span key={idx} className="text-[10px] font-bold text-text-muted">
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-1">
        {cells.map((cell, idx) => {
          const isSelected = selectedDate === cell.dateStr;
          const isToday = isTodayDate(cell.dateStr);
          const hasTasks = hasPendingTasks(cell.dateStr);

          return (
            <button
              key={idx}
              onClick={() => {
                // If already selected, clear it (shows all tasks), else select it
                onDateSelect(isSelected ? null : cell.dateStr);
              }}
              className={`relative h-8 rounded-lg flex flex-col items-center justify-center text-xs transition-all cursor-pointer ${
                !cell.isCurrentMonth
                  ? "text-text-muted/40 hover:bg-white/[0.02]"
                  : isSelected
                  ? "bg-primary text-background font-bold shadow-[0_0_12px_rgba(20,184,166,0.5)] scale-105"
                  : isToday
                  ? "border border-primary text-primary font-semibold"
                  : "text-text-secondary hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{cell.day}</span>
              
              {/* Task due indicator dot */}
              {hasTasks && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary-dim shadow-[0_0_4px_#4fdbc8]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Filter Status Reset */}
      {selectedDate && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-[11px] text-text-secondary">
            Viewing tasks for <span className="text-primary font-semibold">{selectedDate}</span>
          </span>
          <button
            onClick={() => onDateSelect(null)}
            className="text-[10px] uppercase font-bold tracking-widest text-primary hover:underline cursor-pointer"
          >
            Show All
          </button>
        </div>
      )}
    </div>
  );
}
