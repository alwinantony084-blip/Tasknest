import { motion } from "motion/react";
import { User, Award, Layers, Zap, Heart, CheckCircle2, ExternalLink } from "lucide-react";
import { div } from "motion/react-m";

export default function AboutView() {
  const techStack = [
    { name: "React 19", category: "Framework", color: "text-primary" },
    { name: "TypeScript", category: "Language", color: "text-secondary" },
    { name: "Tailwind CSS v4", category: "Styling", color: "text-primary-dim" },
    { name: "Motion", category: "Animations", color: "text-secondary-dim" },
    { name: "Lucide Icons", category: "Visuals", color: "text-primary" },
  ];

  return (
    <div className="min-h-screen py-24 px-4 md:px-8 bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

      <div className="w-full max-w-3xl z-10">
        {/* Main About Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/80 relative overflow-hidden mb-8"
        >
          {/* Accent decoration */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-secondary" />

          <div className="flex flex-col items-center text-center">
            {/* Elegant Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
              <Zap className="w-8 h-8" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-white mb-4">
              About TaskNest
            </h2>
            
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-8">
              Digital Task Companion
            </p>

            <div className="space-y-6 text-text-secondary font-sans font-light text-base md:text-lg leading-relaxed max-w-2xl">
              <p>
                <strong className="text-white font-medium">TaskNest</strong> is your elegant digital task companion that helps you plan, track, and conquer your goals with clarity and style.
              </p>
              
              <p>
                Built by <strong className="text-white font-medium">Alwin Antony</strong> during the <strong className="text-primary-dim font-medium">Web Development Internship</strong> at <strong className="text-white font-semibold">Hex Software</strong>.
              </p>

              <p>
                It features smooth animations, local storage persistence, structured categories, and a consistent modern UI powered by high-end typography and glassmorphic elevations.
              </p>

              <p className="text-white font-display italic text-lg pt-4">
                Let’s keep productivity simple yet beautiful. 🪶
              </p>
            </div>
          </div>
        </motion.div>

        

          {/* Tech Stack */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-secondary/10 rounded-xl text-secondary">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white font-display">Upgrade Stack Details</h3>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {techStack.map((tech, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-xs text-text-secondary"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>{tech.name}</span>
                  <span className="text-[10px] text-text-muted">({tech.category})</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/5 flex justify-between items-center text-xs">
              <span className="text-text-muted">Storage:</span>
              <span className="text-primary font-mono font-medium">JSON Local Storage</span>
            </div>
          </motion.div>
        </div>
      </div>
    
  );
}
