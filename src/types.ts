export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name, e.g., "Briefcase", "User", "ShoppingCart", "Layers"
  color: string; // hex code or color name for background/border accents
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  categoryId: string; // Reference to Category
  dueDate?: string; // string representation of due date, e.g., "2026-07-14"
  dueTime?: string; // e.g., "17:00"
  createdAt: string; // ISO String
}

export type FilterType = 'all' | 'active' | 'completed';

export type ScreenType = 'home' | 'todo' | 'about';
