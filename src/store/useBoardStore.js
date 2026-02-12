import { create } from "zustand";
import { mockApi } from "../api/mockApi";
import { v4 as uuidv4 } from "uuid";

export const useBoardStore = create((set, get) => ({
  user: localStorage.getItem("user") || null,
  tasks: [],
  columns: [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "done", title: "Done" },
  ],
  toasts: [], // { id, message, type }

  // Auth Actions
  login: (username) => {
    localStorage.setItem("user", username);
    set({ user: username });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  // Toast Actions
  addToast: (message, type = "info") => {
    const id = uuidv4();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3000); // Auto dismiss
  },

  // Board Actions with Optimistic UI
  addTask: async (title) => {
    const tempId = uuidv4();
    const newTask = { id: tempId, title, columnId: "todo", owner: get().user };

    // 1. Snapshot
    const previousTasks = get().tasks;

    // 2. Optimistic Update
    set((state) => ({ tasks: [...state.tasks, newTask] }));

    try {
      // 3. API Call
      const createdTask = await mockApi.createTask({
        title,
        columnId: "todo",
        owner: get().user,
      });

      // 4. Sync ID if needed (Mock API returns object with ID)
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === tempId ? createdTask : t)),
      }));
    } catch (error) {
      console.error("Add Task Failed:", error);
      // 5. Rollback
      set({ tasks: previousTasks });
      // 6. Error Notification
      get().addToast("Failed to add task. Rolling back.", "error");
    }
  },

  moveTask: async (taskId, newColumnId) => {
    // 1. Snapshot
    const previousTasks = get().tasks;

    // 2. Optimistic Update
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, columnId: newColumnId } : t,
      ),
    }));

    try {
      // 3. API Call
      await mockApi.moveTask(taskId, newColumnId);
    } catch (error) {
      console.error("Move Task Failed:", error);
      // 5. Rollback
      set({ tasks: previousTasks });
      // 6. Error Notification
      get().addToast("Failed to move task. Rolling back.", "error");
    }
  },

  deleteTask: async (taskId) => {
    // 1. Snapshot
    const previousTasks = get().tasks;

    // 2. Optimistic Update
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    }));

    try {
      // 3. API Call
      await mockApi.deleteTask(taskId);
    } catch (error) {
      console.error("Delete Task Failed:", error);
      // 5. Rollback
      set({ tasks: previousTasks });
      // 6. Error Notification
      get().addToast("Failed to delete task. Rolling back.", "error");
    }
  },
}));
