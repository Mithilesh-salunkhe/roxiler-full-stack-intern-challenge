import { Navbar } from "../components/Navbar.jsx";
import { Link } from 'react-router-dom';
import hero_image from "../assets/hero_image.jpg";
import { useState, useEffect } from "react";

export const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState("/");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!token);

    if (user) {
      switch (user.role) {
        case 'admin':
          setDashboardUrl('/admin/dashboard');
          break;
        case 'store_owner':
          setDashboardUrl('/storeowner/dashboard');
          break;
        case 'normal':
          setDashboardUrl('/normaluser/dashboard');
          break;
        default:
          setDashboardUrl('/');
          break;
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center md:justify-between">

          <div className="w-full md:w-1/2 p-4 md:pl-8 text-center md:text-left">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-6 mb-6 leading-snug md:leading-tight">
              <span className="mr-2">Your</span>
              <span className="text-[#FE4A49]">Trusted</span>
              <br />
              <span className="mr-2">Platform for Honest Store</span>
              <span className="text-[#FE4A49] mr-2">Ratings</span>
              <span className="mr-2">and</span>
              <span className="text-[#FE4A49]">Reviews.</span>
            </p>
            
            {/* Show "Get Started" for logged out users */}
            {!isLoggedIn && (
              <Link to="/signup">
                <button className="mt-4 px-6 py-3 bg-[#FE4A49] text-white rounded-lg font-semibold hover:bg-[#e03b3a] transition">
                  Get Started
                </button>
              </Link>
            )}

            {/* Show "Go to Dashboard" for logged in users */}
            {isLoggedIn && (
              <Link to={dashboardUrl}>
                <button className="mt-4 px-6 py-3 bg-[#FE4A49] text-white rounded-lg font-semibold hover:bg-[#e03b3a] transition">
                  Go to Dashboard
                </button>
              </Link>
            )}
          </div>

          <div className="w-full md:w-1/2 p-4">
            <img
              src={hero_image}
              alt="hero_image"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};