import { useState } from "react";
import { Bell, Settings, Layers, Menu, X, CheckSquare, Info, Home } from "lucide-react";
import { ScreenType } from "../types";

interface NavbarProps {
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

export default function Navbar({ currentScreen, onScreenChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const navItems = [
    { label: "Home", value: "home" as ScreenType, icon: Home },
    { label: "To-Do List", value: "todo" as ScreenType, icon: CheckSquare },
    { label: "About", value: "about" as ScreenType, icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/10 px-6 py-4 md:px-12 flex justify-between items-center transition-all duration-300">
      {/* Brand Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => onScreenChange("home")}
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
          <span className="text-background font-bold text-lg font-display">T</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold font-display tracking-wide bg-gradient-to-r from-primary-dim to-secondary-dim bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
          Task Nest
        </h1>
      </div>

      {/* Desktop Nav Items */}
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.value;
          return (
            <li key={item.value}>
              <button
                onClick={() => onScreenChange(item.value)}
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 relative py-1 cursor-pointer ${
                  isActive 
                    ? "text-primary text-shadow-glow" 
                    : "text-text-secondary hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full shadow-[0_0_8px_#14b8a6]" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Desktop Right Actions */}
      <div className="hidden md:flex items-center gap-4">
        {/* Notifications */}
        <button 
          onClick={() => {
            setShowNotificationToast(true);
            setTimeout(() => setShowNotificationToast(false), 3000);
          }}
          className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-text-secondary hover:text-white transition-all cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_6px_#14b8a6]" />
        </button>

        {/* Settings */}
        <button 
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-text-secondary hover:text-white transition-all cursor-pointer"
          title="Settings"
        >
          <Settings className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={() => {
            setShowNotificationToast(true);
            setTimeout(() => setShowNotificationToast(false), 3000);
          }}
          className="relative p-2 rounded-lg bg-white/5 text-text-secondary hover:text-white"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/5 text-text-secondary hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full glass-panel border-b border-white/10 flex flex-col p-6 gap-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.value;
              return (
                <li key={item.value}>
                  <button
                    onClick={() => {
                      onScreenChange(item.value);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full py-2.5 px-4 rounded-xl text-base font-medium transition-all ${
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-text-secondary hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          
          <div className="h-[1px] bg-white/10 my-1" />
          
          <div className="flex items-center justify-between px-4">
            <span className="text-sm text-text-secondary">Logged in as AA</span>
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
              AA
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Floating Toast Notification */}
      {showNotificationToast && (
        <div className="fixed top-20 right-6 z-50 py-3 px-5 rounded-xl bg-surface-card border border-primary/20 shadow-xl shadow-black/50 text-white flex items-center gap-3 animate-in slide-in-from-right duration-300">
          <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <p className="text-xs font-medium">All tasks are successfully loaded and synchronized!</p>
        </div>
      )}
    </nav>
  );
}
