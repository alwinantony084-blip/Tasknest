# TaskNest

🚀 **[Visit the Live Application Here](https://tasknest-coral.vercel.app)**

A modern task management application built with React, TypeScript, and Tailwind CSS.
## About

TaskNest is a modern, glassmorphic to-do list web application.

It features smooth animations, local storage persistence, structured categories, due dates, an interactive calendar, and a consistent dark UI powered by high-end typography and glassmorphic elevations.

## Features

- ✅ Add, complete, and delete tasks
- 🗂️ Organize tasks into custom categories (with icons and colors)
- 🗑️ Create and delete categories
- 📅 Set due dates and due times, with an interactive month calendar view
- 🔍 Filter tasks by All / Active / Completed, or by category, or by calendar date
- 📊 Progress tracking with completion metrics
- 💾 Full persistence via `localStorage` — no backend required
- 🎨 Polished glassmorphic dark UI with smooth Motion animations

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion) |
| Icons | Lucide React |
| Build Tool | Vite 6 |
| Storage | Browser `localStorage` (JSON) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/tasknest.git
cd tasknest

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
tasknest/
├── components/
│   ├── Navbar.tsx
│   ├── HomeView.tsx
│   ├── TodoView.tsx
│   ├── AboutView.tsx
│   ├── TaskCard.tsx
│   ├── ProgressCard.tsx
│   └── CalendarCard.tsx
├── App.tsx
├── types.ts
├── index.css
├── index.tsx
└── vite.config.ts
```
