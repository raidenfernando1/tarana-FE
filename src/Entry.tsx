import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";

const Entry: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
};

export default Entry;
