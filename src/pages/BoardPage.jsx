// Tanush Singh (12-2-2026)
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../store/useBoardStore";
import Board from "../components/TaskBoard";

const BoardPage = () => {
  const sessionUser = useBoardStore((state) => state.sessionUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionUser) {
      navigate("/");
    }
  }, [sessionUser, navigate]);

  if (!sessionUser) return null;

  return <Board />;
};

export default BoardPage;
