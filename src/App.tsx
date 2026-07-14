import { useState, useEffect } from "react";
import { ScreenType, Task, Category } from "./types";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import TodoView from "./components/TodoView";
import AboutView from "./components/AboutView";
import { Heart } from "lucide-react";

// Helper utilities for date seeding relative to current local time
const getTodayStr = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getTomorrowStr = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Initial setup constants
const DEFAULT_CATEGORIES: Category[] = [
  { id: "personal", name: "Personal", icon: "User", color: "#38bdf8" },
  { id: "work", name: "Work", icon: "Briefcase", color: "#14b8a6" },
  { id: "shopping", name: "Shopping", icon: "ShoppingCart", color: "#f43f5e" }
];

const PRE_SEEDED_TASKS = (today: string, tomorrow: string): Task[] => [
  {
    id: "task-1",
    text: "Review design tokens for Dark Mode",
    completed: false,
    categoryId: "work",
    dueDate: today,
    dueTime: "17:00",
    createdAt: new Date().toISOString()
  },
  {
    id: "task-2",
    text: "Buy specialty coffee beans",
    completed: false,
    categoryId: "shopping",
    dueDate: tomorrow,
    createdAt: new Date().toISOString()
  },
  {
    id: "task-3",
    text: "Finalize TaskNest presentation",
    completed: true,
    categoryId: "work",
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [screen, setScreen] = useState<ScreenType>(() => {
    const saved = localStorage.getItem("tasknest_screen");
    return (saved as ScreenType) || "home";
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("tasknest_categories");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_CATEGORIES;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasknest_tasks");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return PRE_SEEDED_TASKS(getTodayStr(), getTomorrowStr());
  });

  useEffect(() => {
    localStorage.setItem("tasknest_screen", screen);
  }, [screen]);

  useEffect(() => {
    localStorage.setItem("tasknest_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("tasknest_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (text: string, categoryId: string, dueDate?: string, dueTime?: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      text,
      completed: false,
      categoryId,
      dueDate,
      dueTime,
      createdAt: new Date().toISOString()
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddCategory = (name: string, icon: string, color: string) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      icon,
      color
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleDeleteCategory = (id: string) => {
    const taskCount = tasks.filter((t) => t.categoryId === id).length;

    if (taskCount > 0) {
      const confirmed = window.confirm(
        `This category has ${taskCount} task${taskCount > 1 ? 's' : ''}. Deleting it will also delete ${taskCount > 1 ? 'those tasks' : 'that task'}. Continue?`
      );
      if (!confirmed) return;
    }

    setCategories((prev) => prev.filter((c) => c.id !== id));
    setTasks((prev) => prev.filter((t) => t.categoryId !== id));
  };

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-primary/30 selection:text-white flex flex-col relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/2 rounded-full blur-[140px] pointer-events-none z-0" />

      <Navbar currentScreen={screen} onScreenChange={setScreen} />

      <main className="flex-grow z-10 relative">
        {screen === "home" && (
          <HomeView onGetStarted={() => setScreen("todo")} />
        )}

        {screen === "todo" && (
          <TodoView
            tasks={tasks}
            categories={categories}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}

        {screen === "about" && (
          <AboutView />
        )}
      </main>

      <footer className="z-10 relative bg-[#070707] border-t border-white/5 py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <span className="font-semibold font-display tracking-wider text-white">Task Nest</span>
          <span className="opacity-40">|</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Made</span>
          <span>by Alwin Antony</span>
        </div>
      </footer>
    </div>
  );
}