import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useBoardStore } from "../store/useBoardStore";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const sessionUser = useBoardStore((state) => state.sessionUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionUser) {
      navigate("/board");
    }
  }, [sessionUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[100px]"></div>

      <div className="bg-[#161616]/80 backdrop-blur-2xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] p-10 md:p-14 rounded-[2.5rem] w-full max-w-lg flex flex-col items-center relative z-10 mx-4">
        <div className="mb-10 relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
          <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-3xl border border-white/10 relative shadow-2xl">
            <i className="ri-kanban-view-2 text-5xl text-blue-400"></i>
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tighter">
          Kanban
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Flow
          </span>
        </h1>
        <p className="text-gray-400 mb-10 text-center text-lg font-light leading-relaxed">
          Streamline your workflow with <br /> minimalist precision.
        </p>

        <LoginForm />

        <div className="mt-12 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          Internal Workspace &bull; v2.0
        </div>
      </div>
    </div>
  );
};

export default Landing;
