import React from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import clsx from "clsx";

const Column = ({ column, items }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col h-auto xl:h-full group">
      <div className="flex items-center gap-3 mb-5 px-2">
        <div
          className={clsx(
            "w-2 h-8 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]",
            {
              "bg-gray-500 shadow-gray-500/20": column.id === "todo",
              "bg-blue-500 shadow-blue-500/40": column.id === "inprogress",
              "bg-green-500 shadow-green-500/40": column.id === "done",
            },
          )}
        ></div>
        <h2 className="font-bold text-gray-300 text-sm uppercase tracking-widest">
          {column.title}
        </h2>
        <span className="bg-white/5 border border-white/5 text-gray-400 text-xs px-2.5 py-1 rounded-full font-medium ml-auto">
          {items.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={clsx(
          "flex-1 rounded-2xl p-2 flex flex-col gap-4 min-h-[150px] transition-all duration-300",
          isOver
            ? "bg-white/5 ring-1 ring-white/10 shadow-inner"
            : "bg-transparent",
        )}
      >
        {items.map((task) => (
          <TaskCard key={task.id} item={task} />
        ))}

        {items.length === 0 && (
          <div
            className={clsx(
              "flex flex-col items-center justify-center p-8 text-gray-600 border-2 border-dashed border-white/5 rounded-xl h-32 transition-colors",
              isOver ? "border-blue-500/30 bg-blue-500/5 text-blue-400" : "",
            )}
          >
            <span className="text-sm font-medium">
              {isOver ? "Drop here" : "No tasks yet"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
