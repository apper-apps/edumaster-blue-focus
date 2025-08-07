import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ role: "free", email: "user@example.com" });
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/membership", label: "멤버십" },
    { path: "/master", label: "마스터" },
    { path: "/insights", label: "인사이트" },
    { path: "/testimonials", label: "도전 후기" }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentUser({ role: "member", email: "member@example.com" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ role: "free", email: "" });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="GraduationCap" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">EduMaster</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActiveRoute(item.path) 
                    ? "text-blue-600 font-semibold" 
                    : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {currentUser.role === "admin" && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-red-600 ${
                  isActiveRoute("/admin") 
                    ? "text-red-600 font-semibold" 
                    : "text-slate-700"
                }`}
              >
                관리자
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">
                  {currentUser.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                >
                  로그인
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleLogin}
                >
                  회원가입
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <ApperIcon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActiveRoute(item.path)
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {currentUser.role === "admin" && (
                <Link
                  to="/admin"
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActiveRoute("/admin")
                      ? "bg-red-50 text-red-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  관리자
                </Link>
              )}
              
              <div className="pt-4 mt-4 border-t border-slate-200">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-slate-600">
                      {currentUser.email}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      로그아웃
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleLogin}
                    >
                      로그인
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleLogin}
                    >
                      회원가입
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;