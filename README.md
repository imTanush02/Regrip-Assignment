# KanbanFlow - Optimistic Task Management

A high-performance Kanban board built with React and Zustand, featuring zero-latency Optimistic UI updates and automatic state rollback.

## 🚀 Key Features
- **Instant Interaction**: Tasks move, add, and delete instantly without waiting for server confirmation.
- **Resilient State**: Uses a snapshot-and-rollback strategy to handle random API failures (20% failure rate simulation).
- **Responsive Design**: A sleek, dark-themed modern UI built with Tailwind CSS.
- **Persistence**: Mock authentication that persists across page refreshes.

## 🛠️ Architecture & Optimistic UI
For this assignment, I implemented an **Optimistic Update Pattern**:
1. **Snapshot**: Before any async call, a copy of the current state is stored.
2. **Optimistic Update**: The UI state is updated immediately to reflect the user's action.
3. **Async Execution**: The mock API is called with a simulated 1-2s delay.
4. **Error Handling**: On failure, a Toast notification is triggered, and the state is reverted using the previously stored snapshot to ensure data consistency.

## 📦 How to Run
1. Clone the repo: `git clone https://github.com/imTanush02/Regrip-Assignment.git`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`