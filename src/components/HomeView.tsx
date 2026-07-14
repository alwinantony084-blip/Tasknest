import { motion } from "motion/react";
import { ArrowRight, CheckSquare, Sparkles, Shield, RefreshCw } from "lucide-react";
import { ScreenType } from "../types";

interface HomeViewProps {
  onGetStarted: () => void;
}

export default function HomeView({ onGetStarted }: HomeViewProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-20 overflow-hidden bg-background">
      {/* Floating Animated Background Blobs */}
      <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] rounded-full bg-primary/5 blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[50%] left-[45%] w-[250px] h-[250px] rounded-full bg-primary-dim/3 blur-[90px] pointer-events-none" />

      {/* Decorative Floating Circles in Glassmorphism style */}
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/12 w-48 h-48 rounded-full bg-gradient-to-tr from-white/3 to-white/0 border border-white/5 backdrop-blur-[2px] hidden lg:block pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/12 w-64 h-64 rounded-full bg-gradient-to-br from-white/3 to-white/0 border border-white/5 backdrop-blur-[2px] hidden lg:block pointer-events-none"
      />

      {/* Hero Content Panel */}
      <div className="max-w-4xl text-center z-10 relative mt-12 flex flex-col items-center">
        {/* Sparkle Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Task Nest</span>
        </motion.div>

        {/* Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white mb-6 leading-tight"
        >
          Organize Your Life, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(20,184,166,0.15)]">
            The Smart Way 🪶
          </span>
        </motion.h2>

        {/* Subtitle Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 font-sans font-light leading-relaxed"
        >
          Your personal task companion that keeps your goals neat, stylish, and always within reach. Plan, prioritize, and conquer tasks with sleek glassmorphic precision.
        </motion.p>

        {/* CTA Get Started Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            onClick={onGetStarted}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-background font-bold text-base shadow-[0_4px_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_35px_rgba(20,184,166,0.5)] transition-all duration-300 flex items-center gap-3 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </motion.div>

        {/* Simple Features row to make the app premium */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mt-24 border-t border-white/5 pt-12 text-left"
        >
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-xl text-primary mt-1">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Interactive Board</h4>
              <p className="text-xs text-text-secondary">Categorize tasks, set times, and view complete analytics.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="p-2 bg-secondary/10 rounded-xl text-secondary mt-1">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Local Persistence</h4>
              <p className="text-xs text-text-secondary">All your logs are stored securely right in your device.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
            <div className="p-2 bg-primary-dim/10 rounded-xl text-primary-dim mt-1">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Fluid Transitions</h4>
              <p className="text-xs text-text-secondary">Silky smooth animations driven by motion physics.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
