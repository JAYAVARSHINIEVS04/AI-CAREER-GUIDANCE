import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="glass-card sticky top-4 mx-4 z-50 flex items-center justify-between px-6 py-3">
      <Link to="/" className="text-xl font-bold gradient-text">
        CareerAI
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Link to="/careers" className="hover:text-primary-600">Careers</Link>
        <Link to="/courses" className="hover:text-primary-600">Courses</Link>
        <Link to="/mentors" className="hover:text-primary-600">Mentors</Link>
        <Link to="/blog" className="hover:text-primary-600">Blog</Link>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} aria-label="Toggle dark mode" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
          {isDark ? <FiSun /> : <FiMoon />}
        </button>

        {user ? (
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/dashboard" className="hover:text-primary-600">Dashboard</Link>
            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/login" className="hover:text-primary-600">Login</Link>
            <Button onClick={() => navigate("/register")}>Get Started</Button>
          </div>
        )}

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
}
