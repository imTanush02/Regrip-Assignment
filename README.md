# Kanban Board Application

A production-ready Kanban Board built with React (Vite), Zustand, Tailwind CSS, and @dnd-kit.
This application features Optimistic UI updates with automatic rollback on API failure, providing a snappy user experience even with simulated network latency.

## 🚀 Features

- **Optimistic UI**: Instant updates for all actions (Add, Move, Delete).
- **Automatic Rollback**: Reverts state if the API fails (20% random failure rate).
- **Mock API**: Simulates 1-2s latency and random errors to demonstrate robust state management.
- **Drag & Drop**: Smooth interactions using @dnd-kit.
- **State Management**: Centralized store with Zustand.
- **Responsive Design**: Mobile-friendly layout with Tailwind CSS.

## 🛠 Tech Stack

- **React 18** (Vite)
- **Tailwind CSS**
- **Zustand**
- **@dnd-kit/core**
- **Remix Icons**

## 📦 Installation & Running Locally

1. **Clone the repository** (if applicable)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open your browser**:
   Navigate to `http://localhost:5173`

## 🏗 Architecture & Decisions

### Optimistic UI & Rollback

To ensure a responsive experience, all state changes are applied immediately to the local store ("Optimistic Update").
We save a snapshot of the previous state before applying changes.
The `mockApi` is then called in the background.

- **Success**: The optimistic state persists (or creates acts as confirmation).
- **Failure**: We restore the state from the snapshot and display a robust error Toast.

This approach was chosen to minimize perceived latency, which is critical for interactive apps like Kanban boards.

### State Management (Zustand)

Zustand was chosen for its simplicity and lack of boilerplate compared to Redux.
The `useBoardStore` handles:

- Task data
- Board columns
- Authentication state
- Toast notifications
- All business logic (optimism, rollback, API calls)

### Folder Structure

```
src/
 ├─ components/  # Reusable UI components (Board, Column, TaskCard)
 ├─ store/       # Zustand store & logic
 ├─ api/         # Mock API simulation
 ├─ pages/       # Page-level components
 ├─ App.jsx      # Router setup
 └─ main.jsx     # Entry point
```

## ⚠️ Mock API Behavior

The `src/api/mockApi.js` is configured to:

- Delay every request by **1000ms - 2000ms**.
- Fail **20%** of requests randomly.

You will see "Action failed" toasts appear occasionally. This is intentional to demonstrate the rollback feature.

---

Built for Frontend Engineering Assignment.
