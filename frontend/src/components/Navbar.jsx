import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.jpg";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component mount and on storage changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-[#E6E6EA] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <button className="bg-transparent text-[#FE4A49] font-semibold py-2 px-4 border border-[#FE4A49] rounded-md hover:bg-[#FE4A49] hover:text-white">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-transparent text-[#FE4A49] font-semibold py-2 px-4 border border-[#FE4A49] rounded-md hover:bg-[#FE4A49] hover:text-white">
                    Signup
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/update-password">
                  <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 transition">
                    Change Password
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-[#FE4A49] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#e03b3a]"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle (Text Button) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#FE4A49] font-semibold focus:outline-none"
            >
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="w-full bg-transparent text-[#FE4A49] font-semibold py-2 px-4 border border-[#FE4A49] rounded-md hover:bg-[#FE4A49] hover:text-white">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full bg-transparent text-[#FE4A49] font-semibold py-2 px-4 border border-[#FE4A49] rounded-md hover:bg-[#FE4A49] hover:text-white">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/update-password">
                <button className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-700 transition">
                  Change Password
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-[#FE4A49] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#e03b3a]"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};