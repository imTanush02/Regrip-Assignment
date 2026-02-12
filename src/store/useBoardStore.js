import { create } from "zustand";
import { mockApi } from "../api/mockApi";
import { v4 as uuidv4 } from "uuid";

export const useBoardStore = create((set, get) => ({
  sessionUser: localStorage.getItem("user") || null,
  boardItems: [],
  boardColumns: [
    { id: "todo", title: "To Do" },
    { id: "inprogress", title: "In Progress" },
    { id: "done", title: "Done" },
  ],
  notifications: [],

  authorizeUser: (username) => {
    localStorage.setItem("user", username);
    set({ sessionUser: username });
  },
  revokeUser: () => {
    localStorage.removeItem("user");
    set({ sessionUser: null });
  },

  showNotification: (message, type = "info") => {
    const id = uuidv4();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((t) => t.id !== id),
      }));
    }, 3000);
  },

  createItem: async (title) => {
    const tempId = uuidv4();
    const newItem = {
      id: tempId,
      title,
      columnId: "todo",
      owner: get().sessionUser,
    };

    const previousItems = get().boardItems;

    set((state) => ({ boardItems: [...state.boardItems, newItem] }));

    try {
      const createdEntry = await mockApi.createEntry({
        title,
        columnId: "todo",
        owner: get().sessionUser,
      });

      set((state) => ({
        boardItems: state.boardItems.map((t) =>
          t.id === tempId ? createdEntry : t,
        ),
      }));
    } catch (error) {
      console.error("Create Item Failed:", error);

      set({ boardItems: previousItems });

      get().showNotification("Failed to add item. Rolling back.", "error");
    }
  },

  moveItem: async (itemId, newColumnId) => {
    const previousItems = get().boardItems;

    set((state) => ({
      boardItems: state.boardItems.map((t) =>
        t.id === itemId ? { ...t, columnId: newColumnId } : t,
      ),
    }));

    try {
      await mockApi.shiftEntry(itemId, newColumnId);
    } catch (error) {
      console.error("Move Item Failed:", error);

      set({ boardItems: previousItems });

      get().showNotification("Failed to move item. Rolling back.", "error");
    }
  },

  removeItem: async (itemId) => {
    const previousItems = get().boardItems;

    set((state) => ({
      boardItems: state.boardItems.filter((t) => t.id !== itemId),
    }));

    try {
      await mockApi.removeEntry(itemId);
    } catch (error) {
      console.error("Delete Item Failed:", error);

      set({ boardItems: previousItems });

      get().showNotification("Failed to delete item. Rolling back.", "error");
    }
  },

  updateItem: async (itemId, title) => {
    const previousItems = get().boardItems;

    set((state) => ({
      boardItems: state.boardItems.map((t) =>
        t.id === itemId ? { ...t, title } : t,
      ),
    }));

    try {
      await mockApi.updateEntry(itemId, { title });
    } catch (error) {
      console.error("Update Item Failed:", error);
      set({ boardItems: previousItems });
      get().showNotification("Failed to update item. Rolling back.", "error");
    }
  },
}));
