// Tanush Singh (12-2-2026)
import React, { useState, useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useBoardStore } from "../store/useBoardStore";

const TaskCard = ({ item }) => {
  const [editMode, setEditMode] = useState(false);
  const [captionDraft, setCaptionDraft] = useState(item.title);
  const inputRef = useRef(null);

  const updateItem = useBoardStore((state) => state.updateItem);
  const removeItem = useBoardStore((state) => state.removeItem);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
      data: { ...item },
      disabled: editMode,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  const commitChanges = () => {
    if (captionDraft.trim() && captionDraft !== item.title) {
      updateItem(item.id, captionDraft);
    } else {
      setCaptionDraft(item.title);
    }
    setEditMode(false);
  };

  const handleKeyAction = (e) => {
    if (e.key === "Enter") commitChanges();
    if (e.key === "Escape") {
      setCaptionDraft(item.title);
      setEditMode(false);
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
      {...(!editMode ? listeners : {})}
      {...(!editMode ? attributes : {})}
      className="bg-[#121212]/80 backdrop-blur-md border border-white/[0.05] shadow-lg p-5 rounded-2xl group relative transition-all duration-300 hover:border-blue-500/30"
    >
      <div className="flex justify-between items-start gap-4 mb-6">
        {editMode ? (
          <input
            ref={inputRef}
            className="bg-black/40 border border-blue-500/50 rounded-lg px-2 py-1 text-[15px] text-white w-full outline-none focus:ring-2 ring-blue-500/20"
            value={captionDraft}
            onChange={(e) => setCaptionDraft(e.target.value)}
            onBlur={commitChanges}
            onKeyDown={handleKeyAction}
          />
        ) : (
          <h3
            onClick={() => setEditMode(true)}
            className="text-gray-100 font-semibold text-[15px] leading-relaxed cursor-text group-hover:text-blue-400 transition-colors flex-1"
          >
            {item.title}
          </h3>
        )}

        {!editMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeItem(item.id);
            }}
            className="text-gray-600 hover:text-red-400 p-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
          >
            <i className="ri-delete-bin-line text-lg"></i>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          ID: {item.id.slice(0, 4)}
        </span>
        <div className="flex items-center gap-2">
          <i className="ri-pencil-line text-[12px] text-gray-600"></i>
          <span className="text-[10px] text-gray-600 italic">
            Click text to edit
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
