import { motion } from "motion/react";
import { CheckCircle2, Clock, BarChart3 } from "lucide-react";

interface ProgressCardProps {
  completedCount: number;
  activeCount: number;
}

export default function ProgressCard({ completedCount, activeCount }: ProgressCardProps) {
  const totalTasks = completedCount + activeCount;
  const percentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-xl border border-white/5 relative overflow-hidden">
      {/* Background visual highlight */}
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary/3 blur-[30px]" />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold font-display tracking-widest text-text-secondary uppercase">
            Progress
          </span>
        </div>
        <span className="text-xl font-bold font-display text-primary shadow-[0_0_10px_rgba(20,184,166,0.2)]">
          {percentage}%
        </span>
      </div>

      {/* Linear Glowy Progress Bar */}
      <div className="w-full h-2 bg-white/5 rounded-full mb-6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_8px_rgba(20,184,166,0.6)]"
        />
      </div>

      {/* Counters Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Completed counter card */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col gap-1 transition-all hover:bg-white/[0.04]">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span className="uppercase tracking-wider font-semibold text-[10px]">Completed</span>
          </div>
          <span className="text-2xl font-bold text-white font-display mt-1">
            {completedCount}
          </span>
        </div>

        {/* Active counter card */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col gap-1 transition-all hover:bg-white/[0.04]">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span className="uppercase tracking-wider font-semibold text-[10px]">Active</span>
          </div>
          <span className="text-2xl font-bold text-white font-display mt-1">
            {activeCount}
          </span>
        </div>
      </div>
    </div>
  );
}
