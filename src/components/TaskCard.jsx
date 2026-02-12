import React, { useState, useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useBoardStore } from "../store/useBoardStore";

const TaskCard = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef(null);
  
  const updateTask = useBoardStore((state) => state.updateTask);
  const deleteTask = useBoardStore((state) => state.deleteTask);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { ...task },
      disabled: isEditing, // Edit karte waqt drag disable rahega
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      updateTask(task.id, editTitle);
    } else {
      setEditTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-blue-500/10 backdrop-blur-xl p-5 rounded-2xl border-2 border-dashed border-blue-500/40 h-32 scale-105"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(!isEditing ? listeners : {})} 
      {...(!isEditing ? attributes : {})}
      className="bg-[#121212]/80 backdrop-blur-md border border-white/[0.05] shadow-lg p-5 rounded-2xl group relative transition-all duration-300 hover:border-blue-500/30"
    >
      <div className="flex justify-between items-start gap-4 mb-6">
        {isEditing ? (
          <input
            ref={inputRef}
            className="bg-black/40 border border-blue-500/50 rounded-lg px-2 py-1 text-[15px] text-white w-full outline-none focus:ring-2 ring-blue-500/20"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <h3 
            onClick={() => setIsEditing(true)}
            className="text-gray-100 font-semibold text-[15px] leading-relaxed cursor-text group-hover:text-blue-400 transition-colors flex-1"
          >
            {task.title}
          </h3>
        )}

        {!isEditing && (
          <button
            onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
            className="text-gray-600 hover:text-red-400 p-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
          >
            <i className="ri-delete-bin-line text-lg"></i>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          ID: {task.id.slice(0, 4)}
        </span>
        <div className="flex items-center gap-2">
           <i className="ri-pencil-line text-[12px] text-gray-600"></i>
           <span className="text-[10px] text-gray-600 italic">Click text to edit</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;