import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../store/useBoardStore";
import Board from "../components/Board";

const BoardPage = () => {
  const user = useBoardStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  return <Board />;
};

export default BoardPage;
