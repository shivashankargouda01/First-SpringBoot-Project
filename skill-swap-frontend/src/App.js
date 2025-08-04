import React, { useContext } from 'react';
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SkillSearch from './pages/SkillSearch';
import MySwaps from './pages/MySwaps';
import UserProfile from './pages/UserProfile'; // Profile detail page for other users

// PrivateRoute component to protect routes requiring login
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

// Navbar: Only render when not on /login or /register
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navbar on login/register pages
  const noNavPaths = ['/login', '/register'];
  if (noNavPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null; // Don't show navbar unless authenticated

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-indigo-700 text-white sticky top-0 z-30 shadow-md">
      <div
        className="font-bold text-xl cursor-pointer select-none"
        onClick={() => navigate('/dashboard')}
        aria-label="Go to Dashboard"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') navigate('/dashboard');
        }}
      >
        Skill Swap
      </div>
      <div className="space-x-6 flex items-center">
        <Link to="/dashboard" className="hover:underline focus:underline focus:outline-none">
          Dashboard
        </Link>
        <Link to="/profile" className="hover:underline focus:underline focus:outline-none">
          My Profile
        </Link>
        <Link to="/search" className="hover:underline focus:underline focus:outline-none">
          Find Partners
        </Link>
        <Link to="/swaps" className="hover:underline focus:underline focus:outline-none">
          My Swaps
        </Link>
        <button
          onClick={handleLogout}
          className="bg-indigo-900 px-3 py-1 rounded hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Logout"
          type="button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SkillSearch />
            </PrivateRoute>
          }
        />
        <Route
          path="/swaps"
          element={
            <PrivateRoute>
              <MySwaps />
            </PrivateRoute>
          }
        />

        {/* Redirect unmatched paths */}
        <Route
          path="*"
          element={
            user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
