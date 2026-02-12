import React, { useState } from "react";
import { useBoardStore } from "../store/useBoardStore";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [userIdentifier, setUserIdentifier] = useState("");
  const authorizeUser = useBoardStore((state) => state.authorizeUser);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const performLogin = async (e) => {
    e.preventDefault();
    if (!userIdentifier.trim()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    authorizeUser(userIdentifier);
    navigate("/board");
  };

  return (
    <form
      onSubmit={performLogin}
      className="flex flex-col gap-5 w-full max-w-sm relative z-10"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1"
        >
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="ri-mail-line text-gray-500 group-focus-within:text-blue-400 transition-colors"></i>
          </div>
          <input
            type="email"
            id="email"
            value={userIdentifier}
            onChange={(e) => setUserIdentifier(e.target.value)}
            placeholder="name@example.com"
            required
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:bg-black/40 focus:border-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative overflow-hidden group w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:scale-105"></div>
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="relative flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <i className="ri-loader-4-line animate-spin text-xl"></i>
              <span>Entering...</span>
            </>
          ) : (
            <>
              <span>Enter Workspace</span>
              <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
            </>
          )}
        </span>
      </button>
    </form>
  );
};

export default LoginForm;
