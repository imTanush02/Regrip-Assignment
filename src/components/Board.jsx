import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useBoardStore } from "../store/useBoardStore";
import Column from "./Column";

const Board = () => {
  const {
    boardItems,
    boardColumns,
    createItem,
    moveItem,
    revokeUser,
    sessionUser,
  } = useBoardStore();
  const [itemCaption, setItemCaption] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragCompletion = (e) => {
    const { active, over } = e;
    if (!over) return;

    if (active.id !== over.id) {
      const item = boardItems.find((t) => t.id === active.id);
      if (item && item.columnId !== over.id) {
        moveItem(active.id, over.id);
      }
    }
  };

  const submitNewItem = (e) => {
    e.preventDefault();
    if (!itemCaption.trim()) return;
    createItem(itemCaption);
    setItemCaption("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] font-sans text-gray-200  relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <header className="px-10 py-5 flex items-center justify-between sticky top-0 z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.03]">
        <div className="flex items-center gap-4 group">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform">
            <i className="ri-kanban-view-2 text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">
            Flow
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] pl-2 pr-5 py-1.5 rounded-2xl hover:bg-white/[0.05] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gray-700 to-gray-900 flex items-center justify-center text-[10px] font-bold ring-1 ring-white/10 shadow-inner">
              {sessionUser?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-400 tracking-tight">
              {sessionUser}
            </span>
          </div>
          <button
            onClick={revokeUser}
            className="group flex items-center justify-center w-10 h-10 text-gray-500 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all border border-transparent hover:border-red-400/10"
          >
            <i className="ri-logout-circle-r-line text-xl group-hover:rotate-12 transition-transform"></i>
          </button>
        </div>
      </header>

      <main className="flex-1 relative z-10 w-full flex flex-col  pt-12">
        <div className="max-w-[1400px] mx-auto h-full w-full flex flex-col gap-12">
          <div className="relative max-w-2xl mx-auto w-full group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
            <div className="relative bg-[#111] border border-white/[0.05] shadow-2xl p-2 pl-6 rounded-2xl flex items-center gap-4 transition-all">
              <form
                onSubmit={submitNewItem}
                className="flex-1 flex items-center gap-4"
              >
                <i className="ri-quill-pen-line text-lg text-blue-500/50"></i>
                <input
                  type="text"
                  placeholder="Drop a new task here..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-200 placeholder-gray-600 text-base py-3"
                  value={itemCaption}
                  onChange={(e) => setItemCaption(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!itemCaption.trim()}
                  className="bg-blue-600 text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-blue-500 disabled:opacity-20 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                >
                  Create
                </button>
              </form>
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={onDragCompletion}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start h-[70vh] p-8 pb-10 overflow-hidden custom-scrollbar">
              {boardColumns.map((col) => (
                <Column
                  key={col.id}
                  column={col}
                  items={boardItems.filter(
                    (t) => t.columnId === col.id && t.owner === sessionUser,
                  )}
                />
              ))}
            </div>
          </DndContext>
        </div>
      </main>
    </div>
  );
};

export default Board;
