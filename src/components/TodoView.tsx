import React, { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Briefcase, User, ShoppingCart, Layers, Calendar as CalendarIcon, 
  Clock, PlusCircle, FolderPlus, ListTodo, Tag, CheckCircle2, AlertCircle, X, Check, Trash2
} from "lucide-react";
import { Task, Category, FilterType } from "../types";
import TaskCard from "./TaskCard";
import ProgressCard from "./ProgressCard";
import CalendarCard from "./CalendarCard";

interface TodoViewProps {
  tasks: Task[];
  categories: Category[];
  onAddTask: (text: string, categoryId: string, dueDate?: string, dueTime?: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddCategory: (name: string, icon: string, color: string) => void;
  onDeleteCategory: (id: string) => void;
}

export default function TodoView({
  tasks,
  categories,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onAddCategory,
  onDeleteCategory
}: TodoViewProps) {
  // Navigation & Filtering States
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Task Input States
  const [taskText, setTaskText] = useState("");
  const [taskCategoryId, setTaskCategoryId] = useState(categories[0]?.id || "work");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskDueTime, setTaskDueTime] = useState("");
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);

  // New Category States
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("Layers");
  const [newCatColor, setNewCatColor] = useState("#14b8a6");

  // Error alert
  const [errorMsg, setErrorMsg] = useState("");

  const defaultColors = [
    "#14b8a6", // Teal
    "#0ea5e9", // Blue
    "#a855f7", // Purple
    "#ec4899", // Pink
    "#f43f5e", // Rose
    "#eab308", // Yellow
    "#f97316", // Orange
  ];

  const defaultIcons = [
    { name: "Layers", label: "General" },
    { name: "User", label: "Personal" },
    { name: "Briefcase", label: "Work" },
    { name: "ShoppingCart", label: "Shopping" }
  ];

  // Map category icons to actual Lucide icons inside categories list
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className="w-4 h-4" />;
      case "User":
        return <User className="w-4 h-4" />;
      case "ShoppingCart":
        return <ShoppingCart className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  // Submit new task
  const handleAddTaskSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) {
      setErrorMsg("Please enter a task description!");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }
    
    onAddTask(
      taskText.trim(),
      taskCategoryId,
      taskDueDate || undefined,
      taskDueTime || undefined
    );

    // Reset input fields
    setTaskText("");
    setTaskDueDate("");
    setTaskDueTime("");
    setShowAdvanceOptions(false);
  };

  // Submit new category
  const handleAddCategorySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      return;
    }
    onAddCategory(newCatName.trim(), newCatIcon, newCatColor);
    setNewCatName("");
    setIsAddingCategory(false);
  };

  // Filter Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // 1. Filter by category if one is selected
      if (selectedCategoryId !== "all" && task.categoryId !== selectedCategoryId) {
        return false;
      }
      
      // 2. Filter by status (All, Active, Completed)
      if (filter === "completed" && !task.completed) return false;
      if (filter === "active" && task.completed) return false;

      // 3. Filter by calendar date selection if present
      if (selectedDate && task.dueDate !== selectedDate) {
        return false;
      }

      return true;
    });
  }, [tasks, selectedCategoryId, filter, selectedDate]);

  // Tasks counts for visual metrics
  const activeTasksCount = useMemo(() => {
    return tasks.filter(t => !t.completed).length;
  }, [tasks]);

  const completedTasksCount = useMemo(() => {
    return tasks.filter(t => t.completed).length;
  }, [tasks]);

  const remainingFilteredCount = useMemo(() => {
    return filteredTasks.filter(t => !t.completed).length;
  }, [filteredTasks]);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 bg-background font-sans">
      
      {/* 1. LEFT SIDEBAR: CATEGORIES (3 Columns on large screens) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <div className="glass-panel rounded-2xl p-6 shadow-xl border border-white/5">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/5">
            <span className="text-xs font-bold font-display tracking-widest text-text-secondary uppercase">
              Categories
            </span>
            <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-text-muted font-mono font-bold">
              {categories.length}
            </span>
          </div>

          {/* Categories List */}
          <ul className="space-y-2">
            {/* All Tasks Link */}
            <li>
              <button
                onClick={() => {
                  setSelectedCategoryId("all");
                  setSelectedDate(null); // clear calendar filter
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  selectedCategoryId === "all"
                    ? "bg-primary/10 text-primary font-bold shadow-[0_0_12px_rgba(20,184,166,0.1)] border border-primary/20"
                    : "text-text-secondary hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ListTodo className="w-4 h-4" />
                  <span>All Tasks</span>
                </div>
                <span className="text-xs opacity-60 font-mono">{tasks.length}</span>
              </button>
            </li>

            {/* Custom Categories links */}
            {categories.map((cat) => {
              const catTasksCount = tasks.filter(t => t.categoryId === cat.id).length;
              const isSelected = selectedCategoryId === cat.id;

              return (
                <li key={cat.id} className="group relative">
                  <button
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      setSelectedDate(null); // clear calendar filter
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white/5 text-white font-bold border border-white/10"
                        : "text-text-secondary hover:bg-white/5 hover:text-white border border-transparent"
                    }`}
                    style={{
                      borderLeft: isSelected ? `3px solid ${cat.color}` : "none",
                      paddingLeft: isSelected ? "13px" : "16px"
                    }}
                  >
                    <div className="flex items-center gap-3" style={{ color: cat.color }}>
                      {renderCategoryIcon(cat.icon)}
                      <span className="text-white font-medium">{cat.name}</span>
                    </div>
                    <span className="text-xs opacity-50 font-mono text-text-muted group-hover:opacity-0 transition-opacity pr-1">
                      {catTasksCount}
                    </span>
                  </button>

                  {/* Delete button - appears on row hover */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCategory(cat.id);
                      if (selectedCategoryId === cat.id) {
                        setSelectedCategoryId("all");
                      }
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-text-muted opacity-0 group-hover:opacity-100 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                    title={`Delete ${cat.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* New Category Toggle trigger */}
          {!isAddingCategory ? (
            <button
              onClick={() => setIsAddingCategory(true)}
              className="mt-4 w-full py-2.5 px-4 rounded-xl border border-dashed border-white/15 hover:border-primary/40 text-text-secondary hover:text-primary transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Category</span>
            </button>
          ) : (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              onSubmit={handleAddCategorySubmit}
              className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-3.5"
            >
              <div className="flex justify-between items-center pb-1">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Add Category</span>
                <button 
                  type="button" 
                  onClick={() => setIsAddingCategory(false)}
                  className="text-text-muted hover:text-white p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Name Input */}
              <input
                type="text"
                placeholder="Category Name"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-text-muted focus:border-primary focus:outline-none"
              />

              {/* Color Picker */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-text-secondary uppercase font-bold">Accent Color</span>
                <div className="flex flex-wrap gap-1.5">
                  {defaultColors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setNewCatColor(col)}
                      className={`w-5 h-5 rounded-md transition-transform duration-200 cursor-pointer ${
                        newCatColor === col ? "scale-110 ring-2 ring-white/30" : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>

              {/* Icon Picker */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-text-secondary uppercase font-bold">Select Icon</span>
                <div className="grid grid-cols-4 gap-2">
                  {defaultIcons.map((ico) => (
                    <button
                      key={ico.name}
                      type="button"
                      onClick={() => setNewCatIcon(ico.name)}
                      className={`p-2 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                        newCatIcon === ico.name
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-black/20 border-white/5 text-text-secondary hover:text-white"
                      }`}
                      title={ico.label}
                    >
                      {renderCategoryIcon(ico.name)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-1.5 rounded-lg bg-primary text-background font-bold text-xs hover:bg-primary-dim shadow-[0_0_8px_rgba(20,184,166,0.2)] transition-all cursor-pointer"
              >
                Create
              </button>
            </motion.form>
          )}
        </div>
      </div>

      {/* 2. CENTER PANEL: TASK MANAGEMENT (6 Columns on large screens) */}
      <div className="lg:col-span-6 flex flex-col gap-6">
        
        {/* Task Adding Card */}
        <div className="glass-panel rounded-2xl p-6 shadow-xl border border-white/5">
          <form onSubmit={handleAddTaskSubmit} className="flex flex-col gap-4">
            
            {/* Primary input row */}
            <div className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Add a new task..."
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="flex-1 bg-white/5 hover:bg-white/[0.08] focus:bg-black/40 border border-white/10 focus:border-primary rounded-xl px-5 py-3.5 text-sm text-white placeholder-text-muted focus:outline-none transition-all duration-300 shadow-inner"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dim text-background font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_15px_rgba(20,184,166,0.25)] hover:shadow-[0_0_20px_#14b8a6] flex items-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer font-display"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">Add Task</span>
              </button>
            </div>

            {/* Error alerts */}
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-400 flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Quick config options button */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setShowAdvanceOptions(!showAdvanceOptions)}
                className="text-xs font-semibold text-text-secondary hover:text-primary transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5 text-primary" />
                <span>Task Settings {showAdvanceOptions ? "▲" : "▼"}</span>
              </button>
              
              {/* Reset to see all if filter is active */}
              {selectedDate && (
                <div className="text-xs text-primary-dim font-medium flex items-center gap-1">
                  <span>Due on {selectedDate}</span>
                  <button 
                    type="button"
                    onClick={() => setSelectedDate(null)}
                    className="hover:underline text-[10px] font-bold text-white ml-1 bg-white/10 rounded-full px-1.5 cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Expandable settings fields */}
            {showAdvanceOptions && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-text-secondary"
              >
                {/* Category picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold uppercase tracking-wider text-[9px] text-text-muted">Category</label>
                  <select
                    value={taskCategoryId}
                    onChange={(e) => setTaskCategoryId(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:outline-none cursor-pointer"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Due Date picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold uppercase tracking-wider text-[9px] text-text-muted">Due Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={taskDueDate}
                      onChange={(e) => setTaskDueDate(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Due Time picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold uppercase tracking-wider text-[9px] text-text-muted">Due Time</label>
                  <input
                    type="time"
                    value={taskDueTime}
                    onChange={(e) => setTaskDueTime(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-lg p-2 text-white focus:border-primary focus:outline-none cursor-pointer"
                  />
                </div>
              </motion.div>
            )}
          </form>
        </div>

        {/* Task Filtering Row & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-5 shadow-inner">
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-2">
            {(["all", "active", "completed"] as FilterType[]).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === type
                    ? "bg-primary text-background font-bold shadow-[0_0_10px_rgba(20,184,166,0.3)] scale-[1.02]"
                    : "text-text-secondary bg-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Metric details */}
          <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_4px_#14b8a6]" />
            <span>{remainingFilteredCount} tasks remaining</span>
          </div>
        </div>

        {/* 3. Task Cards Container with Transitions */}
        <ul className="flex flex-col gap-3 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
                const category = categories.find((c) => c.id === task.categoryId);
                return (
                  <TaskCard
                    key={task.id}
                    task={task}
                    category={category}
                    onToggle={onToggleTask}
                    onDelete={onDeleteTask}
                  />
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center justify-center text-center p-12 glass-panel rounded-2xl border border-dashed border-white/10 min-h-[250px]"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-text-muted mb-4">
                  <CheckCircle2 className="w-6 h-6 text-text-muted" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">No tasks found</h3>
                <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                  {selectedDate 
                    ? `You don't have any tasks scheduled for ${selectedDate}.` 
                    : "Your desk is clean! Get started by logging a new daily goal above."}
                </p>
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="mt-4 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-primary hover:text-white transition-all cursor-pointer"
                  >
                    View All Calendar Tasks
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </ul>
      </div>

      {/* 3. RIGHT SIDEBAR: METRICS & INTERACTIVE CALENDAR (3 Columns on large screens) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        {/* Progress gauge card */}
        <ProgressCard 
          completedCount={completedTasksCount}
          activeCount={activeTasksCount}
        />

        {/* Dynamic Month Calendar widget */}
        <CalendarCard 
          tasks={tasks}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>

    </div>
  );
}