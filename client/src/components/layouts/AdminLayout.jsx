import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUser, FaRegListAlt, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";
// import "./AdminLayout.css";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header>
        <div className="container">
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaMessage /> Contacts
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/services">
                  <FaRegListAlt /> Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin">{/* <FaHome /> Home */}</NavLink>
              </li>
            </ul>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default AdminLayout;
