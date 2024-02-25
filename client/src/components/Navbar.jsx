import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import ProfilePicture from "./ProfilePicture";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggleClick = (event) => {
    event.stopPropagation();
    toggleMenu();
  };

  return (
    <div>
      <header>
        <div className="container" ref={navbarRef}>
          <div className="logo-brand">
            <NavLink to="/">
              <img src="./assets/logo.png" alt="Logo" className="logo" />
            </NavLink>
          </div>
          {/* Toggle button for phones */}
              <div className="toggle-button" onClick={handleToggleClick}>
            <div
              className={isMenuOpen ? "open" : ""}
              style={{ background: "#646cff" }}
            ></div>
            <div
              className={isMenuOpen ? "open" : ""}
              style={{ background: "#646cff" }}
            ></div>
            <div
              className={isMenuOpen ? "open" : ""}
              style={{ background: "#646cff" }}
            ></div>
          </div>
          <nav className={isMenuOpen ? "open" : ""}>
            <ul>
              <li>
                <NavLink to="/" onClick={toggleMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={toggleMenu}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" onClick={toggleMenu}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={toggleMenu}>
                  Contact
                </NavLink>
              </li>
              {user.isAdmin && (
                <li>
                  <NavLink to="/admin" onClick={toggleMenu}>
                    Admin Panel
                  </NavLink>
                </li>
              )}
              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink to="/logout" onClick={toggleMenu}>
                      Logout
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/userupdate" onClick={toggleMenu}>
                      <ProfilePicture />
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/register" onClick={toggleMenu}>
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" onClick={toggleMenu}>
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
