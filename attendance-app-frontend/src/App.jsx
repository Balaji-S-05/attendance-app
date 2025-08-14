import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ClassSelectionPage from './pages/ClassSelectionPage';
import AttendancePage from './pages/AttendancePage';
import SummaryPage from './pages/SummaryPage';
import AttendanceSummaryRange from './pages/AttendanceSummaryRange';
import './app.css';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return isAuthenticated ? children : null;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/class-selection"
          element={
            <ProtectedRoute>
              <ClassSelectionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <AttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance-summary-range"
          element={
            <ProtectedRoute>
              <AttendanceSummaryRange />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
