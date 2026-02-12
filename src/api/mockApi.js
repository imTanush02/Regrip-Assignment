import { v4 as uuidv4 } from "uuid";

const DELAY_MIN = 1000;
const DELAY_MAX = 2000;
const FAILURE_RATE = 0.2;

const delay = () => {
  const ms =
    Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN + 1)) + DELAY_MIN;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const shouldFail = () => Math.random() < FAILURE_RATE;

export const mockApi = {
  createTask: async (task) => {
    await delay();
    if (shouldFail()) throw new Error("Failed to create task");
    return { ...task, id: task.id || uuidv4() };
  },

  moveTask: async (taskId, newColumnId) => {
    await delay();
    if (shouldFail()) throw new Error("Failed to move task");
    return { taskId, newColumnId };
  },

  deleteTask: async (taskId) => {
    await delay();
    if (shouldFail()) throw new Error("Failed to delete task");
    return taskId;
  },
};
