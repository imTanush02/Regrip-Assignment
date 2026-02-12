import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import BoardPage from "./pages/BoardPage";
import Toast from "./components/Toast";

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-gray-900 bg-gray-50 w-full h-screen overflow-x-hidden">
        <Toast />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
