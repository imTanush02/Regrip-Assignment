import React from "react";
import { useBoardStore } from "../store/useBoardStore";
import clsx from "clsx";
import "remixicon/fonts/remixicon.css";

const Toast = () => {
  const notifications = useBoardStore((state) => state.notifications);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-4 max-w-sm w-full pointer-events-none">
      {notifications.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            "pointer-events-auto group relative flex items-center gap-4 pl-4 pr-6 py-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 animate-slide-in-right backdrop-blur-2xl border overflow-hidden",
            toast.type === "error"
              ? "bg-red-950/20 border-red-500/30 shadow-red-900/10"
              : "bg-blue-950/20 border-blue-500/30 shadow-blue-900/10",
          )}
        >
          <div
            className={clsx(
              "absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500",
              toast.type === "error" ? "bg-red-500" : "bg-blue-500",
            )}
          ></div>

          <div
            className={clsx(
              "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center relative z-10",
              toast.type === "error"
                ? "bg-red-500/20 text-red-400"
                : "bg-blue-500/20 text-blue-400",
            )}
          >
            <i
              className={clsx(
                "text-xl",
                toast.type === "error"
                  ? "ri-error-warning-line"
                  : "ri-checkbox-circle-line",
              )}
            ></i>
          </div>

          <div className="flex flex-col gap-0.5 relative z-10">
            <span className="text-xs font-black uppercase tracking-widest text-gray-500">
              {toast.type === "error" ? "System Error" : "Notification"}
            </span>
            <p className="text-sm font-medium text-gray-100 leading-relaxed">
              {toast.message}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/5">
            <div
              className={clsx(
                "h-full animate-progress-shrink origin-left",
                toast.type === "error" ? "bg-red-500" : "bg-blue-500",
              )}
              style={{ animationDuration: "3000ms" }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
