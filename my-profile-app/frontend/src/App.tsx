import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<AuthGuard><Dashboard /></AuthGuard>}
        />
        <Route
          path="/profile"
          element={<AuthGuard><Profile /></AuthGuard>}
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;