import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Do not render navbar if user is not logged in
  if (!user) {
    return null;
  }

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <div
          onClick={() => navigate('/dashboard')}
          className="cursor-pointer font-bold text-xl tracking-wide hover:text-indigo-300"
          aria-label="Go to Dashboard"
        >
          Skill Swap
        </div>

        <ul className="flex space-x-6 font-semibold">
          <li>
            <Link to="/dashboard" className="hover:text-indigo-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-indigo-300">
              My Profile
            </Link>
          </li>
          <li>
            <Link to="/swaps" className="hover:text-indigo-300">
              My Swaps
            </Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-indigo-300">
              Find Partners
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-indigo-900 hover:bg-indigo-800 px-3 py-1 rounded"
              aria-label="Logout"
              title="Logout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
