import { v4 as uuidv4 } from "uuid";

const DELAY_MIN = 1000;
const DELAY_MAX = 2000;
const FAILURE_RATE = 0.2;

const delay = () => {
  const ms =
    Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN + 1)) + DELAY_MIN;
  return new Promise((res) => setTimeout(res, ms));
};

const shouldFail = () => Math.random() < FAILURE_RATE;

export const mockApi = {
  createEntry: async (payload) => {
    await delay();
    if (shouldFail()) throw new Error("Failed to create entry");
    return { ...payload, id: payload.id || uuidv4() };
  },

  shiftEntry: async (entryId, newColId) => {
    await delay();
    if (shouldFail()) throw new Error("Failed to move entry");
    return { entryId, newColId };
  },

  removeEntry: async (entryId) => {
    await delay();
    if (shouldFail()) throw new Error("Failed to delete entry");
    return entryId;
  },

  updateEntry: async (entryId, updates) => {
    await delay();
    if (shouldFail()) throw new Error("Failed to update entry");
    return { entryId, ...updates };
  },
};
