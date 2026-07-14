import { motion } from "motion/react";
import { Briefcase, User, ShoppingCart, Layers, Calendar, Clock, Trash2, Check } from "lucide-react";
import { Task, Category } from "../types";

interface TaskCardProps {
  key?: string;
  task: Task;
  category: Category | undefined;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, category, onToggle, onDelete }: TaskCardProps) {
  // Map category icon strings to actual Lucide Components safely
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className="w-3.5 h-3.5" />;
      case "User":
        return <User className="w-3.5 h-3.5" />;
      case "ShoppingCart":
        return <ShoppingCart className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  // Humanize due date format nicely
  const formatDueDate = (dateStr?: string, timeStr?: string) => {
    if (!dateStr) return "";
    
    const today = new Date();
    const tYear = today.getFullYear();
    const tMonth = String(today.getMonth() + 1).padStart(2, '0');
    const tDay = String(today.getDate()).padStart(2, '0');
    const todayStr = `${tYear}-${tMonth}-${tDay}`;

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomYear = tomorrow.getFullYear();
    const tomMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const tomDay = String(tomorrow.getDate()).padStart(2, '0');
    const tomStr = `${tomYear}-${tomMonth}-${tomDay}`;

    let label = dateStr;
    if (dateStr === todayStr) {
      label = "Today";
    } else if (dateStr === tomStr) {
      label = "Tomorrow";
    } else {
      // Format as "MMM DD, YYYY" or simply "YYYY-MM-DD"
      try {
        const d = new Date(dateStr);
        label = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      } catch (e) {
        label = dateStr;
      }
    }

    if (timeStr) {
      // Convert "17:00" to "5:00 PM" format
      let formattedTime = timeStr;
      try {
        const [hourStr, minStr] = timeStr.split(":");
        const hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        formattedTime = `${hour12}:${minStr} ${ampm}`;
      } catch (e) {
        formattedTime = timeStr;
      }
      return `${label}, ${formattedTime}`;
    }

    return label;
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`glass-panel rounded-xl p-5 flex items-center justify-between gap-4 transition-all duration-300 relative group overflow-hidden ${
        task.completed 
          ? "bg-white/[0.01] border-white/5 opacity-60" 
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/15 hover:shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:translate-y-[-1px]"
      }`}
    >
      {/* Visual Completion Pulsation Glow */}
      {!task.completed && (
        <div className="absolute top-0 left-0 w-1.5 h-full transition-all duration-300 opacity-0 group-hover:opacity-100 bg-primary" />
      )}

      {/* Left side: Checkbox & Text */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Custom Styled Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all duration-300 relative cursor-pointer ${
            task.completed
              ? "bg-primary border-primary text-background shadow-[0_0_8px_rgba(20,184,166,0.4)]"
              : "border-white/20 hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          {task.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </motion.div>
          )}
        </button>

        {/* Task Title & Tags */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span 
            className={`text-sm md:text-base font-medium break-words leading-snug cursor-pointer ${
              task.completed 
                ? "text-text-secondary/70 line-through" 
                : "text-white"
            }`}
            onClick={() => onToggle(task.id)}
          >
            {task.text}
          </span>

          {/* Badges container */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Badge */}
            {category && (
              <span 
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 transition-all"
                style={{ color: category.color || "#14b8a6" }}
              >
                {getCategoryIcon(category.icon)}
                <span>{category.name}</span>
              </span>
            )}

            {/* Date Badge */}
            {task.dueDate && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium text-text-muted bg-white/5 border border-white/5">
                <Calendar className="w-3 h-3" />
                <span>{formatDueDate(task.dueDate, task.dueTime)}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Delete action */}
      <button
        onClick={() => onDelete(task.id)}
        className="p-2 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all duration-300 opacity-80 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
        title="Delete Task"
      >
        <Trash2 className="w-4.5 h-4.5" />
      </button>
    </motion.li>
  );
}
